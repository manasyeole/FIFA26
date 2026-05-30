"use client";

import { useState, useMemo } from "react";
import { matches } from "@/data/matches";
import type { Match } from "@/types";
import MatchCard from "@/components/ui/MatchCard";
import MatchPosterModal from "@/components/features/match/MatchPosterModal";
import { Calendar, Globe } from "lucide-react";

const ALL = "All";

// Get unique sorted match dates for day filter
const MATCH_DAYS = Array.from(new Set(matches.map((m) => m.date))).sort();

// Get unique team names for country filter
const ALL_TEAMS = Array.from(
  new Set(
    matches
      .flatMap((m) => [m.homeTeam, m.awayTeam])
      .filter((t) => !t.match(/^[WL]\d+$/) && !t.match(/^\d[A-L]/))
  )
).sort();

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState<string>(ALL);
  const [activeCountry, setActiveCountry] = useState<string>(ALL);
  const [posterMatch, setPosterMatch] = useState<Match | null>(null);

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      const matchesDay = activeDay === ALL || m.date === activeDay;
      const matchesCountry =
        activeCountry === ALL ||
        m.homeTeam.toLowerCase().includes(activeCountry.toLowerCase()) ||
        m.awayTeam.toLowerCase().includes(activeCountry.toLowerCase());
      return matchesDay && matchesCountry;
    });
  }, [activeDay, activeCountry]);

  function clearAll() {
    setActiveDay(ALL);
    setActiveCountry(ALL);
  }

  const isFiltered = activeDay !== ALL || activeCountry !== ALL;

  function formatDay(dateStr: string) {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", weekday: "short" });
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <span className="neon-badge flex items-center gap-2">
              <Calendar size={10} />
              Jun 11 – Jul 19, 2026
            </span>
          </div>
          <h1
            className="font-orbitron font-black text-3xl sm:text-5xl mb-4"
            style={{ color: "#ffffff" }}
          >
            <span className="text-glow-green">Full</span> Schedule
          </h1>
          <p className="text-sm" style={{ color: "#7070a0" }}>
            All 104 matches · All times shown in IST 🇮🇳
          </p>
        </div>

        {/* ── Day filter ───────────────────────────────────────────────── */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={11} color="#00d4ff" />
            <span
              className="font-orbitron text-[10px] tracking-widest uppercase"
              style={{ color: "#7070a0" }}
            >
              Match Day
            </span>
          </div>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pb-1">
            <button
              onClick={() => setActiveDay(ALL)}
              className="px-3 py-1.5 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-all flex-shrink-0"
              style={{
                background: activeDay === ALL ? "rgba(0,212,255,0.12)" : "rgba(13,13,34,0.8)",
                border: `1px solid ${activeDay === ALL ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: activeDay === ALL ? "#00d4ff" : "#7070a0",
              }}
            >
              All Days
            </button>
            {MATCH_DAYS.map((day) => {
              const active = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className="px-3 py-1.5 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-all flex-shrink-0"
                  style={{
                    background: active ? "rgba(0,212,255,0.12)" : "rgba(13,13,34,0.8)",
                    border: `1px solid ${active ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                    color: active ? "#00d4ff" : "#7070a0",
                    boxShadow: active ? "0 0 12px rgba(0,212,255,0.2)" : "none",
                  }}
                >
                  {formatDay(day)}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Country filter ───────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={11} color="#bf5fff" />
            <span
              className="font-orbitron text-[10px] tracking-widest uppercase"
              style={{ color: "#7070a0" }}
            >
              Country
            </span>
          </div>
          <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pb-1">
            <button
              onClick={() => setActiveCountry(ALL)}
              className="px-3 py-1.5 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-all flex-shrink-0"
              style={{
                background: activeCountry === ALL ? "rgba(191,95,255,0.12)" : "rgba(13,13,34,0.8)",
                border: `1px solid ${activeCountry === ALL ? "rgba(191,95,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: activeCountry === ALL ? "#bf5fff" : "#7070a0",
              }}
            >
              All Countries
            </button>
            {ALL_TEAMS.map((team) => {
              const active = activeCountry === team;
              return (
                <button
                  key={team}
                  onClick={() => setActiveCountry(active ? ALL : team)}
                  className="px-3 py-1.5 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-all flex-shrink-0"
                  style={{
                    background: active ? "rgba(191,95,255,0.12)" : "rgba(13,13,34,0.8)",
                    border: `1px solid ${active ? "rgba(191,95,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                    color: active ? "#bf5fff" : "#7070a0",
                  }}
                >
                  {team}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results + Clear */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-orbitron text-xs tracking-widest" style={{ color: "#404060" }}>
            <span style={{ color: "#00ff88" }}>{filtered.length}</span> matches found
          </p>
          {isFiltered && (
            <button
              onClick={clearAll}
              className="font-orbitron text-[10px] tracking-widest uppercase transition-colors"
              style={{ color: "#7070a0" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff3366")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7070a0")}
            >
              Clear all filters ✕
            </button>
          )}
        </div>

        {/* Match grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-orbitron text-4xl mb-4" style={{ color: "#404060" }}>
              —
            </p>
            <p className="font-orbitron text-sm tracking-widest" style={{ color: "#7070a0" }}>
              No matches found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((match) => (
              <MatchCard key={match.id} match={match} onPoster={setPosterMatch} />
            ))}
          </div>
        )}
      </div>

      {/* Match Poster Modal */}
      <MatchPosterModal match={posterMatch} onClose={() => setPosterMatch(null)} />
    </div>
  );
}
