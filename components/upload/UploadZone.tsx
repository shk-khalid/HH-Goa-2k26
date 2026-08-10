"use client";

import React, { useRef, useState, useEffect } from "react";

interface UploadZoneProps {
  photo: File | null;
  onPhotoChange: (file: File | null) => void;
}

export default function UploadZone({ photo, onPhotoChange }: UploadZoneProps) {
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
          className={`group flex flex-col items-center justify-center border p-12 transition-all duration-150 cursor-pointer select-none min-h-60 relative overflow-hidden bg-dark-green/30 ${
            isDragActive
              ? "border-sand-warm bg-dark-green/60"
              : "border-sand-warm/20 hover:border-sand-warm/60 hover:bg-dark-green/45"
          }`}
        >
          {/* Subtle technical corner marks */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-lime-acid/55"></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-lime-acid/55"></div>
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-lime-acid/55"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-lime-acid/55"></div>

          <div className="font-mono text-xl text-coral-accent mb-3 transition-transform duration-200 group-hover:-translate-y-0.5 font-bold">
            +
          </div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sand-warm text-center mb-1.5">
            UPLOAD YOUR PHOTO
          </p>
          <p className="font-mono text-[8px] text-sand-warm/60 uppercase tracking-[0.15em] text-center">
            JPG · PNG · HEIC · MAX 15MB
          </p>
        </div>
      ) : (
        <div className="border border-sand-warm/20 p-6 bg-dark-green/20 relative flex flex-col sm:flex-row items-stretch gap-6">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-lime-acid/55"></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-lime-acid/55"></div>
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-lime-acid/55"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-lime-acid/55"></div>

          {previewUrl && (
            <div className="relative w-32 h-32 bg-dark-green/40 border border-sand-warm/20 overflow-hidden shrink-0 flex items-center justify-center mx-auto sm:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Selected preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-between items-center sm:items-start text-center sm:text-left min-w-0 py-1">
            <div className="space-y-2 w-full">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-sand-warm/60 font-bold block">
                PHOTO
              </span>
              <p className="font-mono text-xs text-sand-warm truncate font-bold">
                {photo.name}
              </p>
              <p className="font-mono text-[9px] text-sand-warm/60 uppercase tracking-widest">
                SIZE: {formatFileSize(photo.size)}
              </p>
            </div>
            
            <button
              onClick={onButtonClick}
              type="button"
              className="mt-6 font-mono text-[9px] text-lime-acid hover:text-sand-warm uppercase tracking-[0.2em] font-bold border-b border-sand-warm/20 hover:border-lime-acid pb-0.5 transition-colors"
            >
              REPLACE PHOTO
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 font-mono text-[9px] text-coral-accent uppercase tracking-widest font-bold">
          {error}
        </p>
      )}
    </div>
  );
}
