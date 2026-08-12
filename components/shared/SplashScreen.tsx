"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";

// Global module-level flag to track play status across client-side router transitions
let hasPlayedSplash = false;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bootLogIndex, setBootLogIndex] = useState(0);

  const bootLogs = [
    ">> INITIALIZING NEURAL FRAMEWORK...",
    ">> ESTABLISHING SECURITY DECRYPTION...",
    ">> RESOLVING TOKEN VERIFICATION HOSTS...",
    ">> LOADING ASSET RENDER ENGINE...",
    ">> ACCESS GRANTED // WELCOME BUILDER"
  ];

  // Check if splash screen was already played in this session on mount
  useEffect(() => {
    if (hasPlayedSplash) {
      setMounted(false);
    } else {
      setMounted(true);
    }
  }, []);

  // Cycle boot logs
  useEffect(() => {
    if (!mounted || bootLogIndex >= bootLogs.length - 1) return;
    const logTimer = setTimeout(() => {
      setBootLogIndex((prev) => prev + 1);
    }, 280);
    return () => clearTimeout(logTimer);
  }, [bootLogIndex, mounted]);

  // Fade out splash screen after 2.0 seconds
  useEffect(() => {
    if (!mounted) return;
    
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    const unmountTimer = setTimeout(() => {
      hasPlayedSplash = true; // Only lock the splash screen played state after a complete play sequence
      setMounted(false);
    }, 2500); // 1.8s delay + 700ms CSS fade-out transition

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [mounted]);

  if (!mounted) return null;

  // Cycle status texts based on boot log index
  const statusLabels = [
    "INITIALIZING SECURE TERMINAL",
    "DECRYPTING BUILDER SIGNATURES",
    "CONNECTING TO FRAME NETWORK",
    "LAUNCHING BUILDER ENGINE",
    "READY"
  ];
  const currentStatus = statusLabels[Math.min(bootLogIndex, statusLabels.length - 1)];

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#031412] flex flex-col items-center justify-center gap-6 transition-all duration-700 ease-out select-none ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,162,154,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,rgba(255,0,128,0.06)_50%,rgba(255,0,128,0.06)_51%,transparent_52%)] bg-[size:100%_80px] animate-[pulse_2s_infinite] pointer-events-none opacity-20" />

      {/* Main Logo branding wrapper */}
      <div className="flex flex-col items-center gap-3">
        {/* Scale logo slightly up for splash hero presence */}
        <div className="scale-110 sm:scale-125 transition-transform duration-300">
          <Logo />
        </div>
        <span className="font-mono text-[8px] text-warm-white/40 uppercase tracking-[0.4em] mt-3 font-semibold">
          Hacker House Goa // 2k26
        </span>
      </div>

      {/* Loading & Status Text wrapper */}
      <div className="flex flex-col items-center gap-4 mt-4 w-full">
        {/* Wider, thinner loading bar indicator */}
        <div className="w-56 h-[2px] bg-warm-white/10 rounded-full overflow-hidden relative shadow-inner">
          <div 
            className="h-full bg-hot-pink w-0 absolute left-0 top-0 animate-[loadingBar_1.8s_ease-out_forwards] shadow-[0_0_8px_#ff0080]" 
          />
        </div>

        {/* Pulsing status text indicator */}
        <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-bright-yellow animate-pulse text-center w-64 h-4 mt-1">
          [ {currentStatus} ]
        </div>
      </div>

      {/* Styling animation rule for loading bar */}
      <style jsx global>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          30% { width: 40%; }
          75% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
