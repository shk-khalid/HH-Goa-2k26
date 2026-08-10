"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import UploadZone from "@/components/upload/UploadZone";
import BuilderForm from "@/components/builder/BuilderForm";
import BuilderPreview from "@/components/builder/BuilderPreview";
import Footer from "@/components/shared/Footer";

type AppStep = "upload" | "form" | "preview";

export default function BuildPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [stack, setStack] = useState<string>("");
  const [step, setStep] = useState<AppStep>("upload");

  const handlePhotoChange = (file: File | null) => {
    setPhoto(file);
    if (file) {
      setStep("form");
    } else {
      setStep("upload");
    }
  };

  const handleBuildId = () => {
    if (photo && name.trim() && role.trim()) {
      setStep("preview");
    }
  };

  const isSubmitDisabled = !photo || !name.trim() || !role.trim();

  return (
    <div className="flex flex-col min-h-screen bg-teal-deep text-warm-white font-sans selection:bg-warm-white selection:text-teal-deep overflow-x-hidden">
      {/* Floating Island Header */}
      <header className="w-full max-w-7xl mx-auto px-6 pt-4 sm:pt-6 relative z-30">
        <div className="w-full backdrop-blur-md bg-teal-deep/40 border border-warm-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.25)] rounded-full px-6 py-3 flex justify-between items-center text-warm-white">
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
      <main className="flex-1 flex flex-col justify-center max-w-xl w-full mx-auto px-6 py-12 md:py-20 z-30">
        {step !== "preview" ? (
          <div className="flex flex-col gap-10">
            {/* Editorial Heading */}
            <div className="space-y-4 max-w-md">
              <h1 className="text-4xl sm:text-[3.25rem] font-bold uppercase tracking-tight leading-[0.95] text-warm-white">
                BUILD YOUR<br />
                BUILDER ID
              </h1>
              <p className="font-mono text-[9px] uppercase tracking-widest text-warm-white/60 font-bold leading-relaxed">
                Show what you build. Bring your builder identity to Goa.
              </p>
            </div>

            {/* Upload Zone */}
            <div className="w-full">
              <UploadZone photo={photo} onPhotoChange={handlePhotoChange} />
            </div>

            {/* Form */}
            {step === "form" && (
              <div className="w-full pt-8 border-t border-warm-white/10 animate-in fade-in duration-300">
                <BuilderForm
                  name={name}
                  role={role}
                  stack={stack}
                  onNameChange={setName}
                  onRoleChange={setRole}
                  onStackChange={setStack}
                  onSubmit={handleBuildId}
                  isSubmitDisabled={isSubmitDisabled}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Editorial Heading for Preview */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold uppercase tracking-tight text-warm-white leading-none">
                YOUR BUILDER ID
              </h1>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-warm-white/60 font-bold">
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
