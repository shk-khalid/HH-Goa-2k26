"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/shared/Logo";
import Footer from "@/components/shared/Footer";
import { classifyBuilder } from "@/lib/image/classifyBuilder";
import { Download, Copy, Check, Paperclip } from "lucide-react";

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";
  const role = searchParams.get("role") || "";
  const stack = searchParams.get("stack") || "";

  const builderClass = classifyBuilder(role, stack);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const publicImageUrl = `https://fiznydjywflsffleeoop.supabase.co/storage/v1/object/public/id-card/${id}.png`;

  const handleDownload = () => {
    const filename = `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-hhgoa-pass.png`;
    const link = document.createElement("a");
    link.download = filename;
    link.href = publicImageUrl;
    link.target = "_blank";
    link.click();
  };

  const triggerTwitterIntent = () => {
    const tweetText = encodeURIComponent(
      `🌴 Just generated my official Builder Pass for HH Goa 2026! 🚀\n\n` +
      `🛠️ Role: ${role}\n` +
      `💻 Stack: ${stack}\n` +
      `✨ Class: ${builderClass}\n\n` +
      `Built, shipped, and ready to make waves in Goa! 🌊🌴\n` +
      `#HHGoa2026 #FrameInGoa\n\n` +
      `Try it out: https://goaframes.vercel.app/`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleShareX = () => {
    setIsShareModalOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicImageUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };

  const handleEdit = () => {
    router.push(
      `/build?name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}&stack=${encodeURIComponent(stack)}&id=${id}`
    );
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
      <main className="flex-1 max-w-lg w-full mx-auto px-6 z-30 flex flex-col justify-center items-center py-3 md:py-4 gap-3">
        {/* Editorial Heading for Preview */}
        <div className="text-center space-y-2 max-w-md">
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-none text-bright-yellow">
            YOUR BUILDER ID
          </h1>
          <p className="font-mono text-[10px] text-bright-yellow/85 tracking-wider">
            Preview your HH Goa 2026 developer profile card
          </p>
        </div>

        {/* Visible static image preview */}
        <div className="w-full flex justify-center items-center">
          <img
            src={publicImageUrl}
            alt="HH Goa Builder Pass"
            className="w-full max-w-72.5 sm:max-w-82.5 aspect-3/4 object-contain shadow-2xl rounded-2xl animate-in fade-in duration-300 border border-warm-white/10"
          />
        </div>

        {/* Actions row */}
        <div className="flex flex-col gap-2.5 w-full max-w-72.5 sm:max-w-82.5 font-mono mt-2">
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
              onClick={handleEdit}
              className="flex-1 py-3.5 font-mono text-[9px] font-bold uppercase tracking-widest rounded-xl bg-transparent text-warm-white border border-warm-white/30 hover:border-hot-pink hover:text-hot-pink transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
              </svg>
              Edit
            </button>
          </div>
        </div>
      </main>

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

      {/* Shared Website Footer */}
      <Footer />
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-teal-deep text-warm-white font-mono items-center justify-center gap-4">
        <div className="animate-spin text-hot-pink text-2xl font-bold">LOADING...</div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
