"use client";

import React, { useState } from "react";
import {
  Users,
  Save,
  Check,
  Plus,
  Trash2,
  HeartHandshake,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { LeadershipItem, CommunityServiceItem } from "@/types/portfolio";

interface AdminLeadershipViewProps {
  leadership: LeadershipItem[];
  communityService: CommunityServiceItem[];
  onSaveLeadership: (payload: {
    leadership: LeadershipItem[];
    communityService: CommunityServiceItem[];
  }) => Promise<void>;
}

export function AdminLeadershipView({
  leadership: initialLeadership,
  communityService: initialCommunity,
  onSaveLeadership,
}: AdminLeadershipViewProps) {
  const [leadership, setLeadership] = useState<LeadershipItem[]>([...initialLeadership]);
  const [community, setCommunity] = useState<CommunityServiceItem[]>([...initialCommunity]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveLeadership({
        leadership,
        communityService: community,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <Users className="h-5 w-5 text-accent-emerald" />
            Leadership & Community Impact Manager
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage student chapter executive roles, Thar water pump fundraising, and humanitarian contributions.
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
          <span>{saveSuccess ? "Leadership Saved!" : isSaving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      {/* Leadership Roles */}
      <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-emerald" />
              Leadership Roles ({leadership.length})
            </h3>
            <p className="text-[11px] text-content-muted">
              Executive responsibilities in professional societies and campus organizations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newRole: LeadershipItem = {
                id: `lead-${Date.now()}`,
                role: "Director / Lead",
                organization: "AIChE NUST Chapter",
                duration: "2023 – 2024",
                responsibilities: ["Led organizational planning and member engagement."],
                verified: true,
              };
              setLeadership([...leadership, newRole]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Role</span>
          </button>
        </div>

        <div className="space-y-4">
          {leadership.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-3 relative"
            >
              <button
                type="button"
                onClick={() => setLeadership(leadership.filter((_, i) => i !== idx))}
                className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                title="Delete role"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-6">
                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Role Title</label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => {
                      const copy = [...leadership];
                      copy[idx].role = e.target.value;
                      setLeadership(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Organization</label>
                  <input
                    type="text"
                    value={item.organization}
                    onChange={(e) => {
                      const copy = [...leadership];
                      copy[idx].organization = e.target.value;
                      setLeadership(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Duration / Period</label>
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => {
                      const copy = [...leadership];
                      copy[idx].duration = e.target.value;
                      setLeadership(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-content-muted uppercase">
                  Responsibilities (Comma or Semicolon separated)
                </label>
                <textarea
                  rows={2}
                  value={item.responsibilities.join("; ")}
                  onChange={(e) => {
                    const copy = [...leadership];
                    copy[idx].responsibilities = e.target.value
                      .split(";")
                      .map((r) => r.trim())
                      .filter(Boolean);
                    setLeadership(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-secondary leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Service Section */}
      <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-accent-gold" />
              Community & Social Impact Initiatives ({community.length})
            </h3>
            <p className="text-[11px] text-content-muted">
              Fundraising initiatives and humanitarian projects with verified metrics.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newComm: CommunityServiceItem = {
                id: `comm-${Date.now()}`,
                title: "Humanitarian Drive",
                organization: "Community Service Drive",
                duration: "2024",
                summary: "Fundraising and resource mobilization initiative.",
                impactMetrics: [
                  { label: "Funds Raised", value: "PKR 30,000", detail: "Verified metric" },
                ],
                activities: ["Mobilized donors", "Coordinated installation"],
                verified: true,
              };
              setCommunity([...community, newComm]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/30 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Initiative</span>
          </button>
        </div>

        <div className="space-y-4">
          {community.map((comm, cIdx) => (
            <div
              key={comm.id || cIdx}
              className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-3 relative"
            >
              <button
                type="button"
                onClick={() => setCommunity(community.filter((_, i) => i !== cIdx))}
                className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                title="Delete initiative"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-6">
                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Initiative Title</label>
                  <input
                    type="text"
                    value={comm.title}
                    onChange={(e) => {
                      const copy = [...community];
                      copy[cIdx].title = e.target.value;
                      setCommunity(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Organization / Banner</label>
                  <input
                    type="text"
                    value={comm.organization}
                    onChange={(e) => {
                      const copy = [...community];
                      copy[cIdx].organization = e.target.value;
                      setCommunity(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Period</label>
                  <input
                    type="text"
                    value={comm.duration}
                    onChange={(e) => {
                      const copy = [...community];
                      copy[cIdx].duration = e.target.value;
                      setCommunity(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-content-muted uppercase">Summary</label>
                <textarea
                  rows={2}
                  value={comm.summary}
                  onChange={(e) => {
                    const copy = [...community];
                    copy[cIdx].summary = e.target.value;
                    setCommunity(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-secondary leading-relaxed"
                />
              </div>

              {/* Impact Metric */}
              <div className="p-3 rounded-lg bg-surface border border-border-muted space-y-2">
                <p className="text-[10px] font-bold text-accent-gold uppercase tracking-wider">
                  Verified Quantitative Impact
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-content-muted uppercase">Metric Label</label>
                    <input
                      type="text"
                      value={comm.impactMetrics?.[0]?.label || "Impact"}
                      onChange={(e) => {
                        const copy = [...community];
                        if (!copy[cIdx].impactMetrics) copy[cIdx].impactMetrics = [{ label: "", value: "" }];
                        copy[cIdx].impactMetrics[0].label = e.target.value;
                        setCommunity(copy);
                      }}
                      className="w-full px-2 py-1 rounded bg-background-secondary border border-border-muted text-xs text-content-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-content-muted uppercase">Verified Value</label>
                    <input
                      type="text"
                      value={comm.impactMetrics?.[0]?.value || "PKR 30,000"}
                      onChange={(e) => {
                        const copy = [...community];
                        if (!copy[cIdx].impactMetrics) copy[cIdx].impactMetrics = [{ label: "", value: "" }];
                        copy[cIdx].impactMetrics[0].value = e.target.value;
                        setCommunity(copy);
                      }}
                      className="w-full px-2 py-1 rounded bg-background-secondary border border-border-muted text-xs text-accent-gold-light font-bold font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

