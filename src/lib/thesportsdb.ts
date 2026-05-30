/**
 * TheSportsDB API client — free tier (API key: 3).
 * Used for player photos (strThumb, strCutout) only.
 * Stats (caps, goals) are not available in free tier and are hardcoded in countries.ts.
 */

const BASE = "https://www.thesportsdb.com/api/v1/json/3";

export interface TSDBPlayer {
  idPlayer: string;
  strPlayer: string;
  strPosition: string;
  strNationality: string;
  strTeam: string;
  dateBorn: string;
  strThumb: string; // Headshot — use in squad cards
  strCutout: string; // Full-body transparent PNG — use in match posters
  strStatus: string;
}

/** In-memory cache to avoid hitting rate limits on repeat renders */
const playerCache = new Map<string, TSDBPlayer | null>();

/**
 * Fetches a player from TheSportsDB by name.
 * Returns the best match or null if not found.
 */
export async function fetchPlayerByName(name: string): Promise<TSDBPlayer | null> {
  if (playerCache.has(name)) return playerCache.get(name) ?? null;

  try {
    const res = await fetch(
      `${BASE}/searchplayers.php?p=${encodeURIComponent(name)}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours in Next.js
    );
    if (!res.ok) return null;
    const data = await res.json();
    const player = data?.player?.[0] ?? null;
    playerCache.set(name, player);
    return player;
  } catch {
    playerCache.set(name, null);
    return null;
  }
}

/**
 * Returns just the thumbnail URL for a player name.
 * Falls back to null if not found.
 */
export async function getPlayerThumb(name: string): Promise<string | null> {
  const player = await fetchPlayerByName(name);
  return player?.strThumb || null;
}

/**
 * Returns just the cutout URL (transparent PNG) for a player name.
 * Falls back to null if not found.
 */
export async function getPlayerCutout(name: string): Promise<string | null> {
  const player = await fetchPlayerByName(name);
  return player?.strCutout || null;
}

/**
 * Calculates age from a birth date string "YYYY-MM-DD".
 */
export function calcAge(dateBorn: string): number {
  if (!dateBorn) return 0;
  const today = new Date();
  const birth = new Date(dateBorn);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}
