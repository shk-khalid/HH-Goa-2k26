"use client";

import React, { useEffect, useState } from "react";

interface BuilderCardProps {
  photo: File | null;
  name: string;
  role: string;
  stack: string;
  builderTitle?: string;
}

export default function BuilderCard({
  photo,
  name,
  role,
  stack,
  builderTitle = "THE BUILDER",
}: BuilderCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImageUrl(null);
      return;
    }

    const url = URL.createObjectURL(photo);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [photo]);

  const stackItems = stack
    ? stack.split(",").map((item) => item.trim().toUpperCase()).filter((item) => item.length > 0)
    : [];

  return (
    <div className="w-full max-w-90 aspect-4/5 bg-sand-warm border-2 border-teal-deep flex flex-col justify-between overflow-hidden relative selection:bg-none p-5 select-none font-mono text-teal-deep shadow-2xl">
      {/* Technical Corner crosshairs */}
      <div className="absolute top-2 left-2 text-[8px] text-teal-deep/40 font-bold">+</div>
      <div className="absolute top-2 right-2 text-[8px] text-teal-deep/40 font-bold">+</div>
      <div className="absolute bottom-2 left-2 text-[8px] text-teal-deep/40 font-bold">+</div>
      <div className="absolute bottom-2 right-2 text-[8px] text-teal-deep/40 font-bold">+</div>

      {/* Card Header */}
      <div className="flex justify-between items-start border-b border-teal-deep/20 pb-3 mt-1">
        <div>
          <h3 className="text-xs font-black tracking-[0.2em] text-teal-deep">HH GOA 2026</h3>
          <span className="text-[7px] text-teal-deep/60 uppercase tracking-widest block mt-0.5">BUILDER PROFILE // GRAPHIC ID</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-coral-accent font-bold tracking-wider">CLASS / 001</span>
        </div>
      </div>

      {/* Photo Frame */}
      <div className="my-4 flex-1 relative bg-dark-green/10 border border-teal-deep/20 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name || "Builder photo"}
            className="w-full h-full object-cover grayscale contrast-[1.05]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[7px] text-teal-deep/50 uppercase tracking-[0.25em]">AWAITING IMAGE DATA</span>
            <div className="w-8 h-8 border border-dashed border-teal-deep/20 flex items-center justify-center text-teal-deep/40 text-xs">+</div>
          </div>
        )}
        
        {/* Decorative corner marks inside photo */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal-deep/30"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-teal-deep/30"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-teal-deep/30"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal-deep/30"></div>
        
        {/* Technical metadata overlay */}
        <div className="absolute bottom-1 right-2 text-[6px] text-sand-warm tracking-widest bg-teal-deep px-1 py-0.5 border border-teal-deep/20">
          SYS.LOC // 15.2993° N, 74.1240° E
        </div>
      </div>

      {/* Info Section */}
      <div className="border-t border-teal-deep/20 pt-3 flex flex-col gap-3">
        <div className="space-y-0.5">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-teal-deep truncate">
            {name || "KHALID SHAIKH"}
          </h2>
          <p className="text-[9px] uppercase tracking-widest text-teal-deep/70 font-bold">
            {role || "FULL STACK BUILDER"}
          </p>
        </div>

        {/* Stack items */}
        <div className="min-h-4 flex flex-wrap gap-1">
          {stackItems.length > 0 ? (
            stackItems.map((item, idx) => (
              <span
                key={idx}
                className="text-[7px] font-bold tracking-widest text-sand-warm border border-teal-deep px-1.5 py-0.5 bg-teal-deep"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-[7px] text-teal-deep/50 uppercase tracking-widest font-bold">
              NO TECH STACK SELECTED
            </span>
          )}
        </div>

        {/* Card Footer */}
        <div className="border-t border-teal-deep/20 pt-3 flex justify-between items-center text-[7px] text-teal-deep/60 uppercase tracking-[0.2em] font-bold">
          <div>
            <span className="text-indigo-accent">{builderTitle}</span>
          </div>
          <div className="flex items-center gap-1.5 text-teal-deep">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-acid border border-teal-deep"></span>
            <span>GOA · 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
