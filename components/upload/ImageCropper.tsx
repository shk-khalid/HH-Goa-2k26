"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { cropImage, Area } from "../../lib/image/cropImage";

interface ImageCropperProps {
  image: string; // Object URL of the original/normalized photo
  onConfirm: (croppedUrl: string) => void;
  onReplace: () => void;
  onCancel: () => void;
}

export default function ImageCropper({
  image,
  onConfirm,
  onReplace,
  onCancel,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((_: Area, currentCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedBlob = await cropImage(image, croppedAreaPixels);
      if (croppedBlob) {
        const croppedUrl = URL.createObjectURL(croppedBlob);
        onConfirm(croppedUrl);
      }
    } catch (error) {
      console.error("Failed to crop image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full backdrop-blur-md bg-teal-deep/30 border border-warm-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-warm-white leading-none">
          CROP YOUR PHOTO
        </h2>
        <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-warm-white/60 font-bold">
          Adjust scale and crop region (4:5 Ratio)
        </p>
      </div>

      {/* Cropper Window */}
      <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden border border-warm-white/20 bg-black/40">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 5}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          classes={{
            containerClassName: "bg-black/20",
          }}
        />
      </div>

      {/* Zoom Controls */}
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex justify-between items-center font-mono text-[8px] uppercase tracking-wider text-warm-white/60 font-bold">
          <span>ZOOM</span>
          <span>{Math.round(zoom * 100)}%</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setZoom(Math.max(1, zoom - 0.2))}
            className="w-8 h-8 rounded-lg bg-teal-deep/40 border border-warm-white/20 flex items-center justify-center font-mono text-sm font-bold text-warm-white hover:border-hot-pink transition-colors active:scale-95"
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
            className="flex-1 accent-hot-pink h-1 bg-teal-deep/40 rounded-lg appearance-none cursor-pointer"
          />
          <button
            type="button"
            onClick={() => setZoom(Math.min(3, zoom + 0.2))}
            className="w-8 h-8 rounded-lg bg-teal-deep/40 border border-warm-white/20 flex items-center justify-center font-mono text-sm font-bold text-warm-white hover:border-hot-pink transition-colors active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      {/* Utility Actions */}
      <div className="flex justify-between items-center px-1 font-mono">
        <button
          type="button"
          onClick={handleReset}
          className="text-[9px] uppercase tracking-wider text-warm-white/40 hover:text-hot-pink font-bold transition-colors"
        >
          Reset View
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[9px] uppercase tracking-wider text-warm-white/40 hover:text-hot-pink font-bold transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 w-full">
        <button
          type="button"
          onClick={onReplace}
          className="flex-1 py-3 px-4 font-mono text-[9px] font-bold uppercase tracking-widest rounded-xl bg-transparent text-warm-white border border-warm-white/30 hover:border-hot-pink hover:text-hot-pink transition-all duration-150 active:scale-[0.97]"
        >
          Replace Photo
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isProcessing}
          className="flex-1 py-3 px-4 font-mono text-[9px] font-bold uppercase tracking-widest rounded-xl bg-hot-pink text-black border border-hot-pink hover:bg-bright-yellow hover:border-bright-yellow transition-all duration-150 active:scale-[0.97] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-800 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Cropping..." : "Confirm Photo →"}
        </button>
      </div>
    </div>
  );
}
