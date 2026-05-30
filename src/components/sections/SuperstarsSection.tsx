"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getFlagUrl } from "@/data/countries";
import { fetchPlayerByName, type TSDBPlayer } from "@/lib/thesportsdb";

// ── Top 10 global superstars (displayed with photos) ────────────────────────
const GLOBAL_STARS = [
  {
    name: "Kylian Mbappé",
    tsdbName: "Kylian Mbappe",
    country: "France",
    isoCode: "fr",
    pos: "ST",
    color: "#1a44ff",
  },
  {
    name: "Erling Haaland",
    tsdbName: "Erling Haaland",
    country: "Norway",
    isoCode: "no",
    pos: "ST",
    color: "#cc0022",
  },
  {
    name: "Vinicius Jr",
    tsdbName: "Vinicius Junior",
    country: "Brazil",
    isoCode: "br",
    pos: "LW",
    color: "#ffe600",
  },
  {
    name: "Jude Bellingham",
    tsdbName: "Jude Bellingham",
    country: "England",
    isoCode: "gb-eng",
    pos: "CM",
    color: "#ff2244",
  },
  {
    name: "Lionel Messi",
    tsdbName: "Lionel Messi",
    country: "Argentina",
    isoCode: "ar",
    pos: "CAM",
    color: "#74d4ff",
  },
  {
    name: "Cristiano Ronaldo",
    tsdbName: "Cristiano Ronaldo",
    country: "Portugal",
    isoCode: "pt",
    pos: "ST",
    color: "#ff0000",
  },
  {
    name: "Kevin De Bruyne",
    tsdbName: "Kevin De Bruyne",
    country: "Belgium",
    isoCode: "be",
    pos: "CM",
    color: "#ffaa00",
  },
  {
    name: "Mohamed Salah",
    tsdbName: "Mohamed Salah",
    country: "Egypt",
    isoCode: "eg",
    pos: "RW",
    color: "#ff1133",
  },
  {
    name: "Lamine Yamal",
    tsdbName: "Lamine Yamal",
    country: "Spain",
    isoCode: "es",
    pos: "RW",
    color: "#ff1a1a",
  },
  {
    name: "Jamal Musiala",
    tsdbName: "Jamal Musiala",
    country: "Germany",
    isoCode: "de",
    pos: "CM",
    color: "#00d4ff",
  },
];

// ── Confederation breakdown ──────────────────────────────────────────────────
const CONFEDERATIONS = [
  {
    name: "UEFA",
    region: "Europe",
    color: "#1a44ff",
    players: [
      { name: "Mbappé", country: "France", isoCode: "fr" },
      { name: "Haaland", country: "Norway", isoCode: "no" },
      { name: "Bellingham", country: "England", isoCode: "gb-eng" },
      { name: "Yamal", country: "Spain", isoCode: "es" },
      { name: "Musiala", country: "Germany", isoCode: "de" },
      { name: "De Bruyne", country: "Belgium", isoCode: "be" },
    ],
  },
  {
    name: "CONMEBOL",
    region: "South America",
    color: "#00ff88",
    players: [
      { name: "Messi", country: "Argentina", isoCode: "ar" },
      { name: "Vinicius Jr", country: "Brazil", isoCode: "br" },
      { name: "L. Martínez", country: "Argentina", isoCode: "ar" },
      { name: "Valverde", country: "Uruguay", isoCode: "uy" },
      { name: "Julián Álvarez", country: "Argentina", isoCode: "ar" },
      { name: "Rodrygo", country: "Brazil", isoCode: "br" },
    ],
  },
  {
    name: "CONCACAF",
    region: "N. & C. America",
    color: "#ff3366",
    players: [
      { name: "Pulisic", country: "USA", isoCode: "us" },
      { name: "A. Davies", country: "Canada", isoCode: "ca" },
      { name: "S. Giménez", country: "Mexico", isoCode: "mx" },
      { name: "Lozano", country: "Mexico", isoCode: "mx" },
      { name: "McKennie", country: "USA", isoCode: "us" },
      { name: "Osorio", country: "Canada", isoCode: "ca" },
    ],
  },
  {
    name: "CAF",
    region: "Africa",
    color: "#ffd700",
    players: [
      { name: "Salah", country: "Egypt", isoCode: "eg" },
      { name: "Hakimi", country: "Morocco", isoCode: "ma" },
      { name: "Mané", country: "Senegal", isoCode: "sn" },
      { name: "Mahrez", country: "Algeria", isoCode: "dz" },
      { name: "Kudus", country: "Ghana", isoCode: "gh" },
      { name: "En-Nesyri", country: "Morocco", isoCode: "ma" },
    ],
  },
  {
    name: "AFC",
    region: "Asia",
    color: "#00d4ff",
    players: [
      { name: "Son Heung-min", country: "South Korea", isoCode: "kr" },
      { name: "T. Kubo", country: "Japan", isoCode: "jp" },
      { name: "Arda Güler", country: "Turkiye", isoCode: "tr" },
      { name: "Taremi", country: "Iran", isoCode: "ir" },
      { name: "Al-Dawsari", country: "Saudi Arabia", isoCode: "sa" },
      { name: "Afif", country: "Qatar", isoCode: "qa" },
    ],
  },
  {
    name: "OFC",
    region: "Oceania",
    color: "#bf5fff",
    players: [
      { name: "Chris Wood", country: "New Zealand", isoCode: "nz" },
      { name: "Mat Ryan", country: "Australia", isoCode: "au" },
      { name: "Duke", country: "New Zealand", isoCode: "nz" },
      { name: "Irvine", country: "Australia", isoCode: "au" },
      { name: "Boyle", country: "Australia", isoCode: "au" },
      { name: "Donachie", country: "New Zealand", isoCode: "nz" },
    ],
  },
];

// ── Star player card with live photo ────────────────────────────────────────
function StarCard({ star }: { star: (typeof GLOBAL_STARS)[number] }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerByName(star.tsdbName)
      .then((p: TSDBPlayer | null) => {
        if (p?.strThumb) setPhoto(p.strThumb);
      })
      .finally(() => setLoading(false));
  }, [star.tsdbName]);

  const initials = star.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="flex-shrink-0 w-32 sm:w-36 rounded-2xl overflow-hidden transition-all duration-300 cursor-default group"
      style={{
        background: `radial-gradient(ellipse at top, ${star.color}12, rgba(13,13,34,0.95))`,
        border: `1px solid ${star.color}25`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-6px) scale(1.02)";
        el.style.borderColor = `${star.color}60`;
        el.style.boxShadow = `0 12px 40px ${star.color}25`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0) scale(1)";
        el.style.borderColor = `${star.color}25`;
        el.style.boxShadow = "none";
      }}
    >
      {/* Photo area */}
      <div className="relative overflow-hidden" style={{ height: "140px" }}>
        {loading ? (
          <div className="w-full h-full shimmer" />
        ) : photo ? (
          <Image
            src={photo}
            alt={star.name}
            fill
            sizes="160px"
            className="object-cover object-top"
            unoptimized
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-orbitron font-black text-3xl"
            style={{ color: `${star.color}60`, background: `${star.color}08` }}
          >
            {initials}
          </div>
        )}
        {/* Country flag overlay */}
        <div className="absolute top-2 right-2">
          <img
            src={getFlagUrl(star.isoCode)}
            alt={star.country}
            className="w-6 h-4 object-cover rounded-sm"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          />
        </div>
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 50%, rgba(13,13,34,0.98) 100%)",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p
          className="font-orbitron font-black text-[10px] leading-tight truncate"
          style={{ color: "#ffffff" }}
        >
          {star.name}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p
            className="font-orbitron text-[8px] tracking-widest uppercase"
            style={{ color: star.color }}
          >
            {star.pos}
          </p>
          <p className="font-orbitron text-[8px]" style={{ color: "#404060" }}>
            {star.country}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function SuperstarsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="font-orbitron text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "#ffd700" }}
          >
            All Superstars · All Nations · One Dream
          </p>
          <h2
            className="font-orbitron font-black text-2xl sm:text-4xl mb-3"
            style={{ color: "#ffffff" }}
          >
            World{" "}
            <span
              className="text-glow-green"
              style={{ color: "#00ff88", textShadow: "0 0 30px #00ff8880" }}
            >
              Superstars
            </span>
          </h2>
          <p className="font-orbitron text-xs tracking-widest" style={{ color: "#7070a0" }}>
            48 Nations · 104 Matches · The Greatest Show on Earth
          </p>
        </div>

        {/* ── Top Stars horizontal scroll ── */}
        <div className="relative mb-14">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(5,5,16,1), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(5,5,16,1), transparent)" }}
          />
          <div
            className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin"
            style={{ scrollbarWidth: "none" }}
          >
            {GLOBAL_STARS.map((star) => (
              <StarCard key={star.name} star={star} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="neon-divider mb-10" />

        {/* ── Confederation Superstars ── */}
        <div className="mb-8 text-center">
          <p
            className="font-orbitron text-xs tracking-[0.4em] uppercase"
            style={{ color: "#7070a0" }}
          >
            Continent Superstars
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONFEDERATIONS.map((conf) => (
            <div
              key={conf.name}
              className="rounded-2xl p-5 transition-all duration-300"
              style={{
                background: `radial-gradient(ellipse at top left, ${conf.color}08, rgba(13,13,34,0.9))`,
                border: `1px solid ${conf.color}20`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${conf.color}45`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${conf.color}10`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${conf.color}20`;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Conf header */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ background: conf.color, boxShadow: `0 0 8px ${conf.color}` }}
                />
                <div>
                  <p className="font-orbitron font-black text-sm" style={{ color: conf.color }}>
                    {conf.name}
                  </p>
                  <p
                    className="font-orbitron text-[8px] tracking-widest uppercase"
                    style={{ color: "#404060" }}
                  >
                    {conf.region}
                  </p>
                </div>
              </div>

              {/* Player pills */}
              <div className="flex flex-wrap gap-2">
                {conf.players.map((p) => (
                  <div
                    key={`${p.name}-${p.country}`}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                    style={{
                      background: `${conf.color}10`,
                      border: `1px solid ${conf.color}25`,
                    }}
                  >
                    <img
                      src={getFlagUrl(p.isoCode)}
                      alt={p.country}
                      className="w-4 h-3 object-cover rounded-sm flex-shrink-0"
                    />
                    <span
                      className="font-orbitron text-[9px] tracking-wide whitespace-nowrap"
                      style={{ color: "#c0c0e0" }}
                    >
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Rising Sensations ── */}
        <div
          className="mt-10 rounded-2xl p-6 relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,215,0,0.05), rgba(13,13,34,0.95))",
            border: "1px solid rgba(255,215,0,0.15)",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="px-3 py-1 rounded-full font-orbitron text-[9px] tracking-widest uppercase"
              style={{
                background: "rgba(255,215,0,0.12)",
                border: "1px solid rgba(255,215,0,0.3)",
                color: "#ffd700",
              }}
            >
              Rising Sensations
            </div>
            <p className="font-orbitron text-xs" style={{ color: "#7070a0" }}>
              Next Generation
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Lamine Yamal", country: "Spain", isoCode: "es", age: 18 },
              { name: "Arda Güler", country: "Turkiye", isoCode: "tr", age: 20 },
              { name: "Endrick", country: "Brazil", isoCode: "br", age: 18 },
              { name: "Warren Zaïre-Emery", country: "France", isoCode: "fr", age: 19 },
              { name: "Alejandro Garnacho", country: "Argentina", isoCode: "ar", age: 21 },
              { name: "Paulo Dybala", country: "Argentina", isoCode: "ar", age: 32 },
              { name: "Gavi", country: "Spain", isoCode: "es", age: 20 },
              { name: "Savinho", country: "Brazil", isoCode: "br", age: 21 },
              { name: "Xavi Simons", country: "Netherlands", isoCode: "nl", age: 22 },
              { name: "Benjamin Šeško", country: "Slovenia", isoCode: "si", age: 22 },
              { name: "Valentín Carboni", country: "Argentina", isoCode: "ar", age: 20 },
              { name: "Florian Wirtz", country: "Germany", isoCode: "de", age: 22 },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(255,215,0,0.06)",
                  border: "1px solid rgba(255,215,0,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,215,0,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,215,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,215,0,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,215,0,0.15)";
                }}
              >
                <img
                  src={getFlagUrl(p.isoCode)}
                  alt={p.country}
                  className="w-4 h-3 object-cover rounded-sm"
                />
                <span
                  className="font-orbitron text-[9px] tracking-wide"
                  style={{ color: "#e0e0f0" }}
                >
                  {p.name}
                </span>
                <span
                  className="font-orbitron text-[8px] px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(255,215,0,0.15)", color: "#ffd700" }}
                >
                  {p.age}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
