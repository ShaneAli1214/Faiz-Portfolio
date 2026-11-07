import crypto from "crypto";
import fs from "fs";
import path from "path";
import { withTimeout } from "@/lib/async-timeout";

export type StorageProvider = "cloudinary" | "netlify-blobs" | "local" | "base64";

export interface UploadResult {
  url: string;
  provider: StorageProvider;
  size: number;
  mimeType: string;
  name: string;
  id: string;
}

export class StorageService {
  /**
   * Determine available storage provider in order of preference:
   * 1. Cloudinary (if configured with API keys)
   * 2. Netlify Blobs (if running in Netlify production environment)
   * 3. Local Filesystem (if running in local dev / writeable disk)
   * 4. Base64 Data URL (safe resilient fallback when disk is read-only and no cloud credentials exist)
   */

  /**
   * Upload an image to the best available persistent storage
   */
  public static async uploadImage(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<UploadResult> {
    const ext = path.extname(fileName) || (mimeType === "image/png" ? ".png" : ".jpg");
    const baseClean = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const finalFilename = `${baseClean}-${uniqueSuffix}${ext}`;
    const id = `media-${uniqueSuffix}`;

    // 1. Try Cloudinary if environment variables are configured
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret) {
      try {
        const cloudinaryUrl = await this.uploadToCloudinary(fileBuffer, mimeType, finalFilename);
        if (cloudinaryUrl) {
          return {
            id,
            name: fileName,
            url: cloudinaryUrl,
            provider: "cloudinary",
            size: fileBuffer.length,
            mimeType,
          };
        }
      } catch (err) {
        console.warn("Cloudinary upload failed, attempting fallback storage:", err);
      }
    }

    // 2. Try Netlify Blobs if running on Netlify
    try {
      const netlifyUpload = async () => {
        const { getStore } = await import("@netlify/blobs");
        const siteID = process.env.NETLIFY_SITE_ID;
        const token = process.env.NETLIFY_AUTH_TOKEN;
        const store = siteID && token
          ? getStore({ name: "portfolio-media", siteID, token })
          : getStore({ name: "portfolio-media" });

        if (store) {
          const arrayBuf = new Uint8Array(fileBuffer).buffer;
          await store.set(finalFilename, arrayBuf, {
            metadata: {
              contentType: mimeType,
              originalName: fileName,
              size: fileBuffer.length.toString(),
              uploadedAt: new Date().toISOString(),
            },
          });

          return {
            id,
            name: fileName,
            url: `/api/media/${finalFilename}`,
            provider: "netlify-blobs" as StorageProvider,
            size: fileBuffer.length,
            mimeType,
          };
        }
        return null;
      };

      const result = await withTimeout(netlifyUpload(), 3000, null);
      if (result) {
        return result;
      }
    } catch {
      // Netlify Blobs not available in this context
    }

    // 3. Try Local Filesystem Storage (works on local dev / standard servers)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const destinationPath = path.join(uploadDir, finalFilename);
      fs.writeFileSync(destinationPath, fileBuffer);

      return {
        id,
        name: fileName,
        url: `/uploads/${finalFilename}`,
        provider: "local",
        size: fileBuffer.length,
        mimeType,
      };
    } catch (fsErr: any) {
      // Filesystem is read-only (e.g. AWS Lambda / Netlify read-only container)
      console.warn("Local filesystem is read-only (EROFS). Using Base64 persistent Data URL fallback:", fsErr?.message);
    }

    // 4. Base64 Data URL Fallback (guarantees zero upload failures on read-only serverless hosts)
    const base64 = fileBuffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return {
      id,
      name: fileName,
      url: dataUrl,
      provider: "base64",
      size: fileBuffer.length,
      mimeType,
    };
  }

  /**
   * Upload helper for Cloudinary REST API
   */
  private static async uploadToCloudinary(
    buffer: Buffer,
    mimeType: string,
    publicId: string
  ): Promise<string | null> {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) return null;

    const timestamp = Math.round(Date.now() / 1000);
    const cleanPublicId = path.basename(publicId, path.extname(publicId));
    const folder = "portfolio-faiz";

    // Build signature string (alphabetical order of parameters)
    const paramsToSign = `folder=${folder}&public_id=${cleanPublicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

    const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const formData = new URLSearchParams();
    formData.append("file", base64Data);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);
    formData.append("public_id", cleanPublicId);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Cloudinary API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    return data.secure_url || data.url;
  }

  /**
   * Fetch a blob from Netlify Blobs if requested via public route
   */
  public static async getNetlifyBlob(
    key: string
  ): Promise<{ data: ArrayBuffer; contentType: string } | null> {
    try {
      const fetchBlob = async () => {
        const { getStore } = await import("@netlify/blobs");
        const siteID = process.env.NETLIFY_SITE_ID;
        const token = process.env.NETLIFY_AUTH_TOKEN;
        const store = siteID && token
          ? getStore({ name: "portfolio-media", siteID, token })
          : getStore({ name: "portfolio-media" });

        if (!store) return null;

        const blob = await store.getWithMetadata(key, { type: "arrayBuffer" });
        if (!blob || !blob.data) return null;

        const contentType = (blob.metadata as any)?.contentType || "image/jpeg";
        return {
          data: blob.data,
          contentType,
        };
      };

      return await withTimeout(fetchBlob(), 2000, null);
    } catch {
      return null;
    }
  }
}
