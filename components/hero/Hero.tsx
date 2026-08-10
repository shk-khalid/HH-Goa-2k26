"use client";

import React from "react";
import Link from "next/link";
import Logo from "../shared/Logo";
import { GridScan } from "./GridScan";

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-teal-deep select-none overflow-hidden">
      {/* Layer 1: Background Base */}
      <div className="absolute inset-0 bg-teal-deep z-0"></div>

      {/* Layer 2: WebGL GridScan Background (LOCKED - VISUALLY UNCHANGED) */}
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

      {/* Foreground Composition Layer (z-30) */}
      <div className="absolute inset-0 z-30 flex flex-col justify-between max-w-7xl mx-auto px-6 py-28 pointer-events-none">
        
        {/* Top Spacer to push content below the header */}
        <div className="h-1"></div>

        {/* Asymmetrical Big Typography and Small Meta */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-lime-acid font-black block">
              [ HH GOA BUILDERS ASSEMBLY ]
            </span>
            <h1 className="text-[10vw] sm:text-[8vw] lg:text-[7vw] font-black uppercase tracking-tight leading-[0.85] text-sand-warm">
              BUILD<br />
              SOMETHING<br />
              IN <span className="text-lime-acid">GOA</span>
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-sand-warm/10 lg:pl-8 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-sand-warm/65 leading-relaxed max-w-xs">
              An experimental creative technology gathering on the coastline. Join engineers, designers, and builders to shape the future.
            </p>
            <div className="flex flex-col gap-1.5 font-mono text-[8px] uppercase tracking-widest text-sand-warm/40">
              <div>SYS.LOC // 15.49° N / 73.82° E</div>
              <div>BUILD STATUS // ACTIVE</div>
              <div>SHIP DATE // 28—31 OCT 2026</div>
            </div>
          </div>

        </div>

        {/* Bottom CTA and Footer metadata row */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-6 w-full pt-8 border-t border-sand-warm/10">
          
          {/* Action button */}
          <div className="w-full sm:w-auto pointer-events-auto">
            <Link 
              href="/build" 
              className="group inline-flex items-center gap-8 px-10 py-5 bg-coral-accent hover:bg-lime-acid text-teal-deep font-mono text-xs uppercase tracking-[0.2em] font-black border border-coral-accent hover:border-lime-acid transition-all duration-150 w-full sm:w-auto justify-between active:scale-[0.98]"
            >
              <span>BUILD YOUR ID</span>
              <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>

          {/* Abstract event tags */}
          <div className="flex gap-4 font-mono text-[8px] uppercase tracking-[0.2em] text-sand-warm/40 font-bold">
            <span>[ BUILD ]</span>
            <span>[ SHIP ]</span>
            <span>[ REPEAT ]</span>
          </div>

        </div>

      </div>
    </div>
  );
}
