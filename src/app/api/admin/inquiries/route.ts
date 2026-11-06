import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { ContactInquiry } from "@/types/portfolio";

const INQUIRIES_FILE_PATH = path.join(process.cwd(), "src", "data", "inquiries.json");

async function getStoredInquiriesAsync(): Promise<ContactInquiry[]> {
  try {
    const { getStore } = await import("@netlify/blobs");
    const siteID = process.env.NETLIFY_SITE_ID;
    const token = process.env.NETLIFY_AUTH_TOKEN;
    const store = siteID && token
      ? getStore({ name: "portfolio-inquiries", siteID, token, consistency: "strong" })
      : getStore({ name: "portfolio-inquiries", consistency: "strong" });

    if (store) {
      const stored = await store.get("inquiries-list", { type: "json" });
      if (Array.isArray(stored)) {
        return stored as ContactInquiry[];
      }
    }
  } catch {
    // Blobs not available
  }

  try {
    if (!fs.existsSync(INQUIRIES_FILE_PATH)) {
      return [];
    }
    const fileData = fs.readFileSync(INQUIRIES_FILE_PATH, "utf8");
    return JSON.parse(fileData) as ContactInquiry[];
  } catch (err) {
    console.error("Error reading inquiries file:", err);
    return [];
  }
}

async function writeStoredInquiriesAsync(inquiries: ContactInquiry[]): Promise<boolean> {
  // 1. Netlify Blobs
  try {
    const { getStore } = await import("@netlify/blobs");
    const siteID = process.env.NETLIFY_SITE_ID;
    const token = process.env.NETLIFY_AUTH_TOKEN;
    const store = siteID && token
      ? getStore({ name: "portfolio-inquiries", siteID, token, consistency: "strong" })
      : getStore({ name: "portfolio-inquiries", consistency: "strong" });

    if (store) {
      await store.setJSON("inquiries-list", inquiries);
    }
  } catch (err: any) {
    console.warn("Notice: Netlify Blobs inquiries store not available:", err?.message);
  }

  // 2. Disk
  try {
    const dir = path.dirname(INQUIRIES_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(INQUIRIES_FILE_PATH, JSON.stringify(inquiries, null, 2), "utf8");
    return true;
  } catch (fsErr: any) {
    console.warn("Notice: Inquiries disk is read-only (EROFS):", fsErr?.message);
    return true;
  }
}

export async function GET() {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const inquiries = await getStoredInquiriesAsync();
  return NextResponse.json(inquiries, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

export async function PATCH(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !["read", "unread"].includes(status)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const inquiries = await getStoredInquiriesAsync();
    const target = inquiries.find((i) => i.id === id);
    if (!target) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    target.status = status;
    await writeStoredInquiriesAsync(inquiries);

    return NextResponse.json({
      success: true,
      message: `Inquiry marked as ${status}.`,
      inquiry: target,
    });
  } catch (error) {
    console.error("Inquiry patch error:", error);
    return NextResponse.json({ error: "Failed to update inquiry." }, { status: 500 });
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
      return NextResponse.json({ error: "Inquiry ID required" }, { status: 400 });
    }

    const inquiries = await getStoredInquiriesAsync();
    const filtered = inquiries.filter((i) => i.id !== id);

    if (filtered.length === inquiries.length) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    await writeStoredInquiriesAsync(filtered);

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Inquiry deletion error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry." }, { status: 500 });
  }
}
