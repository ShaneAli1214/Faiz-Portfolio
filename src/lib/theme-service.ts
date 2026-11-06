import fs from "fs";
import path from "path";
import { ThemeConfig, defaultTheme } from "@/types/theme";

export { type ThemeConfig, defaultTheme };

const THEME_FILE_PATH = path.join(process.cwd(), "src", "data", "theme.json");

export class ThemeService {
  private static cachedTheme: ThemeConfig | null = null;

  public static getTheme(): ThemeConfig {
    if (typeof window !== "undefined" && this.cachedTheme) {
      return this.cachedTheme;
    }

    try {
      if (fs.existsSync(THEME_FILE_PATH)) {
        const raw = fs.readFileSync(THEME_FILE_PATH, "utf8");
        const parsed = JSON.parse(raw);
        const combined: ThemeConfig = { ...defaultTheme, ...parsed };
        this.cachedTheme = combined;
        return combined;
      } else {
        try {
          const dir = path.dirname(THEME_FILE_PATH);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(THEME_FILE_PATH, JSON.stringify(defaultTheme, null, 2), "utf8");
        } catch {
          // Read-only filesystem
        }
        this.cachedTheme = defaultTheme;
        return defaultTheme;
      }
    } catch (err) {
      console.warn("Error reading theme.json, using default:", err);
      return defaultTheme;
    }
  }

  public static saveTheme(newTheme: ThemeConfig): boolean {
    try {
      this.cachedTheme = newTheme;
      try {
        const dir = path.dirname(THEME_FILE_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(THEME_FILE_PATH, JSON.stringify(newTheme, null, 2), "utf8");
      } catch (fsErr: any) {
        console.warn("Notice: Disk is read-only (EROFS), theme updated in memory:", fsErr?.message);
      }
      return true;
    } catch (err) {
      console.error("Error writing theme.json:", err);
      return false;
    }
  }

  public static resetToDefault(): ThemeConfig {
    this.saveTheme(defaultTheme);
    return defaultTheme;
  }
}
