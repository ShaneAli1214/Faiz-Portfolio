import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const account = await AdminAuth.getAccountAsync();

    // 1. Check Rate Limiting Lockout
    const lockoutStatus = AdminAuth.isLockedOut(account);
    if (lockoutStatus.locked) {
      const minutes = Math.ceil(lockoutStatus.remainingSeconds / 60);
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Account temporarily locked for ${minutes} minute${minutes > 1 ? "s" : ""}.`,
          locked: true,
          remainingSeconds: lockoutStatus.remainingSeconds,
        },
        { status: 429 }
      );
    }

    // 2. Verify Scrypt Password
    const isValid = AdminAuth.verifyPasswordHash(password.trim(), account.passwordHash);

    if (!isValid) {
      const attemptResult = await AdminAuth.recordFailedAttemptAsync();
      if (attemptResult.locked) {
        return NextResponse.json(
          {
            error: "Too many failed login attempts. Account locked for 15 minutes.",
            locked: true,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `Invalid administrative credentials. ${attemptResult.remainingAttempts} attempt${attemptResult.remainingAttempts === 1 ? "" : "s"} remaining before temporary lockout.`,
          remainingAttempts: attemptResult.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // 3. Reset failed attempts on success
    await AdminAuth.recordSuccessfulLoginAsync();

    // 4. Create signed session token
    const token = AdminAuth.createSessionToken(account.username, account.mustChangePassword);

    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully.",
      user: "Muhammad Faiz Waheed (Admin)",
      mustChangePassword: account.mustChangePassword,
    });

    response.cookies.set({
      name: AdminAuth.getSessionCookieName(),
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
