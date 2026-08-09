import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-medium rounded transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
