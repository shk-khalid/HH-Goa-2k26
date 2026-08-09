"use client";

import React from "react";
import Link from "next/link";
import Logo from "../shared/Logo";
import { GridScan } from "./GridScan";

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-teal-deep select-none overflow-hidden">
      {/* Layer 1: Background */}
      <div className="absolute inset-0 bg-teal-deep z-0"></div>

      {/* Layer 2: WebGL GridScan Background */}
      <div className="absolute inset-0 z-10 opacity-35 pointer-events-none">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#285C63"
          gridScale={0.1}
          scanColor="#FF6B4A"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          lineJitter={0.1}
          scanGlow={0.5}
          scanSoftness={2}
          enableWebcam={false}
          showPreview={false}
          className="w-full h-full"
        />

        {/* Technical labels */}
        <div className="absolute top-24 left-8 font-mono text-[7px] text-sand-warm/30 uppercase tracking-widest leading-normal">
          LAT // 15.4989° N<br />
          LON // 73.8278° E<br />
          GRID_SCAN_ACTIVE
        </div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex justify-between items-center text-sand-warm">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <Logo />
            <span className="hidden md:inline font-mono text-[8px] uppercase tracking-[0.2em] text-sand-warm/40 font-bold border-l border-sand-warm/20 pl-4">
              GOA, INDIA · 28—31 OCT 2026
            </span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-sand-warm font-bold">
            #FRAMEINGOA
          </div>
        </div>
        <div className="w-full border-b border-sand-warm/10"></div>
      </header>

      {/* Layer 3: Giant Event Typography */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-[12vw] sm:text-[10vw] font-black uppercase tracking-tight leading-[0.8] text-sand-warm">
            BUILD<br />
            IN<br />
            <span className="text-lime-acid">GOA</span>
          </h1>
        </div>
      </div>

      {/* Layer 4: Secondary Typography / CTA */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between max-w-7xl mx-auto px-6 py-24 md:py-28 pointer-events-none">
        {/* Offset layout spacing */}
        <div className="mt-28 md:mt-32 max-w-xs md:max-w-sm pointer-events-auto">
          <p className="font-mono text-[10px] uppercase tracking-wider text-sand-warm/70 leading-relaxed">
            An experimental builders gathering on the coastal line. Bring your tech stack, meet other makers, and design your Goa ID card.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pointer-events-auto">
          {/* CTA Button */}
          <div className="w-full sm:w-auto">
            <Link 
              href="/build" 
              className="group inline-flex items-center gap-6 px-8 py-5 bg-coral-accent hover:bg-lime-acid text-teal-deep font-mono text-xs uppercase tracking-[0.2em] font-black border border-coral-accent hover:border-lime-acid transition-all duration-150 w-full justify-between"
            >
              <span>[ BUILD YOUR ID ]</span>
              <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
          
          {/* Tech metadata card */}
          <div className="hidden md:block border border-sand-warm/15 p-4 bg-dark-green/20 min-w-[200px] text-left">
            <div className="flex justify-between text-[8px] font-mono tracking-widest text-sand-warm/60">
              <span>EVENT STATUS //</span>
              <span className="text-lime-acid font-bold">ACTIVE</span>
            </div>
            <div className="flex justify-between text-[8px] font-mono tracking-widest text-sand-warm/60 mt-1">
              <span>TIDE RANGE //</span>
              <span>0.8M - 1.2M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
