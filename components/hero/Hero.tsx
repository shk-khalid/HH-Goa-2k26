"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../shared/Logo";
import EventHeaderLogo from "../shared/EventHeaderLogo";
import { GridScan } from "./GridScan";

export default function Hero() {
  const [gridScale, setGridScale] = useState(0.1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: denser grid to compensate for vertical crop zoom
        setGridScale(0.18);
      } else if (width < 1024) {
        // Tablet
        setGridScale(0.13);
      } else {
        // Desktop
        setGridScale(0.08);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-auto md:h-screen bg-teal-deep select-none overflow-hidden flex flex-col justify-between">
      {/* Layer 1: Background Base */}
      <div className="absolute inset-0 bg-teal-deep z-0"></div>

      {/* Layer 2: WebGL GridScan Background (LOCKED - VISUALLY UNCHANGED) */}
      <div className="absolute inset-0 z-10 opacity-35 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
          style={{ aspectRatio: "16/9" }}
        >
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#285C63"
            gridScale={gridScale}
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
            className="w-full h-full absolute inset-0"
          />
        </div>
      </div>

      {/* Header */}
      <header className="w-full relative z-30">
        <div className="max-w-7xl mx-auto px-[4vw] lg:px-6 py-[4vw] lg:py-8 flex justify-between items-center text-warm-white">
          <div className="flex items-center gap-[2vw] lg:gap-4">
            <Logo />
            <span className="h-[3vw] lg:h-4 border-l border-warm-white/20"></span>
            <span className="font-mono text-[1.1vw] lg:text-[8px] uppercase tracking-[0.2em] text-warm-white/45 font-bold whitespace-nowrap">
              GOA, INDIA · 28—31 OCT 2026
            </span>
          </div>
          <div className="font-mono text-[1.2vw] lg:text-[9px] uppercase tracking-[0.25em] text-hot-pink font-bold whitespace-nowrap">
            #FRAMEINGOA
          </div>
        </div>
        <div className="w-full border-b border-warm-white/10"></div>
      </header>

      {/* Main Body Grid */}
      <main className="max-w-7xl w-full h-auto mx-auto px-[4vw] lg:px-6 py-[6vw] lg:py-16 grid grid-cols-12 gap-[3vw] lg:gap-8 items-center relative z-30 flex-grow">
        
        {/* Left Column: Coordinates, Subtitle, SVG Header, and primary CTA */}
        <div className="col-span-7 flex flex-col justify-end w-full text-left">
          {/* Coordinates overlay */}
          <div className="font-mono text-[1vw] lg:text-[7px] text-warm-white/30 uppercase tracking-[0.25em] leading-normal mb-[2vw] lg:mb-4">
            LAT // 15.4989° N<br />
            LON // 73.8278° E<br />
            GRID_SCAN_ACTIVE
          </div>

          {/* Event subtitle */}
          <span className="font-mono text-[1.2vw] lg:text-[9px] uppercase tracking-[0.3em] text-hot-pink font-bold block mb-[1vw] lg:mb-2">
            [ HH GOA BUILDERS ASSEMBLY ]
          </span>

          {/* Giant SVG Heading */}
          <div className="w-full max-w-[560px] h-auto select-none">
            <EventHeaderLogo className="w-full h-auto" />
          </div>
 
           {/* Under SVG horizontal divider */}
           <div className="w-full border-b border-warm-white/10 my-6 max-w-[420px] sm:max-w-[500px] lg:max-w-[560px]"></div>
 
           {/* Action button */}
           <div className="w-full sm:w-auto pointer-events-auto">
             <Link 
               href="/build" 
               className="group inline-flex items-center gap-[4vw] sm:gap-8 px-3 sm:px-10 py-2 sm:py-4 bg-hot-pink hover:bg-bright-yellow text-black font-mono text-[8px] sm:text-xs uppercase tracking-[0.2em] font-bold border border-hot-pink hover:border-bright-yellow transition-all duration-150 w-full sm:w-auto justify-between active:scale-[0.98]"
             >
               <span>BUILD YOUR ID</span>
               <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
             </Link>
           </div>
         </div>
 
         {/* Right Column: Paragraph, Divider, Stats, and offset tags */}
         <div className="col-span-5 flex flex-col justify-end w-full border-l border-warm-white/10 pl-3 sm:pl-6 md:pl-12 py-2">
           {/* Paragraph copy */}
           <p className="font-mono text-[5.5px] sm:text-[8px] md:text-[10px] uppercase tracking-wider text-warm-white/70 leading-relaxed w-full">
             AN EXPERIMENTAL CREATIVE TECHNOLOGY GATHERING ON THE COASTLINE. JOIN ENGINEERS, DESIGNERS, AND BUILDERS TO SHAPE THE FUTURE.
           </p>
           
           {/* Divider */}
           <div className="w-full border-b border-warm-white/10 my-4 sm:my-6"></div>
 
           {/* Metadata rows */}
           <div className="flex flex-col gap-1 sm:gap-2 font-mono text-[5px] sm:text-[7px] uppercase tracking-widest text-warm-white/40 font-semibold">
             <div>SYS.LOC // <span className="text-bright-yellow">15.49° N / 73.82° E</span></div>
             <div>BUILD STATUS // <span className="text-hot-pink">ACTIVE</span></div>
             <div>SHIP DATE // <span className="text-pure-white">28—31 OCT 2026</span></div>
           </div>
 
           {/* Right column tag list */}
           <div className="flex gap-2 sm:gap-4 font-mono text-[5px] sm:text-[7px] uppercase tracking-[0.2em] text-warm-white/40 font-bold mt-8 sm:mt-12 justify-end w-full">
             <span>[ BUILD ]</span>
             <span>[ SHIP ]</span>
             <span>[ REPEAT ]</span>
           </div>
         </div>
 
       </main>
     </div>
   );
 }
