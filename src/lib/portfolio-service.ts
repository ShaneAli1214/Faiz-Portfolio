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
 * Central service providing dynamic persistence via portfolio-cms.json with fast timeouts
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
   * Asynchronously loads portfolio data with a strict 800ms timeout race.
   * If Netlify Blobs does not respond within 800ms, immediately returns cached/local data.
   * Guarantees zero "Inactivity Timeout" on Netlify.
   */
  public static async getPortfolioDataAsync(): Promise<PortfolioData> {
    const fallback = this.loadFromDisk();

    // Only attempt Netlify Blobs if on Netlify or token configured
    const hasNetlifyContext =
      Boolean(process.env.NETLIFY_SITE_ID && process.env.NETLIFY_AUTH_TOKEN) ||
      Boolean(process.env.NETLIFY && process.env.NETLIFY_BLOBS_CONTEXT);

    if (!hasNetlifyContext) {
      return fallback;
    }

    return withTimeout(
      async () => {
        try {
          const { getStore } = await import("@netlify/blobs");
          const siteID = process.env.NETLIFY_SITE_ID;
          const token = process.env.NETLIFY_AUTH_TOKEN;
          const store = siteID && token
            ? getStore({ name: "portfolio-cms", siteID, token })
            : getStore({ name: "portfolio-cms" });

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
        console.warn("Notice: Disk is read-only (EROFS), portfolio data updated in memory:", fsErr?.message);
      }
    }
    return true;
  }

  public static async savePortfolioDataAsync(updatedData: PortfolioData): Promise<boolean> {
    try {
      this.data = updatedData;
      this.initialized = true;

      // 1. Persist to Netlify Blobs with a strict 3000ms timeout
      await withTimeout(
        async () => {
          try {
            const { getStore } = await import("@netlify/blobs");
            const siteID = process.env.NETLIFY_SITE_ID;
            const token = process.env.NETLIFY_AUTH_TOKEN;
            const store = siteID && token
              ? getStore({ name: "portfolio-cms", siteID, token })
              : getStore({ name: "portfolio-cms" });

            if (store) {
              await store.setJSON("portfolio-data", updatedData);
            }
          } catch (blobErr: any) {
            console.warn("Notice: Netlify Blobs save notice:", blobErr?.message);
          }
          return true;
        },
        3000,
        false
      );

      // 2. Persist to local disk if filesystem is writable
      if (typeof window === "undefined") {
        try {
          const dir = path.dirname(CMS_FILE_PATH);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf8");
        } catch (fsErr: any) {
          console.warn("Notice: Local filesystem is read-only (EROFS):", fsErr?.message);
        }
      }

      return true;
    } catch (err) {
      console.error("Error in savePortfolioDataAsync:", err);
      return false;
    }
  }

  public static resetToDefault(): boolean {
    return this.savePortfolioData(initialPortfolioData);
  }

  public static async resetToDefaultAsync(): Promise<boolean> {
    return this.savePortfolioDataAsync(initialPortfolioData);
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
