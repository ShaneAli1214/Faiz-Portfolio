import { NextResponse } from "next/server";
import { AdminAuth } from "@/lib/auth";

export async function GET() {
  const isAuth = AdminAuth.isAuthenticated();
  if (isAuth) {
    const mustChange = AdminAuth.sessionMustChangePassword();
    return NextResponse.json({
      authenticated: true,
      user: "Muhammad Faiz Waheed",
      role: "Portfolio Owner / Administrator",
      mustChangePassword: mustChange,
    });
  }

  return NextResponse.json(
    { authenticated: false, message: "Not authenticated" },
    { status: 401 }
  );
}
