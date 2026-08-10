import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "relative px-6 py-4 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-150 border outline-none font-bold active:scale-[0.98]";
  const variants = {
    primary: "bg-hot-pink text-black border-hot-pink hover:bg-bright-yellow hover:border-bright-yellow disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-800 disabled:cursor-not-allowed disabled:active:scale-100",
    secondary: "bg-transparent text-warm-white border-warm-white/30 hover:border-hot-pink hover:text-hot-pink disabled:text-zinc-700 disabled:border-zinc-800 disabled:cursor-not-allowed disabled:active:scale-100",
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
