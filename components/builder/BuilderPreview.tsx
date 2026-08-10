"use client";

import React from "react";
import BuilderCard from "../card/BuilderCard";
import Button from "../shared/Button";

interface BuilderPreviewProps {
  photo: File | null;
  name: string;
  role: string;
  stack: string;
  onBackToEdit: () => void;
}

export default function BuilderPreview({
  photo,
  name,
  role,
  stack,
  onBackToEdit,
}: BuilderPreviewProps) {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full flex justify-center">
        <BuilderCard
          photo={photo}
          name={name}
          role={role}
          stack={stack}
          builderTitle="THE BUILDER"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-90">
        <Button
          variant="secondary"
          onClick={onBackToEdit}
          className="w-full"
        >
          Edit Details
        </Button>
      </div>
    </div>
  );
}
