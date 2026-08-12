"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import UploadZone from "@/components/upload/UploadZone";
import BuilderPreview from "@/components/builder/BuilderPreview";
import Footer from "@/components/shared/Footer";

type AppStep = "form" | "preview";

export default function BuildPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [stack, setStack] = useState<string>("");
  const [step, setStep] = useState<AppStep>("form");

  const handlePhotoChange = (file: File | null) => {
    setPhoto(file);
  };

  const handleBuildId = (e: React.FormEvent) => {
    e.preventDefault();
    if (photo && name.trim() && role.trim()) {
      setStep("preview");
    }
  };

  const isSubmitDisabled = !photo || !name.trim() || !role.trim();

  return (
    <div className="flex flex-col min-h-screen bg-teal-deep text-warm-white font-sans selection:bg-warm-white selection:text-teal-deep overflow-x-hidden">
      {/* Floating Island Header */}
      <header className="w-full max-w-7xl mx-auto px-6 pt-4 sm:pt-6 relative z-30">
        <div className="w-full backdrop-blur-md bg-teal-deep/40 border border-warm-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.25)] rounded-2xl px-6 py-3 flex justify-between items-center text-warm-white">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="h-4 border-l border-warm-white/20"></span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/45 font-bold">
              GOA, INDIA · 2026
            </span>
          </div>
          <div>
            <Link 
              href="/" 
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-hot-pink font-bold hover:text-bright-yellow transition-colors"
            >
              ← BACK TO HOME
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-lg w-full mx-auto px-6 py-6 md:py-10 z-30 flex flex-col justify-center items-center">
        {step === "form" ? (
          <div className="w-full flex flex-col gap-6 items-center">
            
            {/* Header Content */}
            <div className="text-center space-y-2 max-w-md">
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-none text-warm-white">
                Hacker Goa House Builder Pass
              </h1>
              <p className="font-mono text-[10px] text-warm-white/60 tracking-wider">
                Personalize & generate your official builder pass for Hacker House Goa 2026
              </p>
            </div>

            {/* Badges / Flow indicators */}
            <div className="flex gap-2 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-warm-white/80">
              <span className="bg-teal-deep/50 border border-warm-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                📷 Upload Photo
              </span>
              <span className="bg-teal-deep/50 border border-warm-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                ⚡ Auto Builder
              </span>
              <span className="bg-teal-deep/50 border border-warm-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                🚀 Share Pass
              </span>
            </div>

            {/* Form Card Container */}
            <form 
              onSubmit={handleBuildId} 
              className="w-full backdrop-blur-md bg-teal-deep/30 border border-warm-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4"
            >
              {/* Photo Upload Zone */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                  Builder Photo
                </label>
                <UploadZone photo={photo} onPhotoChange={handlePhotoChange} compact={true} />
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Satoshi Nakamoto"
                  required
                  className="w-full bg-teal-deep/40 border border-warm-white/20 hover:border-warm-white/40 focus:border-hot-pink px-4 py-2.5 rounded-xl font-mono text-xs text-warm-white placeholder-warm-white/30 outline-none transition-all duration-150 shadow-inner"
                />
              </div>

              {/* Role Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="role" className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                    Role / What do you build? *
                  </label>
                  <span className="font-mono text-[7px] text-warm-white/40 uppercase tracking-widest">
                    {role.length}/20 MAX
                  </span>
                </div>
                <input
                  id="role"
                  type="text"
                  value={role}
                  maxLength={20}
                  onChange={(e) => setRole(e.target.value.slice(0, 20))}
                  placeholder="e.g. Full-Stack / Rust"
                  required
                  className="w-full bg-teal-deep/40 border border-warm-white/20 hover:border-warm-white/40 focus:border-hot-pink px-4 py-2.5 rounded-xl font-mono text-xs text-warm-white placeholder-warm-white/30 outline-none transition-all duration-150 shadow-inner"
                />
              </div>

              {/* Stack Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="stack" className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                    Stack / Tech Stack
                  </label>
                  <span className="font-mono text-[7px] text-warm-white/40 uppercase tracking-widest">
                    MAX 3 TAGS
                  </span>
                </div>
                <input
                  id="stack"
                  type="text"
                  value={stack}
                  onChange={(e) => {
                    const val = e.target.value;
                    const parts = val.split(",");
                    if (parts.length > 3) {
                      setStack(parts.slice(0, 3).join(","));
                    } else {
                      setStack(val);
                    }
                  }}
                  placeholder="e.g. React, Node.js, WebGL (Max 3 tags)"
                  className="w-full bg-teal-deep/40 border border-warm-white/20 hover:border-warm-white/40 focus:border-hot-pink px-4 py-2.5 rounded-xl font-mono text-xs text-warm-white placeholder-warm-white/30 outline-none transition-all duration-150 shadow-inner"
                />
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full py-3 mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 border transition-all duration-150 active:scale-[0.98] ${
                  isSubmitDisabled
                    ? "bg-teal-deep/20 border-warm-white/10 text-warm-white/30 cursor-not-allowed"
                    : "bg-hot-pink hover:bg-bright-yellow text-black border-hot-pink hover:border-bright-yellow cursor-pointer"
                }`}
              >
                <span>Generate Pass</span>
                <span>→</span>
              </button>
            </form>

          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full max-w-xl mx-auto items-center">
            {/* Editorial Heading for Preview */}
            <div className="space-y-1 text-center">
              <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-warm-white leading-none">
                YOUR BUILDER ID
              </h1>
              <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-warm-white/60 font-bold">
                Preview your HH Goa 2026 developer profile card
              </p>
            </div>

            {/* Preview Component */}
            <BuilderPreview
              photo={photo}
              name={name}
              role={role}
              stack={stack}
              onBackToEdit={() => setStep("form")}
            />
          </div>
        )}
      </main>

      {/* Shared Website Footer */}
      <Footer />
    </div>
  );
}
