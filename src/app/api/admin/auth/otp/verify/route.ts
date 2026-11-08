import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { otp, newPassword } = body;

    if (!otp || typeof otp !== "string") {
      return NextResponse.json(
        { error: "6-digit verification code is required." },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { error: "New password is required." },
        { status: 400 }
      );
    }

    const result = await AdminAuth.verifyOtpAndResetPasswordAsync(otp, newPassword);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to verify code." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Error in OTP verify route:", error);
    return NextResponse.json(
      { error: "Failed to verify code and reset password." },
      { status: 500 }
    );
  }
}
