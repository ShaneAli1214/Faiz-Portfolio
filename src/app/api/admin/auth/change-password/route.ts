import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!AdminAuth.isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { currentPassword, newPassword } = body;

    if (!currentPassword || typeof currentPassword !== "string") {
      return NextResponse.json(
        { error: "Current password is required." },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { error: "New password is required." },
        { status: 400 }
      );
    }

    const result = await AdminAuth.changePasswordAsync(currentPassword, newPassword);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update password." },
        { status: 400 }
      );
    }

    // Refresh session cookie with mustChangePassword = false
    const account = await AdminAuth.getAccountAsync();
    const token = AdminAuth.createSessionToken(account.username, false);

    const response = NextResponse.json({
      success: true,
      message: "Password changed successfully. Your administrative credentials are updated.",
    });

    response.cookies.set({
      name: AdminAuth.getSessionCookieName(),
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Internal server error while changing password." },
      { status: 500 }
    );
  }
}

