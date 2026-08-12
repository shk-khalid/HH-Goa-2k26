import React from "react";

export default function Footer() {
  return (
    <footer
      className="w-full py-[4vw] sm:py-6 text-center font-mono relative z-30 border-t border-white/10 mt-auto backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_-4px_30px_rgba(0,0,0,0.2)]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-1 sm:gap-2">
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 text-[6px] sm:text-[10px] md:text-xs uppercase tracking-wider font-bold">
          <span className="text-[#00A29A]">#FrameInGoa</span>
          <span className="text-white/60">•</span>
          <span className="text-white">HH GOA 2026</span>
          <span className="text-white/60">•</span>
          <span className="text-white">August 28-31, 2026</span>
          <span className="text-white/60">•</span>
          <span className="text-white">Goa, India</span>
        </div>
        <p className="text-[5px] sm:text-[8px] md:text-[9px] text-[#00A29A] uppercase tracking-widest font-bold">
          BUILT BY TEAM ANTIMATTER &nbsp;
          <span className="text-[4px] sm:text-[7px] md:text-[8px] text-white/50 uppercase tracking-widest">
            For HH Goa 2026 builders & attendees.
          </span>
        </p>
      </div>
    </footer>
  );
}
