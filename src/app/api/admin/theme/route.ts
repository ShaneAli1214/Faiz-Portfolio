import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
    return NextResponse.json({ error: "Unauthorized access: Please log in as administrator." }, { status: 401 });
  }

  try {
    const updatedTheme: ThemeConfig = await req.json();
    const result = await ThemeService.saveThemeAsync(updatedTheme);

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to save theme" }, { status: 500 });
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
    } catch (revalErr) {
      console.warn("Theme revalidate notice:", revalErr);
    }

    return NextResponse.json({
      success: true,
      message: "Theme settings updated successfully and published live.",
      theme: updatedTheme,
    });
  } catch (error) {
    console.error("Theme update error:", error);
    return NextResponse.json({ error: "Invalid theme data payload" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access: Please log in as administrator." }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (body.action === "reset") {
      const resetTheme = await ThemeService.resetToDefaultAsync();
      try {
        revalidatePath("/", "layout");
      } catch {}
      return NextResponse.json({
        success: true,
        message: "Theme reset to default successfully and published live.",
        theme: resetTheme,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Theme action error:", error);
    return NextResponse.json({ error: "Failed to process theme action" }, { status: 500 });
  }
}
