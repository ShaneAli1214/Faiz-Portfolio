import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";
import { MediaService, MediaItem } from "@/lib/media-service";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { imageUrl } = await req.json();

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.REMOVE_BG_API_KEY || process.env.PHOTOROOM_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          available: false,
          message:
            "Automated background removal requires an API key (e.g. remove.bg). Please configure REMOVE_BG_API_KEY in your .env.local file. Adaptive framing and manual positioning work automatically.",
        },
        { status: 200 }
      );
    }

    // Resolve local file path
    let localFilePath = "";
    if (imageUrl.startsWith("/")) {
      localFilePath = path.join(process.cwd(), "public", imageUrl.replace(/^\//, ""));
    }

    if (!fs.existsSync(localFilePath)) {
      return NextResponse.json(
        { error: "Original image file not found on server." },
        { status: 404 }
      );
    }

    // Read image buffer
    const imageBuffer = fs.readFileSync(localFilePath);
    const formData = new FormData();
    const blob = new Blob([imageBuffer]);
    formData.append("image_file", blob, path.basename(localFilePath));
    formData.append("size", "auto");

    // Call remove.bg official API
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("remove.bg API error:", errText);
      return NextResponse.json(
        {
          error: "Background removal provider returned an error.",
          details: errText,
        },
        { status: 502 }
      );
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());

    // Generate output filename
    const originalExt = path.extname(localFilePath);
    const originalBase = path.basename(localFilePath, originalExt);
    const outputFilename = `${originalBase}-nobg-${Date.now()}.png`;
    const outputPath = path.join(UPLOAD_DIR, outputFilename);

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    fs.writeFileSync(outputPath, resultBuffer);

    const processedUrl = `/uploads/${outputFilename}`;
    const newMedia: MediaItem = {
      id: `media-nobg-${Date.now()}`,
      name: `${originalBase} (Transparent Cutout)`,
      url: processedUrl,
      size: resultBuffer.length,
      type: "image/png",
      uploadedAt: new Date().toISOString(),
      category: "profile",
    };

    MediaService.addMediaItem(newMedia);

    return NextResponse.json({
      success: true,
      available: true,
      processedUrl,
      media: newMedia,
      message: "Background successfully removed. Transparent cutout saved.",
    });
  } catch (error) {
    console.error("Error in remove-bg route:", error);
    return NextResponse.json(
      { error: "Internal server error during background removal." },
      { status: 500 }
    );
  }
}

