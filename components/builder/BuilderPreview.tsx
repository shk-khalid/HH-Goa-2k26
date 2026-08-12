"use client";

import React, { useRef, useState, useEffect } from "react";
import BuilderCard from "../card/BuilderCard";
import { toPng } from "html-to-image";
import { classifyBuilder } from "../../lib/image/classifyBuilder";
import { Download, Share2, Copy, Check, Loader2, Edit3, Paperclip } from "lucide-react";

import { supabase } from "@/lib/supabase";

interface BuilderPreviewProps {
  photo: File | null;
  name: string;
  role: string;
  stack: string;
  builderId: string;
  onBackToEdit: () => void;
}

export default function BuilderPreview({
  photo,
  name,
  role,
  stack,
  builderId,
  onBackToEdit,
}: BuilderPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const exportOptions = {
    cacheBust: false,
    pixelRatio: 2,
    style: {
      transform: "scale(1)",
      borderRadius: "18px",
    },
    imagePlaceholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIABQABNjN9GQAAAABJRnQ5ErkJggg==",
  };

  // Handle card generated event from BuilderCard callback (fires when all assets are loaded)
  const handleCardGenerated = async (dataUrl: string) => {
    try {
      // Convert data URL to Blob for Supabase upload
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      // Upload the entire finished ID card PNG to Supabase storage
      const { error } = await supabase.storage
        .from("id-card")
        .upload(`${builderId}.png`, blob, {
          contentType: "image/png",
          upsert: true,
        });

      if (error) {
        throw error;
      }

      setRenderedImageUrl(dataUrl);
    } catch (err: any) {
      console.error("Oops, card upload failed:", err);
      // Fallback: show the rendered image locally even if upload fails
      setRenderedImageUrl(dataUrl);
    } finally {
      setIsRendering(false);
    }
  };

  const handleDownload = () => {
    if (!renderedImageUrl) return;
    const filename = `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-hhgoa-pass.png`;
    const link = document.createElement("a");
    link.download = filename;
    link.href = renderedImageUrl;
    link.click();
  };

  // Opens the X sharing window with pre-loaded details
  const triggerTwitterIntent = () => {
    const tweetText = encodeURIComponent(
      `🌴 Just generated my official Builder Pass for HH Goa 2026! 🚀\n\n` +
      `🛠️ Role: ${role}\n` +
      `💻 Stack: ${stack}\n` +
      `✨ Class: ${builderClass}\n\n` +
      `Built, shipped, and ready to make waves in Goa! 🌊🌴\n` +
      `#HHGoa2026 #FrameInGoa\n\n` +
      `Try it out: https://goaframes.vercel.app/\n` +
      `Built by Team Antimatter`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleShareX = () => {
    // Open the helper modal informing them how to download and attach it
    setIsShareModalOpen(true);
  };

  const handleCopyLink = () => {
    const publicUrl = `https://fiznydjywflsffleeoop.supabase.co/storage/v1/object/public/id-card/${builderId}.png`;
    navigator.clipboard.writeText(publicUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };

  const builderClass = classifyBuilder(role, stack);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Off-screen target container for image generation */}
      <div 
        ref={cardRef} 
        style={{ 
          position: "absolute", 
          left: "-9999px", 
          top: "-9999px",
          width: "360px",
          height: "480px"
        }}
      >
        <BuilderCard
          photo={photo}
          name={name}
          role={role}
          stack={stack}
          builderTitle={builderClass}
          builderId={builderId}
          onCardGenerated={handleCardGenerated}
        />
      </div>

      {/* Visible static image preview */}
      <div className="w-full flex justify-center items-center">
        {isRendering ? (
          <div className="w-full max-w-[290px] sm:max-w-[330px] aspect-[3/4] bg-[#062421]/60 border border-warm-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 animate-pulse shadow-2xl relative overflow-hidden pointer-events-none">
            <Loader2 className="w-7 h-7 text-hot-pink animate-spin" />
            <span className="font-mono text-[7px] tracking-[0.25em] text-warm-white uppercase font-bold bg-[#0b3b35] border border-warm-white/15 rounded-lg px-3 py-1.5 shadow-lg">
              Generating Pass...
            </span>
          </div>
        ) : renderedImageUrl ? (
          <img
            src={renderedImageUrl}
            alt="HH Goa Builder Pass"
            className="w-full max-w-[290px] sm:max-w-[330px] aspect-[3/4] object-contain shadow-2xl rounded-2xl animate-in fade-in duration-300 border border-warm-white/10"
          />
        ) : (
          <div className="text-red-400 font-mono text-xs uppercase font-bold">
            Failed to render pass preview
          </div>
        )}
      </div>

      {/* Actions row */}
      {isRendering ? (
        <div className="flex flex-col gap-2.5 w-full max-w-[290px] sm:max-w-[330px] font-mono mt-2 animate-pulse">
          {/* Skeleton for primary button */}
          <div className="w-full h-11 bg-warm-white/5 border border-warm-white/10 rounded-xl" />
          {/* Skeletons for secondary buttons */}
          <div className="flex gap-2 w-full">
            <div className="flex-1 h-11 bg-warm-white/5 border border-warm-white/10 rounded-xl" />
            <div className="flex-1 h-11 bg-warm-white/5 border border-warm-white/10 rounded-xl" />
            <div className="flex-1 h-11 bg-warm-white/5 border border-warm-white/10 rounded-xl" />
          </div>
        </div>
      ) : renderedImageUrl ? (
        <div className="flex flex-col gap-2.5 w-full max-w-[290px] sm:max-w-[330px] font-mono mt-2">
          {/* Primary Action Button: Share to X */}
          <button
            onClick={handleShareX}
            className="w-full py-3 font-mono text-[10px] font-bold uppercase tracking-widest rounded-xl bg-hot-pink text-black border border-hot-pink hover:bg-bright-yellow hover:border-bright-yellow transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Post to X
          </button>
          
          {/* Secondary Action Row: Download, Copy, and Edit */}
          <div className="flex gap-2 w-full">
            <button
              onClick={handleDownload}
              className="flex-1 py-3.5 font-mono text-[9px] font-bold uppercase tracking-widest rounded-xl bg-transparent text-warm-white border border-warm-white/30 hover:border-hot-pink hover:text-hot-pink transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Pass
            </button>

            <button
              onClick={handleCopyLink}
              className="flex-1 py-3.5 font-mono text-[9px] font-bold uppercase tracking-widest rounded-xl bg-transparent text-warm-white border border-warm-white/30 hover:border-hot-pink hover:text-hot-pink transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Link
                </>
              )}
            </button>

            <button
              onClick={onBackToEdit}
              className="flex-1 py-3.5 font-mono text-[9px] font-bold uppercase tracking-widest rounded-xl bg-transparent text-warm-white border border-warm-white/30 hover:border-hot-pink hover:text-hot-pink transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
        </div>
      ) : null}

      {/* Share to X Reminder Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm backdrop-blur-md bg-teal-deep/90 border border-warm-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 text-warm-white animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h2 className="text-xs font-mono font-extrabold uppercase tracking-[0.2em] text-bright-yellow text-center">
              Attach Image to Your X Post
            </h2>

            {/* Warning card wrapper matching dark theme styling */}
            <div className="flex gap-4 items-start bg-[#062421]/60 border border-warm-white/10 p-4 rounded-xl shadow-inner">
              <div className="w-10 h-10 rounded-full border border-hot-pink flex items-center justify-center shrink-0">
                <Paperclip className="w-5 h-5 text-hot-pink" />
              </div>
              <p className="text-[10px] leading-relaxed text-warm-white/80 font-mono">
                Please make sure to download your pass and attach it manually to your X post before hitting Publish!
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col gap-2.5 font-mono mt-1">
              <button
                onClick={() => {
                  triggerTwitterIntent();
                  setIsShareModalOpen(false);
                }}
                className="w-full py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl bg-hot-pink text-black hover:bg-bright-yellow hover:border-bright-yellow transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue to X</span>
                <span>→</span>
              </button>
              
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-full py-2 text-[9px] font-bold uppercase tracking-widest rounded-xl bg-transparent text-warm-white/55 hover:text-warm-white border border-warm-white/15 hover:border-warm-white/35 transition-all duration-150 cursor-pointer text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
