"use client";

import React from "react";
import Link from "next/link";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-teal-deep text-warm-white font-sans selection:bg-warm-white selection:text-teal-deep overflow-x-hidden">
      {/* Scroll-driven Hero poster section */}
      <Hero />

      {/* Intro Generator Section */}
      <section className="relative w-full py-24 md:py-32 bg-black/10 border-t border-warm-white/10 z-50">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bright-yellow font-bold">
              [ PROFILE REGISTRATION ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-warm-white">
              BUILD YOUR ID
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-wider text-warm-white/60 leading-relaxed max-w-sm">
              Generate a custom HH Goa 2026 digital badge to showcase your technology stack and role. Bring your builder identity to life.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <Link 
              href="/build" 
              className="group inline-flex items-center justify-between px-8 py-5 bg-hot-pink hover:bg-bright-yellow text-black font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all duration-150 active:scale-[0.98]"
            >
              <span>BUILD YOUR ID NOW</span>
              <span className="transform transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
            
            <div className="flex items-center gap-4 text-left font-mono text-[8px] uppercase tracking-widest text-warm-white/40">
              <span>STATUS // NO AUTH REQUIRED</span>
              <span>•</span>
              <span>FREE FOR ALL BUILDERS</span>
            </div>
          </div>
          
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="w-full bg-black/20 z-50">
        <div className="w-full border-t border-warm-white/5"></div>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-warm-white/40 font-bold">
            HH GOA 2026 · GOA, INDIA · 28—31 OCT 2026
          </p>
          <div className="flex gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-warm-white/40 font-bold">
            <span>[ BUILD ]</span>
            <span>[ SHIP ]</span>
            <span>[ REPEAT ]</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
