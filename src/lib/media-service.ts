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

  public static addMediaItem(item: MediaItem): boolean {
    try {
      const list = this.getMediaList();
      // Remove any existing with same id
      const filtered = list.filter((m) => m.id !== item.id);
      filtered.unshift(item); // latest first
      this.inMemoryList = filtered;

      // Attempt to persist to disk if filesystem is writable
      try {
        const dir = path.dirname(MEDIA_FILE_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(filtered, null, 2), "utf8");
      } catch (fsErr: any) {
        // Safe warning on read-only serverless hosts
        console.warn("Notice: Disk is read-only (EROFS), media retained in-memory:", fsErr?.message);
      }

      return true;
    } catch (err) {
      console.error("Error adding media item:", err);
      return false;
    }
  }

  public static deleteMediaItem(id: string): boolean {
    try {
      const list = this.getMediaList();
      const itemToDelete = list.find((m) => m.id === id);
      if (!itemToDelete) return false;

      // Delete file from disk if present and writable
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
    } catch (err) {
      console.error("Error deleting media item:", err);
      return false;
    }
  }
}
