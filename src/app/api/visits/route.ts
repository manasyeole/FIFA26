import { type NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Visit } from "../track/route";
import { getSupabase } from "@/lib/supabase";

const VISITS_FILE = path.join(process.cwd(), "visits.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "fifa2026admin";

function readVisitsFile(): Visit[] {
  try {
    if (!fs.existsSync(VISITS_FILE)) return [];
    return JSON.parse(fs.readFileSync(VISITS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("password") !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb
      .from("visits")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(5000);

    if (error) return NextResponse.json({ visits: [], total: 0 });

    const visits: Visit[] = (data ?? []).map((row) => ({
      id: row.id,
      timestamp: row.timestamp,
      ip: row.ip,
      country: row.country,
      countryCode: row.country_code,
      city: row.city,
      region: row.region,
      org: row.org,
      page: row.page,
      referrer: row.referrer,
      userAgent: row.user_agent,
      browser: row.browser,
      os: row.os,
      device: row.device,
    }));

    return NextResponse.json({ visits, total: visits.length });
  }

  const visits = readVisitsFile();
  return NextResponse.json({ visits, total: visits.length });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("password") !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sb = getSupabase();
  if (sb) {
    await sb.from("visits").delete().neq("id", "");
    return NextResponse.json({ ok: true });
  }

  try {
    fs.writeFileSync(VISITS_FILE, "[]", "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
