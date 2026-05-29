"use client";

import { useState, useMemo } from "react";
import { matches, GROUPS, STAGES, type Stage } from "@/data/matches";
import MatchCard from "@/components/ui/MatchCard";
import { Search, Filter, Trophy, Calendar } from "lucide-react";

const ALL = "All";

export default function SchedulePage() {
  const [activeGroup, setActiveGroup] = useState<string>(ALL);
  const [activeStage, setActiveStage] = useState<string>(ALL);
  const [search, setSearch]           = useState("");

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      const matchesGroup = activeGroup === ALL || m.group === activeGroup;
      const matchesStage = activeStage === ALL || m.stage === activeStage;
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        m.homeTeam.toLowerCase().includes(query) ||
        m.awayTeam.toLowerCase().includes(query) ||
        m.city.toLowerCase().includes(query) ||
        m.venue.toLowerCase().includes(query);
      return matchesGroup && matchesStage && matchesSearch;
    });
  }, [activeGroup, activeStage, search]);

  // When a stage tab is clicked, clear group filter (they don't mix)
  function handleStageClick(stage: string) {
    setActiveStage(stage);
    if (stage !== ALL && stage !== "Group Stage") setActiveGroup(ALL);
  }

  function handleGroupClick(group: string) {
    setActiveGroup(group);
    if (group !== ALL) setActiveStage(ALL);
  }

  const groupCount = GROUPS.reduce<Record<string, number>>((acc, g) => {
    acc[g] = matches.filter((m) => m.group === g).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ─── Page Header ──────────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="neon-badge flex items-center gap-2">
              <Calendar size={10} />
              June 11 — July 19, 2026
            </span>
          </div>
          <h1 className="font-orbitron font-black text-3xl sm:text-5xl mb-4" style={{ color: "#ffffff" }}>
            <span className="text-glow-green">Full</span> Schedule
          </h1>
          <p className="text-sm" style={{ color: "#7070a0" }}>
            All 104 matches · Group Stage through the Final
          </p>
        </div>

        {/* ─── Search ───────────────────────────────────────────── */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search size={16} color="#7070a0" className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search team, city, or venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl font-orbitron text-sm tracking-wide outline-none transition-all duration-300"
            style={{
              background: "rgba(13,13,34,0.9)",
              border: "1px solid rgba(0,255,136,0.2)",
              color: "#ffffff",
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,255,136,0.6)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 20px rgba(0,255,136,0.1)"; }}
            onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = "rgba(0,255,136,0.2)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
          />
        </div>

        {/* ─── Stage Tabs ───────────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={12} color="#ffd700" />
            <span className="font-orbitron text-[10px] tracking-[0.2em] uppercase" style={{ color: "#7070a0" }}>Stage</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[ALL, ...STAGES].map((stage) => {
              const active = activeStage === stage;
              const stageColors: Record<string, string> = {
                "Group Stage":"#00ff88","Round of 32":"#00d4ff","Round of 16":"#bf5fff",
                "Quarterfinal":"#ff9900","Semifinal":"#ff3366","Third Place":"#7070a0","Final":"#ffd700",
              };
              const color = stage === ALL ? "#7070a0" : (stageColors[stage] ?? "#7070a0");
              return (
                <button
                  key={stage}
                  onClick={() => handleStageClick(stage)}
                  className="px-4 py-2 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-all duration-200"
                  style={{
                    background: active ? `${color}18` : "rgba(13,13,34,0.8)",
                    border: `1px solid ${active ? color + "60" : "rgba(255,255,255,0.08)"}`,
                    color: active ? color : "#7070a0",
                    boxShadow: active ? `0 0 15px ${color}20` : "none",
                  }}
                >
                  {stage}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Group Tabs (only shown when Group Stage is active or ALL) ─ */}
        {(activeStage === ALL || activeStage === "Group Stage") && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={12} color="#00ff88" />
              <span className="font-orbitron text-[10px] tracking-[0.2em] uppercase" style={{ color: "#7070a0" }}>Group</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleGroupClick(ALL)}
                className="px-4 py-2 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-all duration-200"
                style={{
                  background: activeGroup === ALL ? "rgba(0,255,136,0.1)" : "rgba(13,13,34,0.8)",
                  border: `1px solid ${activeGroup === ALL ? "rgba(0,255,136,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: activeGroup === ALL ? "#00ff88" : "#7070a0",
                }}
              >
                All Groups
              </button>
              {GROUPS.map((g) => {
                const active = activeGroup === g;
                return (
                  <button
                    key={g}
                    onClick={() => handleGroupClick(g)}
                    className="w-10 h-10 rounded-lg font-orbitron font-black text-sm transition-all duration-200"
                    style={{
                      background: active ? "rgba(0,255,136,0.15)" : "rgba(13,13,34,0.8)",
                      border: `1px solid ${active ? "rgba(0,255,136,0.6)" : "rgba(255,255,255,0.08)"}`,
                      color: active ? "#00ff88" : "#7070a0",
                      boxShadow: active ? "0 0 15px rgba(0,255,136,0.2)" : "none",
                    }}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Results count ────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-orbitron text-xs tracking-widest" style={{ color: "#404060" }}>
            <span style={{ color: "#00ff88" }}>{filtered.length}</span> matches found
          </p>
          {(search || activeGroup !== ALL || activeStage !== ALL) && (
            <button
              onClick={() => { setSearch(""); setActiveGroup(ALL); setActiveStage(ALL); }}
              className="font-orbitron text-[10px] tracking-widest uppercase transition-colors duration-200"
              style={{ color: "#7070a0" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff3366")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7070a0")}
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* ─── Grid ─────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-orbitron text-4xl mb-4" style={{ color: "#404060" }}>404</p>
            <p className="font-orbitron text-sm tracking-widest" style={{ color: "#7070a0" }}>No matches found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}

        {/* ─── Group Summary Table ──────────────────────────────── */}
        {(activeStage === ALL || activeStage === "Group Stage") && activeGroup === ALL && !search && (
          <div className="mt-16">
            <div className="neon-divider mb-8" />
            <h2 className="font-orbitron font-black text-xl mb-6 text-center" style={{ color: "#ffffff" }}>
              Group Overview
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {GROUPS.map((g) => {
                const groupMatches = matches.filter((m) => m.group === g);
                const teams = Array.from(new Set(groupMatches.flatMap((m) => [m.homeTeam, m.awayTeam])));
                return (
                  <button
                    key={g}
                    onClick={() => handleGroupClick(g)}
                    className="rounded-xl p-4 text-left transition-all duration-200"
                    style={{
                      background: "rgba(13,13,34,0.8)",
                      border: "1px solid rgba(0,255,136,0.15)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,136,0.5)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(0,255,136,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,136,0.15)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <p className="font-orbitron font-black text-lg mb-2" style={{ color: "#00ff88" }}>
                      Group {g}
                    </p>
                    <div className="space-y-1">
                      {teams.map((t) => (
                        <p key={t} className="text-[10px]" style={{ color: "#7070a0" }}>{t}</p>
                      ))}
                    </div>
                    <p className="mt-3 text-[10px] font-orbitron" style={{ color: "#404060" }}>
                      {groupCount[g]} matches
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
