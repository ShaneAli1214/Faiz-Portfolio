import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { AdminAuth } from "@/lib/auth";
import { PortfolioService } from "@/lib/portfolio-service";
import { PortfolioData } from "@/types/portfolio";

function purgePublicCaches() {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/experience");
    revalidatePath("/projects");
    revalidatePath("/education");
    revalidatePath("/skills");
    revalidatePath("/achievements");
    revalidatePath("/leadership");
    revalidatePath("/contact");
  } catch (err) {
    console.warn("Notice: Next.js revalidatePath:", err);
  }
}

export async function GET() {
  try {
    const data = await PortfolioService.getPortfolioDataAsync();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to load portfolio content" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access: Please log in as administrator." }, { status: 401 });
  }

  try {
    const updatedData: PortfolioData = await req.json();

    if (!updatedData.profile || !updatedData.projects || !updatedData.experience) {
      return NextResponse.json(
        { error: "Invalid portfolio structure. Required core fields are missing." },
        { status: 400 }
      );
    }

    const saveResult = await PortfolioService.savePortfolioDataAsync(updatedData);
    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.error || "Failed to write changes to persistent storage." },
        { status: 500 }
      );
    }

    purgePublicCaches();

    return NextResponse.json({
      success: true,
      message: "Portfolio data successfully saved to persistent storage and published live.",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to parse portfolio payload." },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access: Please log in as administrator." }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body.action === "reset") {
      const resetSuccess = await PortfolioService.resetToDefaultAsync();
      if (!resetSuccess) {
        return NextResponse.json({ error: "Failed to reset portfolio" }, { status: 500 });
      }
      purgePublicCaches();
      const data = await PortfolioService.getPortfolioDataAsync();
      return NextResponse.json({
        success: true,
        message: "Portfolio successfully reset to verified default data.",
        data,
      });
    }

    if (body.action === "import") {
      if (!body.data || typeof body.data !== "object") {
        return NextResponse.json({ error: "No valid JSON data provided for import." }, { status: 400 });
      }
      const saveResult = await PortfolioService.savePortfolioDataAsync(body.data);
      if (!saveResult.success) {
        return NextResponse.json({ error: saveResult.error || "Failed to import portfolio data" }, { status: 500 });
      }
      purgePublicCaches();
      const data = await PortfolioService.getPortfolioDataAsync();
      return NextResponse.json({
        success: true,
        message: "Backup successfully imported and published live.",
        data,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Portfolio action error:", error);
    return NextResponse.json(
      { error: "Failed to execute portfolio operation" },
      { status: 500 }
    );
  }
}
