"use client";

import type { Match } from "@/types";
import { formatMatchDate, STAGE_COLORS, COUNTRY_FLAG } from "@/lib/utils";
import { MapPin, Clock, Calendar } from "lucide-react";

interface Props {
  match: Match;
  compact?: boolean;
}

export default function MatchCard({ match, compact = false }: Props) {
  const stageColor = STAGE_COLORS[match.stage] ?? "#7070a0";
  const isKnockout = match.stage !== "Group Stage";

  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-300 group cursor-default"
      style={{
        background: "rgba(13,13,34,0.8)",
        border: `1px solid ${stageColor}25`,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${stageColor}60`;
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 25px ${stageColor}15, 0 8px 30px rgba(0,0,0,0.4)`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${stageColor}25`;
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${stageColor}, transparent)` }}
      />

      <div className={compact ? "p-3" : "p-5"}>
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="neon-badge"
              style={{
                borderColor: `${stageColor}50`,
                color: stageColor,
                background: `${stageColor}10`,
              }}
            >
              {match.group ? `Group ${match.group}` : match.stage}
            </span>
            {isKnockout && (
              <span className="neon-badge neon-badge-gold">{match.stage}</span>
            )}
          </div>
          <span className="text-xs font-orbitron" style={{ color: "#404060" }}>
            #{match.matchNumber}
          </span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-2 my-4">
          {/* Home */}
          <div className="flex-1 text-center">
            <p
              className={`font-orbitron font-bold tracking-wide ${compact ? "text-sm" : "text-base"}`}
              style={{ color: "#ffffff" }}
            >
              {match.homeTeam}
            </p>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center px-3">
            <span
              className="font-orbitron font-black text-xs tracking-widest"
              style={{ color: stageColor, textShadow: `0 0 10px ${stageColor}` }}
            >
              VS
            </span>
          </div>

          {/* Away */}
          <div className="flex-1 text-center">
            <p
              className={`font-orbitron font-bold tracking-wide ${compact ? "text-sm" : "text-base"}`}
              style={{ color: "#ffffff" }}
            >
              {match.awayTeam}
            </p>
          </div>
        </div>

        {/* Meta info */}
        {!compact && (
          <div
            className="flex flex-wrap gap-3 pt-3 mt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-1.5">
              <Calendar size={11} color="#7070a0" />
              <span className="text-xs" style={{ color: "#7070a0" }}>
                {formatMatchDate(match.date)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} color="#7070a0" />
              <span className="text-xs" style={{ color: "#7070a0" }}>
                {match.time} local
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} color="#7070a0" />
              <span className="text-xs" style={{ color: "#7070a0" }}>
                {COUNTRY_FLAG[match.country]} {match.city}
              </span>
            </div>
          </div>
        )}

        {compact && (
          <div className="flex items-center gap-1.5 mt-2">
            <Calendar size={10} color="#404060" />
            <span className="text-[10px]" style={{ color: "#404060" }}>
              {formatMatchDate(match.date)} · {COUNTRY_FLAG[match.country]} {match.city}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
