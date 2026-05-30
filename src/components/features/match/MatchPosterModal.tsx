"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Match } from "@/types";
import { getCountryByName, getFlagUrl, type Country } from "@/data/countries";
import { matchFullIST } from "@/lib/ist";
import { getPlayerThumb } from "@/lib/thesportsdb";
import { X, MapPin } from "lucide-react";

interface Props {
  match: Match | null;
  onClose: () => void;
}

const STAGE_COLORS: Record<string, string> = {
  "Group Stage": "#00ff88",
  "Round of 32": "#00d4ff",
  "Round of 16": "#bf5fff",
  Quarterfinal: "#ff9900",
  Semifinal: "#ff3366",
  "Third Place": "#7070a0",
  Final: "#ffd700",
};

// ── Player card (one side of the poster) ────────────────────────────────────
function PlayerSide({
  country,
  teamName,
  photoUrl,
  loading,
  mirror,
}: {
  country: Country | null;
  teamName: string;
  photoUrl: string | null;
  loading: boolean;
  mirror?: boolean;
}) {
  const color = country?.neonColor ?? "#7070a0";

  return (
    <div
      className="flex-1 relative flex flex-col items-center justify-between overflow-hidden"
      style={{
        background: country
          ? `linear-gradient(${mirror ? "225deg" : "135deg"}, ${color}22 0%, #030308 70%)`
          : "#030308",
      }}
    >
      {/* Flag — large, clear, faded backdrop */}
      {country && (
        <div className="absolute inset-0">
          <Image
            src={getFlagUrl(country.isoCode)}
            alt={teamName}
            fill
            className={`object-cover ${mirror ? "scale-x-[-1]" : ""}`}
            style={{ opacity: 0.18 }}
            unoptimized
          />
          {/* Inner vignette so player stands out */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, #030308 100%)`,
            }}
          />
        </div>
      )}

      {/* Top: player photo */}
      <div className="relative z-10 flex flex-col items-center pt-8 pb-2">
        {loading ? (
          <div className="rounded-full shimmer" style={{ width: 120, height: 120 }} />
        ) : photoUrl ? (
          <div
            className="rounded-full overflow-hidden relative"
            style={{
              width: 120,
              height: 120,
              border: `3px solid ${color}`,
              boxShadow: `0 0 30px ${color}60, 0 0 60px ${color}20`,
              flexShrink: 0,
            }}
          >
            <Image
              src={photoUrl}
              alt={country?.starPlayer.name ?? teamName}
              fill
              sizes="120px"
              className="object-cover object-top"
              unoptimized
            />
          </div>
        ) : (
          /* Fallback — jersey number circle */
          <div
            className="rounded-full flex items-center justify-center font-orbitron font-black"
            style={{
              width: 120,
              height: 120,
              background: `${color}15`,
              border: `3px solid ${color}80`,
              color: color,
              fontSize: "2.5rem",
              boxShadow: `0 0 30px ${color}40`,
            }}
          >
            {country?.starPlayer.number ? `#${country.starPlayer.number}` : "?"}
          </div>
        )}

        {/* Player name + position */}
        {country && (
          <div className="text-center mt-3 px-2">
            <p
              className="font-orbitron font-black text-sm leading-tight"
              style={{ color: "#ffffff" }}
            >
              {country.starPlayer.name}
            </p>
            <p
              className="font-orbitron text-[10px] tracking-widest uppercase mt-1"
              style={{ color: color }}
            >
              {country.starPlayer.position}
              {country.starPlayer.number ? ` · #${country.starPlayer.number}` : ""}
            </p>
          </div>
        )}
      </div>

      {/* Bottom: team name + flag badge */}
      <div className="relative z-10 flex flex-col items-center pb-4 gap-2">
        {/* Mini flag */}
        {country && (
          <div
            className="relative rounded overflow-hidden"
            style={{
              width: 44,
              height: 30,
              border: `1px solid ${color}60`,
              boxShadow: `0 0 10px ${color}30`,
            }}
          >
            <Image
              src={getFlagUrl(country.isoCode)}
              alt={teamName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <p
          className="font-orbitron font-black text-base tracking-wide"
          style={{ color: color, textShadow: `0 0 15px ${color}80` }}
        >
          {teamName}
        </p>
        {country && (
          <div className="flex gap-3 text-[10px] font-orbitron" style={{ color: "#7070a0" }}>
            <span>
              <span style={{ color: color }}>{country.starPlayer.caps}</span> caps
            </span>
            <span>
              <span style={{ color: color }}>{country.starPlayer.goals}</span> goals
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main modal ───────────────────────────────────────────────────────────────
export default function MatchPosterModal({ match, onClose }: Props) {
  const [homeThumb, setHomeThumb] = useState<string | null>(null);
  const [awayThumb, setAwayThumb] = useState<string | null>(null);
  const [loadingHome, setLoadingHome] = useState(false);
  const [loadingAway, setLoadingAway] = useState(false);

  const homeCountry = match ? (getCountryByName(match.homeTeam) ?? null) : null;
  const awayCountry = match ? (getCountryByName(match.awayTeam) ?? null) : null;
  const stageColor = match ? (STAGE_COLORS[match.stage] ?? "#00ff88") : "#00ff88";
  const istDisplay = match
    ? (matchFullIST(match.date, match.time, match.venue) ?? `${match.date} · ${match.time}`)
    : "";

  useEffect(() => {
    if (!match) return;
    // Only set loading=true for sides that will actually fetch
    const resetId = setTimeout(() => {
      setHomeThumb(null);
      setAwayThumb(null);
      if (homeCountry) setLoadingHome(true);
      if (awayCountry) setLoadingAway(true);
    }, 0);

    if (homeCountry) {
      const name = homeCountry.starPlayer.tsdbName ?? homeCountry.starPlayer.name;
      getPlayerThumb(name).then((url) => {
        setHomeThumb(url ?? null);
        setLoadingHome(false);
      });
    }

    if (awayCountry) {
      const name = awayCountry.starPlayer.tsdbName ?? awayCountry.starPlayer.name;
      getPlayerThumb(name).then((url) => {
        setAwayThumb(url ?? null);
        setLoadingAway(false);
      });
    }

    return () => clearTimeout(resetId);
  }, [match, homeCountry, awayCountry]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!match) return null;

  const homeColor = homeCountry?.neonColor ?? stageColor;
  const awayColor = awayCountry?.neonColor ?? stageColor;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl overflow-hidden"
        style={{
          background: "#030308",
          border: `1px solid ${stageColor}50`,
          boxShadow: `0 0 80px ${stageColor}15, 0 0 40px rgba(0,0,0,0.8)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top bar ── */}
        <div
          className="relative flex items-center justify-between px-5 py-3 z-20"
          style={{ borderBottom: `1px solid ${stageColor}20` }}
        >
          {/* Stage badge */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full font-orbitron text-[11px] tracking-widest uppercase"
            style={{
              background: `${stageColor}15`,
              border: `1px solid ${stageColor}50`,
              color: stageColor,
            }}
          >
            {match.group ? `Group ${match.group}` : match.stage}
          </div>
          {/* Match number */}
          <span className="font-orbitron text-xs" style={{ color: "#404060" }}>
            Match #{match.matchNumber}
          </span>
          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: "#7070a0", background: "rgba(255,255,255,0.04)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#7070a0")}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Two player sides + VS divider ── */}
        <div className="flex" style={{ minHeight: 320 }}>
          <PlayerSide
            country={homeCountry}
            teamName={match.homeTeam}
            photoUrl={homeThumb}
            loading={loadingHome}
          />

          {/* ── VS Centre ── */}
          <div
            className="relative z-10 flex flex-col items-center justify-center flex-shrink-0"
            style={{ width: 56 }}
          >
            {/* Vertical glow line */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px"
              style={{
                background: `linear-gradient(to bottom, transparent, ${stageColor}80, ${stageColor}80, transparent)`,
              }}
            />
            {/* VS circle */}
            <div
              className="relative flex items-center justify-center rounded-full font-orbitron font-black text-sm"
              style={{
                width: 44,
                height: 44,
                background: "#030308",
                border: `2px solid ${stageColor}`,
                color: stageColor,
                boxShadow: `0 0 20px ${stageColor}60`,
              }}
            >
              VS
            </div>
          </div>

          <PlayerSide
            country={awayCountry}
            teamName={match.awayTeam}
            photoUrl={awayThumb}
            loading={loadingAway}
            mirror
          />
        </div>

        {/* ── Bottom — IST time + venue ── */}
        <div
          className="relative z-10 px-5 py-4 text-center space-y-2"
          style={{
            borderTop: `1px solid rgba(255,255,255,0.06)`,
            background: "rgba(0,0,0,0.4)",
          }}
        >
          {/* Diagonal colour bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, ${homeColor}, ${stageColor}, ${awayColor})`,
            }}
          />

          <p
            className="font-orbitron text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "#7070a0" }}
          >
            Kick Off
          </p>

          {/* IST time — the big number */}
          <p
            className="font-orbitron font-black text-2xl sm:text-3xl tracking-wide"
            style={{
              color: "#00d4ff",
              textShadow: "0 0 20px rgba(0,212,255,0.7)",
            }}
          >
            🇮🇳 {istDisplay}
          </p>

          <div className="flex items-center justify-center gap-2">
            <MapPin size={12} color="#7070a0" />
            <p className="text-sm" style={{ color: "#a0a0c0" }}>
              {match.venue}, {match.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
