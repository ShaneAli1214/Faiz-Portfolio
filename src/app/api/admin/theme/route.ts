import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";
import { ThemeService, ThemeConfig } from "@/lib/theme-service";

export async function GET() {
  const theme = await ThemeService.getThemeAsync();
  return NextResponse.json(theme, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  });
}

export async function PUT(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const updatedTheme: ThemeConfig = await req.json();
    const success = await ThemeService.saveThemeAsync(updatedTheme);

    if (!success) {
      return NextResponse.json({ error: "Failed to save theme" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Theme settings updated successfully.",
      theme: updatedTheme,
    });
  } catch (error) {
    console.error("Theme update error:", error);
    return NextResponse.json({ error: "Invalid theme data payload" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (body.action === "reset") {
      const resetTheme = await ThemeService.resetToDefaultAsync();
      return NextResponse.json({
        success: true,
        message: "Theme reset to default successfully.",
        theme: resetTheme,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Theme action error:", error);
    return NextResponse.json({ error: "Failed to process theme action" }, { status: 500 });
  }
}

