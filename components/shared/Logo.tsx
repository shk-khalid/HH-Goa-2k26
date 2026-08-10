import React from "react";

export default function Logo() {
  return (
    <div className="h-[9vw] lg:h-12 w-auto flex items-center select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/hh-goa/2-47_logo.svg" 
        alt="2:47 Logo" 
        className="h-full w-auto object-contain"
      />
    </div>
  );
}
