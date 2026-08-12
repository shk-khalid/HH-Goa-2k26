import React, { useRef, useState, useEffect } from "react";
import { validateImage } from "../../lib/image/validateImage";
import { convertHeic } from "../../lib/image/convertHeic";

interface UploadZoneProps {
  photo: File | null;
  onPhotoChange: (file: File | null) => void;
  croppedPreviewUrl: string | null;
  onCroppedImageChange: (url: string | null) => void;
  onCropRequest: () => void;
  compact?: boolean;
}

export default function UploadZone({
  photo,
  onPhotoChange,
  croppedPreviewUrl,
  onCroppedImageChange,
  onCropRequest,
  compact = false,
}: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Manage object URL lifecycle for fallback original preview
  useEffect(() => {
    if (!photo) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(photo);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [photo]);

  const validateAndSetFile = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    const result = validateImage(file);
    if (!result.valid) {
      setError(result.error || "INVALID FILE.");
      setIsProcessing(false);
      return;
    }

    try {
      const normalizedFile = await convertHeic(file);
      onPhotoChange(normalizedFile);
      // Trigger parent crop modal
      onCropRequest();
    } catch (err) {
      console.error("HEIC conversion failed:", err);
      setError("FAILED TO PROCESS PHOTO.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPhotoChange(null);
    onCroppedImageChange(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Determine display URL: cropped preview if available, otherwise original fallback preview
  const displayUrl = croppedPreviewUrl || previewUrl;

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic,image/heif"
        onChange={handleFileInput}
      />

      {!photo ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`group flex items-center gap-4 border border-dashed rounded-xl transition-all duration-150 cursor-pointer select-none relative overflow-hidden bg-teal-deep/10 ${
            compact ? "p-4 min-h-18" : "flex-col justify-center p-12 min-h-60"
          } ${
            isDragActive
              ? "border-hot-pink bg-teal-deep/30"
              : "border-warm-white/20 hover:border-hot-pink hover:bg-teal-deep/20"
          }`}
        >
          {/* Upload Icon */}
          <div className="w-10 h-10 rounded-full border border-warm-white/20 flex items-center justify-center shrink-0 group-hover:border-hot-pink transition-colors">
            <svg 
              className="w-5 h-5 text-warm-white/70 group-hover:text-hot-pink transition-colors" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>

          {/* Text Description */}
          <div className="text-left">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-warm-white">
              {isProcessing ? "Processing..." : <>Drop your photo here or <span className="text-hot-pink group-hover:text-bright-yellow underline transition-colors">click to browse</span></>}
            </p>
            <p className="font-mono text-[8px] text-warm-white/40 uppercase tracking-widest mt-0.5">
              JPG, PNG, WEBP or HEIC • Max 15MB
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-warm-white/15 bg-teal-deep/30 rounded-2xl p-4 flex items-center gap-4 relative">
          {displayUrl && (
            <div 
              onClick={onCropRequest}
              title="Click to adjust / crop photo"
              className="relative w-12 aspect-4/5 rounded-lg bg-teal-deep/40 border border-warm-white/10 overflow-hidden shrink-0 flex items-center justify-center cursor-pointer hover:border-hot-pink transition-all duration-150 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayUrl}
                alt="Selected preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-warm-white">
                  <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"/>
                  <path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"/>
                </svg>
              </div>
            </div>
          )}
          <div className="flex-1 text-left min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-widest text-warm-white/40 font-bold">
              PHOTO UPLOADED
            </p>
            <p className="font-mono text-[10px] font-bold text-warm-white truncate max-w-40">
              {photo.name}
            </p>
            <p className="font-mono text-[8px] text-warm-white/65 uppercase tracking-wider">
              SIZE: {formatFileSize(photo.size)}
            </p>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleRemove}
              className="font-mono text-[9px] uppercase tracking-widest text-hot-pink hover:text-bright-yellow font-bold underline transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-[9px] font-mono text-hot-pink font-bold uppercase tracking-widest animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
}
