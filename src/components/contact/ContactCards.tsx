"use client";

import React from "react";
import { ContactInfo } from "@/types/portfolio";
import { ContactLink } from "@/components/ui/ContactLink";
import { Mail, Phone, Linkedin, MapPin, ShieldCheck } from "lucide-react";

interface ContactCardsProps {
  contact: ContactInfo;
}

export const ContactCards: React.FC<ContactCardsProps> = ({ contact }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-content-primary">
          Direct Channels
        </h3>
        <span className="text-xs font-mono text-accent-emerald-light flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          Verified
        </span>
      </div>

      <div className="space-y-3">
        {/* Email Link */}
        <ContactLink
          icon={<Mail className="h-5 w-5" />}
          label="Email Address"
          value={contact.email}
          href={`mailto:${contact.email}`}
        />

        {/* Phone Link (Click to Call) */}
        <ContactLink
          icon={<Phone className="h-5 w-5" />}
          label="Direct Phone / WhatsApp"
          value={contact.phone}
          href={`tel:${contact.phone.replace(/\s+/g, "")}`}
        />

        {/* LinkedIn Link (Opens in New Tab) */}
        <ContactLink
          icon={<Linkedin className="h-5 w-5" />}
          label="LinkedIn Profile"
          value="linkedin.com/in/M.FaizWaheed"
          href={contact.linkedin}
          isExternal={true}
        />

        {/* Location Indicator */}
        {contact.location && (
          <div className="flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-background-secondary/60 border border-border-muted/60 text-content-secondary">
            <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center text-accent-gold border border-border-muted flex-shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-content-muted">
                Location Base
              </p>
              <p className="text-sm sm:text-base font-semibold text-content-primary">
                {contact.location}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

