import { initialPortfolioData } from "@/data/portfolioData";
import {
  PortfolioData,
  ProfileInfo,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  SkillCategory,
  AwardItem,
  CertificationItem,
  LeadershipItem,
  ContactInfo,
  HighlightMetric,
  CareerMilestone,
  ProfessionalValue,
  ProfessionalInterest,
  AcademicAchievement,
  ProfessionalSkillItem,
  CommunityServiceItem,
} from "@/types/portfolio";
import { withTimeout } from "@/lib/async-timeout";
import fs from "fs";
import path from "path";

const CMS_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio-cms.json");

/**
 * Portfolio Data Access Layer
 * Central service providing dynamic persistence via Netlify Blobs & local portfolio-cms.json with fast timeouts
 */
export class PortfolioService {
  private static data: PortfolioData = initialPortfolioData;
  private static initialized: boolean = false;

  private static loadFromDisk(): PortfolioData {
    if (this.initialized && this.data && this.data.profile) {
      return this.data;
    }

    if (typeof window !== "undefined") {
      return this.data || initialPortfolioData;
    }

    // 1. Try /tmp in serverless container first if recently written
    try {
      const tmpPath = path.join("/tmp", "portfolio-cms.json");
      if (fs.existsSync(tmpPath)) {
        const fileContent = fs.readFileSync(tmpPath, "utf8");
        const parsed = JSON.parse(fileContent) as PortfolioData;
        if (parsed && parsed.profile) {
          this.data = parsed;
          this.initialized = true;
          return this.data;
        }
      }
    } catch {}

    // 2. Try CMS_FILE_PATH in repository
    try {
      if (fs.existsSync(CMS_FILE_PATH)) {
        const fileContent = fs.readFileSync(CMS_FILE_PATH, "utf8");
        const parsed = JSON.parse(fileContent) as PortfolioData;
        if (parsed && parsed.profile) {
          this.data = parsed;
          this.initialized = true;
          return this.data;
        }
      }
    } catch (err) {
      console.warn("Notice: reading portfolio-cms.json fallback:", err);
    }

    this.data = initialPortfolioData;
    this.initialized = true;
    return this.data;
  }

  public static getPortfolioData(): PortfolioData {
    return this.loadFromDisk();
  }

  /**
   * Helper to initialize Netlify Blobs store
   */
  private static async getNetlifyStore() {
    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      if (siteID && token) {
        return getStore({ name: "portfolio-cms", siteID, token });
      }
      return getStore({ name: "portfolio-cms" });
    } catch {
      return null;
    }
  }

  /**
   * Asynchronously loads portfolio data with a strict 800ms timeout race.
   * If Netlify Blobs does not respond within 800ms, immediately returns cached/local data.
   * Guarantees zero "Inactivity Timeout" on Netlify.
   */
  public static async getPortfolioDataAsync(): Promise<PortfolioData> {
    const fallback = this.loadFromDisk();

    const mayHaveBlobs = Boolean(process.env.NETLIFY || process.env.NETLIFY_SITE_ID);
    if (!mayHaveBlobs) {
      return fallback;
    }

    return withTimeout(
      async () => {
        try {
          const store = await this.getNetlifyStore();
          if (store) {
            const stored = await store.get("portfolio-data", { type: "json" });
            if (stored && (stored as any).profile && (stored as any).projects) {
              this.data = stored as PortfolioData;
              this.initialized = true;
              return this.data;
            }
          }
        } catch {
          // Blobs not available
        }
        return fallback;
      },
      800, // 800ms max timeout
      fallback
    );
  }

  public static savePortfolioData(updatedData: PortfolioData): boolean {
    this.data = updatedData;
    this.initialized = true;

    if (typeof window === "undefined") {
      try {
        const dir = path.dirname(CMS_FILE_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf8");
      } catch (fsErr: any) {
        try {
          const tmpFile = path.join("/tmp", "portfolio-cms.json");
          fs.writeFileSync(tmpFile, JSON.stringify(updatedData, null, 2), "utf8");
        } catch {}
      }
    }
    return true;
  }

  /**
   * Asynchronously persists portfolio data to Netlify Blobs and local storage.
   * Returns strict success confirmation and truthful error messaging.
   */
  public static async savePortfolioDataAsync(
    updatedData: PortfolioData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      this.data = updatedData;
      this.initialized = true;

      const isNetlifyEnv = Boolean(process.env.NETLIFY);
      let cloudPersisted = false;
      let cloudError: string | null = null;

      // 1. Persist to Netlify Blobs with a strict 3500ms timeout
      try {
        const store = await this.getNetlifyStore();
        if (store) {
          const writeBlob = async () => {
            await store.setJSON("portfolio-data", updatedData);
            return true;
          };
          cloudPersisted = await withTimeout(writeBlob(), 3500, false);
          if (!cloudPersisted) {
            cloudError = "Netlify Blobs write timed out or could not be completed.";
          }
        } else {
          cloudError = "Netlify Blobs environment is not configured. Please supply NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN in Netlify Site Settings > Environment Variables.";
        }
      } catch (blobErr: any) {
        cloudError = blobErr?.message || "Netlify Blobs write rejected.";
      }

      // 2. Persist to local disk if filesystem is writable
      let diskPersisted = false;
      if (typeof window === "undefined") {
        try {
          const dir = path.dirname(CMS_FILE_PATH);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf8");
          diskPersisted = true;
        } catch (fsErr: any) {
          // AWS Lambda read-only container: write to writable /tmp directory
          try {
            const tmpFile = path.join("/tmp", "portfolio-cms.json");
            fs.writeFileSync(tmpFile, JSON.stringify(updatedData, null, 2), "utf8");
          } catch {}
        }
      }

      // STRICT VALIDATION: If running in Netlify production, we MUST confirm cloud persistence.
      if (isNetlifyEnv && !cloudPersisted) {
        return {
          success: false,
          error: `Persistent Cloud Storage Error: ${cloudError || "Netlify Blobs write failed."} Please set NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN in Netlify Site Settings > Environment Variables.`,
        };
      }

      if (!isNetlifyEnv && !diskPersisted && !cloudPersisted) {
        return {
          success: false,
          error: "Failed to persist changes to local disk or cloud storage.",
        };
      }

      return { success: true };
    } catch (err: any) {
      console.error("Error in savePortfolioDataAsync:", err);
      return { success: false, error: err?.message || "Failed to save portfolio data." };
    }
  }

  public static resetToDefault(): boolean {
    return this.savePortfolioData(initialPortfolioData);
  }

  public static async resetToDefaultAsync(): Promise<boolean> {
    const result = await this.savePortfolioDataAsync(initialPortfolioData);
    return result.success;
  }

  public static getProfile(): ProfileInfo {
    return this.getPortfolioData().profile;
  }

  public static getHighlights(): HighlightMetric[] {
    return this.getPortfolioData().highlights;
  }

  public static getCareerJourney(): CareerMilestone[] {
    return this.getPortfolioData().careerJourney;
  }

  public static getProfessionalInterests(): ProfessionalInterest[] {
    return this.getPortfolioData().professionalInterests;
  }

  public static getProfessionalValues(): ProfessionalValue[] {
    return this.getPortfolioData().professionalValues;
  }

  public static getExperience(): ExperienceItem[] {
    return this.getPortfolioData().experience;
  }

  public static getProjects(): ProjectItem[] {
    return this.getPortfolioData().projects;
  }

  public static getEducation(): EducationItem[] {
    return this.getPortfolioData().education;
  }

  public static getAcademicAchievements(): AcademicAchievement[] {
    return this.getPortfolioData().academicAchievements || [];
  }

  public static getSkillCategories(): SkillCategory[] {
    return this.getPortfolioData().skillCategories;
  }

  public static getProfessionalSkills(): ProfessionalSkillItem[] {
    return this.getPortfolioData().professionalSkills || [];
  }

  public static getAwards(): AwardItem[] {
    return this.getPortfolioData().awards;
  }

  public static getCertifications(): CertificationItem[] {
    return this.getPortfolioData().certifications;
  }

  public static getLeadership(): LeadershipItem[] {
    return this.getPortfolioData().leadership;
  }

  public static getCommunityService(): CommunityServiceItem[] {
    return this.getPortfolioData().communityService || [];
  }

  public static getContactInfo(): ContactInfo {
    return this.getPortfolioData().profile.contact;
  }
}
