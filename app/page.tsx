"use client";

import React, { useState } from "react";
import Logo from "@/components/shared/Logo";
import UploadZone from "@/components/upload/UploadZone";
import BuilderForm from "@/components/builder/BuilderForm";
import BuilderPreview from "@/components/builder/BuilderPreview";

type AppStep = "upload" | "form" | "preview";

export default function Home() {
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
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex justify-between items-center">
          <Logo />
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-bold">
            #FRAMEINGOA
          </div>
        </div>
        <div className="w-full border-b border-zinc-900"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center max-w-xl w-full mx-auto px-6 py-12 md:py-20">
        {step !== "preview" ? (
          <div className="flex flex-col gap-10">
            {/* Editorial Heading */}
            <div className="space-y-4 max-w-md">
              <h1 className="text-4xl sm:text-[3.25rem] font-black uppercase tracking-tight leading-[0.95] text-white">
                BUILD YOUR<br />
                BUILDER ID
              </h1>
              <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold leading-relaxed">
                Show what you build. Bring your builder identity to Goa.
              </p>
            </div>

            {/* Upload Zone */}
            <div className="w-full">
              <UploadZone photo={photo} onPhotoChange={handlePhotoChange} />
            </div>

            {/* Form */}
            {step === "form" && (
              <div className="w-full pt-8 border-t border-zinc-900 animate-in fade-in duration-300">
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
              <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none">
                YOUR BUILDER ID
              </h1>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
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

      {/* Footer */}
      <footer className="w-full mt-auto">
        <div className="w-full border-t border-zinc-900"></div>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600 font-bold">
            HH GOA 2026 · GOA, INDIA
          </p>
        </div>
      </footer>
    </div>
  );
}
