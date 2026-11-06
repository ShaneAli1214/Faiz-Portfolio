import { cookies } from "next/headers";

const ADMIN_PASSWORD_DEFAULT = "FaizWaheed@2026";
const SESSION_COOKIE_NAME = "faiz_admin_session";
// Simple secure token based on session secret
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "faiz_waheed_cms_auth_secret_token_2026";

export class AdminAuth {
  public static verifyPassword(password: string): boolean {
    const configuredPassword = process.env.ADMIN_PASSWORD || ADMIN_PASSWORD_DEFAULT;
    return password === configuredPassword;
  }

  public static getExpectedToken(): string {
    return Buffer.from(`admin:${SESSION_SECRET}`).toString("base64");
  }

  public static isValidToken(token: string | undefined): boolean {
    if (!token) return false;
    return token === this.getExpectedToken();
  }

  public static isAuthenticated(): boolean {
    try {
      const cookieStore = cookies();
      const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
      return this.isValidToken(sessionCookie?.value);
    } catch {
      return false;
    }
  }

  public static getSessionCookieName(): string {
    return SESSION_COOKIE_NAME;
  }
}

