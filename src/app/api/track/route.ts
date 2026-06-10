import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface Visit {
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
  userAgent: string;
  browser: string;
  os: string;
  device: string;
}

const VISITS_FILE = path.join(process.cwd(), "visits.json");

function readVisits(): Visit[] {
  try {
    if (!fs.existsSync(VISITS_FILE)) return [];
    return JSON.parse(fs.readFileSync(VISITS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeVisits(visits: Visit[]) {
  fs.writeFileSync(VISITS_FILE, JSON.stringify(visits, null, 2), "utf-8");
}

function parseUserAgent(ua: string): { browser: string; os: string; device: string } {
  const browser = ua.includes("Chrome")
    ? "Chrome"
    : ua.includes("Firefox")
      ? "Firefox"
      : ua.includes("Safari") && !ua.includes("Chrome")
        ? "Safari"
        : ua.includes("Edge")
          ? "Edge"
          : "Other";

  const os = ua.includes("Windows")
    ? "Windows"
    : ua.includes("Mac OS")
      ? "macOS"
      : ua.includes("Android")
        ? "Android"
        : ua.includes("iPhone") || ua.includes("iPad")
          ? "iOS"
          : ua.includes("Linux")
            ? "Linux"
            : "Other";

  const device =
    ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone")
      ? "Mobile"
      : ua.includes("Tablet") || ua.includes("iPad")
        ? "Tablet"
        : "Desktop";

  return { browser, os, device };
}

function getIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ip = getIp(req);
    const ua = req.headers.get("user-agent") ?? "";
    const { browser, os, device } = parseUserAgent(ua);

    // Skip localhost/bots
    const isLocal = ip === "unknown" || ip === "::1" || ip.startsWith("127.");
    let geo = {
      country: "Unknown",
      countryCode: "xx",
      city: "Unknown",
      region: "Unknown",
      org: "Unknown",
    };

    if (!isLocal) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, { cache: "no-store" });
        if (geoRes.ok) {
          const g = await geoRes.json();
          geo = {
            country: g.country_name ?? "Unknown",
            countryCode: (g.country_code ?? "xx").toLowerCase(),
            city: g.city ?? "Unknown",
            region: g.region ?? "Unknown",
            org: g.org ?? "Unknown",
          };
        }
      } catch {
        // geolocation failed — use defaults
      }
    } else {
      geo = {
        country: "Localhost",
        countryCode: "lo",
        city: "Local",
        region: "Local",
        org: "Local",
      };
    }

    const visit: Visit = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      ip: isLocal ? "127.0.0.1" : ip,
      ...geo,
      page: body.page ?? "/",
      referrer: body.referrer ?? "",
      userAgent: ua,
      browser,
      os,
      device,
    };

    const visits = readVisits();
    visits.unshift(visit); // newest first
    if (visits.length > 5000) visits.splice(5000); // cap at 5k entries
    writeVisits(visits);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
