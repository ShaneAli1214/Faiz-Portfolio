import fs from "fs";
import path from "path";
import { ThemeConfig, defaultTheme } from "@/types/theme";
import { withTimeout } from "@/lib/async-timeout";

export { type ThemeConfig, defaultTheme };

const THEME_FILE_PATH = path.join(process.cwd(), "src", "data", "theme.json");

export class ThemeService {
  private static cachedTheme: ThemeConfig | null = null;

  private static async getNetlifyStore() {
    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      if (siteID && token) {
        return getStore({ name: "portfolio-theme", siteID, token });
      }
      return getStore({ name: "portfolio-theme" });
    } catch {
      return null;
    }
  }

  public static getTheme(): ThemeConfig {
    if (this.cachedTheme) {
      return this.cachedTheme;
    }

    // 1. Check /tmp on serverless container
    try {
      const tmpPath = path.join("/tmp", "theme.json");
      if (fs.existsSync(tmpPath)) {
        const raw = fs.readFileSync(tmpPath, "utf8");
        const parsed = JSON.parse(raw);
        const config: ThemeConfig = { ...defaultTheme, ...parsed };
        this.cachedTheme = config;
        return config;
      }
    } catch {}

    // 2. Check repo theme.json
    try {
      if (fs.existsSync(THEME_FILE_PATH)) {
        const raw = fs.readFileSync(THEME_FILE_PATH, "utf8");
        const parsed = JSON.parse(raw);
        const config: ThemeConfig = { ...defaultTheme, ...parsed };
        this.cachedTheme = config;
        return config;
      }
    } catch (err) {
      console.warn("Notice reading theme.json fallback:", err);
    }

    this.cachedTheme = defaultTheme;
    return defaultTheme;
  }

  public static async getThemeAsync(): Promise<ThemeConfig> {
    const fallback = this.getTheme();

    const mayHaveBlobs = Boolean(process.env.NETLIFY || process.env.NETLIFY_SITE_ID);
    if (!mayHaveBlobs) {
      return fallback;
    }

    return withTimeout(
      async () => {
        try {
          const store = await this.getNetlifyStore();
          if (store) {
            const stored = await store.get("theme-data", { type: "json" });
            if (stored && (stored as any).primaryColor) {
              this.cachedTheme = stored as ThemeConfig;
              return this.cachedTheme;
            }
          }
        } catch {
          // Blobs not available
        }
        return fallback;
      },
      600, // 600ms timeout max
      fallback
    );
  }

  public static saveTheme(newTheme: ThemeConfig): boolean {
    this.cachedTheme = newTheme;
    try {
      const dir = path.dirname(THEME_FILE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(THEME_FILE_PATH, JSON.stringify(newTheme, null, 2), "utf8");
    } catch (fsErr: any) {
      try {
        const tmpFile = path.join("/tmp", "theme.json");
        fs.writeFileSync(tmpFile, JSON.stringify(newTheme, null, 2), "utf8");
      } catch {}
    }
    return true;
  }

  public static async saveThemeAsync(newTheme: ThemeConfig): Promise<{ success: boolean; error?: string }> {
    this.cachedTheme = newTheme;
    const isNetlifyEnv = Boolean(process.env.NETLIFY);
    let cloudPersisted = false;
    let cloudError: string | null = null;

    // 1. Save to Netlify Blobs with timeout
    try {
      const store = await this.getNetlifyStore();
      if (store) {
        const writeBlob = async () => {
          await store.setJSON("theme-data", newTheme);
          return true;
        };
        cloudPersisted = await withTimeout(writeBlob(), 3000, false);
        if (!cloudPersisted) {
          cloudError = "Netlify Blobs write timed out or could not be completed.";
        }
      } else {
        cloudError = "Netlify Blobs store uninitialized.";
      }
    } catch (blobErr: any) {
      cloudError = blobErr?.message || "Netlify Blobs theme store error.";
    }

    // 2. Save to local disk
    let diskPersisted = false;
    try {
      const dir = path.dirname(THEME_FILE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(THEME_FILE_PATH, JSON.stringify(newTheme, null, 2), "utf8");
      diskPersisted = true;
    } catch (fsErr: any) {
      try {
        const tmpFile = path.join("/tmp", "theme.json");
        fs.writeFileSync(tmpFile, JSON.stringify(newTheme, null, 2), "utf8");
      } catch {}
    }

    if (isNetlifyEnv && !cloudPersisted) {
      return {
        success: false,
        error: `Cloud storage failed to persist theme: ${cloudError || "Netlify Blobs unavailable."} Please ensure NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN are set in Netlify Site Settings > Environment Variables.`,
      };
    }

    if (!isNetlifyEnv && !diskPersisted && !cloudPersisted) {
      return {
        success: false,
        error: "Failed to persist theme to local disk or cloud storage.",
      };
    }

    return { success: true };
  }

  public static resetToDefault(): ThemeConfig {
    this.saveTheme(defaultTheme);
    return defaultTheme;
  }

  public static async resetToDefaultAsync(): Promise<ThemeConfig> {
    await this.saveThemeAsync(defaultTheme);
    return defaultTheme;
  }
}
