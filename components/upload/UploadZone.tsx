"use client";

import React, { useRef, useState, useEffect } from "react";

interface UploadZoneProps {
  photo: File | null;
  onPhotoChange: (file: File | null) => void;
  compact?: boolean;
}

export default function UploadZone({ photo, onPhotoChange, compact = false }: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Manage object URL lifecycle
  useEffect(() => {
    if (!photo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(photo);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [photo]);

  const validateAndSetFile = (file: File) => {
    setError(null);

    const validExtensions = ["jpg", "jpeg", "png", "heic", "heif"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    const isAcceptedType =
      validExtensions.includes(fileExtension) ||
      file.type.startsWith("image/jpeg") ||
      file.type.startsWith("image/png");

    if (!isAcceptedType) {
      setError("UNSUPPORTED FORMAT. PLEASE USE JPG, PNG, OR HEIC.");
      return;
    }

    const maxSize = 15 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("FILE OVERFLOW. MAXIMUM SIZE ALLOWED IS 15 MB.");
      return;
    }

    onPhotoChange(file);
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png"
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
            compact ? "p-4 min-h-[72px]" : "flex-col justify-center p-12 min-h-60"
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
              Drop your photo here or <span className="text-hot-pink group-hover:text-bright-yellow underline transition-colors">click to browse</span>
            </p>
            <p className="font-mono text-[8px] text-warm-white/40 uppercase tracking-widest mt-0.5">
              JPG, PNG, WEBP or HEIC • Max 15MB
            </p>
          </div>
        </div>
      ) : (
        <div className={`border border-warm-white/20 bg-teal-deep/20 relative flex items-center gap-4 rounded-xl ${
          compact ? "p-3" : "flex-col sm:flex-row p-6"
        }`}>
          {previewUrl && (
            <div className="relative w-12 h-12 rounded-lg bg-teal-deep/40 border border-warm-white/10 overflow-hidden shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Selected preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 text-left min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-widest text-warm-white/40 font-bold">
              PHOTO UPLOADED
            </p>
            <p className="font-mono text-[10px] font-bold text-warm-white truncate max-w-[200px]">
              {photo.name}
            </p>
            <p className="font-mono text-[8px] text-warm-white/60 uppercase tracking-wider">
              SIZE: {formatFileSize(photo.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPhotoChange(null);
            }}
            className="font-mono text-[9px] uppercase tracking-widest text-hot-pink hover:text-bright-yellow font-bold underline transition-colors shrink-0"
          >
            Replace
          </button>
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
