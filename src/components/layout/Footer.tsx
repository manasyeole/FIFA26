"use client";

import Link from "next/link";
import { Trophy, GitBranch, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(5,5,16,0.95)",
        borderTop: "1px solid rgba(0,255,136,0.1)",
      }}
    >
      <div className="neon-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(0,255,136,0.1)",
                  border: "1px solid rgba(0,255,136,0.3)",
                }}
              >
                <Trophy size={16} color="#00ff88" />
              </div>
              <span className="font-orbitron font-black text-sm tracking-widest text-glow-green">
                FIFA 2026
              </span>
            </div>
            <p className="text-sm" style={{ color: "#7070a0", lineHeight: "1.7" }}>
              The ultimate fan hub for the 2026 FIFA World Cup. Schedules, fan art, and pure
              football madness.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className="font-orbitron text-xs tracking-widest uppercase mb-4"
              style={{ color: "#00ff88" }}
            >
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Schedule", href: "/schedule" },
                { label: "Gallery", href: "/gallery" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#7070a0" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00ff88")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#7070a0")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3
              className="font-orbitron text-xs tracking-widest uppercase mb-4"
              style={{ color: "#ff3366" }}
            >
              About
            </h3>
            <p className="text-sm mb-4" style={{ color: "#7070a0", lineHeight: "1.7" }}>
              Fan-made project. Not affiliated with FIFA. Match data is based on the confirmed 2026
              FIFA World Cup schedule.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/manasyeole/FIFA26"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{
                  color: "#7070a0",
                  border: "1px solid rgba(112,112,160,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#00ff88";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,136,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#7070a0";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(112,112,160,0.2)";
                }}
                aria-label="GitHub"
              >
                <GitBranch size={16} />
              </a>
              <a
                href="https://www.fifa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{
                  color: "#7070a0",
                  border: "1px solid rgba(112,112,160,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#00d4ff";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#7070a0";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(112,112,160,0.2)";
                }}
                aria-label="FIFA Official"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}
        >
          <p className="text-xs font-orbitron tracking-widest" style={{ color: "#4040608" }}>
            <span style={{ color: "#404060" }}>© 2026</span>
            <span className="mx-2" style={{ color: "#00ff88" }}>
              FIFA 2026 FAN HUB
            </span>
            <span style={{ color: "#404060" }}>— Fan Made Project</span>
          </p>
          <p className="text-xs" style={{ color: "#404060" }}>
            48 Teams · 104 Matches · 3 Countries · 1 Trophy
          </p>
        </div>
      </div>
    </footer>
  );
}
