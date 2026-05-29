"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { NAV_ITEMS } from "@/constants/routes";
import { SITE_CONFIG } from "@/constants/config";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Neon top line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent" />

      <div
        style={{
          background: "rgba(5,5,16,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,255,136,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(0,255,136,0.1)",
                  border: "1px solid rgba(0,255,136,0.4)",
                  boxShadow: "0 0 12px rgba(0,255,136,0.3)",
                }}
              >
                <Trophy size={18} color="#00ff88" />
              </div>
              <div>
                <span
                  className="font-orbitron font-black text-sm tracking-widest"
                  style={{ color: "#00ff88" }}
                >
                  FIFA
                </span>
                <span
                  className="font-orbitron font-black text-sm tracking-widest ml-1"
                  style={{ color: "#ffffff" }}
                >
                  2026
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-5 py-2 font-orbitron text-xs tracking-widest uppercase transition-all duration-300"
                    style={{
                      color: active ? "#00ff88" : "#7070a0",
                      ...(active && {
                        textShadow: "0 0 10px #00ff88",
                      }),
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "#7070a0";
                    }}
                  >
                    {active && (
                      <span
                        className="absolute bottom-0 left-2 right-2 h-[1px]"
                        style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}

              <a
                href={SITE_CONFIG.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon ml-4 text-xs"
              >
                Official Site
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 transition-colors"
              style={{ color: "#00ff88" }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              background: "rgba(5,5,16,0.98)",
              borderTop: "1px solid rgba(0,255,136,0.1)",
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 font-orbitron text-xs tracking-widest uppercase rounded-lg transition-all duration-200"
                    style={{
                      color: active ? "#00ff88" : "#7070a0",
                      background: active ? "rgba(0,255,136,0.05)" : "transparent",
                      border: active ? "1px solid rgba(0,255,136,0.2)" : "1px solid transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
