"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/shared/Logo";
import UploadZone from "@/components/upload/UploadZone";
import BuilderPreview from "@/components/builder/BuilderPreview";
import Footer from "@/components/shared/Footer";
import Cropper from "react-easy-crop";
import { cropImage, Area } from "@/lib/image/cropImage";
import { Camera, Zap, Share2 } from "lucide-react";

function BuildPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [photo, setPhoto] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [stack, setStack] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardUuid, setCardUuid] = useState<string>("");

  // Pre-populate if query params are present (e.g. from Edit link)
  useEffect(() => {
    const paramName = searchParams.get("name");
    const paramRole = searchParams.get("role");
    const paramStack = searchParams.get("stack");
    const paramId = searchParams.get("id");

    if (paramName) setName(paramName);
    if (paramRole) setRole(paramRole);
    if (paramStack) setStack(paramStack);
    if (paramId) {
      setCardUuid(paramId);
    } else {
      const uuid = typeof crypto !== "undefined" && crypto.randomUUID 
        ? crypto.randomUUID() 
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
      setCardUuid(uuid);
    }

    // Restore cropped photo from localStorage if present
    const savedPhoto = localStorage.getItem("hh-goa-cropped-photo");
    if (savedPhoto) {
      setCroppedImage(savedPhoto);
    }
  }, [searchParams]);

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
      setIsGenerating(true);
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
        if (croppedImage && !croppedImage.startsWith("data:")) {
          URL.revokeObjectURL(croppedImage);
        }
        setCroppedImage(croppedUrl);
        setIsModalOpen(false);

        // Convert blob to base64 Data URL and store in localStorage for edit state restoration
        const reader = new FileReader();
        reader.readAsDataURL(croppedBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          try {
            localStorage.setItem("hh-goa-cropped-photo", base64data);
          } catch (e) {
            console.warn("localStorage quota exceeded, photo not saved for edit restoration:", e);
          }
        };
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
      <header className="w-full max-w-7xl mx-auto px-6 pt-3 sm:pt-4 relative z-30">
        <div className="w-full backdrop-blur-md bg-teal-deep/40 border border-warm-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.25)] rounded-2xl px-6 py-2.5 flex justify-between items-center text-warm-white">
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
      <main className="flex-1 max-w-lg w-full mx-auto px-6 z-30 flex flex-col justify-center items-center py-3 md:py-4 gap-4">
        <div className="w-full flex flex-col gap-4 items-center">
          
          {/* Header Content */}
          <div className="text-center space-y-1.5 max-w-md">
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-none text-bright-yellow">
              Hacker Goa House Builder Pass
            </h1>
            <p className="font-mono text-[9px] text-bright-yellow/85 tracking-wider">
              Personalize & generate your official builder pass for Hacker House Goa 2026
            </p>
          </div>

          {/* Badges / Flow indicators */}
          <div className="flex gap-2 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">
            <span className="bg-hot-pink/10 border border-hot-pink/20 text-hot-pink px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <Camera className="w-3 h-3 text-hot-pink" />
              PHOTO SNAP
            </span>
            <span className="bg-hot-pink/10 border border-hot-pink/20 text-hot-pink px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3 h-3 text-hot-pink" />
              GENERATE PASS
            </span>
            <span className="bg-hot-pink/10 border border-hot-pink/20 text-hot-pink px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <Share2 className="w-3 h-3 text-hot-pink" />
              BROADCAST
            </span>
          </div>

          {/* Form Card Container */}
          <form 
            onSubmit={handleBuildId} 
            autoComplete="off"
            className="w-full backdrop-blur-md bg-teal-deep/30 border border-warm-white/10 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col gap-3.5"
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
                onCroppedImageChange={(val) => {
                  setCroppedImage(val);
                  if (!val) {
                    localStorage.removeItem("hh-goa-cropped-photo");
                  }
                }}
                onCropRequest={() => setIsModalOpen(true)}
                compact={true} 
              />
            </div>

            {/* Text Input Block: Name */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                Full Name
              </label>
              <input
                type="text"
                required
                disabled={isGenerating}
                autoComplete="off"
                placeholder="e.g. Michael Scott"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#062421] border border-warm-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-warm-white placeholder-warm-white/30 focus:border-hot-pink transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Text Input Block: Role */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                Builder Role
              </label>
              <input
                type="text"
                required
                disabled={isGenerating}
                autoComplete="off"
                placeholder="e.g. Full Stack Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#062421] border border-warm-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-warm-white placeholder-warm-white/30 focus:border-hot-pink transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Text Input Block: Tech Stack */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                Tech Stack (Comma-separated, max 3)
              </label>
              <input
                type="text"
                required
                disabled={isGenerating}
                autoComplete="off"
                placeholder="e.g. React, Next.js, Tailwind"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full bg-[#062421] border border-warm-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-warm-white placeholder-warm-white/30 focus:border-hot-pink transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Primary submit action */}
            <button
              type="submit"
              disabled={isSubmitDisabled || isGenerating}
              className={`w-full py-2.5 mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 border transition-all duration-150 active:scale-[0.98] ${
                isSubmitDisabled || isGenerating
                  ? "bg-teal-deep/20 border-warm-white/10 text-warm-white/30 cursor-not-allowed"
                  : "bg-hot-pink hover:bg-bright-yellow text-black border-hot-pink hover:border-bright-yellow cursor-pointer"
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="w-3.5 h-3.5 text-black animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate Pass</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Offscreen card rendering and Supabase upload trigger */}
        {isGenerating && (
          <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
            <BuilderPreview
              photo={previewPhotoFile}
              name={name}
              role={role}
              stack={stack}
              builderId={cardUuid}
              onBackToEdit={() => setIsGenerating(false)}
              onRenderComplete={(id) => {
                router.push(
                  `/preview?id=${id}&name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}&stack=${encodeURIComponent(stack)}`
                );
              }}
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
              />
            </div>

            {/* Slider Controls */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[8px] uppercase tracking-[0.2em] text-warm-white/60 font-bold">
                Zoom Scale
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setZoom(Math.max(1, zoom - 0.1))}
                  className="w-7 h-7 rounded border border-warm-white/20 text-warm-white hover:border-hot-pink hover:text-hot-pink transition-colors font-mono font-bold text-xs"
                >
                  -
                </button>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 h-1 bg-warm-white/20 rounded-lg appearance-none cursor-pointer accent-hot-pink"
                />
                <button
                  type="button"
                  onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                  className="w-7 h-7 rounded border border-warm-white/20 text-warm-white hover:border-hot-pink hover:text-hot-pink transition-colors font-mono font-bold text-xs"
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

export default function BuildPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-teal-deep text-warm-white font-mono items-center justify-center gap-4">
        <div className="animate-spin text-hot-pink text-2xl font-bold">LOADING...</div>
      </div>
    }>
      <BuildPageContent />
    </Suspense>
  );
}
