"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { getFlagUrl } from "@/data/countries";
import {
  Globe,
  Users,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  RefreshCw,
  LogOut,
  Trash2,
  MapPin,
  Clock,
  Link,
} from "lucide-react";

interface Visit {
  id: string;
  timestamp: string;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
  org: string;
  page: string;
  referrer: string;
  browser: string;
  os: string;
  device: string;
}

const NEON = "#00ff88";

function StatCard({
  label,
  value,
  icon: Icon,
  color = NEON,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "rgba(13,13,34,0.8)", border: `1px solid ${color}25` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon size={16} color={color} />
        <p
          className="font-orbitron text-[10px] tracking-widest uppercase"
          style={{ color: "#7070a0" }}
        >
          {label}
        </p>
      </div>
      <p className="font-orbitron font-black text-3xl" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function DeviceIcon({ device }: { device: string }) {
  const size = 13;
  if (device === "Mobile") return <Smartphone size={size} color="#ff3366" />;
  if (device === "Tablet") return <Tablet size={size} color="#ffd700" />;
  return <Monitor size={size} color="#00d4ff" />;
}

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterDevice, setFilterDevice] = useState("All");

  const loadVisits = useCallback(async (pw: string, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch(`/api/visits?password=${encodeURIComponent(pw)}`);
      if (res.status === 401) {
        setError("Wrong password");
        sessionStorage.removeItem("admin_pw");
        setAuthed(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setVisits(data.visits ?? []);
      setAuthed(true);
      setPassword(pw);
      sessionStorage.setItem("admin_pw", pw);
      setError("");
      setLastUpdated(new Date());
    } catch {
      setError("Failed to load data");
    }
    if (!silent) setLoading(false);
  }, []);

  // Restore session on mount — setState only inside .then() to satisfy the no-sync-setState rule
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (!saved) return;
    fetch(`/api/visits?password=${encodeURIComponent(saved)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) {
          sessionStorage.removeItem("admin_pw");
          return;
        }
        setVisits(data.visits ?? []);
        setAuthed(true);
        setPassword(saved);
        setLastUpdated(new Date());
      })
      .catch(() => {});
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!authed || !password) return;
    const interval = setInterval(() => loadVisits(password, true), 30_000);
    return () => clearInterval(interval);
  }, [authed, password, loadVisits]);

  async function clearVisits() {
    if (!confirm("Delete all visitor records?")) return;
    await fetch(`/api/visits?password=${encodeURIComponent(password)}`, { method: "DELETE" });
    setVisits([]);
  }

  function logout() {
    sessionStorage.removeItem("admin_pw");
    setAuthed(false);
    setPassword("");
    setVisits([]);
  }

  const stats = useMemo(() => {
    const uniqueIps = new Set(visits.map((v) => v.ip)).size;
    const uniqueCountries = new Set(visits.map((v) => v.country)).size;
    const today = new Date().toDateString();
    const todayVisits = visits.filter((v) => new Date(v.timestamp).toDateString() === today).length;

    const countryCount: Record<string, { count: number; code: string }> = {};
    visits.forEach((v) => {
      if (!countryCount[v.country]) countryCount[v.country] = { count: 0, code: v.countryCode };
      countryCount[v.country].count++;
    });
    const topCountries = Object.entries(countryCount)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 8);

    const pageCount: Record<string, number> = {};
    visits.forEach((v) => {
      pageCount[v.page] = (pageCount[v.page] ?? 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const deviceCount = { Desktop: 0, Mobile: 0, Tablet: 0 };
    visits.forEach((v) => {
      if (v.device in deviceCount) deviceCount[v.device as keyof typeof deviceCount]++;
    });

    return { uniqueIps, uniqueCountries, todayVisits, topCountries, topPages, deviceCount };
  }, [visits]);

  const filtered = useMemo(
    () =>
      visits.filter(
        (v) =>
          (filterCountry === "All" || v.country === filterCountry) &&
          (filterDevice === "All" || v.device === filterDevice)
      ),
    [visits, filterCountry, filterDevice]
  );

  const allCountries = useMemo(
    () => ["All", ...new Set(visits.map((v) => v.country))].sort(),
    [visits]
  );

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="w-full max-w-sm rounded-2xl p-8"
          style={{ background: "rgba(13,13,34,0.95)", border: "1px solid rgba(0,255,136,0.2)" }}
        >
          <p className="font-orbitron font-black text-xl mb-1" style={{ color: NEON }}>
            Admin Access
          </p>
          <p
            className="font-orbitron text-[10px] tracking-widest uppercase mb-6"
            style={{ color: "#7070a0" }}
          >
            Visitor Analytics
          </p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadVisits(password)}
            className="w-full rounded-lg px-4 py-3 mb-4 font-orbitron text-sm outline-none"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(0,255,136,0.2)",
              color: "#fff",
            }}
          />
          {error && (
            <p className="font-orbitron text-xs mb-3" style={{ color: "#ff3366" }}>
              {error}
            </p>
          )}
          <button
            onClick={() => loadVisits(password)}
            disabled={loading}
            className="w-full py-3 rounded-lg font-orbitron font-bold text-sm tracking-widest uppercase transition-all"
            style={{ background: NEON, color: "#000" }}
          >
            {loading ? "Checking..." : "Sign In"}
          </button>
          <p className="font-orbitron text-[9px] mt-4 text-center" style={{ color: "#404060" }}>
            Default password: fifa2026admin — set ADMIN_PASSWORD env to change
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p
              className="font-orbitron text-xs tracking-[0.3em] uppercase mb-1"
              style={{ color: NEON }}
            >
              Admin Dashboard
            </p>
            <div className="flex items-center gap-3">
              <h1
                className="font-orbitron font-black text-2xl sm:text-3xl"
                style={{ color: "#fff" }}
              >
                Visitor Analytics
              </h1>
              {/* Live pulse dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: NEON }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ background: NEON }}
                />
              </span>
            </div>
            {lastUpdated && (
              <p className="font-orbitron text-[9px] mt-1" style={{ color: "#404060" }}>
                Updated {lastUpdated.toLocaleTimeString()} · auto-refreshes every 30s
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => loadVisits(password)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-orbitron text-xs uppercase tracking-widest transition-all"
              style={{ border: `1px solid ${NEON}30`, color: NEON }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = `${NEON}15`)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
            >
              <RefreshCw size={12} /> Refresh
            </button>
            <button
              onClick={clearVisits}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-orbitron text-xs uppercase tracking-widest transition-all"
              style={{ border: "1px solid rgba(255,51,102,0.3)", color: "#ff3366" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(255,51,102,0.1)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
            >
              <Trash2 size={12} /> Clear
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-orbitron text-xs uppercase tracking-widest transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#7070a0" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Visits" value={visits.length} icon={Eye} color={NEON} />
          <StatCard label="Unique IPs" value={stats.uniqueIps} icon={Users} color="#00d4ff" />
          <StatCard label="Countries" value={stats.uniqueCountries} icon={Globe} color="#ffd700" />
          <StatCard label="Today" value={stats.todayVisits} icon={Clock} color="#ff3366" />
        </div>

        {/* Top countries + Top pages + Devices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Top countries */}
          <div
            className="rounded-xl p-5 col-span-1 md:col-span-1"
            style={{ background: "rgba(13,13,34,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-orbitron text-[10px] tracking-widest uppercase mb-4"
              style={{ color: "#7070a0" }}
            >
              Top Countries
            </p>
            <div className="space-y-2">
              {stats.topCountries.map(([country, { count, code }]) => (
                <div key={country} className="flex items-center gap-2">
                  <Image
                    src={getFlagUrl(code)}
                    alt={country}
                    width={20}
                    height={14}
                    className="object-cover rounded-sm flex-shrink-0"
                    unoptimized
                  />
                  <p className="font-orbitron text-xs flex-1 truncate" style={{ color: "#c0c0e0" }}>
                    {country}
                  </p>
                  <span className="font-orbitron font-black text-xs" style={{ color: NEON }}>
                    {count}
                  </span>
                </div>
              ))}
              {stats.topCountries.length === 0 && (
                <p className="text-xs" style={{ color: "#404060" }}>
                  No data yet
                </p>
              )}
            </div>
          </div>

          {/* Top pages */}
          <div
            className="rounded-xl p-5"
            style={{ background: "rgba(13,13,34,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-orbitron text-[10px] tracking-widest uppercase mb-4"
              style={{ color: "#7070a0" }}
            >
              Top Pages
            </p>
            <div className="space-y-2">
              {stats.topPages.map(([page, count]) => (
                <div key={page} className="flex items-center gap-2">
                  <Link size={11} color="#7070a0" className="flex-shrink-0" />
                  <p
                    className="font-orbitron text-[11px] flex-1 truncate"
                    style={{ color: "#c0c0e0" }}
                  >
                    {page}
                  </p>
                  <span className="font-orbitron font-black text-xs" style={{ color: "#00d4ff" }}>
                    {count}
                  </span>
                </div>
              ))}
              {stats.topPages.length === 0 && (
                <p className="text-xs" style={{ color: "#404060" }}>
                  No data yet
                </p>
              )}
            </div>
          </div>

          {/* Device breakdown */}
          <div
            className="rounded-xl p-5"
            style={{ background: "rgba(13,13,34,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-orbitron text-[10px] tracking-widest uppercase mb-4"
              style={{ color: "#7070a0" }}
            >
              Device Split
            </p>
            <div className="space-y-3">
              {(["Desktop", "Mobile", "Tablet"] as const).map((d) => {
                const count = stats.deviceCount[d];
                const pct = visits.length > 0 ? Math.round((count / visits.length) * 100) : 0;
                const color = d === "Desktop" ? "#00d4ff" : d === "Mobile" ? "#ff3366" : "#ffd700";
                return (
                  <div key={d}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <DeviceIcon device={d} />
                        <span className="font-orbitron text-xs" style={{ color: "#c0c0e0" }}>
                          {d}
                        </span>
                      </div>
                      <span className="font-orbitron text-xs font-bold" style={{ color }}>
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="rounded-lg px-3 py-2 font-orbitron text-xs outline-none"
            style={{
              background: "rgba(13,13,34,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#c0c0e0",
            }}
          >
            {allCountries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={filterDevice}
            onChange={(e) => setFilterDevice(e.target.value)}
            className="rounded-lg px-3 py-2 font-orbitron text-xs outline-none"
            style={{
              background: "rgba(13,13,34,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#c0c0e0",
            }}
          >
            {["All", "Desktop", "Mobile", "Tablet"].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <span className="font-orbitron text-xs self-center" style={{ color: "#7070a0" }}>
            {filtered.length} records
          </span>
        </div>

        {/* Visits table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="grid font-orbitron text-[9px] tracking-widest uppercase px-4 py-3"
            style={{
              gridTemplateColumns: "140px 1fr 120px 120px 80px 80px 90px",
              background: "rgba(0,0,0,0.5)",
              color: "#404060",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span>Time</span>
            <span>Location</span>
            <span>Page</span>
            <span>Referrer</span>
            <span>Browser</span>
            <span>OS</span>
            <span>Device</span>
          </div>
          <div className="max-h-[520px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-orbitron text-sm" style={{ color: "#404060" }}>
                  No visits logged yet.
                </p>
                <p className="font-orbitron text-xs mt-2" style={{ color: "#303050" }}>
                  Visit the website to generate your first entry.
                </p>
              </div>
            ) : (
              filtered.map((v, i) => (
                <div
                  key={v.id}
                  className="grid items-center px-4 py-2.5 transition-colors"
                  style={{
                    gridTemplateColumns: "140px 1fr 120px 120px 80px 80px 90px",
                    background: i % 2 === 0 ? "rgba(13,13,34,0.6)" : "rgba(5,5,20,0.4)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "rgba(0,255,136,0.04)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      i % 2 === 0 ? "rgba(13,13,34,0.6)" : "rgba(5,5,20,0.4)")
                  }
                >
                  <div>
                    <p className="font-orbitron text-[10px]" style={{ color: "#c0c0e0" }}>
                      {timeAgo(v.timestamp)}
                    </p>
                    <p className="font-orbitron text-[8px]" style={{ color: "#404060" }}>
                      {new Date(v.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    {v.countryCode !== "xx" && v.countryCode !== "lo" ? (
                      <Image
                        src={getFlagUrl(v.countryCode)}
                        alt={v.country}
                        width={20}
                        height={14}
                        className="object-cover rounded-sm flex-shrink-0"
                        unoptimized
                      />
                    ) : (
                      <MapPin size={12} color="#7070a0" className="flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p
                        className="font-orbitron text-[10px] truncate"
                        style={{ color: "#ffffff" }}
                      >
                        {v.city !== "Unknown" ? `${v.city}, ` : ""}
                        {v.country}
                      </p>
                      <p
                        className="font-orbitron text-[8px] truncate"
                        style={{ color: "#404060" }}
                        title={v.ip}
                      >
                        {v.ip.replace(/(\d+\.\d+)\.\d+\.\d+/, "$1.×.×")}
                      </p>
                    </div>
                  </div>
                  <p
                    className="font-orbitron text-[10px] truncate"
                    style={{ color: NEON }}
                    title={v.page}
                  >
                    {v.page}
                  </p>
                  <p
                    className="font-orbitron text-[9px] truncate"
                    style={{ color: "#7070a0" }}
                    title={v.referrer}
                  >
                    {v.referrer ? v.referrer.replace(/^https?:\/\/(www\.)?/, "").slice(0, 20) : "—"}
                  </p>
                  <p className="font-orbitron text-[10px]" style={{ color: "#c0c0e0" }}>
                    {v.browser}
                  </p>
                  <p className="font-orbitron text-[10px]" style={{ color: "#c0c0e0" }}>
                    {v.os}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <DeviceIcon device={v.device} />
                    <span className="font-orbitron text-[10px]" style={{ color: "#c0c0e0" }}>
                      {v.device}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
