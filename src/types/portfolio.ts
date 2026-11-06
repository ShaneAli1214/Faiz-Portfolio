/**
 * Portfolio Data Type Definitions
 * Muhammad Faiz Waheed – Professional Portfolio
 */

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  location?: string;
  availability?: string;
  introHeading?: string;
  introDescription?: string;
  availabilityAreas?: string[];
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: "unread" | "read" | "archived";
}

export type ImageFrameStyle = "auto" | "minimal" | "glow" | "cutout" | "editorial";
export type ImageFitMode = "contain" | "cover";
export type ImageAspectRatio = "auto" | "portrait" | "tall" | "square" | "landscape";

export interface PlacementImageSettings {
  url: string;
  originalUrl?: string;
  processedUrl?: string;
  scale: number;
  positionX: number;
  positionY: number;
  fitMode: ImageFitMode;
  frameStyle: ImageFrameStyle;
  aspectRatio: ImageAspectRatio;
  maxWidth?: "compact" | "standard" | "wide";
  hasBackgroundRemoved?: boolean;
  updatedAt?: string;
}

export interface ProfileInfo {
  fullName: string;
  professionalTitle: string;
  tagline: string;
  bioSummary: string;
  aboutIntro?: string;
  degree: string;
  institution: string;
  cgpa: string;
  honors: string[];
  photoUrl?: string;
  homeHeroImage?: PlacementImageSettings;
  aboutProfileImage?: PlacementImageSettings;
  contact: ContactInfo;
}

export interface HighlightMetric {
  id: string;
  value: string;
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
}

export interface CareerMilestone {
  year: string;
  title: string;
  organization: string;
  description: string;
  category: "Business" | "Academic" | "Leadership" | "Operations" | "Engineering" | "Sustainability";
  isCurrent?: boolean;
}

export interface ProfessionalValue {
  title: string;
  description: string;
  strengthContext: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  companyAcronym?: string;
  role: string;
  department?: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  isCurrent?: boolean;
  responsibilities: string[];
  skillsApplied: string[];
  technologies?: string[];
  keyMetric?: string;
  verified: boolean;
}

export type ProjectCategory =
  | "Academic Projects"
  | "Engineering & Industrial"
  | "Sustainability"
  | "Data & Analytics"
  | "Other Projects";

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description?: string;
  technologies: string[];
  keyContributions?: string[];
  outcomes?: string[];
  problemStatement?: string;
  objectives?: string[];
  methodology?: string;
  implementation?: string;
  results?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  thumbnailUrl?: string;
  visualType?: "circular" | "timeline" | "network" | "refinery" | "gold-medal";
  isFeaturedAcademic?: boolean;
  isPlaceholderDetails?: boolean;
  placeholderNotice?: string;
  visibility: boolean;
  verified: boolean;
}

export interface AcademicAchievement {
  id: string;
  title: string;
  institution: string;
  period?: string;
  year?: string;
  description: string;
  badge?: string;
  distinctionType: "gold-medal" | "deans-list" | "general";
  verified: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  field?: string;
  institution: string;
  campus?: string;
  location?: string;
  duration: string;
  period?: string;
  cgpa: string;
  maxCgpa?: string;
  distinction?: string;
  honors: string[];
  thesisOrCapstone?: string;
  coreDisciplines?: string[];
  achievements?: AcademicAchievement[];
  verified: boolean;
}

export interface SkillItem {
  id?: string;
  name: string;
  category?: string;
  proficiencyLevel?: "Fundamental" | "Basic" | "Working Knowledge" | "Proficient" | "Advanced";
  note?: string;
  description?: string;
  iconName?: string;
  verified?: boolean;
}

export interface SkillCategory {
  id?: string;
  categoryName: string;
  groupType?: "technical" | "professional" | "domain";
  description?: string;
  skills: SkillItem[];
}

export interface ProfessionalSkillItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName?: string;
  verified: boolean;
}

export interface AwardItem {
  id: string;
  title: string;
  institution: string;
  year?: string;
  period?: string;
  badge?: string;
  distinctionType?: "gold-medal" | "deans-list" | "general";
  description: string;
  verified: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  duration?: string;
  period?: string;
  status: "In Progress" | "Completed";
  description?: string;
  badgeLabel?: string;
  credentialId?: string;
  link?: string;
  verified: boolean;
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  duration: string;
  period?: string;
  responsibilities: string[];
  achievements?: string[];
  verified: boolean;
}

export interface CommunityImpactMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface CommunityServiceItem {
  id: string;
  title: string;
  organization: string;
  duration: string;
  summary: string;
  impactMetrics: CommunityImpactMetric[];
  activities: string[];
  verified: boolean;
}

export interface ProfessionalInterest {
  title: string;
  description: string;
  iconName?: string;
}

export interface PortfolioData {
  profile: ProfileInfo;
  highlights: HighlightMetric[];
  careerJourney: CareerMilestone[];
  professionalInterests: ProfessionalInterest[];
  professionalValues: ProfessionalValue[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  academicAchievements?: AcademicAchievement[];
  skillCategories: SkillCategory[];
  professionalSkills?: ProfessionalSkillItem[];
  awards: AwardItem[];
  certifications: CertificationItem[];
  leadership: LeadershipItem[];
  communityService?: CommunityServiceItem[];
  navigationRoutes: {
    label: string;
    href: string;
    isPrivate?: boolean;
  }[];
}
