"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  countries,
  getFlagUrl,
  CONFEDERATION_COLORS,
  type Country,
} from "@/data/countries";
import { fetchPlayerByName, calcAge, type TSDBPlayer } from "@/lib/thesportsdb";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft, User, Star, Shield, Trophy } from "lucide-react";

export default function TeamPage() {
  const params = useParams();
  const slug = decodeURIComponent((params.country as string) ?? "");

  const country = countries.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  ) as Country | undefined;

  const [tsdbPlayer, setTsdbPlayer] = useState<TSDBPlayer | null>(null);
  const [playerImg, setPlayerImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!country) return;
    setLoading(true);
    const searchName =
      country.starPlayer.tsdbName ?? country.starPlayer.name;
    fetchPlayerByName(searchName)
      .then((p) => {
        setTsdbPlayer(p);
        if (p?.strThumb) setPlayerImg(p.strThumb);
      })
      .finally(() => setLoading(false));
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
  const age = tsdbPlayer?.dateBorn ? calcAge(tsdbPlayer.dateBorn) : sp.age ?? "—";

  const stats = [
    { label: "Caps", value: sp.caps ?? "—", color: "#00ff88" },
    { label: "Goals", value: sp.goals ?? "—", color: "#ff3366" },
    { label: "Age", value: age, color: "#00d4ff" },
    { label: "Number", value: sp.number ? `#${sp.number}` : "—", color: "#ffd700" },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href={ROUTES.teams}
          className="inline-flex items-center gap-2 mb-8 font-orbitron text-xs tracking-widest uppercase transition-colors"
          style={{ color: "#7070a0" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00ff88")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7070a0")}
        >
          <ArrowLeft size={14} />
          All Teams
        </Link>

        {/* Hero card */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{
            background: `radial-gradient(ellipse at top left, ${country.neonColor}12, rgba(13,13,34,0.95))`,
            border: `1px solid ${country.neonColor}30`,
          }}
        >
          {/* Flag banner */}
          <div className="relative h-40 overflow-hidden">
            <Image
              src={getFlagUrl(country.isoCode)}
              alt={`${country.name} flag`}
              fill
              className="object-cover"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(5,5,16,0.3) 0%, rgba(5,5,16,0.95) 100%)",
              }}
            />
            {/* Confederation + Group badges */}
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
            {/* Country name overlay */}
            <div className="absolute bottom-4 left-5">
              <h1
                className="font-orbitron font-black text-3xl sm:text-4xl"
                style={{
                  color: country.neonColor,
                  textShadow: `0 0 20px ${country.neonColor}80`,
                }}
              >
                {country.name}
              </h1>
            </div>
          </div>

          {/* Manager row */}
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

          {/* Star player section */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} color={country.neonColor} />
              <span
                className="font-orbitron text-xs tracking-widest uppercase"
                style={{ color: country.neonColor }}
              >
                Star Player
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Player photo */}
              <div className="flex-shrink-0">
                {loading ? (
                  <div
                    className="rounded-xl shimmer"
                    style={{ width: "120px", height: "120px" }}
                  />
                ) : playerImg ? (
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      width: "120px",
                      height: "120px",
                      border: `2px solid ${country.neonColor}50`,
                      boxShadow: `0 0 20px ${country.neonColor}30`,
                    }}
                  >
                    <img
                      src={playerImg}
                      alt={sp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="rounded-xl flex items-center justify-center font-orbitron font-black text-3xl"
                    style={{
                      width: "120px",
                      height: "120px",
                      background: `${country.neonColor}15`,
                      border: `2px solid ${country.neonColor}40`,
                      color: country.neonColor,
                    }}
                  >
                    {sp.number ? `#${sp.number}` : <User size={32} />}
                  </div>
                )}
              </div>

              {/* Player info */}
              <div className="flex-1">
                <h2
                  className="font-orbitron font-black text-xl mb-1"
                  style={{ color: "#ffffff" }}
                >
                  {sp.name}
                </h2>
                <p className="text-sm mb-1" style={{ color: "#a0a0c0" }}>
                  {sp.position} · {sp.club}
                </p>
                {tsdbPlayer?.strNationality && (
                  <p className="text-xs mb-4" style={{ color: "#7070a0" }}>
                    🌍 {tsdbPlayer.strNationality}
                  </p>
                )}

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg p-3 text-center"
                      style={{
                        background: `${s.color}08`,
                        border: `1px solid ${s.color}25`,
                      }}
                    >
                      <p
                        className="font-orbitron font-black text-xl"
                        style={{ color: s.color, textShadow: `0 0 10px ${s.color}60` }}
                      >
                        {s.value}
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
        </div>

        {/* Coming soon — full squad */}
        <div
          className="rounded-xl p-8 text-center"
          style={{
            background: "rgba(13,13,34,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Trophy size={28} color="#ffd700" className="mx-auto mb-3" />
          <h3
            className="font-orbitron font-bold text-lg mb-2"
            style={{ color: "#ffd700" }}
          >
            Full Squad — Coming in Phase 2
          </h3>
          <p className="text-sm" style={{ color: "#7070a0", lineHeight: "1.8" }}>
            Complete 23-player squad with photos, positions, clubs, and stats
            will be added when official squad lists are confirmed
            (typically 1 month before the tournament).
          </p>
        </div>
      </div>
    </div>
  );
}
