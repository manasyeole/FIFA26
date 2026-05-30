"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Match } from "@/types";
import { getCountryByName, getFlagUrl } from "@/data/countries";
import { matchFullIST } from "@/lib/ist";
import { getPlayerCutout, getPlayerThumb } from "@/lib/thesportsdb";
import { X, MapPin, Shield } from "lucide-react";

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

export default function MatchPosterModal({ match, onClose }: Props) {
  const [homeCutout, setHomeCutout] = useState<string | null>(null);
  const [awayCutout, setAwayCutout] = useState<string | null>(null);
  const [homeThumb, setHomeThumb] = useState<string | null>(null);
  const [awayThumb, setAwayThumb] = useState<string | null>(null);

  const homeCountry = match ? getCountryByName(match.homeTeam) : null;
  const awayCountry = match ? getCountryByName(match.awayTeam) : null;
  const stageColor = match ? (STAGE_COLORS[match.stage] ?? "#00ff88") : "#00ff88";
  const istDisplay = match
    ? (matchFullIST(match.date, match.time, match.venue) ?? `${match.date} ${match.time}`)
    : "";

  useEffect(() => {
    if (!match) return;
    // Defer state resets to satisfy set-state-in-effect rule
    const resetId = setTimeout(() => {
      setHomeCutout(null);
      setAwayCutout(null);
      setHomeThumb(null);
      setAwayThumb(null);
    }, 0);

    if (homeCountry) {
      const searchName = homeCountry.starPlayer.tsdbName ?? homeCountry.starPlayer.name;
      getPlayerCutout(searchName).then((url) => setHomeCutout(url ?? null));
      getPlayerThumb(searchName).then((url) => setHomeThumb(url ?? null));
    }
    if (awayCountry) {
      const searchName = awayCountry.starPlayer.tsdbName ?? awayCountry.starPlayer.name;
      getPlayerCutout(searchName).then((url) => setAwayCutout(url ?? null));
      getPlayerThumb(searchName).then((url) => setAwayThumb(url ?? null));
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: "#050510",
          border: `2px solid ${stageColor}40`,
          boxShadow: `0 0 60px ${stageColor}20`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg"
          style={{ background: "rgba(0,0,0,0.7)", color: "#ffffff" }}
        >
          <X size={18} />
        </button>

        {/* Stage badge — top center */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full font-orbitron text-xs tracking-widest uppercase"
            style={{
              background: `${stageColor}20`,
              border: `1px solid ${stageColor}60`,
              color: stageColor,
              boxShadow: `0 0 15px ${stageColor}30`,
            }}
          >
            <Shield size={10} />
            {match.group ? `Group ${match.group}` : match.stage}
          </div>
        </div>

        {/* Main poster area */}
        <div className="relative h-80 sm:h-96 flex">
          {/* Home side — blue gradient */}
          <div
            className="flex-1 relative overflow-hidden flex flex-col items-center justify-end pb-4"
            style={{
              background: homeCountry
                ? `linear-gradient(135deg, ${homeCountry.neonColor}15 0%, #050510 60%)`
                : "linear-gradient(135deg, #0a0a22 0%, #050510 60%)",
            }}
          >
            {/* Home flag background */}
            {homeCountry && (
              <div className="absolute inset-0 opacity-10">
                <Image
                  src={getFlagUrl(homeCountry.isoCode)}
                  alt={match.homeTeam}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {/* Player cutout — national jersey tint via mix-blend-mode: color */}
            {homeCutout ? (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                {/*
                  isolation: isolate creates a new compositing context so the
                  color blend only affects pixels inside this container, not the
                  poster background behind transparent cutout areas.
                  mix-blend-mode: color shifts jersey hue/saturation to national
                  team color while keeping the player's luminosity (shadows/highlights).
                */}
                <div
                  style={{ position: "relative", display: "inline-block", isolation: "isolate" }}
                >
                  <img
                    src={homeCutout}
                    alt={homeCountry?.starPlayer.name ?? match.homeTeam}
                    className="object-contain"
                    style={{ height: "260px", maxWidth: "100%", display: "block" }}
                  />
                  {homeCountry && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: homeCountry.neonColor,
                        opacity: 0.65,
                        mixBlendMode: "color",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              </div>
            ) : homeThumb ? (
              <div
                className="absolute bottom-8 rounded-full overflow-hidden"
                style={{
                  width: "100px",
                  height: "100px",
                  border: `3px solid ${homeCountry?.neonColor ?? stageColor}`,
                  boxShadow: `0 0 20px ${homeCountry?.neonColor ?? stageColor}60`,
                }}
              >
                <img
                  src={homeThumb}
                  alt={homeCountry?.starPlayer.name ?? match.homeTeam}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="absolute bottom-8 rounded-full flex items-center justify-center font-orbitron font-black text-2xl"
                style={{
                  width: "90px",
                  height: "90px",
                  background: `${homeCountry?.neonColor ?? stageColor}20`,
                  border: `2px solid ${homeCountry?.neonColor ?? stageColor}60`,
                  color: homeCountry?.neonColor ?? stageColor,
                }}
              >
                {homeCountry?.starPlayer.number ?? "#"}
              </div>
            )}
            {/* Team name + flag bottom */}
            <div className="relative z-10 text-center mt-auto">
              {homeCountry && (
                <div className="flex justify-center mb-1">
                  <div className="w-10 h-7 relative rounded overflow-hidden">
                    <Image
                      src={getFlagUrl(homeCountry.isoCode)}
                      alt={match.homeTeam}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}
              <p
                className="font-orbitron font-black text-sm"
                style={{ color: homeCountry?.neonColor ?? "#ffffff" }}
              >
                {match.homeTeam}
              </p>
              {homeCountry && (
                <p className="text-[10px] mt-0.5" style={{ color: "#7070a0" }}>
                  {homeCountry.starPlayer.name}
                </p>
              )}
            </div>
          </div>

          {/* VS center divider */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px z-10"
            style={{
              background: `linear-gradient(to bottom, transparent, ${stageColor}, ${stageColor}, transparent)`,
              boxShadow: `0 0 15px ${stageColor}`,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full font-orbitron font-black text-base"
            style={{
              width: "52px",
              height: "52px",
              background: "#050510",
              border: `2px solid ${stageColor}`,
              color: stageColor,
              boxShadow: `0 0 20px ${stageColor}80`,
            }}
          >
            VS
          </div>

          {/* Away side — mirror */}
          <div
            className="flex-1 relative overflow-hidden flex flex-col items-center justify-end pb-4"
            style={{
              background: awayCountry
                ? `linear-gradient(225deg, ${awayCountry.neonColor}15 0%, #050510 60%)`
                : "linear-gradient(225deg, #220a0a 0%, #050510 60%)",
            }}
          >
            {awayCountry && (
              <div className="absolute inset-0 opacity-10">
                <Image
                  src={getFlagUrl(awayCountry.isoCode)}
                  alt={match.awayTeam}
                  fill
                  className="object-cover scale-x-[-1]"
                  unoptimized
                />
              </div>
            )}
            {awayCutout ? (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div
                  style={{ position: "relative", display: "inline-block", isolation: "isolate" }}
                >
                  <img
                    src={awayCutout}
                    alt={awayCountry?.starPlayer.name ?? match.awayTeam}
                    className="object-contain scale-x-[-1]"
                    style={{ height: "260px", maxWidth: "100%", display: "block" }}
                  />
                  {awayCountry && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: awayCountry.neonColor,
                        opacity: 0.65,
                        mixBlendMode: "color",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              </div>
            ) : awayThumb ? (
              <div
                className="absolute bottom-8 rounded-full overflow-hidden"
                style={{
                  width: "100px",
                  height: "100px",
                  border: `3px solid ${awayCountry?.neonColor ?? stageColor}`,
                  boxShadow: `0 0 20px ${awayCountry?.neonColor ?? stageColor}60`,
                }}
              >
                <img
                  src={awayThumb}
                  alt={awayCountry?.starPlayer.name ?? match.awayTeam}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="absolute bottom-8 rounded-full flex items-center justify-center font-orbitron font-black text-2xl"
                style={{
                  width: "90px",
                  height: "90px",
                  background: `${awayCountry?.neonColor ?? stageColor}20`,
                  border: `2px solid ${awayCountry?.neonColor ?? stageColor}60`,
                  color: awayCountry?.neonColor ?? stageColor,
                }}
              >
                {awayCountry?.starPlayer.number ?? "#"}
              </div>
            )}
            <div className="relative z-10 text-center mt-auto">
              {awayCountry && (
                <div className="flex justify-center mb-1">
                  <div className="w-10 h-7 relative rounded overflow-hidden">
                    <Image
                      src={getFlagUrl(awayCountry.isoCode)}
                      alt={match.awayTeam}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}
              <p
                className="font-orbitron font-black text-sm"
                style={{ color: awayCountry?.neonColor ?? "#ffffff" }}
              >
                {match.awayTeam}
              </p>
              {awayCountry && (
                <p className="text-[10px] mt-0.5" style={{ color: "#7070a0" }}>
                  {awayCountry.starPlayer.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer — date + IST + venue */}
        <div
          className="px-6 py-4 text-center space-y-2"
          style={{ borderTop: `1px solid ${stageColor}20` }}
        >
          <p
            className="font-orbitron text-xs tracking-widest uppercase"
            style={{ color: "#7070a0" }}
          >
            Kick Off
          </p>
          <p
            className="font-orbitron font-black text-2xl tracking-wider"
            style={{
              color: "#00d4ff",
              textShadow: "0 0 20px rgba(0,212,255,0.8)",
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
