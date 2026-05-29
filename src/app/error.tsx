"use client";

import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-5xl mb-6">⚡</div>

      <h1
        className="font-orbitron font-black text-2xl sm:text-3xl mb-4"
        style={{ color: "#ff3366", textShadow: "0 0 20px #ff336680" }}
      >
        Something went wrong
      </h1>

      <p className="text-sm mb-8 max-w-sm" style={{ color: "#7070a0", lineHeight: "1.8" }}>
        An unexpected error occurred. It&apos;s not a red card — try refreshing.
        {error.digest && (
          <span className="block mt-2 font-orbitron text-[10px]" style={{ color: "#404060" }}>
            Error ID: {error.digest}
          </span>
        )}
      </p>

      <div className="flex gap-4">
        <button onClick={reset} className="btn-neon btn-neon-pink">
          Try Again
        </button>
        <a href={ROUTES.home} className="btn-neon">
          Go Home
        </a>
      </div>
    </div>
  );
}
