"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  X,
  Sparkles,
  Inbox,
  Check,
} from "lucide-react";
import { ContactInquiry } from "@/types/portfolio";

interface AdminMessagesViewProps {
  inquiries: ContactInquiry[];
  onToggleStatus: (id: string, currentStatus: string) => Promise<void>;
  onDeleteInquiry: (id: string) => Promise<void>;
  onConfirmDelete: (title: string, onConfirm: () => void) => void;
}

export function AdminMessagesView({
  inquiries,
  onToggleStatus,
  onDeleteInquiry,
  onConfirmDelete,
}: AdminMessagesViewProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter === "unread") return inq.status === "unread";
    if (filter === "read") return inq.status === "read";
    return true;
  });

  const unreadCount = inquiries.filter((i) => i.status === "unread").length;

  const handleOpenMessage = async (inq: ContactInquiry) => {
    setSelectedInquiry(inq);
    if (inq.status === "unread") {
      await onToggleStatus(inq.id, inq.status);
    }
  };

  const handleDelete = (inq: ContactInquiry) => {
    onConfirmDelete(`Delete inquiry from "${inq.fullName}" (${inq.email})?`, async () => {
      if (selectedInquiry?.id === inq.id) {
        setSelectedInquiry(null);
      }
      await onDeleteInquiry(inq.id);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent-emerald" />
            Contact Form Inquiries ({inquiries.length})
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Recruiter requests, technical collaborations, and business correspondence received from the public Contact page.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-background-secondary p-1 rounded-xl border border-border-subtle">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === "all"
                ? "bg-surface text-accent-emerald shadow-sm"
                : "text-content-muted hover:text-content-primary"
            }`}
          >
            All ({inquiries.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === "unread"
                ? "bg-surface text-accent-gold shadow-sm"
                : "text-content-muted hover:text-content-primary"
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-accent-gold text-background">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setFilter("read")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === "read"
                ? "bg-surface text-content-primary shadow-sm"
                : "text-content-muted hover:text-content-primary"
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {/* Message List */}
      {filteredInquiries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-surface border border-border-muted text-content-muted space-y-2">
          <Inbox className="h-8 w-8 mx-auto text-content-muted/50" />
          <p className="text-sm">No messages found in this view.</p>
          <p className="text-xs">Visitor submissions from the Contact form will be stored here in real-time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInquiries.map((inq) => {
            const isUnread = inq.status === "unread";
            return (
              <div
                key={inq.id}
                className={`p-4 sm:p-5 rounded-2xl bg-surface border transition-all ${
                  isUnread
                    ? "border-accent-emerald/40 bg-accent-emerald/5 shadow-sm"
                    : "border-border-muted hover:border-border-subtle"
                } flex flex-col md:flex-row md:items-center justify-between gap-4`}
              >
                <div
                  onClick={() => handleOpenMessage(inq)}
                  className="space-y-1.5 flex-1 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-content-primary">
                      {inq.fullName}
                    </span>
                    <span className="text-xs text-content-muted font-mono">
                      &lt;{inq.email}&gt;
                    </span>
                    {isUnread && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-emerald/20 text-accent-emerald-light border border-accent-emerald/30">
                        New / Unread
                      </span>
                    )}
                    <span className="text-[11px] text-content-muted flex items-center gap-1 ml-auto md:ml-0">
                      <Clock className="h-3 w-3" />
                      {new Date(inq.submittedAt).toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-content-primary">
                    {inq.subject}
                  </h3>

                  <p className="text-xs text-content-secondary line-clamp-1">
                    {inq.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-border-subtle">
                  <a
                    href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Reply</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onToggleStatus(inq.id, inq.status)}
                    className="p-2 rounded-xl text-content-muted hover:text-content-primary hover:bg-surface-hover text-xs transition-colors"
                    title={isUnread ? "Mark as Read" : "Mark as Unread"}
                  >
                    <CheckCircle2 className={`h-4 w-4 ${isUnread ? "text-accent-emerald" : ""}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(inq)}
                    className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/40 text-xs transition-colors"
                    title="Delete inquiry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Message Viewer Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up">
          <div className="w-full max-w-xl rounded-2xl bg-surface border border-border-muted shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-border-muted pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent-emerald font-semibold">
                  Inquiry Details
                </span>
                <h3 className="text-lg font-bold text-content-primary mt-0.5">
                  {selectedInquiry.subject}
                </h3>
                <p className="text-xs text-content-secondary">
                  From: <strong className="text-content-primary">{selectedInquiry.fullName}</strong> ({selectedInquiry.email})
                </p>
                <p className="text-[11px] text-content-muted mt-0.5">
                  Received: {new Date(selectedInquiry.submittedAt).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Body */}
            <div className="p-4 rounded-xl bg-background-secondary border border-border-subtle max-h-72 overflow-y-auto">
              <p className="text-xs text-content-primary leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border-muted">
              <button
                type="button"
                onClick={() => handleDelete(selectedInquiry)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-content-secondary hover:text-content-primary hover:bg-surface-hover border border-border-muted transition-colors"
                >
                  Close
                </button>

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-md shadow-accent-emerald/20"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

