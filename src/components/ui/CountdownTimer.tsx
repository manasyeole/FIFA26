"use client";

import { useEffect, useState } from "react";

const KICKOFF = new Date("2026-06-11T21:00:00-06:00"); // Mexico City opening match

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = KICKOFF.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Segment({ value, label, color = "#00ff88" }: { value: number; label: string; color?: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center"
        style={{
          background: "rgba(0,0,0,0.6)",
          border: `1px solid ${color}40`,
          boxShadow: `0 0 20px ${color}20, inset 0 0 20px ${color}08`,
        }}
      >
        {/* Corner accents */}
        <span className="absolute top-1 left-1 w-2 h-2 border-t border-l" style={{ borderColor: color }} />
        <span className="absolute top-1 right-1 w-2 h-2 border-t border-r" style={{ borderColor: color }} />
        <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l" style={{ borderColor: color }} />
        <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r" style={{ borderColor: color }} />

        <span
          className="font-orbitron text-3xl sm:text-4xl font-black tabular-nums"
          style={{ color, textShadow: `0 0 20px ${color}` }}
        >
          {display}
        </span>
      </div>
      <span
        className="mt-2 font-orbitron text-[10px] tracking-[0.2em] uppercase"
        style={{ color: "#7070a0" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const started = mounted && KICKOFF.getTime() <= Date.now();

  if (!mounted) {
    return (
      <div className="flex gap-3 sm:gap-6 justify-center">
        {["Days","Hours","Mins","Secs"].map((l) => (
          <div key={l} className="flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shimmer" />
            <span className="mt-2 font-orbitron text-[10px] tracking-[0.2em] uppercase" style={{ color: "#7070a0" }}>{l}</span>
          </div>
        ))}
      </div>
    );
  }

  if (started) {
    return (
      <div className="text-center">
        <p className="font-orbitron text-2xl text-glow-green animate-pulse">
          🔴 LIVE — WORLD CUP IS HAPPENING!
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-6 justify-center">
      <Segment value={timeLeft.days}    label="Days"    color="#00ff88" />
      <Segment value={timeLeft.hours}   label="Hours"   color="#00d4ff" />
      <Segment value={timeLeft.minutes} label="Minutes" color="#ff3366" />
      <Segment value={timeLeft.seconds} label="Seconds" color="#ffd700" />
    </div>
  );
}
