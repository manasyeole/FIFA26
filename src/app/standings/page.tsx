import { GROUPS } from "@/data/matches";
import { getCountriesByGroup, getFlagUrl } from "@/data/countries";
import Image from "next/image";
import { Trophy, Info } from "lucide-react";

interface TeamRow {
  name: string;
  isoCode: string;
  neonColor: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
}

function gd(row: TeamRow) {
  return row.gf - row.ga;
}
function pts(row: TeamRow) {
  return row.w * 3 + row.d;
}

function GroupTable({ group }: { group: string }) {
  const nations = getCountriesByGroup(group);
  const rows: TeamRow[] = nations.map((c) => ({
    name: c.name,
    isoCode: c.isoCode,
    neonColor: c.neonColor,
    mp: 0,
    w: 0,
    d: 0,
    l: 0,
    gf: 0,
    ga: 0,
  }));

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "rgba(13,13,34,0.9)", border: "1px solid rgba(0,255,136,0.15)" }}
    >
      {/* Group header */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{
          background: "rgba(0,255,136,0.06)",
          borderBottom: "1px solid rgba(0,255,136,0.15)",
        }}
      >
        <span
          className="font-orbitron font-black text-sm"
          style={{ color: "#00ff88", textShadow: "0 0 10px rgba(0,255,136,0.6)" }}
        >
          Group {group}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <th
                className="text-left px-3 py-2 font-orbitron tracking-widest uppercase"
                style={{ color: "#7070a0" }}
              >
                Team
              </th>
              {["MP", "W", "D", "L", "GF", "GA", "GD", "PTS"].map((h) => (
                <th
                  key={h}
                  className="text-center px-2 py-2 font-orbitron tracking-widest uppercase"
                  style={{ color: h === "PTS" ? "#ffd700" : "#7070a0" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.name}
                style={{
                  borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="relative rounded overflow-hidden flex-shrink-0"
                      style={{ width: "24px", height: "16px" }}
                    >
                      <Image
                        src={getFlagUrl(row.isoCode)}
                        alt={row.name}
                        fill
                        sizes="24px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span
                      className="font-orbitron text-[11px] font-medium"
                      style={{ color: "#ffffff" }}
                    >
                      {row.name}
                    </span>
                  </div>
                </td>
                {[row.mp, row.w, row.d, row.l, row.gf, row.ga, gd(row)].map((val, j) => (
                  <td
                    key={j}
                    className="text-center px-2 py-2.5 font-orbitron"
                    style={{ color: "#7070a0" }}
                  >
                    {val}
                  </td>
                ))}
                <td
                  className="text-center px-2 py-2.5 font-orbitron font-black"
                  style={{ color: "#ffd700" }}
                >
                  {pts(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Qualification guide */}
      <div
        className="px-3 py-2 flex gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "#00ff88" }} />
          <span className="text-[9px] font-orbitron" style={{ color: "#7070a0" }}>
            Advance (top 2)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: "#ff9900" }} />
          <span className="text-[9px] font-orbitron" style={{ color: "#7070a0" }}>
            Best 3rd place eligible
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StandingsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <span className="neon-badge neon-badge-gold flex items-center gap-2">
              <Trophy size={10} />
              Group Stage Standings
            </span>
          </div>
          <h1
            className="font-orbitron font-black text-3xl sm:text-5xl mb-4"
            style={{ color: "#ffffff" }}
          >
            <span className="text-glow-gold">Standings</span>
          </h1>
          <p className="text-sm" style={{ color: "#7070a0" }}>
            Groups A – L · All 12 groups · Updates live when tournament begins
          </p>
        </div>

        {/* Pre-tournament notice */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-10"
          style={{
            background: "rgba(0,212,255,0.06)",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
        >
          <Info size={16} color="#00d4ff" className="flex-shrink-0 mt-0.5" />
          <p className="text-sm" style={{ color: "#a0a0c0", lineHeight: "1.7" }}>
            <span className="font-orbitron" style={{ color: "#00d4ff" }}>
              Tournament starts June 11, 2026.
            </span>{" "}
            All standings are currently 0 — this table will update as matches are played. Live score
            integration is planned for Phase 3.
          </p>
        </div>

        {/* 12 groups in 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {GROUPS.map((g) => (
            <GroupTable key={g} group={g} />
          ))}
        </div>

        {/* Qualification info */}
        <div className="neon-divider my-10" />
        <div
          className="rounded-xl p-6"
          style={{ background: "rgba(13,13,34,0.8)", border: "1px solid rgba(255,215,0,0.15)" }}
        >
          <h2 className="font-orbitron font-bold text-sm mb-4" style={{ color: "#ffd700" }}>
            How qualification works — FIFA 2026 (48 teams)
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
            style={{ color: "#7070a0", lineHeight: "1.8" }}
          >
            <div>
              <p className="font-orbitron mb-1" style={{ color: "#00ff88" }}>
                Top 2 per group
              </p>
              <p>24 teams — automatically advance to Round of 32</p>
            </div>
            <div>
              <p className="font-orbitron mb-1" style={{ color: "#ff9900" }}>
                Best 8 third-placed
              </p>
              <p>8 of the 12 third-place teams advance based on points</p>
            </div>
            <div>
              <p className="font-orbitron mb-1" style={{ color: "#00d4ff" }}>
                Total: 32 teams
              </p>
              <p>Round of 32 → Round of 16 → QF → SF → Final (Jul 19)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
