import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { recoveryCode, newPassword } = body;

    if (!recoveryCode || typeof recoveryCode !== "string") {
      return NextResponse.json(
        { error: "Recovery code is required." },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { error: "New password is required." },
        { status: 400 }
      );
    }

    const result = await AdminAuth.resetWithRecoveryCodeAsync(recoveryCode, newPassword);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Invalid recovery code." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset password." },
      { status: 500 }
    );
  }
}

