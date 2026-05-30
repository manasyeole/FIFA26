"use client";

import { useState, useMemo } from "react";
import { countries } from "@/data/countries";
import CountryCard from "./CountryCard";
import { GROUPS } from "@/data/matches";
import { Search, Globe } from "lucide-react";

const ALL = "All";

export default function AllCountriesGrid() {
  const [activeGroup, setActiveGroup] = useState<string>(ALL);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return countries.filter((c) => {
      const matchesGroup = activeGroup === ALL || c.group === activeGroup;
      const matchesSearch =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.starPlayer.name.toLowerCase().includes(query);
      return matchesGroup && matchesSearch;
    });
  }, [activeGroup, search]);

  function clearFilters() {
    setActiveGroup(ALL);
    setSearch("");
  }

  const isFiltered = activeGroup !== ALL || search.length > 0;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="neon-divider mb-12" />
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p
              className="font-orbitron text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "#00ff88" }}
            >
              FIFA 2026
            </p>
            <h2
              className="font-orbitron font-black text-2xl sm:text-3xl"
              style={{ color: "#ffffff" }}
            >
              All <span className="text-glow-green">48</span> Nations
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} color="#7070a0" />
            <span className="font-orbitron text-xs" style={{ color: "#404060" }}>
              <span style={{ color: "#00ff88" }}>{filtered.length}</span> nations shown
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm mb-6">
          <Search size={14} color="#7070a0" className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search nation or player..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl font-orbitron text-xs tracking-wide outline-none transition-all duration-300"
            style={{
              background: "rgba(13,13,34,0.9)",
              border: "1px solid rgba(0,255,136,0.2)",
              color: "#ffffff",
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "rgba(0,255,136,0.6)";
              (e.target as HTMLInputElement).style.boxShadow = "0 0 15px rgba(0,255,136,0.1)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "rgba(0,255,136,0.2)";
              (e.target as HTMLInputElement).style.boxShadow = "none";
            }}
          />
        </div>

        {/* Group filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveGroup(ALL)}
            className="px-4 py-2 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-all duration-200"
            style={{
              background: activeGroup === ALL ? "rgba(0,255,136,0.12)" : "rgba(13,13,34,0.8)",
              border: `1px solid ${activeGroup === ALL ? "rgba(0,255,136,0.55)" : "rgba(255,255,255,0.08)"}`,
              color: activeGroup === ALL ? "#00ff88" : "#7070a0",
              boxShadow: activeGroup === ALL ? "0 0 12px rgba(0,255,136,0.18)" : "none",
            }}
          >
            All Groups
          </button>
          {GROUPS.map((g) => {
            const active = activeGroup === g;
            return (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className="w-9 h-9 rounded-lg font-orbitron font-black text-sm transition-all duration-200"
                style={{
                  background: active ? "rgba(0,255,136,0.15)" : "rgba(13,13,34,0.8)",
                  border: `1px solid ${active ? "rgba(0,255,136,0.6)" : "rgba(255,255,255,0.08)"}`,
                  color: active ? "#00ff88" : "#7070a0",
                  boxShadow: active ? "0 0 14px rgba(0,255,136,0.2)" : "none",
                }}
              >
                {g}
              </button>
            );
          })}
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-colors duration-200"
              style={{ color: "#7070a0", border: "1px solid transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ff3366")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7070a0")}
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-orbitron text-3xl mb-3" style={{ color: "#404060" }}>
              ?
            </p>
            <p className="font-orbitron text-xs tracking-widest" style={{ color: "#7070a0" }}>
              No nations found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((country) => (
              <CountryCard key={country.name} country={country} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
