import { NextRequest, NextResponse } from "next/server";
import { StorageService } from "@/lib/storage-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string } }
) {
  const { key } = params;

  if (!key) {
    return new NextResponse("Missing image key", { status: 400 });
  }

  const blob = await StorageService.getNetlifyBlob(key);

  if (!blob) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(blob.data, {
    status: 200,
    headers: {
      "Content-Type": blob.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

