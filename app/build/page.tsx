"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import UploadZone from "@/components/upload/UploadZone";
import BuilderPreview from "@/components/builder/BuilderPreview";
import Footer from "@/components/shared/Footer";
import Cropper from "react-easy-crop";
import { cropImage, Area } from "@/lib/image/cropImage";
import { Camera, Zap, Share2 } from "lucide-react";

type AppStep = "form" | "preview";

export default function BuildPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [stack, setStack] = useState<string>("");
  const [step, setStep] = useState<AppStep>("form");
  const [cardUuid, setCardUuid] = useState<string>("");

  useEffect(() => {
    const uuid = typeof crypto !== "undefined" && crypto.randomUUID 
      ? crypto.randomUUID() 
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c === "x" ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    setCardUuid(uuid);
  }, []);

  // Modal crop states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  // Manage URL lifecycle of the uploaded original file
  useEffect(() => {
    if (!photo) {
      setOriginalUrl(null);
      return;
    }
    const url = URL.createObjectURL(photo);
    setOriginalUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [photo]);

  // Clean up object URLs on change or unmount
  useEffect(() => {
    return () => {
      if (croppedImage) URL.revokeObjectURL(croppedImage);
    };
  }, [croppedImage]);

  const handleBuildId = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    if (croppedImage && name.trim() && role.trim() && stack.trim()) {
      setStep("preview");
    }
  };

  const isSubmitDisabled = !croppedImage || !name.trim() || !role.trim() || !stack.trim();

  // Helper to convert blob/object URL back to file for preview
  const [previewPhotoFile, setPreviewPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    if (!croppedImage) {
      setPreviewPhotoFile(null);
      return;
    }
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], photo?.name || "photo.jpg", {
          type: "image/jpeg",
        });
        setPreviewPhotoFile(file);
      })
      .catch((err) => {
        console.error("Failed to convert crop URL to file:", err);
      });
  }, [croppedImage, photo]);

  const onCropComplete = useCallback((_: Area, currentCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (!originalUrl || !croppedAreaPixels) return;
    setIsCropping(true);
    try {
      const croppedBlob = await cropImage(originalUrl, croppedAreaPixels);
      if (croppedBlob) {
        const croppedUrl = URL.createObjectURL(croppedBlob);
        if (croppedImage) {
          URL.revokeObjectURL(croppedImage);
        }
        setCroppedImage(croppedUrl);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to crop image:", err);
    } finally {
      setIsCropping(false);
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

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
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-none text-bright-yellow">
                Hacker Goa House Builder Pass
              </h1>
              <p className="font-mono text-[10px] text-bright-yellow/85 tracking-wider">
                Personalize & generate your official builder pass for Hacker House Goa 2026
              </p>
            </div>

             {/* Badges / Flow indicators */}
            <div className="flex gap-2 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">
              <span className="bg-hot-pink/10 border border-hot-pink/20 text-hot-pink px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Camera className="w-3 h-3 text-hot-pink" />
                PHOTO SNAP
              </span>
              <span className="bg-hot-pink/10 border border-hot-pink/20 text-hot-pink px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3 h-3 text-hot-pink" />
                GENERATE PASS
              </span>
              <span className="bg-hot-pink/10 border border-hot-pink/20 text-hot-pink px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Share2 className="w-3 h-3 text-hot-pink" />
                BROADCAST
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
                <UploadZone 
                  photo={photo} 
                  onPhotoChange={setPhoto} 
                  croppedPreviewUrl={croppedImage}
                  onCroppedImageChange={setCroppedImage}
                  onCropRequest={() => setIsModalOpen(true)}
                  compact={true} 
                />
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
                  placeholder="e.g. Michael Scott"
                  required
                  spellCheck={false}
                  className="w-full bg-[#062421] border border-warm-white/20 hover:border-warm-white/40 focus:border-hot-pink px-4 py-2.5 rounded-xl font-mono text-xs text-warm-white placeholder-warm-white/30 outline-none transition-all duration-150 shadow-inner"
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
                  placeholder="e.g. Smart Contract Dev"
                  required
                  spellCheck={false}
                  className="w-full bg-[#062421] border border-warm-white/20 hover:border-warm-white/40 focus:border-hot-pink px-4 py-2.5 rounded-xl font-mono text-xs text-warm-white placeholder-warm-white/30 outline-none transition-all duration-150 shadow-inner"
                />
              </div>

              {/* Stack Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="stack" className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                    Stack / Tech Stack *
                  </label>
                  <span className="font-mono text-[7px] text-warm-white/40 uppercase tracking-widest">
                    MAX 3 TAGS
                  </span>
                </div>
                <input
                  id="stack"
                  type="text"
                  value={stack}
                  required
                  spellCheck={false}
                  onChange={(e) => {
                    const val = e.target.value;
                    const parts = val.split(",");
                    if (parts.length > 3) {
                      setStack(parts.slice(0, 3).join(","));
                    } else {
                      setStack(val);
                    }
                  }}
                  placeholder="e.g. Solidity, Hardhat, Go"
                  className="w-full bg-[#062421] border border-warm-white/20 hover:border-warm-white/40 focus:border-hot-pink px-4 py-2.5 rounded-xl font-mono text-xs text-warm-white placeholder-warm-white/30 outline-none transition-all duration-150 shadow-inner"
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
              photo={previewPhotoFile}
              name={name}
              role={role}
              stack={stack}
              builderId={cardUuid}
              onBackToEdit={() => setStep("form")}
            />
          </div>
        )}
      </main>

      {/* Crop Modal Overlay */}
      {isModalOpen && originalUrl && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm backdrop-blur-md bg-teal-deep/90 border border-warm-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-1">
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-warm-white leading-none">
                Adjust Photo
              </h2>
              <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-warm-white/60 font-bold">
                Drag to position & adjust zoom (4:5 Ratio)
              </p>
            </div>

            {/* Cropper Container */}
            <div className="relative w-full aspect-4/5 rounded-lg overflow-hidden border border-warm-white/20 bg-black/40">
              <Cropper
                image={originalUrl}
                crop={crop}
                zoom={zoom}
                aspect={4 / 5}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={false}
                style={{
                  cropAreaStyle: {
                    border: "2px solid var(--warm-white)",
                    borderRadius: "4px",
                    boxShadow: "0 0 0 9999px rgba(11, 59, 53, 0.6)", // Faded teal overlay instead of dark black side bands
                  },
                  containerStyle: {
                    background: "rgba(0, 0, 0, 0.4)",
                  }
                }}
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/75 border border-warm-white/10 rounded px-2 py-0.5 font-mono text-[6px] font-bold tracking-widest text-warm-white pointer-events-none uppercase z-10">
                DRAG IMAGE TO ALIGN
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex justify-between items-center font-mono text-[8px] uppercase tracking-wider text-warm-white/50 font-bold">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setZoom(Math.max(1, zoom - 0.2))}
                  className="w-7 h-7 rounded bg-teal-deep border border-warm-white/20 flex items-center justify-center font-mono text-xs font-bold text-warm-white hover:border-hot-pink transition-colors active:scale-95"
                >
                  -
                </button>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-hot-pink h-0.5 bg-warm-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setZoom(Math.min(3, zoom + 0.2))}
                  className="w-7 h-7 rounded bg-teal-deep border border-warm-white/20 flex items-center justify-center font-mono text-xs font-bold text-warm-white hover:border-hot-pink transition-colors active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 w-full font-mono mt-1">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2 font-mono text-[8px] font-bold uppercase tracking-widest rounded border border-warm-white/20 text-warm-white hover:border-hot-pink hover:text-hot-pink transition-all active:scale-[0.97]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 font-mono text-[8px] font-bold uppercase tracking-widest rounded border border-warm-white/20 text-warm-white hover:border-hot-pink hover:text-hot-pink transition-all active:scale-[0.97]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCrop}
                disabled={isCropping}
                className="flex-2 py-2 font-mono text-[8px] font-bold uppercase tracking-widest rounded bg-hot-pink text-black border border-hot-pink hover:bg-bright-yellow hover:border-bright-yellow transition-all duration-150 active:scale-[0.97] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-800 disabled:cursor-not-allowed"
              >
                {isCropping ? "Cropping..." : "Use Photo →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shared Website Footer */}
      <Footer />
    </div>
  );
}
