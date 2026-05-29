/**
 * FIFA 2026 match data — single source of truth for all 104 matches.
 * Types are imported from @/types to keep this file focused on data only.
 */
import type { Match, Stage, Venue } from "@/types";

export type { Match, Stage };

export const VENUES: Record<string, Venue> = {
  NYC:  { stadium: "MetLife Stadium",      city: "New York / New Jersey", country: "USA" },
  LA:   { stadium: "SoFi Stadium",         city: "Los Angeles",           country: "USA" },
  DAL:  { stadium: "AT&T Stadium",         city: "Dallas",                country: "USA" },
  SF:   { stadium: "Levi's Stadium",       city: "San Francisco Bay",     country: "USA" },
  SEA:  { stadium: "Lumen Field",          city: "Seattle",               country: "USA" },
  MIA:  { stadium: "Hard Rock Stadium",    city: "Miami",                 country: "USA" },
  ATL:  { stadium: "Mercedes-Benz Stadium",city: "Atlanta",               country: "USA" },
  HOU:  { stadium: "NRG Stadium",          city: "Houston",               country: "USA" },
  KC:   { stadium: "Arrowhead Stadium",    city: "Kansas City",           country: "USA" },
  PHI:  { stadium: "Lincoln Financial",    city: "Philadelphia",          country: "USA" },
  BOS:  { stadium: "Gillette Stadium",     city: "Boston",                country: "USA" },
  VAN:  { stadium: "BC Place",             city: "Vancouver",             country: "Canada" },
  TOR:  { stadium: "BMO Field",            city: "Toronto",               country: "Canada" },
  MEX:  { stadium: "Estadio Azteca",       city: "Mexico City",           country: "Mexico" },
  GDL:  { stadium: "Estadio Akron",        city: "Guadalajara",           country: "Mexico" },
  MTY:  { stadium: "Estadio BBVA",         city: "Monterrey",             country: "Mexico" },
};

/* ─────────────────────────────────────────────────────────────
   GROUP STAGE — 72 Matches (12 groups × 6 games each)
   Teams are based on qualified nations as of May 2026.
   Group assignments are illustrative for fan display.
───────────────────────────────────────────────────────────── */
export const matches: Match[] = [
  // ── GROUP A ──────────────────────────────────────────────
  { id:1,  matchNumber:1,  group:"A", homeTeam:"Mexico",      awayTeam:"Poland",       venue:"Estadio Azteca",        city:"Mexico City",        country:"Mexico", date:"2026-06-11", time:"21:00", stage:"Group Stage" },
  { id:2,  matchNumber:2,  group:"A", homeTeam:"Argentina",   awayTeam:"Saudi Arabia", venue:"MetLife Stadium",       city:"New York / New Jersey", country:"USA", date:"2026-06-12", time:"15:00", stage:"Group Stage" },
  { id:3,  matchNumber:3,  group:"A", homeTeam:"Mexico",      awayTeam:"Argentina",    venue:"AT&T Stadium",          city:"Dallas",             country:"USA",    date:"2026-06-16", time:"18:00", stage:"Group Stage" },
  { id:4,  matchNumber:4,  group:"A", homeTeam:"Poland",      awayTeam:"Saudi Arabia", venue:"Levi's Stadium",        city:"San Francisco Bay",  country:"USA",    date:"2026-06-16", time:"21:00", stage:"Group Stage" },
  { id:5,  matchNumber:5,  group:"A", homeTeam:"Argentina",   awayTeam:"Poland",       venue:"Hard Rock Stadium",     city:"Miami",              country:"USA",    date:"2026-06-20", time:"21:00", stage:"Group Stage" },
  { id:6,  matchNumber:6,  group:"A", homeTeam:"Saudi Arabia",awayTeam:"Mexico",       venue:"SoFi Stadium",          city:"Los Angeles",        country:"USA",    date:"2026-06-20", time:"21:00", stage:"Group Stage" },

  // ── GROUP B ──────────────────────────────────────────────
  { id:7,  matchNumber:7,  group:"B", homeTeam:"USA",         awayTeam:"Colombia",     venue:"SoFi Stadium",          city:"Los Angeles",        country:"USA",    date:"2026-06-12", time:"18:00", stage:"Group Stage" },
  { id:8,  matchNumber:8,  group:"B", homeTeam:"Canada",      awayTeam:"Morocco",      venue:"BC Place",              city:"Vancouver",          country:"Canada", date:"2026-06-12", time:"21:00", stage:"Group Stage" },
  { id:9,  matchNumber:9,  group:"B", homeTeam:"USA",         awayTeam:"Canada",       venue:"Gillette Stadium",      city:"Boston",             country:"USA",    date:"2026-06-16", time:"15:00", stage:"Group Stage" },
  { id:10, matchNumber:10, group:"B", homeTeam:"Colombia",    awayTeam:"Morocco",      venue:"Mercedes-Benz Stadium", city:"Atlanta",            country:"USA",    date:"2026-06-17", time:"15:00", stage:"Group Stage" },
  { id:11, matchNumber:11, group:"B", homeTeam:"Canada",      awayTeam:"Colombia",     venue:"BMO Field",             city:"Toronto",            country:"Canada", date:"2026-06-21", time:"18:00", stage:"Group Stage" },
  { id:12, matchNumber:12, group:"B", homeTeam:"Morocco",     awayTeam:"USA",          venue:"AT&T Stadium",          city:"Dallas",             country:"USA",    date:"2026-06-21", time:"18:00", stage:"Group Stage" },

  // ── GROUP C ──────────────────────────────────────────────
  { id:13, matchNumber:13, group:"C", homeTeam:"France",      awayTeam:"Nigeria",      venue:"AT&T Stadium",          city:"Dallas",             country:"USA",    date:"2026-06-13", time:"18:00", stage:"Group Stage" },
  { id:14, matchNumber:14, group:"C", homeTeam:"Brazil",      awayTeam:"Costa Rica",   venue:"Hard Rock Stadium",     city:"Miami",              country:"USA",    date:"2026-06-13", time:"21:00", stage:"Group Stage" },
  { id:15, matchNumber:15, group:"C", homeTeam:"France",      awayTeam:"Brazil",       venue:"MetLife Stadium",       city:"New York / New Jersey", country:"USA", date:"2026-06-17", time:"21:00", stage:"Group Stage" },
  { id:16, matchNumber:16, group:"C", homeTeam:"Nigeria",     awayTeam:"Costa Rica",   venue:"Lincoln Financial",     city:"Philadelphia",       country:"USA",    date:"2026-06-18", time:"15:00", stage:"Group Stage" },
  { id:17, matchNumber:17, group:"C", homeTeam:"Brazil",      awayTeam:"Nigeria",      venue:"SoFi Stadium",          city:"Los Angeles",        country:"USA",    date:"2026-06-22", time:"21:00", stage:"Group Stage" },
  { id:18, matchNumber:18, group:"C", homeTeam:"Costa Rica",  awayTeam:"France",       venue:"Arrowhead Stadium",     city:"Kansas City",        country:"USA",    date:"2026-06-22", time:"21:00", stage:"Group Stage" },

  // ── GROUP D ──────────────────────────────────────────────
  { id:19, matchNumber:19, group:"D", homeTeam:"Spain",       awayTeam:"Japan",        venue:"NRG Stadium",           city:"Houston",            country:"USA",    date:"2026-06-13", time:"15:00", stage:"Group Stage" },
  { id:20, matchNumber:20, group:"D", homeTeam:"Germany",     awayTeam:"Serbia",       venue:"Lincoln Financial",     city:"Philadelphia",       country:"USA",    date:"2026-06-14", time:"15:00", stage:"Group Stage" },
  { id:21, matchNumber:21, group:"D", homeTeam:"Spain",       awayTeam:"Germany",      venue:"Mercedes-Benz Stadium", city:"Atlanta",            country:"USA",    date:"2026-06-18", time:"21:00", stage:"Group Stage" },
  { id:22, matchNumber:22, group:"D", homeTeam:"Japan",       awayTeam:"Serbia",       venue:"Lumen Field",           city:"Seattle",            country:"USA",    date:"2026-06-19", time:"15:00", stage:"Group Stage" },
  { id:23, matchNumber:23, group:"D", homeTeam:"Germany",     awayTeam:"Japan",        venue:"Gillette Stadium",      city:"Boston",             country:"USA",    date:"2026-06-23", time:"18:00", stage:"Group Stage" },
  { id:24, matchNumber:24, group:"D", homeTeam:"Serbia",      awayTeam:"Spain",        venue:"AT&T Stadium",          city:"Dallas",             country:"USA",    date:"2026-06-23", time:"18:00", stage:"Group Stage" },

  // ── GROUP E ──────────────────────────────────────────────
  { id:25, matchNumber:25, group:"E", homeTeam:"England",     awayTeam:"Senegal",      venue:"SoFi Stadium",          city:"Los Angeles",        country:"USA",    date:"2026-06-14", time:"18:00", stage:"Group Stage" },
  { id:26, matchNumber:26, group:"E", homeTeam:"Portugal",    awayTeam:"Ecuador",      venue:"NRG Stadium",           city:"Houston",            country:"USA",    date:"2026-06-14", time:"21:00", stage:"Group Stage" },
  { id:27, matchNumber:27, group:"E", homeTeam:"England",     awayTeam:"Portugal",     venue:"Levi's Stadium",        city:"San Francisco Bay",  country:"USA",    date:"2026-06-19", time:"21:00", stage:"Group Stage" },
  { id:28, matchNumber:28, group:"E", homeTeam:"Senegal",     awayTeam:"Ecuador",      venue:"BC Place",              city:"Vancouver",          country:"Canada", date:"2026-06-19", time:"18:00", stage:"Group Stage" },
  { id:29, matchNumber:29, group:"E", homeTeam:"Portugal",    awayTeam:"Senegal",      venue:"MetLife Stadium",       city:"New York / New Jersey", country:"USA", date:"2026-06-23", time:"21:00", stage:"Group Stage" },
  { id:30, matchNumber:30, group:"E", homeTeam:"Ecuador",     awayTeam:"England",      venue:"Hard Rock Stadium",     city:"Miami",              country:"USA",    date:"2026-06-23", time:"21:00", stage:"Group Stage" },

  // ── GROUP F ──────────────────────────────────────────────
  { id:31, matchNumber:31, group:"F", homeTeam:"Netherlands", awayTeam:"Cameroon",     venue:"Arrowhead Stadium",     city:"Kansas City",        country:"USA",    date:"2026-06-15", time:"15:00", stage:"Group Stage" },
  { id:32, matchNumber:32, group:"F", homeTeam:"Belgium",     awayTeam:"Iran",         venue:"Mercedes-Benz Stadium", city:"Atlanta",            country:"USA",    date:"2026-06-15", time:"18:00", stage:"Group Stage" },
  { id:33, matchNumber:33, group:"F", homeTeam:"Netherlands", awayTeam:"Belgium",      venue:"Lincoln Financial",     city:"Philadelphia",       country:"USA",    date:"2026-06-20", time:"15:00", stage:"Group Stage" },
  { id:34, matchNumber:34, group:"F", homeTeam:"Cameroon",    awayTeam:"Iran",         venue:"Estadio Akron",         city:"Guadalajara",        country:"Mexico", date:"2026-06-20", time:"18:00", stage:"Group Stage" },
  { id:35, matchNumber:35, group:"F", homeTeam:"Belgium",     awayTeam:"Cameroon",     venue:"Lumen Field",           city:"Seattle",            country:"USA",    date:"2026-06-24", time:"18:00", stage:"Group Stage" },
  { id:36, matchNumber:36, group:"F", homeTeam:"Iran",        awayTeam:"Netherlands",  venue:"NRG Stadium",           city:"Houston",            country:"USA",    date:"2026-06-24", time:"18:00", stage:"Group Stage" },

  // ── GROUP G ──────────────────────────────────────────────
  { id:37, matchNumber:37, group:"G", homeTeam:"Uruguay",     awayTeam:"South Korea",  venue:"Estadio BBVA",          city:"Monterrey",          country:"Mexico", date:"2026-06-15", time:"21:00", stage:"Group Stage" },
  { id:38, matchNumber:38, group:"G", homeTeam:"Italy",       awayTeam:"Ghana",        venue:"Gillette Stadium",      city:"Boston",             country:"USA",    date:"2026-06-16", time:"21:00", stage:"Group Stage" },
  { id:39, matchNumber:39, group:"G", homeTeam:"Uruguay",     awayTeam:"Italy",        venue:"Hard Rock Stadium",     city:"Miami",              country:"USA",    date:"2026-06-21", time:"21:00", stage:"Group Stage" },
  { id:40, matchNumber:40, group:"G", homeTeam:"South Korea", awayTeam:"Ghana",        venue:"NRG Stadium",           city:"Houston",            country:"USA",    date:"2026-06-21", time:"15:00", stage:"Group Stage" },
  { id:41, matchNumber:41, group:"G", homeTeam:"Italy",       awayTeam:"South Korea",  venue:"SoFi Stadium",          city:"Los Angeles",        country:"USA",    date:"2026-06-25", time:"18:00", stage:"Group Stage" },
  { id:42, matchNumber:42, group:"G", homeTeam:"Ghana",       awayTeam:"Uruguay",      venue:"MetLife Stadium",       city:"New York / New Jersey", country:"USA", date:"2026-06-25", time:"18:00", stage:"Group Stage" },

  // ── GROUP H ──────────────────────────────────────────────
  { id:43, matchNumber:43, group:"H", homeTeam:"Australia",   awayTeam:"Chile",        venue:"Lumen Field",           city:"Seattle",            country:"USA",    date:"2026-06-16", time:"18:00", stage:"Group Stage" },
  { id:44, matchNumber:44, group:"H", homeTeam:"Croatia",     awayTeam:"Ivory Coast",  venue:"Arrowhead Stadium",     city:"Kansas City",        country:"USA",    date:"2026-06-17", time:"18:00", stage:"Group Stage" },
  { id:45, matchNumber:45, group:"H", homeTeam:"Australia",   awayTeam:"Croatia",      venue:"AT&T Stadium",          city:"Dallas",             country:"USA",    date:"2026-06-22", time:"15:00", stage:"Group Stage" },
  { id:46, matchNumber:46, group:"H", homeTeam:"Chile",       awayTeam:"Ivory Coast",  venue:"Estadio Azteca",        city:"Mexico City",        country:"Mexico", date:"2026-06-22", time:"18:00", stage:"Group Stage" },
  { id:47, matchNumber:47, group:"H", homeTeam:"Croatia",     awayTeam:"Chile",        venue:"Levi's Stadium",        city:"San Francisco Bay",  country:"USA",    date:"2026-06-26", time:"18:00", stage:"Group Stage" },
  { id:48, matchNumber:48, group:"H", homeTeam:"Ivory Coast", awayTeam:"Australia",    venue:"Mercedes-Benz Stadium", city:"Atlanta",            country:"USA",    date:"2026-06-26", time:"18:00", stage:"Group Stage" },

  // ── GROUP I ──────────────────────────────────────────────
  { id:49, matchNumber:49, group:"I", homeTeam:"Switzerland", awayTeam:"Venezuela",    venue:"BMO Field",             city:"Toronto",            country:"Canada", date:"2026-06-17", time:"21:00", stage:"Group Stage" },
  { id:50, matchNumber:50, group:"I", homeTeam:"Sweden",      awayTeam:"Algeria",      venue:"Estadio Azteca",        city:"Mexico City",        country:"Mexico", date:"2026-06-18", time:"18:00", stage:"Group Stage" },
  { id:51, matchNumber:51, group:"I", homeTeam:"Switzerland", awayTeam:"Sweden",       venue:"Lincoln Financial",     city:"Philadelphia",       country:"USA",    date:"2026-06-23", time:"15:00", stage:"Group Stage" },
  { id:52, matchNumber:52, group:"I", homeTeam:"Venezuela",   awayTeam:"Algeria",      venue:"Gillette Stadium",      city:"Boston",             country:"USA",    date:"2026-06-23", time:"15:00", stage:"Group Stage" },
  { id:53, matchNumber:53, group:"I", homeTeam:"Sweden",      awayTeam:"Venezuela",    venue:"BC Place",              city:"Vancouver",          country:"Canada", date:"2026-06-27", time:"18:00", stage:"Group Stage" },
  { id:54, matchNumber:54, group:"I", homeTeam:"Algeria",     awayTeam:"Switzerland",  venue:"Hard Rock Stadium",     city:"Miami",              country:"USA",    date:"2026-06-27", time:"18:00", stage:"Group Stage" },

  // ── GROUP J ──────────────────────────────────────────────
  { id:55, matchNumber:55, group:"J", homeTeam:"Denmark",     awayTeam:"Tunisia",      venue:"SoFi Stadium",          city:"Los Angeles",        country:"USA",    date:"2026-06-18", time:"15:00", stage:"Group Stage" },
  { id:56, matchNumber:56, group:"J", homeTeam:"Turkey",      awayTeam:"Paraguay",     venue:"Estadio BBVA",          city:"Monterrey",          country:"Mexico", date:"2026-06-18", time:"21:00", stage:"Group Stage" },
  { id:57, matchNumber:57, group:"J", homeTeam:"Denmark",     awayTeam:"Turkey",       venue:"Arrowhead Stadium",     city:"Kansas City",        country:"USA",    date:"2026-06-24", time:"21:00", stage:"Group Stage" },
  { id:58, matchNumber:58, group:"J", homeTeam:"Tunisia",     awayTeam:"Paraguay",     venue:"NRG Stadium",           city:"Houston",            country:"USA",    date:"2026-06-24", time:"15:00", stage:"Group Stage" },
  { id:59, matchNumber:59, group:"J", homeTeam:"Turkey",      awayTeam:"Tunisia",      venue:"Lumen Field",           city:"Seattle",            country:"USA",    date:"2026-06-28", time:"21:00", stage:"Group Stage" },
  { id:60, matchNumber:60, group:"J", homeTeam:"Paraguay",    awayTeam:"Denmark",      venue:"MetLife Stadium",       city:"New York / New Jersey", country:"USA", date:"2026-06-28", time:"21:00", stage:"Group Stage" },

  // ── GROUP K ──────────────────────────────────────────────
  { id:61, matchNumber:61, group:"K", homeTeam:"Egypt",       awayTeam:"New Zealand",  venue:"Estadio Akron",         city:"Guadalajara",        country:"Mexico", date:"2026-06-19", time:"15:00", stage:"Group Stage" },
  { id:62, matchNumber:62, group:"K", homeTeam:"Austria",     awayTeam:"Honduras",     venue:"Mercedes-Benz Stadium", city:"Atlanta",            country:"USA",    date:"2026-06-19", time:"21:00", stage:"Group Stage" },
  { id:63, matchNumber:63, group:"K", homeTeam:"Egypt",       awayTeam:"Austria",      venue:"Lincoln Financial",     city:"Philadelphia",       country:"USA",    date:"2026-06-25", time:"21:00", stage:"Group Stage" },
  { id:64, matchNumber:64, group:"K", homeTeam:"New Zealand", awayTeam:"Honduras",     venue:"AT&T Stadium",          city:"Dallas",             country:"USA",    date:"2026-06-25", time:"15:00", stage:"Group Stage" },
  { id:65, matchNumber:65, group:"K", homeTeam:"Austria",     awayTeam:"New Zealand",  venue:"Levi's Stadium",        city:"San Francisco Bay",  country:"USA",    date:"2026-06-29", time:"18:00", stage:"Group Stage" },
  { id:66, matchNumber:66, group:"K", homeTeam:"Honduras",    awayTeam:"Egypt",        venue:"Gillette Stadium",      city:"Boston",             country:"USA",    date:"2026-06-29", time:"18:00", stage:"Group Stage" },

  // ── GROUP L ──────────────────────────────────────────────
  { id:67, matchNumber:67, group:"L", homeTeam:"Qatar",       awayTeam:"Ukraine",      venue:"BMO Field",             city:"Toronto",            country:"Canada", date:"2026-06-20", time:"21:00", stage:"Group Stage" },
  { id:68, matchNumber:68, group:"L", homeTeam:"Romania",     awayTeam:"Peru",         venue:"NRG Stadium",           city:"Houston",            country:"USA",    date:"2026-06-20", time:"15:00", stage:"Group Stage" },
  { id:69, matchNumber:69, group:"L", homeTeam:"Qatar",       awayTeam:"Romania",      venue:"SoFi Stadium",          city:"Los Angeles",        country:"USA",    date:"2026-06-26", time:"21:00", stage:"Group Stage" },
  { id:70, matchNumber:70, group:"L", homeTeam:"Ukraine",     awayTeam:"Peru",         venue:"BC Place",              city:"Vancouver",          country:"Canada", date:"2026-06-26", time:"15:00", stage:"Group Stage" },
  { id:71, matchNumber:71, group:"L", homeTeam:"Romania",     awayTeam:"Ukraine",      venue:"Estadio BBVA",          city:"Monterrey",          country:"Mexico", date:"2026-06-30", time:"21:00", stage:"Group Stage" },
  { id:72, matchNumber:72, group:"L", homeTeam:"Peru",        awayTeam:"Qatar",        venue:"AT&T Stadium",          city:"Dallas",             country:"USA",    date:"2026-06-30", time:"21:00", stage:"Group Stage" },

  // ── ROUND OF 32 — 16 matches ──────────────────────────
  { id:73,  matchNumber:73,  homeTeam:"1A", awayTeam:"3D/E/F", venue:"MetLife Stadium",        city:"New York / New Jersey", country:"USA",    date:"2026-07-04", time:"18:00", stage:"Round of 32" },
  { id:74,  matchNumber:74,  homeTeam:"1C", awayTeam:"3A/B/G", venue:"SoFi Stadium",           city:"Los Angeles",          country:"USA",    date:"2026-07-04", time:"21:00", stage:"Round of 32" },
  { id:75,  matchNumber:75,  homeTeam:"1B", awayTeam:"2A",     venue:"AT&T Stadium",           city:"Dallas",               country:"USA",    date:"2026-07-05", time:"15:00", stage:"Round of 32" },
  { id:76,  matchNumber:76,  homeTeam:"1D", awayTeam:"2C",     venue:"Hard Rock Stadium",      city:"Miami",                country:"USA",    date:"2026-07-05", time:"21:00", stage:"Round of 32" },
  { id:77,  matchNumber:77,  homeTeam:"1E", awayTeam:"3H/I/J", venue:"Mercedes-Benz Stadium",  city:"Atlanta",              country:"USA",    date:"2026-07-06", time:"18:00", stage:"Round of 32" },
  { id:78,  matchNumber:78,  homeTeam:"1F", awayTeam:"2E",     venue:"Levi's Stadium",         city:"San Francisco Bay",    country:"USA",    date:"2026-07-06", time:"21:00", stage:"Round of 32" },
  { id:79,  matchNumber:79,  homeTeam:"1G", awayTeam:"2F",     venue:"NRG Stadium",            city:"Houston",              country:"USA",    date:"2026-07-07", time:"15:00", stage:"Round of 32" },
  { id:80,  matchNumber:80,  homeTeam:"1H", awayTeam:"2G",     venue:"Arrowhead Stadium",      city:"Kansas City",          country:"USA",    date:"2026-07-07", time:"21:00", stage:"Round of 32" },
  { id:81,  matchNumber:81,  homeTeam:"1I", awayTeam:"2H",     venue:"Lincoln Financial",      city:"Philadelphia",         country:"USA",    date:"2026-07-08", time:"15:00", stage:"Round of 32" },
  { id:82,  matchNumber:82,  homeTeam:"1J", awayTeam:"2I",     venue:"Lumen Field",            city:"Seattle",              country:"USA",    date:"2026-07-08", time:"21:00", stage:"Round of 32" },
  { id:83,  matchNumber:83,  homeTeam:"1K", awayTeam:"2J",     venue:"BC Place",               city:"Vancouver",            country:"Canada", date:"2026-07-09", time:"18:00", stage:"Round of 32" },
  { id:84,  matchNumber:84,  homeTeam:"1L", awayTeam:"2K",     venue:"BMO Field",              city:"Toronto",              country:"Canada", date:"2026-07-09", time:"21:00", stage:"Round of 32" },
  { id:85,  matchNumber:85,  homeTeam:"2B", awayTeam:"3C/D/L", venue:"Estadio Azteca",         city:"Mexico City",          country:"Mexico", date:"2026-07-10", time:"21:00", stage:"Round of 32" },
  { id:86,  matchNumber:86,  homeTeam:"2D", awayTeam:"3A/B/G", venue:"Estadio Akron",          city:"Guadalajara",          country:"Mexico", date:"2026-07-10", time:"18:00", stage:"Round of 32" },
  { id:87,  matchNumber:87,  homeTeam:"2L", awayTeam:"3E/F/H", venue:"Estadio BBVA",           city:"Monterrey",            country:"Mexico", date:"2026-07-11", time:"18:00", stage:"Round of 32" },
  { id:88,  matchNumber:88,  homeTeam:"2K", awayTeam:"3I/J/K", venue:"Gillette Stadium",       city:"Boston",               country:"USA",    date:"2026-07-11", time:"21:00", stage:"Round of 32" },

  // ── ROUND OF 16 — 8 matches ────────────────────────────
  { id:89, matchNumber:89, homeTeam:"W73", awayTeam:"W74", venue:"MetLife Stadium",        city:"New York / New Jersey", country:"USA",    date:"2026-07-13", time:"21:00", stage:"Round of 16" },
  { id:90, matchNumber:90, homeTeam:"W75", awayTeam:"W76", venue:"SoFi Stadium",           city:"Los Angeles",          country:"USA",    date:"2026-07-13", time:"18:00", stage:"Round of 16" },
  { id:91, matchNumber:91, homeTeam:"W77", awayTeam:"W78", venue:"AT&T Stadium",           city:"Dallas",               country:"USA",    date:"2026-07-14", time:"18:00", stage:"Round of 16" },
  { id:92, matchNumber:92, homeTeam:"W79", awayTeam:"W80", venue:"Hard Rock Stadium",      city:"Miami",                country:"USA",    date:"2026-07-14", time:"21:00", stage:"Round of 16" },
  { id:93, matchNumber:93, homeTeam:"W81", awayTeam:"W82", venue:"Mercedes-Benz Stadium",  city:"Atlanta",              country:"USA",    date:"2026-07-15", time:"18:00", stage:"Round of 16" },
  { id:94, matchNumber:94, homeTeam:"W83", awayTeam:"W84", venue:"NRG Stadium",            city:"Houston",              country:"USA",    date:"2026-07-15", time:"21:00", stage:"Round of 16" },
  { id:95, matchNumber:95, homeTeam:"W85", awayTeam:"W86", venue:"Levi's Stadium",         city:"San Francisco Bay",    country:"USA",    date:"2026-07-16", time:"18:00", stage:"Round of 16" },
  { id:96, matchNumber:96, homeTeam:"W87", awayTeam:"W88", venue:"BC Place",               city:"Vancouver",            country:"Canada", date:"2026-07-16", time:"21:00", stage:"Round of 16" },

  // ── QUARTERFINALS — 4 matches ──────────────────────────
  { id:97,  matchNumber:97,  homeTeam:"W89", awayTeam:"W90", venue:"MetLife Stadium",       city:"New York / New Jersey", country:"USA",    date:"2026-07-18", time:"18:00", stage:"Quarterfinal" },
  { id:98,  matchNumber:98,  homeTeam:"W91", awayTeam:"W92", venue:"SoFi Stadium",          city:"Los Angeles",          country:"USA",    date:"2026-07-18", time:"21:00", stage:"Quarterfinal" },
  { id:99,  matchNumber:99,  homeTeam:"W93", awayTeam:"W94", venue:"AT&T Stadium",          city:"Dallas",               country:"USA",    date:"2026-07-19", time:"18:00", stage:"Quarterfinal" },
  { id:100, matchNumber:100, homeTeam:"W95", awayTeam:"W96", venue:"Mercedes-Benz Stadium", city:"Atlanta",              country:"USA",    date:"2026-07-19", time:"21:00", stage:"Quarterfinal" },

  // ── SEMIFINALS — 2 matches ─────────────────────────────
  { id:101, matchNumber:101, homeTeam:"W97",  awayTeam:"W98",  venue:"MetLife Stadium", city:"New York / New Jersey", country:"USA", date:"2026-07-14", time:"21:00", stage:"Semifinal" },
  { id:102, matchNumber:102, homeTeam:"W99",  awayTeam:"W100", venue:"SoFi Stadium",    city:"Los Angeles",          country:"USA", date:"2026-07-15", time:"21:00", stage:"Semifinal" },

  // ── THIRD PLACE ────────────────────────────────────────
  { id:103, matchNumber:103, homeTeam:"L101", awayTeam:"L102", venue:"AT&T Stadium",    city:"Dallas",               country:"USA", date:"2026-07-18", time:"18:00", stage:"Third Place" },

  // ── FINAL ──────────────────────────────────────────────
  { id:104, matchNumber:104, homeTeam:"W101", awayTeam:"W102", venue:"MetLife Stadium", city:"New York / New Jersey", country:"USA", date:"2026-07-19", time:"18:00", stage:"Final" },
];

export const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];

export const STAGES: Stage[] = [
  "Group Stage","Round of 32","Round of 16","Quarterfinal","Semifinal","Third Place","Final"
];

export function getMatchesByGroup(group: string) {
  return matches.filter(m => m.group === group);
}

export function getMatchesByStage(stage: Stage) {
  return matches.filter(m => m.stage === stage);
}

// Re-export from lib/utils to keep API stable for existing consumers.
export { formatMatchDate } from "@/lib/utils";
