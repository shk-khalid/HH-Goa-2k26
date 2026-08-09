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
    <div className="w-full max-w-[360px] aspect-[4/5] bg-zinc-950 border-2 border-zinc-800 flex flex-col justify-between overflow-hidden relative selection:bg-none p-5 select-none font-mono">
      {/* Technical Corner crosshairs */}
      <div className="absolute top-2 left-2 text-[8px] text-zinc-700 font-bold">+</div>
      <div className="absolute top-2 right-2 text-[8px] text-zinc-700 font-bold">+</div>
      <div className="absolute bottom-2 left-2 text-[8px] text-zinc-700 font-bold">+</div>
      <div className="absolute bottom-2 right-2 text-[8px] text-zinc-700 font-bold">+</div>

      {/* Card Header */}
      <div className="flex justify-between items-start border-b border-zinc-800 pb-3 mt-1">
        <div>
          <h3 className="text-xs font-black tracking-[0.2em] text-white">HH GOA 2026</h3>
          <span className="text-[7px] text-zinc-500 uppercase tracking-widest block mt-0.5">BUILDER PROFILE // GRAPHIC ID</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-amber-500 font-bold tracking-wider">BUILDER CLASS / 001</span>
        </div>
      </div>

      {/* Photo Frame (large, filling a good portion of the card) */}
      <div className="my-4 flex-1 relative bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name || "Builder photo"}
            className="w-full h-full object-cover grayscale contrast-[1.10] brightness-[0.95]"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[7px] text-zinc-600 uppercase tracking-[0.25em]">AWAITING IMAGE DATA</span>
            <div className="w-8 h-8 border border-dashed border-zinc-800 flex items-center justify-center text-zinc-700 text-xs">+</div>
          </div>
        )}
        
        {/* Decorative corner marks inside photo */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700"></div>
        
        {/* Technical metadata overlay */}
        <div className="absolute bottom-1 right-2 text-[6px] text-zinc-400 tracking-widest bg-zinc-950/80 px-1 py-0.5 border border-zinc-800/50">
          SYS.LOC // 15.2993° N, 74.1240° E
        </div>
      </div>

      {/* Info Section */}
      <div className="border-t border-zinc-800 pt-3 flex flex-col gap-3">
        <div className="space-y-0.5">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white truncate">
            {name || "KHALID SHAIKH"}
          </h2>
          <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium">
            {role || "FULL STACK BUILDER"}
          </p>
        </div>

        {/* Stack items */}
        <div className="min-h-[16px] flex flex-wrap gap-1">
          {stackItems.length > 0 ? (
            stackItems.map((item, idx) => (
              <span
                key={idx}
                className="text-[7px] font-bold tracking-widest text-zinc-300 border border-zinc-800 px-1.5 py-0.5 bg-zinc-900/30"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-[7px] text-zinc-600 uppercase tracking-widest">
              NO TECH STACK SELECTED
            </span>
          )}
        </div>

        {/* Card Footer */}
        <div className="border-t border-zinc-900 pt-3 flex justify-between items-center text-[7px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
          <div>
            <span>{builderTitle}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>GOA · 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
