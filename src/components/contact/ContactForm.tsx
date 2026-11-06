"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, RefreshCw } from "lucide-react";

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  botField: string; // Honeypot spam trap
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    botField: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g., name@domain.com).";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submission while already submitting
    if (status === "submitting") return;

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      // 1. Submit to Next.js API Route Handler
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setConfirmationId(result.inquiryId || `inq-${Date.now()}`);
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
          botField: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Failed to deliver message. Please verify your details or email faizwaheed9@gmail.com directly."
        );
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (err) {
      console.error("Submission network error:", err);
      setStatus("error");
      setErrorMessage(
        "Network connection error while delivering message. Please verify your connection or email faizwaheed9@gmail.com directly."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setConfirmationId(null);
    setErrorMessage(null);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-background-secondary via-[#0D151D] to-background-secondary border border-border-muted/80 p-6 sm:p-8 lg:p-9 shadow-card-elevation relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-content-primary tracking-tight">
            Send an Inquiry
          </h3>
          <p className="text-xs sm:text-sm text-content-secondary mt-1">
            Fill out the form below. Messages are validated, encrypted, and delivered directly.
          </p>
        </div>

        {/* Success State */}
        {status === "success" && (
          <div className="rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 p-6 text-center space-y-4 animate-in fade-in duration-300">
            <div className="h-14 w-14 mx-auto rounded-full bg-accent-emerald/20 border border-accent-emerald/40 flex items-center justify-center text-accent-emerald">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-content-primary">
                Message Delivered Successfully
              </h4>
              <p className="text-xs sm:text-sm text-content-secondary max-w-md mx-auto">
                Thank you for reaching out. Your message has been safely recorded and delivered.
                Muhammad Faiz Waheed will review your inquiry shortly.
              </p>
            </div>
            {confirmationId && (
              <div className="inline-block py-1 px-3 rounded-lg bg-background/60 border border-border-muted text-xs font-mono text-accent-emerald-light">
                Reference ID: <span className="font-semibold">{confirmationId}</span>
              </div>
            )}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover text-xs font-semibold text-content-primary border border-border-muted transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Send Another Message
              </button>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {status === "error" && errorMessage && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-300 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold block">Delivery Notice</strong>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Active Form (Hidden on Success) */}
        {status !== "success" && (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Hidden Netlify & Honeypot Fields */}
            <input type="hidden" name="form-name" value="contact" />
            <div className="hidden" aria-hidden="true">
              <label>
                Do not fill this out if human:
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-mono uppercase tracking-wider text-content-secondary font-medium"
                >
                  Full Name <span className="text-accent-emerald">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  disabled={status === "submitting"}
                  className={`w-full px-4 py-3 rounded-xl bg-background/70 border text-sm text-content-primary placeholder-content-muted focus:outline-none transition-colors ${
                    errors.fullName
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-border-muted/70 focus:border-accent-emerald/60 focus:ring-1 focus:ring-accent-emerald/30"
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-mono uppercase tracking-wider text-content-secondary font-medium"
                >
                  Email Address <span className="text-accent-emerald">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  disabled={status === "submitting"}
                  className={`w-full px-4 py-3 rounded-xl bg-background/70 border text-sm text-content-primary placeholder-content-muted focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-border-muted/70 focus:border-accent-emerald/60 focus:ring-1 focus:ring-accent-emerald/30"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                className="block text-xs font-mono uppercase tracking-wider text-content-secondary font-medium"
              >
                Subject <span className="text-accent-emerald">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Professional Engineering Opportunity / Sustainability Discussion"
                disabled={status === "submitting"}
                className={`w-full px-4 py-3 rounded-xl bg-background/70 border text-sm text-content-primary placeholder-content-muted focus:outline-none transition-colors ${
                  errors.subject
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-border-muted/70 focus:border-accent-emerald/60 focus:ring-1 focus:ring-accent-emerald/30"
                }`}
                required
              />
              {errors.subject && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="block text-xs font-mono uppercase tracking-wider text-content-secondary font-medium"
              >
                Message <span className="text-accent-emerald">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                disabled={status === "submitting"}
                className={`w-full px-4 py-3 rounded-xl bg-background/70 border text-sm text-content-primary placeholder-content-muted focus:outline-none transition-colors resize-y ${
                  errors.message
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-border-muted/70 focus:border-accent-emerald/60 focus:ring-1 focus:ring-accent-emerald/30"
                }`}
                required
              />
              {errors.message && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent-emerald hover:bg-accent-emerald-dark text-background font-bold text-sm shadow-emerald-subtle hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed border border-accent-emerald/40"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Delivering Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

