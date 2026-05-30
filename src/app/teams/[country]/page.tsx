"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { countries, getFlagUrl, CONFEDERATION_COLORS, type Country } from "@/data/countries";
import { getSquad, POSITION_ORDER, type SquadPlayer } from "@/data/squads";
import { fetchPlayerByName, calcAge, type TSDBPlayer } from "@/lib/thesportsdb";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft, Star, Shield, User, Crown, Users } from "lucide-react";

// ── Formation row config ─────────────────────────────────────────────────────
const FORMATION_ROWS: { positions: string[]; order: string[] }[] = [
  { positions: ["ST", "CF"], order: ["LW", "ST", "CF", "RW"] },
  { positions: ["LW", "CAM", "RW"], order: ["LW", "CAM", "RW"] },
  { positions: ["CDM", "CM"], order: ["CDM", "CM"] },
  { positions: ["LB", "CB", "RB"], order: ["LB", "CB", "RB"] },
  { positions: ["GK"], order: ["GK"] },
];

// ── Formation player node ─────────────────────────────────────────────────────
function FormationNode({
  player,
  backups,
  color,
}: {
  player: SquadPlayer;
  backups: SquadPlayer[];
  color: string;
}) {
  const lastName = player.name.split(" ").slice(-1)[0];
  return (
    <div className="flex flex-col items-center gap-0.5 min-w-0 px-1">
      {/* Circle */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-orbitron font-black text-sm flex-shrink-0 relative"
        style={{
          background: `radial-gradient(circle, ${color}30, ${color}10)`,
          border: `2px solid ${color}80`,
          boxShadow: `0 0 12px ${color}40`,
          color: color,
        }}
      >
        {player.isCaptain && (
          <div className="absolute -top-1 -right-1">
            <Crown size={10} color="#ffd700" />
          </div>
        )}
        {player.number}
      </div>
      {/* Starter name */}
      <p
        className="font-orbitron font-bold text-[10px] text-center leading-tight max-w-[72px] truncate"
        style={{ color: "#ffffff" }}
        title={player.name}
      >
        {lastName}
      </p>
      {/* Backup names */}
      {backups.slice(0, 2).map((b) => (
        <p
          key={b.name}
          className="font-orbitron text-[8px] text-center leading-tight max-w-[72px] truncate"
          style={{ color: "#7070a0" }}
          title={b.name}
        >
          {b.name.split(" ").slice(-1)[0]}
        </p>
      ))}
    </div>
  );
}

// ── Squad card (used in full roster grid) ────────────────────────────────────
function SquadCard({
  player,
  countryColor,
  isStarter,
}: {
  player: SquadPlayer;
  countryColor: string;
  isStarter: boolean;
}) {
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
        background: isStarter
          ? `radial-gradient(ellipse at top, ${countryColor}15, rgba(13,13,34,0.95))`
          : "rgba(13,13,34,0.7)",
        border: `1px solid ${isStarter ? countryColor + "30" : "rgba(255,255,255,0.06)"}`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${countryColor}50`;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = `0 0 20px ${countryColor}15`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isStarter ? `${countryColor}30` : "rgba(255,255,255,0.06)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{ height: "110px", background: `${countryColor}08` }}
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
            style={{ color: `${countryColor}40` }}
          >
            {player.number}
          </div>
        )}
        {/* Starter badge */}
        {isStarter && (
          <div
            className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded font-orbitron text-[7px] tracking-widest uppercase"
            style={{
              background: `${countryColor}25`,
              border: `1px solid ${countryColor}50`,
              color: countryColor,
            }}
          >
            XI
          </div>
        )}
        {/* Jersey number badge */}
        <div
          className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full flex items-center justify-center font-orbitron font-black text-[10px]"
          style={{
            background: "rgba(0,0,0,0.75)",
            border: `1px solid ${countryColor}50`,
            color: countryColor,
          }}
        >
          {player.number}
        </div>
        {/* Captain badge */}
        {player.isCaptain && (
          <div className="absolute bottom-1.5 right-1.5">
            <Crown size={12} color="#ffd700" />
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 55%, rgba(13,13,34,0.95) 100%)",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p
          className="font-orbitron font-bold text-[10px] leading-tight mb-0.5 truncate"
          style={{ color: "#ffffff" }}
        >
          {player.name}
        </p>
        <p className="text-[9px] mb-1.5 truncate" style={{ color: countryColor }}>
          {player.position} · {player.club}
        </p>
        <div className="grid grid-cols-3 gap-0.5 text-center">
          {[
            { label: "Age", val: age },
            { label: "Caps", val: player.caps },
            { label: "Goals", val: player.goals },
          ].map((s) => (
            <div key={s.label} className="rounded py-0.5" style={{ background: "rgba(0,0,0,0.3)" }}>
              <p className="font-orbitron font-black text-[10px]" style={{ color: countryColor }}>
                {s.val}
              </p>
              <p
                className="font-orbitron text-[6px] tracking-widest uppercase"
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
  const [activeTab, setActiveTab] = useState<"formation" | "squad">("formation");

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

  const starters = squad?.filter((p) => p.isStarter) ?? [];
  const bench = squad?.filter((p) => !p.isStarter) ?? [];

  // Group all players by position
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

  // Build formation rows from starters
  const formationRows = FORMATION_ROWS.map((row) => {
    const rowPlayers = starters
      .filter((p) => row.positions.includes(p.position))
      .sort((a, b) => row.order.indexOf(a.position) - row.order.indexOf(b.position));
    return { ...row, players: rowPlayers };
  }).filter((r) => r.players.length > 0);

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
                style={{
                  color: country.neonColor,
                  textShadow: `0 0 20px ${country.neonColor}80`,
                }}
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
                  {
                    label: "Number",
                    val: sp.number ? `#${sp.number}` : "—",
                    color: "#ffd700",
                  },
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

        {/* ── Squad section ── */}
        <div className="neon-divider mb-8" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users size={14} color="#00ff88" />
            <h2 className="font-orbitron font-black text-xl" style={{ color: "#ffffff" }}>
              {squad ? "Squad" : "Squad — Coming Soon"}
            </h2>
            {squad && <span className="neon-badge">{squad.length} players</span>}
          </div>
          {/* Tab toggle */}
          {squad && (
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {(["formation", "squad"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-1.5 font-orbitron text-[10px] tracking-widest uppercase transition-all"
                  style={{
                    background: activeTab === tab ? `${country.neonColor}20` : "rgba(13,13,34,0.8)",
                    color: activeTab === tab ? country.neonColor : "#7070a0",
                    borderRight: tab === "formation" ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  {tab === "formation" ? "Formation" : "Full Squad"}
                </button>
              ))}
            </div>
          )}
        </div>

        {!squad ? (
          <div
            className="rounded-xl p-8 text-center"
            style={{
              background: "rgba(13,13,34,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="font-orbitron font-bold text-lg mb-2" style={{ color: "#ffd700" }}>
              Full Squad — Coming Soon
            </p>
            <p className="text-sm" style={{ color: "#7070a0", lineHeight: "1.8" }}>
              Full 26-player squad with photos and stats will be added once the official squad list
              is confirmed.
            </p>
          </div>
        ) : activeTab === "formation" ? (
          /* ── Formation / Depth View ── */
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,80,40,0.35) 0%, rgba(0,50,25,0.2) 50%, rgba(13,13,34,0.95) 100%)",
              border: `1px solid ${country.neonColor}20`,
            }}
          >
            {/* Pitch lines hint */}
            <div className="relative px-4 py-8">
              {/* Center circle hint */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              />
              {/* Halfway line */}
              <div
                className="absolute left-4 right-4 pointer-events-none"
                style={{
                  top: "50%",
                  height: "1px",
                  background: "rgba(255,255,255,0.05)",
                }}
              />

              {/* Formation rows */}
              <div className="relative z-10 flex flex-col gap-6">
                {formationRows.map((row, ri) => (
                  <div key={ri} className="flex justify-around items-start">
                    {row.players.map((player) => {
                      const posBackups = bench.filter((b) => b.position === player.position);
                      return (
                        <FormationNode
                          key={player.name}
                          player={player}
                          backups={posBackups}
                          color={country.neonColor}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div
              className="px-5 py-3 flex items-center gap-4 text-[9px] font-orbitron tracking-widest uppercase"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                color: "#7070a0",
              }}
            >
              <span>
                <span style={{ color: country.neonColor }}>●</span> Starter
              </span>
              <span>Gray names = depth options</span>
              <span className="ml-auto">
                {starters.length} starters · {bench.length} bench
              </span>
            </div>
          </div>
        ) : (
          /* ── Full Squad Grid ── */
          grouped && (
            <div className="space-y-7">
              {POSITION_ORDER.filter((pos) => grouped[pos]).map((pos) => (
                <div key={pos}>
                  <div className="flex items-center gap-2 mb-3">
                    <p
                      className="font-orbitron text-xs tracking-widest uppercase"
                      style={{ color: country.neonColor }}
                    >
                      {posLabel[pos] ?? pos}
                    </p>
                    <span className="text-[9px] font-orbitron" style={{ color: "#404060" }}>
                      {grouped[pos].length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                    {grouped[pos]
                      .sort((a, b) => (b.isStarter ? 1 : 0) - (a.isStarter ? 1 : 0))
                      .map((player) => (
                        <SquadCard
                          key={player.name}
                          player={player}
                          countryColor={country.neonColor}
                          isStarter={player.isStarter}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
