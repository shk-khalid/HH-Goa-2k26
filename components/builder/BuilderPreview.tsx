"use client";

import React, { useRef, useState } from "react";
import BuilderCard from "../card/BuilderCard";
import Button from "../shared/Button";
import { toPng } from "html-to-image";

interface BuilderPreviewProps {
  photo: File | null;
  name: string;
  role: string;
  stack: string;
  onBackToEdit: () => void;
}

export default function BuilderPreview({
  photo,
  name,
  role,
  stack,
  onBackToEdit,
}: BuilderPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Shared options for html-to-image export
  const exportOptions = {
    cacheBust: false,
    pixelRatio: 2,
    style: {
      transform: "scale(1)",
      borderRadius: "18px",
    },
    // Transparent pixel fallback for any images that can't be fetched
    imagePlaceholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIABQABNjN9GQAAAABJRnQ5ErkJggg==",
  };

  const handleDownload = () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    setTimeout(() => {
      if (!cardRef.current) return;
      toPng(cardRef.current, exportOptions)
        .then((dataUrl) => {
          const link = document.createElement("a");
          const filename = `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-hhgoa-pass.png`;
          link.download = filename;
          link.href = dataUrl;
          link.click();
          setIsDownloading(false);
        })
        .catch((err) => {
          console.error("Oops, card generation failed!", err);
          setIsDownloading(false);
        });
    }, 150);
  };

  const handleShareX = () => {
    if (!cardRef.current) return;
    setIsSharing(true);

    setTimeout(() => {
      if (!cardRef.current) return;
      toPng(cardRef.current, exportOptions)
        .then((dataUrl) => {
          const filename = `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-hhgoa-pass.png`;
          
          // Helper to trigger fallback download and Twitter intent
          const triggerFallback = () => {
            const link = document.createElement("a");
            link.download = filename;
            link.href = dataUrl;
            link.click();

            const tweetText = encodeURIComponent(
              `Just generated my Builder ID Pass for HH Goa 2026! 🚀\n\n#HHGoa2026 #FRAMEINGOA #BuilderID`
            );
            const tweetUrl = encodeURIComponent("https://goaframes.vercel.app/");
            window.open(
              `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`,
              "_blank",
              "noopener,noreferrer"
            );
          };

          // Check if native file sharing is supported
          if (navigator.share && navigator.canShare) {
            // Convert data URL to Blob
            fetch(dataUrl)
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], filename, { type: "image/png" });
                const shareData = {
                  files: [file],
                  title: "HH Goa 2026 Builder Pass",
                  text: "Just generated my Builder ID Pass for HH Goa 2026! #HHGoa2026 #FRAMEINGOA #BuilderID",
                };

                if (navigator.canShare(shareData)) {
                  navigator.share(shareData)
                    .then(() => setIsSharing(false))
                    .catch(err => {
                      // If user cancels or share fails, fallback
                      console.log("Share failed or cancelled, falling back", err);
                      triggerFallback();
                      setIsSharing(false);
                    });
                } else {
                  triggerFallback();
                  setIsSharing(false);
                }
              })
              .catch(err => {
                console.error("Blob conversion failed", err);
                triggerFallback();
                setIsSharing(false);
              });
          } else {
            triggerFallback();
            setIsSharing(false);
          }
        })
        .catch((err) => {
          console.error("Oops, card generation failed!", err);
          setIsSharing(false);
        });
    }, 150);
  };

  const isBusy = isDownloading || isSharing;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Target wrapper div for image capture */}
      <div className="w-full flex justify-center" ref={cardRef}>
        <BuilderCard
          photo={photo}
          name={name}
          role={role}
          stack={stack}
          builderTitle="TERMINAL WIZARD"
        />
      </div>

      {/* Action Buttons — compact row */}
      <div className="flex gap-2 w-full max-w-90">
        <button
          onClick={handleDownload}
          disabled={isBusy}
          className="flex-1 py-2.5 px-3 font-mono text-[9px] font-bold uppercase tracking-widest rounded-lg bg-hot-pink text-black border border-hot-pink hover:bg-bright-yellow hover:border-bright-yellow transition-all duration-150 active:scale-[0.97] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-800 disabled:cursor-not-allowed"
        >
          {isDownloading ? "Downloading..." : "Download"}
        </button>
        <button
          onClick={handleShareX}
          disabled={isBusy}
          className="flex-1 py-2.5 px-3 font-mono text-[9px] font-bold uppercase tracking-widest rounded-lg bg-transparent text-warm-white border border-warm-white/30 hover:border-hot-pink hover:text-hot-pink transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-1.5 disabled:text-zinc-700 disabled:border-zinc-800 disabled:cursor-not-allowed"
        >
          {isSharing ? (
            "Sharing..."
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Share
            </>
          )}
        </button>
        <button
          onClick={onBackToEdit}
          disabled={isBusy}
          className="flex-1 py-2.5 px-3 font-mono text-[9px] font-bold uppercase tracking-widest rounded-lg bg-transparent text-warm-white border border-warm-white/30 hover:border-hot-pink hover:text-hot-pink transition-all duration-150 active:scale-[0.97] disabled:text-zinc-700 disabled:border-zinc-800 disabled:cursor-not-allowed"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
