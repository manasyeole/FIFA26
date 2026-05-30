"use client";

import Image from "next/image";
import type { Match } from "@/types";
import { formatMatchDate, STAGE_COLORS, COUNTRY_FLAG } from "@/lib/utils";
import { useLocalTime } from "@/hooks/useLocalTime";
import { getCountryByName, getFlagUrl, getPlayerInitials } from "@/data/countries";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

interface Props {
  match: Match;
  compact?: boolean;
  onPoster?: (match: Match) => void;
}

function TeamCol({ teamName, showPlayer }: { teamName: string; showPlayer: boolean }) {
  const country = getCountryByName(teamName);
  const initials = country ? getPlayerInitials(country.starPlayer.name) : null;

  return (
    <div className="flex-1 flex flex-col items-center gap-1.5">
      {country ? (
        <div
          className="relative rounded-md overflow-hidden"
          style={{ width: "66px", height: "44px", flexShrink: 0 }}
        >
          <Image
            src={getFlagUrl(country.isoCode)}
            alt={`${teamName} flag`}
            fill
            sizes="66px"
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div
          className="rounded-md flex items-center justify-center"
          style={{
            width: "66px",
            height: "44px",
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ color: "#404060", fontSize: "9px" }}>TBD</span>
        </div>
      )}

      <p
        className="font-orbitron font-bold text-center text-xs leading-tight"
        style={{ color: "#ffffff" }}
      >
        {teamName}
      </p>

      {showPlayer && country && initials && (
        <div className="flex items-center gap-1">
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full font-orbitron font-black"
            style={{
              width: "18px",
              height: "18px",
              background: `${country.neonColor}20`,
              border: `1px solid ${country.neonColor}55`,
              color: country.neonColor,
              fontSize: "7px",
            }}
          >
            {initials}
          </div>
          <span
            className="text-[9px]"
            style={{
              color: "#7070a0",
              maxWidth: "58px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {country.starPlayer.name.split(" ").pop()}
          </span>
        </div>
      )}
    </div>
  );
}

export default function MatchCard({ match, compact = false, onPoster }: Props) {
  const stageColor = STAGE_COLORS[match.stage] ?? "#7070a0";
  const isKnockout = match.stage !== "Group Stage";
  const { istTime, isMounted } = useLocalTime(match.date, match.time, match.venue);

  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background: "rgba(13,13,34,0.85)",
        border: `1px solid ${stageColor}25`,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${stageColor}60`;
        el.style.boxShadow = `0 0 25px ${stageColor}15, 0 8px 30px rgba(0,0,0,0.4)`;
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${stageColor}25`;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      <div
        className="h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${stageColor}, transparent)`,
        }}
      />

      <div className={compact ? "p-3" : "p-4"}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
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
            {isKnockout && <span className="neon-badge neon-badge-gold">{match.stage}</span>}
          </div>
          <div className="flex items-center gap-2">
            {onPoster && !compact && (
              <button
                onClick={() => onPoster(match)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg font-orbitron text-[9px] tracking-widest uppercase transition-all duration-200"
                style={{
                  background: "rgba(255,215,0,0.08)",
                  border: "1px solid rgba(255,215,0,0.3)",
                  color: "#ffd700",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,215,0,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,215,0,0.08)";
                }}
                title="View match poster"
              >
                <ExternalLink size={9} />
                Poster
              </button>
            )}
            <span className="text-xs font-orbitron" style={{ color: "#404060" }}>
              #{match.matchNumber}
            </span>
          </div>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-1 my-3">
          <TeamCol teamName={match.homeTeam} showPlayer={!compact} />
          <div
            className="font-orbitron font-black text-xs tracking-widest flex-shrink-0 px-1"
            style={{ color: stageColor, textShadow: `0 0 10px ${stageColor}` }}
          >
            VS
          </div>
          <TeamCol teamName={match.awayTeam} showPlayer={!compact} />
        </div>

        {/* Meta */}
        {!compact && (
          <div
            className="pt-3 mt-1 space-y-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5">
                <Calendar size={10} color="#7070a0" />
                <span className="text-[11px]" style={{ color: "#7070a0" }}>
                  {formatMatchDate(match.date)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={10} color="#7070a0" />
                <span className="text-[11px]" style={{ color: "#7070a0" }}>
                  {COUNTRY_FLAG[match.country]} {match.city}
                </span>
              </div>
            </div>

            {/* IST Time — prominent */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: "rgba(0,212,255,0.07)",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
            >
              <span style={{ fontSize: "14px" }}>🇮🇳</span>
              <span
                className="font-orbitron font-bold tracking-wide"
                style={{
                  color: "#00d4ff",
                  fontSize: "13px",
                  textShadow: "0 0 10px rgba(0,212,255,0.6)",
                }}
              >
                {isMounted ? (istTime ? istTime : `${match.time} (local)`) : "Loading IST..."}
              </span>
            </div>
          </div>
        )}

        {compact && (
          <div className="flex flex-wrap items-center gap-x-2 mt-1.5">
            <div className="flex items-center gap-1">
              <Calendar size={9} color="#404060" />
              <span className="text-[9px]" style={{ color: "#404060" }}>
                {formatMatchDate(match.date)}
              </span>
            </div>
            <span style={{ color: "#404060", fontSize: "9px" }}>·</span>
            <span className="text-[9px]" style={{ color: "#404060" }}>
              {COUNTRY_FLAG[match.country]} {match.city}
            </span>
            {isMounted && istTime && (
              <>
                <span style={{ color: "#404060", fontSize: "9px" }}>·</span>
                <span className="text-[9px] font-orbitron" style={{ color: "#00d4ff" }}>
                  🇮🇳 {istTime}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
