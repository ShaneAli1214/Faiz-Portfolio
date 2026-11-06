import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";
import { MediaService, MediaItem } from "@/lib/media-service";
import { StorageService } from "@/lib/storage-service";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function GET() {
  const list = MediaService.getMediaList();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as any) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file format (${file.type}). Please upload PNG, JPG, or WebP images.` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 5MB size limit. Please upload a compressed image." },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload using StorageService (supports Cloudinary, Netlify Blobs, local disk, or resilient base64)
    const uploadResult = await StorageService.uploadImage(buffer, file.name, file.type);

    const newMedia: MediaItem = {
      id: uploadResult.id,
      name: uploadResult.name,
      url: uploadResult.url,
      size: uploadResult.size,
      type: uploadResult.mimeType,
      uploadedAt: new Date().toISOString(),
      category: ["profile", "project", "achievement", "general"].includes(category)
        ? category
        : "general",
    };

    MediaService.addMediaItem(newMedia);

    return NextResponse.json({
      success: true,
      message: `Image uploaded successfully via ${uploadResult.provider}.`,
      media: newMedia,
      provider: uploadResult.provider,
    });
  } catch (error: any) {
    console.error("Media upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload file to storage." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      const body = await req.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json({ error: "Media ID required" }, { status: 400 });
    }

    const success = MediaService.deleteMediaItem(id);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete media or media not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Media item deleted successfully.",
    });
  } catch (error) {
    console.error("Media deletion error:", error);
    return NextResponse.json({ error: "Failed to delete image." }, { status: 500 });
  }
}

