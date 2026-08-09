import React from "react";

interface CardPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CardPage({ params }: CardPageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 text-zinc-50">
      <main className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Builder Card
        </h1>
        <p className="text-zinc-400 text-lg">
          Viewing card ID: <span className="font-mono text-amber-500">{id}</span>
        </p>
      </main>
    </div>
  );
}
