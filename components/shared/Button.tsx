import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "relative px-6 py-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-150 border outline-none font-bold active:scale-[0.98]";
  const variants = {
    primary: "bg-white text-zinc-950 border-white hover:bg-transparent hover:text-white disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-zinc-800 disabled:cursor-not-allowed disabled:active:scale-100",
    secondary: "bg-transparent text-zinc-300 border-zinc-800 hover:border-zinc-400 hover:text-white disabled:text-zinc-700 disabled:border-zinc-900 disabled:cursor-not-allowed disabled:active:scale-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
