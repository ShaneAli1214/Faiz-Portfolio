export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  category: "profile" | "project" | "achievement" | "general";
}

