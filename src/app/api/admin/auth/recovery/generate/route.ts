import { NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";

export async function POST() {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const result = await AdminAuth.generateEmergencyRecoveryCodeAsync();
    if (!result.success || !result.code) {
      return NextResponse.json(
        { error: result.error || "Failed to generate recovery code." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "New emergency recovery code generated successfully.",
      code: result.code,
    });
  } catch (error) {
    console.error("Error generating recovery code:", error);
    return NextResponse.json(
      { error: "Failed to generate emergency recovery code." },
      { status: 500 }
    );
  }
}
