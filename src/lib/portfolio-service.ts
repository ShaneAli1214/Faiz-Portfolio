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
import fs from "fs";
import path from "path";

const CMS_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio-cms.json");

/**
 * Portfolio Data Access Layer
 * Central service providing dynamic persistence via portfolio-cms.json
 */
export class PortfolioService {
  private static data: PortfolioData = initialPortfolioData;
  private static initialized: boolean = false;

  private static loadFromDisk(): PortfolioData {
    if (typeof window !== "undefined") {
      return this.data;
    }

    try {
      if (fs.existsSync(CMS_FILE_PATH)) {
        const fileContent = fs.readFileSync(CMS_FILE_PATH, "utf8");
        this.data = JSON.parse(fileContent) as PortfolioData;
        this.initialized = true;
        return this.data;
      } else {
        // Initialize file from initialPortfolioData
        this.data = initialPortfolioData;
        const dir = path.dirname(CMS_FILE_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(initialPortfolioData, null, 2), "utf8");
        this.initialized = true;
        return this.data;
      }
    } catch (err) {
      console.error("Error reading portfolio-cms.json, using fallback:", err);
      return this.data || initialPortfolioData;
    }
  }

  public static getPortfolioData(): PortfolioData {
    return this.loadFromDisk();
  }

  public static savePortfolioData(updatedData: PortfolioData): boolean {
    try {
      this.data = updatedData;
      if (typeof window === "undefined") {
        const dir = path.dirname(CMS_FILE_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf8");
      }
      return true;
    } catch (err) {
      console.error("Error saving portfolio-cms.json:", err);
      return false;
    }
  }

  public static resetToDefault(): boolean {
    return this.savePortfolioData(initialPortfolioData);
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
