import fs from "fs";
import path from "path";
import { ThemeConfig, defaultTheme } from "@/types/theme";
import { withTimeout } from "@/lib/async-timeout";

export { type ThemeConfig, defaultTheme };

const THEME_FILE_PATH = path.join(process.cwd(), "src", "data", "theme.json");

export class ThemeService {
  private static cachedTheme: ThemeConfig | null = null;

  public static getTheme(): ThemeConfig {
    if (this.cachedTheme) {
      return this.cachedTheme;
    }

    try {
      if (fs.existsSync(THEME_FILE_PATH)) {
        const raw = fs.readFileSync(THEME_FILE_PATH, "utf8");
        const parsed = JSON.parse(raw);
        const combined: ThemeConfig = { ...defaultTheme, ...parsed };
        this.cachedTheme = combined;
        return combined;
      }
    } catch (err) {
      console.warn("Notice reading theme.json fallback:", err);
    }

    this.cachedTheme = defaultTheme;
    return defaultTheme;
  }

  public static async getThemeAsync(): Promise<ThemeConfig> {
    const fallback = this.getTheme();

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
            ? getStore({ name: "portfolio-theme", siteID, token })
            : getStore({ name: "portfolio-theme" });

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
      console.warn("Notice: Disk is read-only (EROFS), theme updated in memory:", fsErr?.message);
    }
    return true;
  }

  public static async saveThemeAsync(newTheme: ThemeConfig): Promise<boolean> {
    this.cachedTheme = newTheme;

    // 1. Save to Netlify Blobs with timeout
    await withTimeout(
      async () => {
        try {
          const { getStore } = await import("@netlify/blobs");
          const siteID = process.env.NETLIFY_SITE_ID;
          const token = process.env.NETLIFY_AUTH_TOKEN;
          const store = siteID && token
            ? getStore({ name: "portfolio-theme", siteID, token })
            : getStore({ name: "portfolio-theme" });

          if (store) {
            await store.setJSON("theme-data", newTheme);
          }
        } catch (blobErr: any) {
          console.warn("Notice: Netlify Blobs theme store error:", blobErr?.message);
        }
        return true;
      },
      2000,
      false
    );

    // 2. Save to local disk
    this.saveTheme(newTheme);
    return true;
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
