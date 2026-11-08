"use client";

import React, { useState, useRef } from "react";
import {
  Settings,
  Save,
  Check,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Sparkles,
  Key,
  Copy,
  RefreshCw,
} from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

interface AdminGeneralViewProps {
  portfolioData: PortfolioData;
  onSaveGeneral: (updated: {
    fullName: string;
    professionalTitle: string;
    tagline: string;
  }) => Promise<void>;
  onExportJson: () => void;
  onImportJson: (imported: PortfolioData) => Promise<boolean>;
  onFactoryReset: () => Promise<void>;
  onConfirmReset: (message: string, onConfirm: () => void) => void;
  onOpenPasswordModal?: () => void;
}

export function AdminGeneralView({
  portfolioData,
  onSaveGeneral,
  onExportJson,
  onImportJson,
  onFactoryReset,
  onConfirmReset,
  onOpenPasswordModal,
}: AdminGeneralViewProps) {
  const { profile } = portfolioData;
  const [fullName, setFullName] = useState(profile.fullName);
  const [title, setTitle] = useState(profile.professionalTitle);
  const [tagline, setTagline] = useState(profile.tagline);
  const [resumePath, setResumePath] = useState("/M.Faiz.Resume.pdf");

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Recovery code generation state
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [recoveryError, setRecoveryError] = useState("");

  const handleGenerateRecoveryCode = async () => {
    setIsGeneratingCode(true);
    setRecoveryError("");
    try {
      const res = await fetch("/api/admin/auth/recovery/generate", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.success && data.code) {
        setGeneratedCode(data.code);
        setCodeCopied(false);
      } else {
        setRecoveryError(data.error || "Failed to generate recovery code.");
      }
    } catch {
      setRecoveryError("Network error while generating recovery code.");
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedCode) return;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(generatedCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 3000);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveGeneral({
        fullName,
        professionalTitle: title,
        tagline,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.profile || !json.projects || !json.experience) {
          setImportError("Invalid backup file: core portfolio structures missing.");
          return;
        }
        setImportError("");
        const success = await onImportJson(json);
        if (!success) {
          setImportError("Failed to save imported data to disk.");
        }
      } catch {
        setImportError("Failed to parse JSON file. Ensure it is valid JSON.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleResetClick = () => {
    onConfirmReset(
      "WARNING: This will reset all portfolio items, projects, and bio narratives back to the verified factory defaults from the CV. Are you sure you want to proceed?",
      async () => {
        await onFactoryReset();
      }
    );
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent-emerald" />
            General Settings & Data Maintenance
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Configure global website parameters, export/import JSON backups, or perform factory recovery.
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
          <span>{saveSuccess ? "Saved!" : isSaving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      {/* Global Identity Parameters */}
      <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-accent-emerald" />
          Global Identity Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Portfolio Owner Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Professional Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
            Global Executive Tagline
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
            Downloadable Resume PDF Link / File Path
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={resumePath}
              onChange={(e) => setResumePath(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
            />
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-surface border border-border-muted text-xs text-accent-emerald hover:bg-surface-hover transition-colors flex-shrink-0"
            >
              Test Link
            </a>
          </div>
        </div>
      </div>

      {/* Backup, Import & Recovery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup & Import */}
        <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
            <Download className="h-4 w-4 text-accent-emerald" />
            Data Backup & Portability
          </h3>
          <p className="text-xs text-content-secondary leading-relaxed">
            Download a full snapshot of your entire portfolio data as a JSON file, or restore from a previously exported backup file.
          </p>

          {importError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <span>{importError}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={onExportJson}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-content-primary bg-background-secondary hover:bg-background-tertiary border border-border-muted transition-colors shadow-sm"
            >
              <Download className="h-4 w-4 text-accent-emerald" />
              <span>Export All Data (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-content-primary bg-background-secondary hover:bg-background-tertiary border border-border-muted transition-colors shadow-sm"
            >
              <Upload className="h-4 w-4 text-accent-gold" />
              <span>Import Backup (JSON)</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileImport}
              className="hidden"
            />
          </div>
        </div>

        {/* Security & Access Management */}
        <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent-emerald" />
            Security &amp; Administrative Credentials
          </h3>
          <p className="text-xs text-content-secondary leading-relaxed">
            Manage your administrative password and single-use emergency recovery codes. Credentials are cryptographically hashed using salted scrypt keys and stored securely in persistent storage.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenPasswordModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-accent-emerald-light bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-all shadow-sm"
            >
              <Settings className="h-4 w-4" />
              <span>Change Administrator Password</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateRecoveryCode}
              disabled={isGeneratingCode}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/30 transition-all shadow-sm disabled:opacity-50"
            >
              <Key className="h-4 w-4" />
              <span>{isGeneratingCode ? "Generating..." : "Generate Emergency Recovery Code"}</span>
            </button>
          </div>

          {recoveryError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <span>{recoveryError}</span>
            </div>
          )}

          {generatedCode && (
            <div className="p-4 rounded-xl bg-accent-gold/10 border border-accent-gold/30 space-y-2.5 mt-3 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  New Single-Use Recovery Code
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-accent-gold text-background hover:bg-accent-gold-light transition-colors shadow-sm"
                >
                  {codeCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{codeCopied ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
              <div className="p-3 rounded-lg bg-background font-mono text-base font-bold text-accent-gold-light tracking-widest select-all text-center border border-border-muted">
                {generatedCode}
              </div>
              <p className="text-xs text-content-secondary leading-relaxed">
                <strong className="text-content-primary">Save this code in a secure password manager.</strong> It is displayed only once and will never be shown again. Generating a new code immediately revokes any previously generated recovery code.
              </p>
            </div>
          )}
        </div>

        {/* Factory Reset */}
        <div className="p-6 rounded-2xl bg-surface border border-red-500/20 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            Verified Factory Reset
          </h3>
          <p className="text-xs text-content-secondary leading-relaxed">
            Reset all portfolio content (projects, experience, education, skills, awards) to the exact verified defaults corroborated by Muhammad Faiz Waheed&apos;s CV.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-white bg-red-950/40 hover:bg-red-600 border border-red-500/30 transition-all shadow-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Entire Portfolio to Verified Default</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

