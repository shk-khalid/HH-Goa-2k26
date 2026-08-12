"use client";

import React, { useEffect, useState } from "react";

interface BuilderCardProps {
  photo: File | null;
  name: string;
  role: string;
  stack: string;
  builderTitle?: string;
  builderId?: string;
}

export default function BuilderCard({
  photo,
  name,
  role,
  stack,
  builderTitle = "TERMINAL WIZARD",
  builderId: customBuilderId,
}: BuilderCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [sunriseBgDataUrl, setSunriseBgDataUrl] = useState<string>("/images/sunrise_bg.png");

  // Preload sunrise background as data URL so html-to-image can inline it
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          setSunriseBgDataUrl(canvas.toDataURL("image/png"));
        }
      } catch {
        // Fallback: keep using the original URL
      }
    };
    img.src = "/images/sunrise_bg.png";
  }, []);

  useEffect(() => {
    if (!photo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImageUrl(null);
      return;
    }

    // Resize photo via canvas to keep data URL small for html-to-image export
    const blobUrl = URL.createObjectURL(photo);
    const img = new Image();
    img.onload = () => {
      const MAX_DIM = 800;
      let { naturalWidth: w, naturalHeight: h } = img;
      if (w > MAX_DIM || h > MAX_DIM) {
        const scale = MAX_DIM / Math.max(w, h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
        setImageUrl(canvas.toDataURL("image/jpeg", 0.85));
      }
      URL.revokeObjectURL(blobUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
    };
    img.src = blobUrl;
  }, [photo]);

  // Trim and limit characters for clean layout alignment
  const nameVal = name.trim().toUpperCase().slice(0, 18) || "KHALID SHAIKH";
  const roleVal = role.trim().toUpperCase().slice(0, 20) || "FULL STACK DEVELOPER";
  const classVal = builderTitle.trim().toUpperCase().slice(0, 16) || "TERMINAL WIZARD";
  
  // Format exactly first 3 stack items separated by middle dot " · "
  const stackVal = stack
    ? stack
        .split(",")
        .slice(0, 3)
        .map((item) => item.trim().toUpperCase())
        .filter((item) => item.length > 0)
        .join(" · ")
    : "REACT.JS · NEXT.JS · EXPRESS.JS";

  // Generate unique builder ID or use passed prop
  const nameHash = nameVal.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const generatedId = `HHGOA-${(nameHash % 90000 + 10000).toString(16).toUpperCase()}`;
  const builderId = customBuilderId || generatedId;

  // QR Code URL pointing to profile
  const shareData = typeof window !== "undefined"
    ? `${window.location.origin}/card/${builderId}`
    : `https://goaframe.com/card/${builderId}`;
  
  useEffect(() => {
    import("qrcode").then((QRCode) => {
      QRCode.toDataURL(
        shareData,
        {
          color: {
            dark: "#063b32",
            light: "#f4e9c8",
          },
          margin: 0,
          width: 150,
        },
        (err, url) => {
          if (!err) {
            setQrCodeDataUrl(url);
          }
        }
      );
    });
  }, [shareData]);

  // Deterministic barcode bar generator
  const renderBarcodeBars = () => {
    const bars = [];
    let state = nameHash;
    for (let i = 0; i < 32; i++) {
      state = (state * 1664525 + 1013904223) % 4294967296;
      const isBar = state % 3 !== 0;
      const widthClass = state % 4 === 0 ? "w-[2.5px]" : state % 4 === 1 ? "w-[1.5px]" : "w-[1px]";
      
      if (isBar) {
        bars.push(
          <div key={i} className={`h-5 bg-[#d7e65a] shrink-0 ${widthClass}`} />
        );
      } else {
        bars.push(
          <div key={i} className="h-5 bg-transparent shrink-0 w-[1.5px]" />
        );
      }
    }
    return bars;
  };

  const sansStyle = { fontFamily: "Arial, Helvetica, sans-serif" };

  return (
    <div 
      className="id-card select-none relative w-full max-w-90 aspect-3/4 overflow-hidden rounded-2xl bg-[#0b6839] border border-[#d7e65a]/30 shadow-2xl text-[#f4e9c8] flex flex-col justify-between p-4"
      style={sansStyle}
    >
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 text-[#d7e65a] text-[10px] font-bold">┌</div>
      <div className="absolute top-2 right-2 text-[#d7e65a] text-[10px] font-bold">┐</div>
      <div className="absolute bottom-2 left-2 text-[#d7e65a] text-[10px] font-bold">└</div>
      <div className="absolute bottom-2 right-2 text-[#d7e65a] text-[10px] font-bold">┘</div>

      {/* Top Lanyard Slot */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-black/80 rounded-full border border-warm-white/10 flex items-center justify-center">
        <div className="w-16 h-1 bg-[#0b6839] rounded-full" />
      </div>

      {/* Header Info */}
      <div className="flex justify-between items-start pt-5 px-1 z-10">
        <div>
          <h2 className="text-[11px] font-black tracking-widest text-[#f4e9c8] leading-none">
            HH GOA 2026
          </h2>
          <span className="text-[6.5px] text-[#f4e9c8]/70 tracking-widest uppercase block mt-1">
            GOA, INDIA · 28—31 OCT 2026
          </span>
          <span className="text-[7.5px] text-[#d7e65a] font-bold tracking-widest block mt-3">
            [ HH GOA BUILDERS ASSEMBLY ]
          </span>
          <div className="flex items-center gap-1 mt-1">
            <h1 className="text-2xl font-black tracking-tighter text-[#f4e9c8] uppercase leading-none">
              BUILDER
            </h1>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <h1 className="text-xl font-black tracking-widest text-[#d7e65a] uppercase leading-none">
              ID
            </h1>
            <span className="text-coral-accent text-xs">✦</span>
          </div>
        </div>

        {/* Telemetry Box Right */}
        <div className="text-right flex flex-col items-end">
          <div className="flex items-center gap-1 text-[8px] font-mono text-[#d7e65a] font-bold tracking-widest">
            <span>#FRAMEINGOA</span>
            <span className="text-xs text-coral-accent">⊕</span>
          </div>
          <span className="text-[5.5px] text-[#f4e9c8]/60 tracking-widest uppercase block mt-0.5">
            BUILD · SHIP · REPEAT
          </span>

          <div className="mt-2 border border-[#d7e65a]/30 rounded p-1.5 bg-[#042822]/60 text-[5.5px] font-mono leading-tight space-y-0.5 text-right w-28">
            <div className="text-[#f4e9c8]/60 uppercase">SYS.LOC // GOA</div>
            <div className="text-[#f4e9c8]">15.4989° N / 73.8278° E</div>
            <div className="pt-0.5 border-t border-[#d7e65a]/20 flex justify-between">
              <span className="text-[#f4e9c8]/60">STATUS</span>
              <span className="text-coral-accent font-bold">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#f4e9c8]/60">SHIP DATE</span>
              <span className="text-[#f4e9c8]">28.10.2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Center Content Grid — directly below heading */}
      <div className="grid grid-cols-12 gap-2 -mt-25 mb-0 z-10 items-center">
        
        {/* Left Column: Polaroid Photo Card */}
        <div className="col-span-5 relative flex flex-col items-center">
          <div className="w-full aspect-4/5 bg-[#f4e9c8] p-1.5 rounded shadow-lg flex flex-col justify-between">
            {/* Inner Photo Window */}
            <div className="w-full flex-1 bg-[#0b6839] overflow-hidden rounded-xs relative">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={nameVal}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05]"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <span className="text-[5px] text-[#f4e9c8]/60 tracking-widest uppercase">PHOTO</span>
                  <span className="text-xs text-[#f4e9c8]/40">+</span>
                </div>
              )}
            </div>
            <div className="text-[5px] font-mono text-[#092f29] font-bold tracking-widest text-right pt-1">
              CHECK // 001
            </div>
          </div>

          {/* Left Vertical Serial Label */}
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 -rotate-90 text-[5px] font-mono tracking-widest text-[#d7e65a]/50 whitespace-nowrap">
            ID: {builderId}
          </div>
        </div>

        {/* Right Column: User Info Fields */}
        <div className="col-span-7 flex flex-col gap-2.5 pl-1">
          
          {/* Builder Name */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#f4e9c8]/60 text-[6px] tracking-widest uppercase font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>BUILDER NAME</span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold uppercase text-[#f4e9c8] tracking-wide truncate border-b border-dashed border-[#d7e65a]/30 pb-0.5">
              {nameVal}
            </div>
          </div>

          {/* Builder Role */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#f4e9c8]/60 text-[6px] tracking-widest uppercase font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              <span>BUILDER ROLE</span>
            </div>
            <div className="text-[9px] font-bold uppercase text-[#f4e9c8]/90 tracking-wide truncate border-b border-dashed border-[#d7e65a]/30 pb-0.5">
              {roleVal}
            </div>
          </div>

          {/* Stack */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#f4e9c8]/60 text-[6px] tracking-widest uppercase font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span>STACK</span>
            </div>
            <div className="text-[7.5px] font-semibold uppercase text-[#f4e9c8]/80 tracking-wide truncate border-b border-dashed border-[#d7e65a]/30 pb-0.5">
              {stackVal}
            </div>
          </div>

          {/* Builder Class Container */}
          <div className="flex flex-col mt-0.5">
            <span className="text-[6px] text-[#f4e9c8]/60 tracking-widest uppercase font-bold mb-0.5">
              BUILDER CLASS
            </span>
            <div className="w-full bg-[#f4e9c8] rounded px-2 py-1.5 flex justify-between items-center text-[#092f29] shadow">
              <span className="text-[9.5px] font-black uppercase tracking-wider truncate">
                {classVal}
              </span>
              <span className="font-mono text-[9px] font-bold bg-[#092f29] text-[#f4e9c8] px-1 py-0.2 rounded">
                &gt;_
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Sunrise Background — clipped container anchored to bottom, image bottom-aligned above footer */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-1" style={{ height: '50%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={sunriseBgDataUrl} 
          alt="Sunrise Beach Background" 
          className="absolute bottom-13 left-0 w-full h-auto"
        />
      </div>

      {/* Footer Bar Section */}
      <div className="flex justify-between items-center pt-1 border-t border-[#d7e65a]/20 z-10">
        
        {/* Left: Dynamic QR Code Box */}
        <div className="w-10 h-10 bg-[#f4e9c8] p-0.5 rounded flex items-center justify-center shrink-0 shadow">
          {qrCodeDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrCodeDataUrl} alt="QR Code" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-[#063b32]/20" />
          )}
        </div>

        {/* Center: Barcode and Serial */}
        <div className="flex flex-col items-center">
          <span className="text-[5px] font-mono text-[#f4e9c8]/60 tracking-widest uppercase">
            BUILDER ID
          </span>
          <div className="flex items-center gap-[0.5px] my-0.5">
            {renderBarcodeBars()}
          </div>
          <span className="text-[6.5px] font-mono text-[#d7e65a] font-bold tracking-widest">
            {builderId}
          </span>
        </div>

        {/* Right: Access Level and Status */}
        <div className="text-right flex flex-col items-end">
          <span className="text-[5px] font-mono text-[#f4e9c8]/60 tracking-widest uppercase">
            ACCESS LEVEL
          </span>
          <span className="text-[10px] font-black text-[#d7e65a] tracking-wider uppercase">
            BUILDER
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-hot-pink border border-warm-white"></span>
            <span className="text-[5.5px] font-mono text-[#f4e9c8] font-bold">ACTIVE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
