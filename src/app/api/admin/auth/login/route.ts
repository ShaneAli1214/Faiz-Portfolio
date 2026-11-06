import { NextRequest, NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (!AdminAuth.verifyPassword(password.trim())) {
      return NextResponse.json(
        { error: "Invalid administrative credentials." },
        { status: 401 }
      );
    }

    const token = AdminAuth.getExpectedToken();
    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully.",
      user: "Muhammad Faiz Waheed (Admin)",
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

