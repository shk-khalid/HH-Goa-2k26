import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 text-zinc-50">
      <main className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Goaframe Builder ID Card Generator
        </h1>
        <p className="text-zinc-400 text-lg">
          Welcome to the builder card generator. The builder interface is coming soon.
        </p>
      </main>
    </div>
  );
}
