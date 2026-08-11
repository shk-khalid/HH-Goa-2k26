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
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    // Wait a brief tick for any rendering queues to settle
    setTimeout(() => {
      if (!cardRef.current) return;
      toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High resolution scale factor
        style: {
          transform: "scale(1)",
          borderRadius: "18px",
        }
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          const filename = `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-hhgoa-pass.png`;
          link.download = filename;
          link.href = dataUrl;
          link.click();
          setIsExporting(false);
        })
        .catch((err) => {
          console.error("Oops, card generation failed!", err);
          setIsExporting(false);
        });
    }, 150);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
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

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-90">
        <Button
          variant="primary"
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full bg-hot-pink hover:bg-bright-yellow text-black border-hot-pink hover:border-bright-yellow"
        >
          {isExporting ? "Generating..." : "Download Pass"}
        </Button>
        <Button
          variant="secondary"
          onClick={onBackToEdit}
          disabled={isExporting}
          className="w-full"
        >
          Edit Details
        </Button>
      </div>
    </div>
  );
}
