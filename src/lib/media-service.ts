import fs from "fs";
import path from "path";
import { MediaItem } from "@/types/media";

export { type MediaItem };

const MEDIA_FILE_PATH = path.join(process.cwd(), "src", "data", "media.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export class MediaService {
  private static inMemoryList: MediaItem[] | null = null;

  public static getMediaList(): MediaItem[] {
    if (this.inMemoryList !== null) {
      return this.inMemoryList;
    }

    try {
      if (fs.existsSync(MEDIA_FILE_PATH)) {
        const raw = fs.readFileSync(MEDIA_FILE_PATH, "utf8");
        this.inMemoryList = JSON.parse(raw) as MediaItem[];
        return this.inMemoryList;
      }
      this.inMemoryList = [];
      return [];
    } catch (err) {
      console.warn("Error reading media.json, using in-memory list:", err);
      this.inMemoryList = this.inMemoryList || [];
      return this.inMemoryList;
    }
  }

  public static async getMediaListAsync(): Promise<MediaItem[]> {
    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      const store = siteID && token
        ? getStore({ name: "portfolio-media-meta", siteID, token, consistency: "strong" })
        : getStore({ name: "portfolio-media-meta", consistency: "strong" });

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

    return this.getMediaList();
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
      console.warn("Notice: Disk is read-only (EROFS), media retained in-memory:", fsErr?.message);
    }

    return true;
  }

  public static async addMediaItemAsync(item: MediaItem): Promise<boolean> {
    const list = await this.getMediaListAsync();
    const filtered = list.filter((m) => m.id !== item.id);
    filtered.unshift(item);
    this.inMemoryList = filtered;

    // 1. Save to Netlify Blobs
    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      const store = siteID && token
        ? getStore({ name: "portfolio-media-meta", siteID, token, consistency: "strong" })
        : getStore({ name: "portfolio-media-meta", consistency: "strong" });

      if (store) {
        await store.setJSON("media-list", filtered);
      }
    } catch (blobErr: any) {
      console.warn("Notice: Netlify Blobs media-meta store not available:", blobErr?.message);
    }

    // 2. Save to local disk
    this.addMediaItem(item);
    return true;
  }

  public static deleteMediaItem(id: string): boolean {
    const list = this.getMediaList();
    const itemToDelete = list.find((m) => m.id === id);
    if (!itemToDelete) return false;

    try {
      const filename = path.basename(itemToDelete.url);
      const filePath = path.join(UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch {
      // Ignore deletion errors on remote or read-only storage
    }

    const filtered = list.filter((m) => m.id !== id);
    this.inMemoryList = filtered;

    try {
      fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(filtered, null, 2), "utf8");
    } catch {
      // Disk read-only
    }

    return true;
  }

  public static async deleteMediaItemAsync(id: string): Promise<boolean> {
    const list = await this.getMediaListAsync();
    const filtered = list.filter((m) => m.id !== id);
    this.inMemoryList = filtered;

    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      const store = siteID && token
        ? getStore({ name: "portfolio-media-meta", siteID, token, consistency: "strong" })
        : getStore({ name: "portfolio-media-meta", consistency: "strong" });

      if (store) {
        await store.setJSON("media-list", filtered);
      }
    } catch {
      // Blobs not available
    }

    this.deleteMediaItem(id);
    return true;
  }
}
