"use client";

import Link from "next/link";
import { matches } from "@/data/matches";
import CountdownTimer from "@/components/ui/CountdownTimer";
import MatchCard from "@/components/ui/MatchCard";
import AllCountriesGrid from "@/components/features/countries/AllCountriesGrid";
import { Trophy, Calendar, MapPin, Users, ArrowRight, Zap, Globe } from "lucide-react";

const STATS = [
  { value: "48",  label: "Nations",     icon: Globe,    color: "#00ff88" },
  { value: "104", label: "Matches",     icon: Trophy,   color: "#ffd700" },
  { value: "3",   label: "Countries",   icon: MapPin,   color: "#ff3366" },
  { value: "16",  label: "Host Cities", icon: Calendar, color: "#00d4ff" },
];

export default function HomePage() {
  const featuredMatches = matches
    .filter((m) => m.stage === "Group Stage" && ["A","B","C"].includes(m.group ?? ""))
    .slice(0, 6);

  return (
    <div className="min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 bg-grid-animated overflow-hidden"
        style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,255,136,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,51,102,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="neon-badge neon-badge-cyan flex items-center gap-2">
              <Zap size={10} />
              Official Tournament Starts June 11, 2026
            </span>
          </div>

          <h1 className="font-orbitron font-black leading-none mb-4" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            <span className="text-glow-green">FIFA</span>
            <br />
            <span style={{ color: "#ffffff" }}>WORLD CUP</span>
            <br />
            <span style={{ color: "#ff3366", textShadow: "0 0 20px #ff3366, 0 0 40px #ff336680" }}>2026</span>
          </h1>

          <p className="text-base sm:text-lg max-w-xl mx-auto mb-10" style={{ color: "#7070a0", lineHeight: "1.8" }}>
            48 teams. 3 countries. 104 matches. One trophy.<br />
            The biggest World Cup in history.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-14">
            <Link href="/schedule" className="btn-neon flex items-center gap-2">
              <Calendar size={14} />
              View All Matches
            </Link>
            <Link href="/gallery" className="btn-neon btn-neon-pink flex items-center gap-2">
              <Zap size={14} />
              Fan Gallery
            </Link>
          </div>

          <p className="font-orbitron text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#404060" }}>
            ⚡ Kickoff Countdown
          </p>
          <CountdownTimer />
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="neon-divider mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-6 text-center transition-all duration-300"
                style={{ background: "rgba(13,13,34,0.8)", border: `1px solid ${s.color}20` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${s.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${s.color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${s.color}20`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <s.icon size={20} color={s.color} className="mx-auto mb-3" />
                <p className="font-orbitron font-black text-4xl mb-1" style={{ color: s.color, textShadow: `0 0 20px ${s.color}80` }}>
                  {s.value}
                </p>
                <p className="font-orbitron text-[10px] tracking-widest uppercase" style={{ color: "#7070a0" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOST COUNTRIES ───────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { flag:"🇺🇸", name:"United States", matches:"78 matches", venues:"11 stadiums", color:"#00ff88" },
              { flag:"🇨🇦", name:"Canada",          matches:"10 matches", venues:"2 stadiums",  color:"#ff3366" },
              { flag:"🇲🇽", name:"Mexico",           matches:"10 matches", venues:"3 stadiums",  color:"#ffd700" },
            ].map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-4 rounded-xl p-5 transition-all duration-300"
                style={{ background: "rgba(13,13,34,0.6)", border: `1px solid ${c.color}20` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${c.color}40`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${c.color}20`; }}
              >
                <span className="text-4xl">{c.flag}</span>
                <div>
                  <p className="font-orbitron font-bold text-sm" style={{ color: c.color }}>{c.name}</p>
                  <p className="text-xs mt-1" style={{ color: "#7070a0" }}>{c.matches} · {c.venues}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED MATCHES ─────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-orbitron text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#00ff88" }}>Opening Week</p>
              <h2 className="font-orbitron font-black text-2xl sm:text-3xl" style={{ color: "#ffffff" }}>Featured Matches</h2>
            </div>
            <Link href="/schedule" className="flex items-center gap-2 font-orbitron text-xs tracking-widest uppercase" style={{ color: "#00ff88" }}>
              All 104 Matches <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ALL 48 NATIONS ──────────────────────────────────────────── */}
      <AllCountriesGrid />

      {/* ─── FINAL TEASER ─────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="neon-divider mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule CTA */}
            <div className="rounded-2xl p-8 text-center relative overflow-hidden" style={{ background: "rgba(13,13,34,0.8)", border: "1px solid rgba(255,215,0,0.2)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,215,0,0.04) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.4)", boxShadow: "0 0 25px rgba(255,215,0,0.2)" }}>
                  <Trophy size={24} color="#ffd700" />
                </div>
                <h2 className="font-orbitron font-black text-xl mb-3" style={{ color: "#ffd700" }}>Road to the Final</h2>
                <p className="text-sm mb-6" style={{ color: "#7070a0", lineHeight: "1.8" }}>
                  Group Stage → Round of 32 → Round of 16 → QF → SF → Final.<br />
                  MetLife Stadium. July 19, 2026.
                </p>
                <Link href="/schedule" className="btn-neon inline-flex items-center gap-2">
                  <Users size={14} /> Full Schedule
                </Link>
              </div>
            </div>

            {/* Gallery CTA */}
            <div className="rounded-2xl p-8 text-center relative overflow-hidden" style={{ background: "rgba(13,13,34,0.8)", border: "1px solid rgba(255,51,102,0.2)" }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,51,102,0.04) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <div className="text-5xl mb-4">🔥</div>
                <h2 className="font-orbitron font-black text-xl mb-3" style={{ color: "#ff3366" }}>Fan Art & Crazy Edits</h2>
                <p className="text-sm mb-6" style={{ color: "#7070a0", lineHeight: "1.8" }}>
                  The wildest fan-made FIFA 2026 edits, meme moments,<br />and pure football art — all in one place.
                </p>
                <Link href="/gallery" className="btn-neon btn-neon-pink inline-flex items-center gap-2">
                  <Zap size={14} /> Enter Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
