"use client";

import Image from "next/image";
import { Shield, User } from "lucide-react";
import type { Country } from "@/data/countries";
import { getFlagUrl, getPlayerInitials, CONFEDERATION_COLORS } from "@/data/countries";

interface Props {
  country: Country;
  compact?: boolean;
}

export default function CountryCard({ country, compact = false }: Props) {
  const { name, isoCode, group, confederation, starPlayer, manager, neonColor } = country;
  const confColor = CONFEDERATION_COLORS[confederation] ?? "#7070a0";
  const initials = getPlayerInitials(starPlayer.name);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background: `radial-gradient(ellipse at top, ${neonColor}08 0%, rgba(13,13,34,0.95) 60%)`,
        border: `1px solid ${neonColor}25`,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${neonColor}70`;
        el.style.boxShadow = `0 0 30px ${neonColor}18, 0 8px 40px rgba(0,0,0,0.5)`;
        el.style.transform = "translateY(-4px)";
        const flagImg = el.querySelector<HTMLImageElement>(".flag-img");
        if (flagImg) flagImg.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${neonColor}25`;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
        const flagImg = el.querySelector<HTMLImageElement>(".flag-img");
        if (flagImg) flagImg.style.transform = "scale(1)";
      }}
    >
      {/* Neon top line */}
      <div
        className="h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${neonColor}, transparent)` }}
      />

      {/* Flag */}
      <div className="relative overflow-hidden" style={{ height: compact ? "90px" : "120px" }}>
        <Image
          src={getFlagUrl(isoCode)}
          alt={`${name} flag`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="flag-img object-cover transition-transform duration-500"
          style={{ objectPosition: "center" }}
          unoptimized
        />
        {/* Bottom fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(13,13,34,0.95) 100%)",
          }}
        />
        {/* Group badge */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg"
          style={{ background: "rgba(0,0,0,0.75)", border: `1px solid ${neonColor}40` }}
        >
          <Shield size={9} color={neonColor} />
          <span className="font-orbitron text-[9px] tracking-widest" style={{ color: neonColor }}>
            {group}
          </span>
        </div>
        {/* Confederation badge */}
        <div
          className="absolute top-2 left-2 px-2 py-1 rounded-lg"
          style={{ background: "rgba(0,0,0,0.75)", border: `1px solid ${confColor}30` }}
        >
          <span className="font-orbitron text-[8px] tracking-widest" style={{ color: confColor }}>
            {confederation}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={compact ? "p-3" : "p-4"}>
        <h3
          className="font-orbitron font-black tracking-wide mb-3"
          style={{
            fontSize: compact ? "0.8rem" : "0.95rem",
            color: "#ffffff",
            textShadow: `0 0 12px ${neonColor}60`,
          }}
        >
          {name}
        </h3>

        {!compact && (
          <>
            {/* Star Player row */}
            <div
              className="flex items-center gap-3 mb-3 p-2 rounded-xl"
              style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${neonColor}15` }}
            >
              {/* Initials avatar — real photos added in Phase 2 via Cloudinary */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full font-orbitron font-black text-xs"
                style={{
                  width: "36px",
                  height: "36px",
                  background: `radial-gradient(circle, ${neonColor}30, ${neonColor}08)`,
                  border: `1px solid ${neonColor}60`,
                  boxShadow: `0 0 10px ${neonColor}40`,
                  color: neonColor,
                }}
              >
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="font-orbitron font-bold text-[11px] truncate"
                  style={{ color: "#ffffff" }}
                >
                  {starPlayer.name}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#7070a0" }}>
                  {starPlayer.position} · {starPlayer.club}
                </p>
              </div>
              {starPlayer.number !== undefined && (
                <span
                  className="flex-shrink-0 font-orbitron font-black text-sm ml-auto"
                  style={{ color: `${neonColor}80` }}
                >
                  #{starPlayer.number}
                </span>
              )}
            </div>

            {/* Manager */}
            <div className="flex items-center gap-2">
              <User size={10} color="#7070a0" />
              <p className="text-[10px]" style={{ color: "#7070a0" }}>
                <span style={{ color: "#a0a0c0" }}>{manager.name}</span>
                {" · "}
                {manager.nationality}
              </p>
            </div>
          </>
        )}

        {compact && (
          <p className="text-[10px]" style={{ color: "#7070a0" }}>
            {starPlayer.name} · {starPlayer.position}
          </p>
        )}
      </div>
    </div>
  );
}
