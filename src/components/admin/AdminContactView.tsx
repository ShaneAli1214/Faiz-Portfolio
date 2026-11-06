"use client";

import React, { useState } from "react";
import {
  Mail,
  Save,
  Check,
  Phone,
  Linkedin,
  MapPin,
  Sparkles,
  Send,
} from "lucide-react";
import { ContactInfo } from "@/types/portfolio";

interface AdminContactViewProps {
  contactInfo: ContactInfo;
  onSaveContact: (updated: ContactInfo) => Promise<void>;
}

export function AdminContactView({
  contactInfo: initialContact,
  onSaveContact,
}: AdminContactViewProps) {
  const [contact, setContact] = useState<ContactInfo>({ ...initialContact });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveContact(contact);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <Mail className="h-5 w-5 text-accent-emerald" />
            Contact Information & Inquiry Channels
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Configure verified communication channels, phone number, LinkedIn handle, and inquiry availability.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20 disabled:opacity-50"
        >
          {isSaving ? (
            <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
          ) : saveSuccess ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{saveSuccess ? "Contact Saved!" : isSaving ? "Saving..." : "Save Contact Info"}</span>
        </button>
      </div>

      {/* Main Form */}
      <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted">
          Direct Communication Channels
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Primary Verified Email *
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 text-accent-emerald absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Phone / Direct WhatsApp *
            </label>
            <div className="relative">
              <Phone className="h-4 w-4 text-accent-emerald absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              LinkedIn Profile URL *
            </label>
            <div className="relative">
              <Linkedin className="h-4 w-4 text-accent-emerald absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={contact.linkedin}
                onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Current Location
            </label>
            <div className="relative">
              <MapPin className="h-4 w-4 text-accent-emerald absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={contact.location || ""}
                onChange={(e) => setContact({ ...contact, location: e.target.value })}
                placeholder="Islamabad / Lahore, Pakistan"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
            Availability Status Message
          </label>
          <input
            type="text"
            value={contact.availability || ""}
            onChange={(e) => setContact({ ...contact, availability: e.target.value })}
            placeholder="Open to select international and corporate engineering & sustainability opportunities"
            className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
            Contact Page Subtitle / Invitation Note
          </label>
          <textarea
            rows={3}
            value={contact.introDescription || ""}
            onChange={(e) => setContact({ ...contact, introDescription: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
            Areas of Professional Availability (Comma-separated)
          </label>
          <input
            type="text"
            value={contact.availabilityAreas ? contact.availabilityAreas.join(", ") : ""}
            onChange={(e) =>
              setContact({
                ...contact,
                availabilityAreas: e.target.value.split(",").map((a) => a.trim()).filter(Boolean),
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
            placeholder="Circular Economy Advisory, Sustainable Supply Chain, Project Monitoring (Primavera P6), ESG Compliance"
          />
        </div>
      </div>
    </div>
  );
}

