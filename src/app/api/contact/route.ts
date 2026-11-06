import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ContactInquiry } from "@/types/portfolio";

// Path to persistent inquiries data store
const INQUIRIES_FILE_PATH = path.join(process.cwd(), "src", "data", "inquiries.json");

/**
 * Helper to safely read existing inquiries
 */
function getStoredInquiries(): ContactInquiry[] {
  try {
    if (!fs.existsSync(INQUIRIES_FILE_PATH)) {
      return [];
    }
    const fileData = fs.readFileSync(INQUIRIES_FILE_PATH, "utf8");
    return JSON.parse(fileData) as ContactInquiry[];
  } catch (err) {
    console.error("Error reading inquiries file:", err);
    return [];
  }
}

/**
 * Helper to safely save new inquiry
 */
function saveInquiry(inquiry: ContactInquiry): boolean {
  try {
    const inquiries = getStoredInquiries();
    inquiries.unshift(inquiry); // Add latest first
    try {
      const dir = path.dirname(INQUIRIES_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(INQUIRIES_FILE_PATH, JSON.stringify(inquiries, null, 2), "utf8");
    } catch (fsErr: any) {
      console.warn("Notice: Inquiries disk is read-only (EROFS):", fsErr?.message);
    }
    return true;
  } catch (err) {
    console.error("Error saving inquiry:", err);
    return false;
  }
}

/**
 * POST /api/contact
 * Handles contact message submissions with validation, honeypot spam protection,
 * and persistent storage ready for Admin Panel retrieval.
 */
export async function POST(request: Request) {
  try {
    let body: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        botField: formData.get("botField") || formData.get("company_website"),
      };
    } else {
      body = await request.json().catch(() => ({}));
    }

    const { fullName, email, subject, message, botField } = body;

    // 1. Honeypot check: If the hidden honeypot field is filled, silently discard (bot trap)
    if (botField && String(botField).trim() !== "") {
      return NextResponse.json(
        {
          success: true,
          message: "Message processed successfully.",
        },
        { status: 200 }
      );
    }

    // 2. Server-side validation
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      errors.subject = "Please enter a subject (minimum 3 characters).";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Please enter your message (minimum 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
        },
        { status: 400 }
      );
    }

    // 3. Create persistent inquiry record
    const inquiryId = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newInquiry: ContactInquiry = {
      id: inquiryId,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      submittedAt: new Date().toISOString(),
      status: "unread",
    };

    saveInquiry(newInquiry);

    // Also log in server console for diagnostic observability
    console.log(`[Contact Form Received] ID: ${inquiryId} From: ${newInquiry.fullName} <${newInquiry.email}> Subject: "${newInquiry.subject}"`);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. Your message has been received.",
        inquiryId,
        submittedAt: newInquiry.submittedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while sending your message. Please try again or email faizwaheed9@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Endpoint status check
 */
export async function GET() {
  return NextResponse.json({
    status: "operational",
    service: "Muhammad Faiz Waheed Portfolio Contact Service",
    endpoints: {
      post: "POST /api/contact (Full Name, Email, Subject, Message)",
    },
  });
}

