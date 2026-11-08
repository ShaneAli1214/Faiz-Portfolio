import fs from "fs";
import path from "path";
import { MediaItem } from "@/types/media";
import { withTimeout } from "@/lib/async-timeout";

export type { MediaItem };

const MEDIA_FILE_PATH = path.join(process.cwd(), "src", "data", "media.json");

export class MediaService {
  private static inMemoryList: MediaItem[] | null = null;

  private static async getNetlifyStore() {
    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      if (siteID && token) {
        return getStore({ name: "portfolio-media-meta", siteID, token });
      }
      return getStore({ name: "portfolio-media-meta" });
    } catch {
      return null;
    }
  }

  public static getMediaList(): MediaItem[] {
    if (this.inMemoryList) {
      return this.inMemoryList;
    }

    // 1. Try /tmp on serverless container
    try {
      const tmpPath = path.join("/tmp", "media.json");
      if (fs.existsSync(tmpPath)) {
        const raw = fs.readFileSync(tmpPath, "utf8");
        this.inMemoryList = JSON.parse(raw) as MediaItem[];
        return this.inMemoryList;
      }
    } catch {}

    // 2. Try repo media.json
    try {
      if (fs.existsSync(MEDIA_FILE_PATH)) {
        const raw = fs.readFileSync(MEDIA_FILE_PATH, "utf8");
        this.inMemoryList = JSON.parse(raw) as MediaItem[];
        return this.inMemoryList;
      }
      this.inMemoryList = [];
      return [];
    } catch (err) {
      console.warn("Notice reading media.json fallback:", err);
      this.inMemoryList = this.inMemoryList || [];
      return this.inMemoryList;
    }
  }

  public static async getMediaListAsync(): Promise<MediaItem[]> {
    const fallback = this.getMediaList();

    const mayHaveBlobs = Boolean(process.env.NETLIFY || process.env.NETLIFY_SITE_ID);
    if (!mayHaveBlobs) {
      return fallback;
    }

    return withTimeout(
      async () => {
        try {
          const store = await this.getNetlifyStore();
          if (store) {
            const stored = await store.get("media-list", { type: "json" });
            if (Array.isArray(stored)) {
              this.inMemoryList = stored as MediaItem[];
              return this.inMemoryList;
            }
          }
        } catch {
          // Blobs not available
        }
        return fallback;
      },
      800,
      fallback
    );
  }

  public static addMediaItem(item: MediaItem): boolean {
    const list = this.getMediaList();
    const filtered = list.filter((m) => m.id !== item.id);
    filtered.unshift(item); // latest first
    this.inMemoryList = filtered;

    try {
      const dir = path.dirname(MEDIA_FILE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(filtered, null, 2), "utf8");
    } catch (fsErr: any) {
      try {
        const tmpFile = path.join("/tmp", "media.json");
        fs.writeFileSync(tmpFile, JSON.stringify(filtered, null, 2), "utf8");
      } catch {}
    }

    return true;
  }

  public static async addMediaItemAsync(item: MediaItem): Promise<boolean> {
    this.addMediaItem(item);

    // Save to Netlify Blobs with timeout
    await withTimeout(
      async () => {
        try {
          const store = await this.getNetlifyStore();
          if (store && this.inMemoryList) {
            await store.setJSON("media-list", this.inMemoryList);
          }
        } catch (blobErr: any) {
          console.warn("Notice: Netlify Blobs media metadata error:", blobErr?.message);
        }
        return true;
      },
      3000,
      false
    );

    return true;
  }

  public static deleteMediaItem(id: string): boolean {
    const list = this.getMediaList();
    const filtered = list.filter((m) => m.id !== id);
    this.inMemoryList = filtered;

    try {
      const dir = path.dirname(MEDIA_FILE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(filtered, null, 2), "utf8");
    } catch (fsErr: any) {
      try {
        const tmpFile = path.join("/tmp", "media.json");
        fs.writeFileSync(tmpFile, JSON.stringify(filtered, null, 2), "utf8");
      } catch {}
    }

    return true;
  }

  public static async deleteMediaItemAsync(id: string): Promise<boolean> {
    this.deleteMediaItem(id);

    // Delete from Netlify Blobs with timeout
    await withTimeout(
      async () => {
        try {
          const store = await this.getNetlifyStore();
          if (store && this.inMemoryList) {
            await store.setJSON("media-list", this.inMemoryList);
          }
        } catch (blobErr: any) {
          console.warn("Notice: Netlify Blobs media delete error:", blobErr?.message);
        }
        return true;
      },
      3000,
      false
    );

    return true;
  }
}
