"use client";

import Link from "next/link";
import Image from "next/image";
import { countries, getFlagUrl, CONFEDERATION_COLORS } from "@/data/countries";
import { GROUPS } from "@/data/matches";
import { Users } from "lucide-react";

export default function TeamsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <span className="neon-badge flex items-center gap-2">
              <Users size={10} />
              FIFA 2026 — 48 Nations
            </span>
          </div>
          <h1
            className="font-orbitron font-black text-3xl sm:text-5xl mb-4"
            style={{ color: "#ffffff" }}
          >
            <span className="text-glow-green">Teams</span> &amp; Squads
          </h1>
          <p className="text-sm" style={{ color: "#7070a0" }}>
            Click a team to view their star player, stats, and squad details
          </p>
        </div>

        {/* Groups A-L */}
        {GROUPS.map((g) => {
          const groupCountries = countries.filter((c) => c.group === g);
          return (
            <div key={g} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2
                  className="font-orbitron font-black text-lg"
                  style={{ color: "#00ff88", textShadow: "0 0 10px rgba(0,255,136,0.5)" }}
                >
                  Group {g}
                </h2>
                <div className="flex-1 h-px" style={{ background: "rgba(0,255,136,0.15)" }} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {groupCountries.map((country) => {
                  const confColor = CONFEDERATION_COLORS[country.confederation] ?? "#7070a0";
                  return (
                    <Link
                      key={country.name}
                      href={`/teams/${encodeURIComponent(country.name.toLowerCase().replace(/\s+/g, "-"))}`}
                      className="rounded-xl overflow-hidden transition-all duration-300 block"
                      style={{
                        background: `radial-gradient(ellipse at top, ${country.neonColor}08, rgba(13,13,34,0.9))`,
                        border: `1px solid ${country.neonColor}20`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${country.neonColor}50`;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          `0 0 20px ${country.neonColor}15`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${country.neonColor}20`;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {/* Flag */}
                      <div className="relative h-20 overflow-hidden">
                        <Image
                          src={getFlagUrl(country.isoCode)}
                          alt={`${country.name} flag`}
                          fill
                          sizes="200px"
                          className="object-cover"
                          unoptimized
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to bottom, transparent 30%, rgba(13,13,34,0.95))",
                          }}
                        />
                        <div
                          className="absolute top-2 right-2 px-1.5 py-0.5 rounded font-orbitron text-[8px] tracking-widest"
                          style={{
                            background: "rgba(0,0,0,0.7)",
                            border: `1px solid ${confColor}40`,
                            color: confColor,
                          }}
                        >
                          {country.confederation}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <p
                          className="font-orbitron font-bold text-xs mb-1"
                          style={{ color: "#ffffff" }}
                        >
                          {country.name}
                        </p>
                        <p className="text-[10px]" style={{ color: "#7070a0" }}>
                          ⭐ {country.starPlayer.name.split(" ").pop()}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: country.neonColor }}>
                          {country.starPlayer.caps} caps · {country.starPlayer.goals} goals
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
