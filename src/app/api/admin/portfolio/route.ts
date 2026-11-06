import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";
import { PortfolioService } from "@/lib/portfolio-service";
import { PortfolioData } from "@/types/portfolio";

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
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const updatedData: PortfolioData = await req.json();

    if (!updatedData.profile || !updatedData.projects || !updatedData.experience) {
      return NextResponse.json(
        { error: "Invalid portfolio structure. Required core fields are missing." },
        { status: 400 }
      );
    }

    const saved = await PortfolioService.savePortfolioDataAsync(updatedData);
    if (!saved) {
      return NextResponse.json(
        { error: "Failed to write changes to persistent storage." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio data successfully saved to persistent storage.",
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
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body.action === "reset") {
      const resetSuccess = await PortfolioService.resetToDefaultAsync();
      if (!resetSuccess) {
        return NextResponse.json({ error: "Failed to reset portfolio" }, { status: 500 });
      }
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
      const saved = await PortfolioService.savePortfolioDataAsync(body.data);
      if (!saved) {
        return NextResponse.json({ error: "Failed to import portfolio data" }, { status: 500 });
      }
      const data = await PortfolioService.getPortfolioDataAsync();
      return NextResponse.json({
        success: true,
        message: "Backup successfully imported.",
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

