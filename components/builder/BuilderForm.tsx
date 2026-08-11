"use client";

import React from "react";
import Button from "../shared/Button";

interface BuilderFormProps {
  name: string;
  role: string;
  stack: string;
  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStackChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export default function BuilderForm({
  name,
  role,
  stack,
  onNameChange,
  onRoleChange,
  onStackChange,
  onSubmit,
  isSubmitDisabled,
}: BuilderFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-[0.2em] text-sand-warm/85 font-bold">
          NAME *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Your name"
          required
          className="w-full bg-dark-green/50 border border-sand-warm/20 focus:border-coral-accent px-4 py-3.5 font-mono text-xs text-sand-warm placeholder-sand-warm/30 outline-none transition-all duration-150"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="role" className="font-mono text-[9px] uppercase tracking-[0.2em] text-sand-warm/85 font-bold">
            ROLE *
          </label>
          <span className="font-mono text-[7px] text-sand-warm/50 uppercase tracking-widest">
            {role.length}/20 MAX
          </span>
        </div>
        <input
          id="role"
          type="text"
          value={role}
          maxLength={20}
          onChange={(e) => onRoleChange(e.target.value.slice(0, 20))}
          placeholder="What do you build? (Max 20 chars)"
          required
          className="w-full bg-dark-green/50 border border-sand-warm/20 focus:border-coral-accent px-4 py-3.5 font-mono text-xs text-sand-warm placeholder-sand-warm/30 outline-none transition-all duration-150"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="stack" className="font-mono text-[9px] uppercase tracking-[0.2em] text-sand-warm/85 font-bold">
            STACK
          </label>
          <span className="font-mono text-[7px] text-sand-warm/50 uppercase tracking-widest">
            MAX 3 TAGS
          </span>
        </div>
        <input
          id="stack"
          type="text"
          value={stack}
          onChange={(e) => {
            const val = e.target.value;
            const parts = val.split(",");
            if (parts.length > 3) {
              onStackChange(parts.slice(0, 3).join(","));
            } else {
              onStackChange(val);
            }
          }}
          placeholder="React, Python, Rust... (Max 3 tags)"
          className="w-full bg-dark-green/50 border border-sand-warm/20 focus:border-coral-accent px-4 py-3.5 font-mono text-xs text-sand-warm placeholder-sand-warm/30 outline-none transition-all duration-150"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full mt-4"
      >
        Build my ID
      </Button>
    </form>
  );
}
