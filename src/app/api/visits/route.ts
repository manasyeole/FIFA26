import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Visit } from "../track/route";

const VISITS_FILE = path.join(process.cwd(), "visits.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "fifa2026admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get("password");

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!fs.existsSync(VISITS_FILE)) {
      return NextResponse.json({ visits: [], total: 0 });
    }
    const visits: Visit[] = JSON.parse(fs.readFileSync(VISITS_FILE, "utf-8"));
    return NextResponse.json({ visits, total: visits.length });
  } catch {
    return NextResponse.json({ visits: [], total: 0 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get("password");

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    fs.writeFileSync(VISITS_FILE, "[]", "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
