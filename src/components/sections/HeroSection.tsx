"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCountryByName, getFlagUrl } from "@/data/countries";
import { getPlayerThumb } from "@/lib/thesportsdb";
import { useCountdown } from "@/hooks/useCountdown";
import { ROUTES } from "@/constants/routes";
import { SITE_CONFIG } from "@/constants/config";
import { padZero } from "@/lib/utils";
import { Calendar, Zap } from "lucide-react";

// Eight superstars shown in the hero poster
const HERO_PLAYERS = [
  { country: "France", side: "left", size: "lg" },
  { country: "Argentina", side: "right", size: "lg" },
  { country: "Portugal", side: "left", size: "md" },
  { country: "England", side: "right", size: "md" },
  { country: "Brazil", side: "left", size: "sm" },
  { country: "Spain", side: "right", size: "sm" },
] as const;

const KICKOFF = new Date(SITE_CONFIG.tournament.kickoff);

interface PlayerCard {
  country: string;
  side: "left" | "right";
  size: "lg" | "md" | "sm";
  photoUrl: string | null;
  neonColor: string;
  playerName: string;
  flagUrl: string;
  caps: number;
  goals: number;
}

const SIZE_MAP = {
  lg: { dim: 150, fontSize: "11px" },
  md: { dim: 120, fontSize: "10px" },
  sm: { dim: 96, fontSize: "9px" },
};

function PlayerAvatar({ card }: { card: PlayerCard }) {
  const { dim, fontSize } = SIZE_MAP[card.size];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-default"
      style={{
        animation: `float ${3 + HERO_PLAYERS.findIndex((p) => p.country === card.country)}s ease-in-out infinite`,
        animationDelay: `${HERO_PLAYERS.findIndex((p) => p.country === card.country) * 0.4}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo ring */}
      <div
        className="relative rounded-full overflow-hidden transition-all duration-500"
        style={{
          width: dim,
          height: dim,
          border: `3px solid ${card.neonColor}`,
          boxShadow: hovered
            ? `0 0 40px ${card.neonColor}, 0 0 80px ${card.neonColor}60, 0 0 120px ${card.neonColor}20`
            : `0 0 20px ${card.neonColor}80, 0 0 40px ${card.neonColor}30`,
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        {card.photoUrl ? (
          <Image
            src={card.photoUrl}
            alt={card.playerName}
            fill
            sizes={`${dim}px`}
            className="object-cover object-top"
            unoptimized
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-orbitron font-black"
            style={{
              background: `radial-gradient(circle, ${card.neonColor}25, #030308)`,
              color: card.neonColor,
              fontSize: card.size === "lg" ? "2.5rem" : card.size === "md" ? "2rem" : "1.5rem",
            }}
          >
            {card.playerName.charAt(0)}
          </div>
        )}

        {/* Hover overlay */}
        {hovered && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-end pb-3 text-center"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            <p className="font-orbitron font-black text-[9px]" style={{ color: card.neonColor }}>
              {card.caps} caps · {card.goals} ⚽
            </p>
          </div>
        )}
      </div>

      {/* Flag + name row */}
      <div className="flex flex-col items-center gap-1">
        <div className="relative rounded overflow-hidden" style={{ width: 28, height: 19 }}>
          <Image
            src={card.flagUrl}
            alt={card.country}
            fill
            sizes="28px"
            className="object-cover"
            unoptimized
          />
        </div>
        <p
          className="font-orbitron font-bold text-center leading-tight"
          style={{
            fontSize,
            color: card.neonColor,
            textShadow: `0 0 8px ${card.neonColor}80`,
            maxWidth: dim,
          }}
        >
          {card.playerName.split(" ").slice(-1)[0]}
        </p>
        <p className="font-orbitron text-[8px]" style={{ color: "#404060" }}>
          {card.country}
        </p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [cards, setCards] = useState<PlayerCard[]>([]);
  const { days, hours, minutes, seconds, isMounted } = useCountdown(KICKOFF);

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        HERO_PLAYERS.map(async (p) => {
          const country = getCountryByName(p.country);
          if (!country) return null;
          const searchName = country.starPlayer.tsdbName ?? country.starPlayer.name;
          const photoUrl = await getPlayerThumb(searchName);
          return {
            country: p.country,
            side: p.side,
            size: p.size,
            photoUrl: photoUrl ?? null,
            neonColor: country.neonColor,
            playerName: country.starPlayer.name,
            flagUrl: getFlagUrl(country.isoCode),
            caps: country.starPlayer.caps ?? 0,
            goals: country.starPlayer.goals ?? 0,
          } satisfies PlayerCard;
        })
      );
      setCards(results.filter(Boolean) as PlayerCard[]);
    };
    fetchAll();
  }, []);

  const leftCards = cards.filter((c) => c.side === "left");
  const rightCards = cards.filter((c) => c.side === "right");

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-grid-animated"
      style={{
        minHeight: "100vh",
        background: "#030308",
        paddingTop: "80px",
        paddingBottom: "40px",
      }}
    >
      {/* ── Background radial glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            top: "20%",
            left: "10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(26,68,255,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "20%",
            right: "10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(116,212,255,0.10) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none bg-grid-animated"
        style={{ opacity: 0.4 }}
      />

      {/* ── Main layout: players | center | players ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* ── Left players ── */}
        <div className="hidden lg:flex flex-col items-end gap-6">
          {leftCards.map((card) => (
            <PlayerAvatar key={card.country} card={card} />
          ))}
        </div>

        {/* ── Center content ── */}
        <div className="flex-1 flex flex-col items-center text-center gap-6 min-w-0">
          {/* Pre-badge */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full font-orbitron text-[10px] tracking-[0.25em] uppercase"
            style={{
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.3)",
              color: "#00ff88",
            }}
          >
            <Calendar size={10} />
            Jun 11 – Jul 19 · USA · Canada · Mexico
          </div>

          {/* Main title */}
          <div className="space-y-0">
            <h1
              className="font-orbitron font-black leading-none"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: "#00ff88",
                textShadow: "0 0 40px #00ff8880, 0 0 80px #00ff8840",
              }}
            >
              FIFA
            </h1>
            <h1
              className="font-orbitron font-black leading-none"
              style={{
                fontSize: "clamp(2rem, 6vw, 5rem)",
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              WORLD CUP
            </h1>
            <h1
              className="font-orbitron font-black leading-none"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: "#ff3366",
                textShadow: "0 0 40px #ff336680, 0 0 80px #ff336640",
              }}
            >
              2026
            </h1>
          </div>

          {/* Tagline */}
          <p
            className="font-orbitron text-sm tracking-widest uppercase"
            style={{ color: "#7070a0" }}
          >
            48 Nations · 104 Matches · 1 Trophy
          </p>

          {/* Countdown */}
          <div className="w-full">
            <p
              className="font-orbitron text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: "#404060" }}
            >
              ⚡ Kickoff Countdown
            </p>
            {isMounted ? (
              <div className="flex gap-3 sm:gap-4 justify-center">
                {[
                  { val: days, label: "Days", color: "#00ff88" },
                  { val: hours, label: "Hours", color: "#00d4ff" },
                  { val: minutes, label: "Mins", color: "#ff3366" },
                  { val: seconds, label: "Secs", color: "#ffd700" },
                ].map((seg) => (
                  <div key={seg.label} className="flex flex-col items-center gap-1.5">
                    <div
                      className="relative flex items-center justify-center rounded-xl"
                      style={{
                        width: "72px",
                        height: "72px",
                        background: "rgba(0,0,0,0.6)",
                        border: `1px solid ${seg.color}40`,
                        boxShadow: `0 0 15px ${seg.color}20, inset 0 0 15px ${seg.color}08`,
                      }}
                    >
                      {/* Corner accents */}
                      <span
                        className="absolute top-1 left-1 w-2 h-2 border-t border-l"
                        style={{ borderColor: seg.color }}
                      />
                      <span
                        className="absolute top-1 right-1 w-2 h-2 border-t border-r"
                        style={{ borderColor: seg.color }}
                      />
                      <span
                        className="absolute bottom-1 left-1 w-2 h-2 border-b border-l"
                        style={{ borderColor: seg.color }}
                      />
                      <span
                        className="absolute bottom-1 right-1 w-2 h-2 border-b border-r"
                        style={{ borderColor: seg.color }}
                      />
                      <span
                        className="font-orbitron font-black text-2xl tabular-nums"
                        style={{ color: seg.color, textShadow: `0 0 15px ${seg.color}` }}
                      >
                        {padZero(seg.val)}
                      </span>
                    </div>
                    <span
                      className="font-orbitron text-[9px] tracking-widest uppercase"
                      style={{ color: "#7070a0" }}
                    >
                      {seg.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 justify-center">
                {["Days", "Hours", "Mins", "Secs"].map((l) => (
                  <div key={l} className="flex flex-col items-center gap-1.5">
                    <div className="w-[72px] h-[72px] rounded-xl shimmer" />
                    <span className="font-orbitron text-[9px]" style={{ color: "#7070a0" }}>
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link href={ROUTES.schedule} className="btn-neon flex items-center gap-2 text-xs">
              <Calendar size={12} />
              View Schedule
            </Link>
            <Link
              href={ROUTES.teams}
              className="btn-neon btn-neon-pink flex items-center gap-2 text-xs"
            >
              <Zap size={12} />
              All 48 Teams
            </Link>
          </div>

          {/* Mobile players row */}
          <div className="flex lg:hidden flex-wrap gap-4 justify-center pt-4">
            {cards.slice(0, 4).map((card) => (
              <PlayerAvatar key={card.country} card={{ ...card, size: "sm" }} />
            ))}
          </div>
        </div>

        {/* ── Right players ── */}
        <div className="hidden lg:flex flex-col items-start gap-6">
          {rightCards.map((card) => (
            <PlayerAvatar key={card.country} card={card} />
          ))}
        </div>
      </div>

      {/* ── Bottom neon strip ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, #00ff88, #00d4ff, #ff3366, transparent)",
        }}
      />

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
        </div>
      </div>
    </section>
  );
}
