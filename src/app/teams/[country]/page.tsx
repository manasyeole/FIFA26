"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { countries, getFlagUrl, CONFEDERATION_COLORS, type Country } from "@/data/countries";
import { getSquad, POSITION_ORDER, type SquadPlayer } from "@/data/squads";
import { fetchPlayerByName, calcAge, type TSDBPlayer } from "@/lib/thesportsdb";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft, Star, Shield, User, Crown } from "lucide-react";

// ── Player card in squad grid ─────────────────────────────────────────────────
function SquadCard({ player, countryColor }: { player: SquadPlayer; countryColor: string }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [tsdbData, setTsdbData] = useState<TSDBPlayer | null>(null);

  useEffect(() => {
    const name = player.tsdbName ?? player.name;
    fetchPlayerByName(name).then((p) => {
      setTsdbData(p);
      if (p?.strThumb) setPhoto(p.strThumb);
    });
  }, [player.name, player.tsdbName]);

  const age = tsdbData?.dateBorn ? calcAge(tsdbData.dateBorn) : player.age;

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: `radial-gradient(ellipse at top, ${countryColor}10, rgba(13,13,34,0.9))`,
        border: `1px solid ${countryColor}20`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${countryColor}50`;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = `0 0 20px ${countryColor}15`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${countryColor}20`;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{ height: "120px", background: `${countryColor}08` }}
      >
        {photo ? (
          <Image
            src={photo}
            alt={player.name}
            fill
            sizes="200px"
            className="object-cover object-top"
            unoptimized
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-orbitron font-black text-3xl"
            style={{ color: `${countryColor}50` }}
          >
            {player.number}
          </div>
        )}
        {/* Jersey number badge */}
        <div
          className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center font-orbitron font-black text-[10px]"
          style={{
            background: "rgba(0,0,0,0.75)",
            border: `1px solid ${countryColor}60`,
            color: countryColor,
          }}
        >
          {player.number}
        </div>
        {/* Captain badge */}
        {player.isCaptain && (
          <div className="absolute top-2 right-2">
            <Crown size={14} color="#ffd700" />
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 50%, rgba(13,13,34,0.95) 100%)",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <p
          className="font-orbitron font-bold text-xs leading-tight mb-0.5"
          style={{ color: "#ffffff" }}
        >
          {player.name}
        </p>
        <p className="text-[10px] mb-2" style={{ color: countryColor }}>
          {player.position} · {player.club}
        </p>
        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-1 text-center">
          {[
            { label: "Age", val: age },
            { label: "Caps", val: player.caps },
            { label: "Goals", val: player.goals },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg py-1"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <p className="font-orbitron font-black text-xs" style={{ color: countryColor }}>
                {s.val}
              </p>
              <p
                className="font-orbitron text-[7px] tracking-widest uppercase"
                style={{ color: "#404060" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const params = useParams();
  const slug = decodeURIComponent((params.country as string) ?? "");

  const country = countries.find((c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug) as
    | Country
    | undefined;

  const [starPhoto, setStarPhoto] = useState<string | null>(null);
  const [starTsdb, setStarTsdb] = useState<TSDBPlayer | null>(null);
  const [loadingStar, setLoadingStar] = useState(true);

  useEffect(() => {
    if (!country) return;
    const resetId = setTimeout(() => setLoadingStar(true), 0);
    const name = country.starPlayer.tsdbName ?? country.starPlayer.name;
    fetchPlayerByName(name)
      .then((p) => {
        setStarTsdb(p);
        if (p?.strThumb) setStarPhoto(p.strThumb);
      })
      .finally(() => setLoadingStar(false));
    return () => clearTimeout(resetId);
  }, [country]);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="font-orbitron text-5xl mb-4" style={{ color: "#404060" }}>
            404
          </p>
          <p className="font-orbitron text-sm mb-6" style={{ color: "#7070a0" }}>
            Team not found
          </p>
          <Link href={ROUTES.teams} className="btn-neon">
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  const confColor = CONFEDERATION_COLORS[country.confederation] ?? "#7070a0";
  const sp = country.starPlayer;
  const squad = getSquad(country.name);
  const starAge = starTsdb?.dateBorn ? calcAge(starTsdb.dateBorn) : (sp.age ?? "—");

  // Group squad by position
  const grouped = squad
    ? POSITION_ORDER.reduce<Record<string, SquadPlayer[]>>((acc, pos) => {
        const players = squad.filter((p) => p.position === pos);
        if (players.length) acc[pos] = players;
        return acc;
      }, {})
    : null;

  const posLabel: Record<string, string> = {
    GK: "Goalkeepers",
    CB: "Centre Backs",
    LB: "Left Backs",
    RB: "Right Backs",
    CDM: "Defensive Midfielders",
    CM: "Central Midfielders",
    CAM: "Attacking Midfielders",
    LW: "Left Wingers",
    RW: "Right Wingers",
    ST: "Strikers",
    CF: "Centre Forwards",
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          href={ROUTES.teams}
          className="inline-flex items-center gap-2 mb-8 font-orbitron text-xs tracking-widest uppercase transition-colors"
          style={{ color: "#7070a0" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00ff88")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7070a0")}
        >
          <ArrowLeft size={14} /> All Teams
        </Link>

        {/* ── Hero banner ── */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: `radial-gradient(ellipse at top left, ${country.neonColor}12, rgba(13,13,34,0.95))`,
            border: `1px solid ${country.neonColor}30`,
          }}
        >
          <div className="relative h-44 overflow-hidden">
            <Image
              src={getFlagUrl(country.isoCode)}
              alt={country.name}
              fill
              className="object-cover"
              style={{ opacity: 0.25 }}
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(5,5,16,0.2), rgba(5,5,16,0.9))",
              }}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span
                className="neon-badge"
                style={{
                  borderColor: `${confColor}50`,
                  color: confColor,
                  background: `${confColor}10`,
                }}
              >
                {country.confederation}
              </span>
              <span
                className="neon-badge"
                style={{
                  borderColor: "rgba(0,255,136,0.5)",
                  color: "#00ff88",
                  background: "rgba(0,255,136,0.1)",
                }}
              >
                Group {country.group}
              </span>
            </div>
            <div className="absolute bottom-4 left-5">
              <h1
                className="font-orbitron font-black text-3xl sm:text-5xl"
                style={{ color: country.neonColor, textShadow: `0 0 20px ${country.neonColor}80` }}
              >
                {country.name}
              </h1>
            </div>
          </div>
          <div
            className="px-5 py-3 flex items-center gap-3"
            style={{ borderBottom: `1px solid ${country.neonColor}15` }}
          >
            <Shield size={14} color="#7070a0" />
            <span className="text-xs" style={{ color: "#7070a0" }}>
              Manager:
            </span>
            <span className="font-orbitron text-xs font-bold" style={{ color: "#ffffff" }}>
              {country.manager.name}
            </span>
            <span className="text-xs" style={{ color: "#7070a0" }}>
              ({country.manager.nationality})
            </span>
          </div>
        </div>

        {/* ── Star Player ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star size={14} color={country.neonColor} />
            <span
              className="font-orbitron text-xs tracking-widest uppercase"
              style={{ color: country.neonColor }}
            >
              Star Player
            </span>
          </div>
          <div
            className="rounded-2xl p-5 flex flex-col sm:flex-row gap-6 items-start"
            style={{
              background: `radial-gradient(ellipse at top left, ${country.neonColor}10, rgba(13,13,34,0.9))`,
              border: `1px solid ${country.neonColor}25`,
            }}
          >
            <div className="flex-shrink-0">
              {loadingStar ? (
                <div className="rounded-2xl shimmer" style={{ width: 140, height: 140 }} />
              ) : starPhoto ? (
                <div
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    width: 140,
                    height: 140,
                    border: `2px solid ${country.neonColor}60`,
                    boxShadow: `0 0 25px ${country.neonColor}30`,
                  }}
                >
                  <Image
                    src={starPhoto}
                    alt={sp.name}
                    fill
                    sizes="140px"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              ) : (
                <div
                  className="rounded-2xl flex items-center justify-center font-orbitron font-black text-4xl"
                  style={{
                    width: 140,
                    height: 140,
                    background: `${country.neonColor}12`,
                    border: `2px solid ${country.neonColor}40`,
                    color: country.neonColor,
                  }}
                >
                  {sp.number ? `#${sp.number}` : <User size={40} />}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-orbitron font-black text-2xl mb-1" style={{ color: "#ffffff" }}>
                {sp.name}
              </h2>
              <p className="text-sm mb-1" style={{ color: "#a0a0c0" }}>
                {sp.position} · {sp.club}
              </p>
              {starTsdb?.strNationality && (
                <p className="text-xs mb-4" style={{ color: "#7070a0" }}>
                  🌍 {starTsdb.strNationality}
                </p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Caps", val: sp.caps ?? "—", color: "#00ff88" },
                  { label: "Goals", val: sp.goals ?? "—", color: "#ff3366" },
                  { label: "Age", val: starAge, color: "#00d4ff" },
                  { label: "Number", val: sp.number ? `#${sp.number}` : "—", color: "#ffd700" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: `${s.color}08`, border: `1px solid ${s.color}25` }}
                  >
                    <p
                      className="font-orbitron font-black text-2xl"
                      style={{ color: s.color, textShadow: `0 0 10px ${s.color}60` }}
                    >
                      {s.val}
                    </p>
                    <p
                      className="font-orbitron text-[9px] tracking-widest uppercase mt-1"
                      style={{ color: "#7070a0" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Full Squad ── */}
        <div className="neon-divider mb-8" />
        <div className="flex items-center gap-2 mb-6">
          <Shield size={14} color="#00ff88" />
          <h2 className="font-orbitron font-black text-xl" style={{ color: "#ffffff" }}>
            {squad ? "Squad" : "Squad — Coming Soon"}
          </h2>
          {squad && <span className="neon-badge">{squad.length} players</span>}
        </div>

        {squad && grouped ? (
          <div className="space-y-8">
            {POSITION_ORDER.filter((pos) => grouped[pos]).map((pos) => (
              <div key={pos}>
                <p
                  className="font-orbitron text-xs tracking-widest uppercase mb-3"
                  style={{ color: country.neonColor }}
                >
                  {posLabel[pos] ?? pos}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {grouped[pos].map((player) => (
                    <SquadCard key={player.name} player={player} countryColor={country.neonColor} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: "rgba(13,13,34,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="font-orbitron font-bold text-lg mb-2" style={{ color: "#ffd700" }}>
              Full Squad — Coming Soon
            </p>
            <p className="text-sm" style={{ color: "#7070a0", lineHeight: "1.8" }}>
              Full 26-player squad with photos and stats will be added once the official squad list
              is confirmed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
