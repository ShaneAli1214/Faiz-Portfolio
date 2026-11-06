import fs from "fs";
import path from "path";
import { MediaItem } from "@/types/media";

export { type MediaItem };

const MEDIA_FILE_PATH = path.join(process.cwd(), "src", "data", "media.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export class MediaService {
  public static getMediaList(): MediaItem[] {
    try {
      if (fs.existsSync(MEDIA_FILE_PATH)) {
        const raw = fs.readFileSync(MEDIA_FILE_PATH, "utf8");
        return JSON.parse(raw) as MediaItem[];
      }
      return [];
    } catch (err) {
      console.error("Error reading media.json:", err);
      return [];
    }
  }

  public static addMediaItem(item: MediaItem): boolean {
    try {
      const list = this.getMediaList();
      list.unshift(item); // latest first
      const dir = path.dirname(MEDIA_FILE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(list, null, 2), "utf8");
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

      // Delete file from disk if present
      const filename = path.basename(itemToDelete.url);
      const filePath = path.join(UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      const filtered = list.filter((m) => m.id !== id);
      fs.writeFileSync(MEDIA_FILE_PATH, JSON.stringify(filtered, null, 2), "utf8");
      return true;
    } catch (err) {
      console.error("Error deleting media item:", err);
      return false;
    }
  }
}
