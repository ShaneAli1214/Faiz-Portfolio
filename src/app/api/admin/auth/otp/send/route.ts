import { NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";

export async function POST() {
  try {
    const result = await AdminAuth.sendRecoveryOtpAsync();
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send verification code." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Verification code sent to registered administrator email (${result.maskedEmail}).`,
      maskedEmail: result.maskedEmail,
    });
  } catch (error) {
    console.error("Error in OTP send route:", error);
    return NextResponse.json(
      { error: "Failed to process OTP request." },
      { status: 500 }
    );
  }
}
