/**
 * FIFA 2026 — All 48 participating nations.
 * Star players + managers compiled from confirmed 2026 squads.
 * ISO codes used for flagcdn.com flag images.
 */

export interface StarPlayer {
  name: string;
  position: string;
  club: string;
  number?: number;
}

export interface Manager {
  name: string;
  nationality: string;
}

export interface Country {
  name: string;
  isoCode: string; // ISO 3166-1 alpha-2, e.g. "us", "fr", "gb-eng" for England
  group: string; // "A" through "L"
  confederation: string; // UEFA | CONMEBOL | CONCACAF | CAF | AFC | OFC
  starPlayer: StarPlayer;
  manager: Manager;
  neonColor: string; // Hex color matching team identity
}

export const CONFEDERATION_COLORS: Record<string, string> = {
  UEFA: "#00d4ff",
  CONMEBOL: "#ffd700",
  CONCACAF: "#00ff88",
  CAF: "#ff9900",
  AFC: "#bf5fff",
  OFC: "#ff3366",
};

export const countries: Country[] = [
  // ── GROUP A ──────────────────────────────────────────────────────────────
  {
    name: "Mexico",
    isoCode: "mx",
    group: "A",
    confederation: "CONCACAF",
    starPlayer: { name: "Santiago Giménez", position: "ST", club: "AC Milan", number: 7 },
    manager: { name: "Javier Aguirre", nationality: "Mexican" },
    neonColor: "#00ff6a",
  },
  {
    name: "Poland",
    isoCode: "pl",
    group: "A",
    confederation: "UEFA",
    starPlayer: { name: "Robert Lewandowski", position: "ST", club: "FC Barcelona", number: 9 },
    manager: { name: "Michał Probierz", nationality: "Polish" },
    neonColor: "#ff1a44",
  },
  {
    name: "Argentina",
    isoCode: "ar",
    group: "A",
    confederation: "CONMEBOL",
    starPlayer: { name: "Lionel Messi", position: "CAM", club: "Inter Miami CF", number: 10 },
    manager: { name: "Lionel Scaloni", nationality: "Argentine" },
    neonColor: "#74d4ff",
  },
  {
    name: "Saudi Arabia",
    isoCode: "sa",
    group: "A",
    confederation: "AFC",
    starPlayer: { name: "Salem Al-Dawsari", position: "LW", club: "Al-Hilal", number: 10 },
    manager: { name: "Georgios Donis", nationality: "Greek" },
    neonColor: "#00ff55",
  },

  // ── GROUP B ──────────────────────────────────────────────────────────────
  {
    name: "USA",
    isoCode: "us",
    group: "B",
    confederation: "CONCACAF",
    starPlayer: { name: "Christian Pulisic", position: "CAM", club: "AC Milan", number: 10 },
    manager: { name: "Mauricio Pochettino", nationality: "Argentine" },
    neonColor: "#ff3355",
  },
  {
    name: "Colombia",
    isoCode: "co",
    group: "B",
    confederation: "CONMEBOL",
    starPlayer: { name: "Luis Díaz", position: "LW", club: "Bayern Munich", number: 7 },
    manager: { name: "Néstor Lorenzo", nationality: "Argentine" },
    neonColor: "#ffe800",
  },
  {
    name: "Canada",
    isoCode: "ca",
    group: "B",
    confederation: "CONCACAF",
    starPlayer: { name: "Alphonso Davies", position: "LB", club: "Bayern Munich", number: 19 },
    manager: { name: "Jesse Marsch", nationality: "American" },
    neonColor: "#ff2200",
  },
  {
    name: "Morocco",
    isoCode: "ma",
    group: "B",
    confederation: "CAF",
    starPlayer: { name: "Achraf Hakimi", position: "RB", club: "Paris Saint-Germain", number: 2 },
    manager: { name: "Walid Regragui", nationality: "Moroccan" },
    neonColor: "#cc1122",
  },

  // ── GROUP C ──────────────────────────────────────────────────────────────
  {
    name: "France",
    isoCode: "fr",
    group: "C",
    confederation: "UEFA",
    starPlayer: { name: "Kylian Mbappé", position: "ST", club: "Real Madrid", number: 10 },
    manager: { name: "Didier Deschamps", nationality: "French" },
    neonColor: "#1a44ff",
  },
  {
    name: "Nigeria",
    isoCode: "ng",
    group: "C",
    confederation: "CAF",
    starPlayer: { name: "Victor Osimhen", position: "ST", club: "Galatasaray", number: 9 },
    manager: { name: "Eric Chelle", nationality: "French" },
    neonColor: "#00cc44",
  },
  {
    name: "Brazil",
    isoCode: "br",
    group: "C",
    confederation: "CONMEBOL",
    starPlayer: { name: "Vinicius Jr", position: "LW", club: "Real Madrid", number: 7 },
    manager: { name: "Carlo Ancelotti", nationality: "Italian" },
    neonColor: "#ffe600",
  },
  {
    name: "Costa Rica",
    isoCode: "cr",
    group: "C",
    confederation: "CONCACAF",
    starPlayer: { name: "Keylor Navas", position: "GK", club: "UNAM Pumas", number: 1 },
    manager: { name: "Miguel Herrera", nationality: "Mexican" },
    neonColor: "#0033ff",
  },

  // ── GROUP D ──────────────────────────────────────────────────────────────
  {
    name: "Spain",
    isoCode: "es",
    group: "D",
    confederation: "UEFA",
    starPlayer: { name: "Lamine Yamal", position: "RW", club: "FC Barcelona", number: 19 },
    manager: { name: "Luis de la Fuente", nationality: "Spanish" },
    neonColor: "#ff1a1a",
  },
  {
    name: "Japan",
    isoCode: "jp",
    group: "D",
    confederation: "AFC",
    starPlayer: { name: "Takefusa Kubo", position: "RW", club: "Real Sociedad", number: 8 },
    manager: { name: "Hajime Moriyasu", nationality: "Japanese" },
    neonColor: "#ff0033",
  },
  {
    name: "Germany",
    isoCode: "de",
    group: "D",
    confederation: "UEFA",
    starPlayer: { name: "Jamal Musiala", position: "CAM", club: "Bayern Munich", number: 10 },
    manager: { name: "Julian Nagelsmann", nationality: "German" },
    neonColor: "#ff2200",
  },
  {
    name: "Serbia",
    isoCode: "rs",
    group: "D",
    confederation: "UEFA",
    starPlayer: { name: "Dušan Vlahović", position: "ST", club: "Juventus", number: 9 },
    manager: { name: "Dragan Stojković", nationality: "Serbian" },
    neonColor: "#cc0022",
  },

  // ── GROUP E ──────────────────────────────────────────────────────────────
  {
    name: "England",
    isoCode: "gb-eng",
    group: "E",
    confederation: "UEFA",
    starPlayer: { name: "Harry Kane", position: "ST", club: "Bayern Munich", number: 9 },
    manager: { name: "Thomas Tuchel", nationality: "German" },
    neonColor: "#ff2244",
  },
  {
    name: "Senegal",
    isoCode: "sn",
    group: "E",
    confederation: "CAF",
    starPlayer: { name: "Sadio Mané", position: "LW", club: "Al-Nassr", number: 10 },
    manager: { name: "Pape Thiaw", nationality: "Senegalese" },
    neonColor: "#00dd55",
  },
  {
    name: "Portugal",
    isoCode: "pt",
    group: "E",
    confederation: "UEFA",
    starPlayer: { name: "Cristiano Ronaldo", position: "ST", club: "Al Nassr", number: 7 },
    manager: { name: "Roberto Martínez", nationality: "Spanish" },
    neonColor: "#ff0000",
  },
  {
    name: "Ecuador",
    isoCode: "ec",
    group: "E",
    confederation: "CONMEBOL",
    starPlayer: { name: "Moisés Caicedo", position: "CDM", club: "Chelsea", number: 25 },
    manager: { name: "Sebastián Beccacece", nationality: "Argentine" },
    neonColor: "#ffee00",
  },

  // ── GROUP F ──────────────────────────────────────────────────────────────
  {
    name: "Netherlands",
    isoCode: "nl",
    group: "F",
    confederation: "UEFA",
    starPlayer: { name: "Virgil van Dijk", position: "CB", club: "Liverpool", number: 4 },
    manager: { name: "Ronald Koeman", nationality: "Dutch" },
    neonColor: "#ff6600",
  },
  {
    name: "Cameroon",
    isoCode: "cm",
    group: "F",
    confederation: "CAF",
    starPlayer: { name: "André Onana", position: "GK", club: "Manchester United", number: 1 },
    manager: { name: "Marc Brys", nationality: "Belgian" },
    neonColor: "#007a33",
  },
  {
    name: "Belgium",
    isoCode: "be",
    group: "F",
    confederation: "UEFA",
    starPlayer: { name: "Kevin De Bruyne", position: "CM", club: "Manchester City", number: 7 },
    manager: { name: "Rudi Garcia", nationality: "French" },
    neonColor: "#ff2233",
  },
  {
    name: "Iran",
    isoCode: "ir",
    group: "F",
    confederation: "AFC",
    starPlayer: { name: "Mehdi Taremi", position: "ST", club: "Olympiacos", number: 9 },
    manager: { name: "Amir Ghalenoei", nationality: "Iranian" },
    neonColor: "#00cc44",
  },

  // ── GROUP G ──────────────────────────────────────────────────────────────
  {
    name: "Uruguay",
    isoCode: "uy",
    group: "G",
    confederation: "CONMEBOL",
    starPlayer: { name: "Federico Valverde", position: "CM", club: "Real Madrid", number: 8 },
    manager: { name: "Marcelo Bielsa", nationality: "Argentine" },
    neonColor: "#44ccff",
  },
  {
    name: "South Korea",
    isoCode: "kr",
    group: "G",
    confederation: "AFC",
    starPlayer: { name: "Son Heung-min", position: "LW", club: "Los Angeles FC", number: 7 },
    manager: { name: "Hong Myung-bo", nationality: "South Korean" },
    neonColor: "#ff2233",
  },
  {
    name: "Italy",
    isoCode: "it",
    group: "G",
    confederation: "UEFA",
    starPlayer: { name: "Gianluca Scamacca", position: "ST", club: "Atalanta", number: 9 },
    manager: { name: "Luciano Spalletti", nationality: "Italian" },
    neonColor: "#0066ff",
  },
  {
    name: "Ghana",
    isoCode: "gh",
    group: "G",
    confederation: "CAF",
    starPlayer: { name: "Mohammed Kudus", position: "CAM", club: "West Ham United", number: 14 },
    manager: { name: "Otto Addo", nationality: "Ghanaian" },
    neonColor: "#ffcc00",
  },

  // ── GROUP H ──────────────────────────────────────────────────────────────
  {
    name: "Australia",
    isoCode: "au",
    group: "H",
    confederation: "AFC",
    starPlayer: { name: "Mat Ryan", position: "GK", club: "Levante", number: 1 },
    manager: { name: "Tony Popovic", nationality: "Australian" },
    neonColor: "#ffcc00",
  },
  {
    name: "Chile",
    isoCode: "cl",
    group: "H",
    confederation: "CONMEBOL",
    starPlayer: { name: "Alexis Sánchez", position: "LW", club: "Udinese", number: 7 },
    manager: { name: "Ricardo Gareca", nationality: "Argentine" },
    neonColor: "#ff0022",
  },
  {
    name: "Croatia",
    isoCode: "hr",
    group: "H",
    confederation: "UEFA",
    starPlayer: { name: "Luka Modrić", position: "CM", club: "AC Milan", number: 10 },
    manager: { name: "Zlatko Dalić", nationality: "Croatian" },
    neonColor: "#ff2244",
  },
  {
    name: "Ivory Coast",
    isoCode: "ci",
    group: "H",
    confederation: "CAF",
    starPlayer: { name: "Sébastien Haller", position: "ST", club: "Borussia Dortmund", number: 9 },
    manager: { name: "Emerse Faé", nationality: "Ivorian" },
    neonColor: "#ff7700",
  },

  // ── GROUP I ──────────────────────────────────────────────────────────────
  {
    name: "Switzerland",
    isoCode: "ch",
    group: "I",
    confederation: "UEFA",
    starPlayer: { name: "Granit Xhaka", position: "CDM", club: "Bayer Leverkusen", number: 10 },
    manager: { name: "Murat Yakin", nationality: "Swiss" },
    neonColor: "#ff1111",
  },
  {
    name: "Venezuela",
    isoCode: "ve",
    group: "I",
    confederation: "CONMEBOL",
    starPlayer: { name: "Yangel Herrera", position: "CM", club: "Girona", number: 12 },
    manager: { name: "Fernando Batista", nationality: "Argentine" },
    neonColor: "#cc1133",
  },
  {
    name: "Sweden",
    isoCode: "se",
    group: "I",
    confederation: "UEFA",
    starPlayer: { name: "Viktor Gyökeres", position: "ST", club: "Arsenal", number: 17 },
    manager: { name: "Jon Dahl Tomasson", nationality: "Danish" },
    neonColor: "#0088dd",
  },
  {
    name: "Algeria",
    isoCode: "dz",
    group: "I",
    confederation: "CAF",
    starPlayer: { name: "Riyad Mahrez", position: "RW", club: "Al-Ahli", number: 7 },
    manager: { name: "Vladimir Petkovic", nationality: "Bosnian" },
    neonColor: "#00cc44",
  },

  // ── GROUP J ──────────────────────────────────────────────────────────────
  {
    name: "Denmark",
    isoCode: "dk",
    group: "J",
    confederation: "UEFA",
    starPlayer: {
      name: "Christian Eriksen",
      position: "CAM",
      club: "Manchester United",
      number: 10,
    },
    manager: { name: "Brian Riemer", nationality: "Danish" },
    neonColor: "#ff0022",
  },
  {
    name: "Tunisia",
    isoCode: "tn",
    group: "J",
    confederation: "CAF",
    starPlayer: { name: "Hannibal Mejbri", position: "CM", club: "Burnley", number: 8 },
    manager: { name: "Sabri Lamouchi", nationality: "French" },
    neonColor: "#ff1122",
  },
  {
    name: "Turkey",
    isoCode: "tr",
    group: "J",
    confederation: "UEFA",
    starPlayer: { name: "Arda Güler", position: "CAM", club: "Real Madrid", number: 8 },
    manager: { name: "Vincenzo Montella", nationality: "Italian" },
    neonColor: "#ff1100",
  },
  {
    name: "Paraguay",
    isoCode: "py",
    group: "J",
    confederation: "CONMEBOL",
    starPlayer: { name: "Miguel Almirón", position: "CAM", club: "Atlanta United FC", number: 10 },
    manager: { name: "Gustavo Alfaro", nationality: "Argentine" },
    neonColor: "#cc0011",
  },

  // ── GROUP K ──────────────────────────────────────────────────────────────
  {
    name: "Egypt",
    isoCode: "eg",
    group: "K",
    confederation: "CAF",
    starPlayer: { name: "Mohamed Salah", position: "RW", club: "Liverpool", number: 11 },
    manager: { name: "Hossam Hassan", nationality: "Egyptian" },
    neonColor: "#ff1133",
  },
  {
    name: "New Zealand",
    isoCode: "nz",
    group: "K",
    confederation: "OFC",
    starPlayer: { name: "Chris Wood", position: "ST", club: "Nottingham Forest", number: 9 },
    manager: { name: "Darren Bazeley", nationality: "English" },
    neonColor: "#0033cc",
  },
  {
    name: "Austria",
    isoCode: "at",
    group: "K",
    confederation: "UEFA",
    starPlayer: { name: "Marcel Sabitzer", position: "CM", club: "Borussia Dortmund", number: 8 },
    manager: { name: "Ralf Rangnick", nationality: "German" },
    neonColor: "#ff2200",
  },
  {
    name: "Honduras",
    isoCode: "hn",
    group: "K",
    confederation: "CONCACAF",
    starPlayer: { name: "Luis Palma", position: "LW", club: "Celtic", number: 11 },
    manager: { name: "Reinaldo Rueda", nationality: "Colombian" },
    neonColor: "#0066dd",
  },

  // ── GROUP L ──────────────────────────────────────────────────────────────
  {
    name: "Qatar",
    isoCode: "qa",
    group: "L",
    confederation: "AFC",
    starPlayer: { name: "Akram Afif", position: "LW", club: "Al-Sadd", number: 7 },
    manager: { name: "Julen Lopetegui", nationality: "Spanish" },
    neonColor: "#cc0044",
  },
  {
    name: "Ukraine",
    isoCode: "ua",
    group: "L",
    confederation: "UEFA",
    starPlayer: { name: "Mykhailo Mudryk", position: "LW", club: "Chelsea", number: 10 },
    manager: { name: "Serhiy Rebrov", nationality: "Ukrainian" },
    neonColor: "#ffee00",
  },
  {
    name: "Romania",
    isoCode: "ro",
    group: "L",
    confederation: "UEFA",
    starPlayer: { name: "Nicuşor Stanciu", position: "CAM", club: "Wuhan Three Towns", number: 10 },
    manager: { name: "Mircea Lucescu", nationality: "Romanian" },
    neonColor: "#ffcc00",
  },
  {
    name: "Peru",
    isoCode: "pe",
    group: "L",
    confederation: "CONMEBOL",
    starPlayer: { name: "André Carrillo", position: "RW", club: "Al-Qadsiah", number: 18 },
    manager: { name: "Jorge Fossati", nationality: "Uruguayan" },
    neonColor: "#dd0022",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns flagcdn.com URL for the country's flag. Free, no auth required. */
export function getFlagUrl(isoCode: string): string {
  return `https://flagcdn.com/w160/${isoCode}.png`;
}

export function getCountryByName(name: string): Country | undefined {
  return countries.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

export function getCountriesByGroup(group: string): Country[] {
  return countries.filter((c) => c.group.toLowerCase() === group.toLowerCase());
}

/** Returns first + last name initials of a player for avatar display. */
export function getPlayerInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
