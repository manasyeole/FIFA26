"use client";

import { useState } from "react";
import { Zap, Heart, Share2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface FanPost {
  id: number;
  title: string;
  author: string;
  tag: string;
  tagColor: string;
  emoji: string;
  gradient: string;
  likes: number;
  desc: string;
}

const GALLERY: FanPost[] = [
  { id:1,  title:"Messi's Final Crusade",           author:"@futbol_art",    tag:"Legendary",   tagColor:"#ffd700",  emoji:"⭐", gradient:"linear-gradient(135deg,#1a0533,#0d0033,#1a0a00)", likes:2847, desc:"The greatest of all time leading his nation one last time. Pure gold." },
  { id:2,  title:"Ronaldo vs The World",             author:"@cr7universe",   tag:"Fire",        tagColor:"#ff3366",  emoji:"🔥", gradient:"linear-gradient(135deg,#330000,#1a0010,#0d0a00)", likes:3120, desc:"Still hunting that elusive World Cup trophy. The hunger never dies." },
  { id:3,  title:"USA Rise Up",                      author:"@yankeekick",    tag:"Host Nation", tagColor:"#00d4ff",  emoji:"🇺🇸", gradient:"linear-gradient(135deg,#001a33,#00001a,#1a001a)", likes:1564, desc:"The USA hosting for the first time since 1994. Electric." },
  { id:4,  title:"Neon Azteca Opening",              author:"@mexifutbol",    tag:"Opening",     tagColor:"#00ff88",  emoji:"🇲🇽", gradient:"linear-gradient(135deg,#001a00,#0d1a00,#1a0000)", likes:4201, desc:"Estadio Azteca lit up for the opening match. Goosebumps." },
  { id:5,  title:"Brazil Samba Dance",               author:"@sambafc",       tag:"Culture",     tagColor:"#ffd700",  emoji:"💛", gradient:"linear-gradient(135deg,#0d1a00,#001a0d,#001a00)", likes:2099, desc:"Brazil bringing the festival to the pitch. Nothing like it." },
  { id:6,  title:"France — Les Bleus Reborn",        author:"@parisgoal",     tag:"Favorite",    tagColor:"#00d4ff",  emoji:"🔵", gradient:"linear-gradient(135deg,#00001a,#001133,#1a0000)", likes:1876, desc:"Three-time champion. The blueprint for modern football." },
  { id:7,  title:"Germany Machine Reloaded",         author:"@bundesart",     tag:"Dark Horse",  tagColor:"#bf5fff",  emoji:"⚙️", gradient:"linear-gradient(135deg,#0d0d0d,#1a001a,#0d0d00)", likes:1432, desc:"Germany rebuilt and ready. Watch out for the machine." },
  { id:8,  title:"England — It's Coming Home??",     author:"@threelions",    tag:"Meme",        tagColor:"#ff3366",  emoji:"😭", gradient:"linear-gradient(135deg,#1a0010,#00001a,#0d0000)", likes:6712, desc:"The eternal optimism of English fans. The meme that never dies." },
  { id:9,  title:"MetLife Final Render",             author:"@stadiumart",    tag:"Venue Art",   tagColor:"#ffd700",  emoji:"🏟️", gradient:"linear-gradient(135deg,#0d0d22,#0a0a1a,#1a0d00)", likes:3341, desc:"The venue of the century. MetLife Stadium under the lights." },
  { id:10, title:"Canada's Moment",                  author:"@leafgoal",      tag:"Underdog",    tagColor:"#ff3366",  emoji:"🍁", gradient:"linear-gradient(135deg,#1a0000,#0d001a,#1a0000)", likes:2234, desc:"Canada's first World Cup in 40 years. The nation is READY." },
  { id:11, title:"Morocco Magic",                    author:"@atlasart",      tag:"Africa",      tagColor:"#ff9900",  emoji:"🌍", gradient:"linear-gradient(135deg,#1a0d00,#0d0000,#0d0000)", likes:2891, desc:"2022's Cinderella story looking to repeat the magic." },
  { id:12, title:"Japan — Blue Samurai 2026",        author:"@japanfc",       tag:"Asia",        tagColor:"#00d4ff",  emoji:"⚔️", gradient:"linear-gradient(135deg,#00001a,#1a0000,#00001a)", likes:1987, desc:"Japan quietly building one of the best squads in the world." },
];

const TAGS = ["All", "Legendary", "Fire", "Meme", "Venue Art", "Culture", "Underdog", "Host Nation", "Favorite", "Dark Horse", "Africa", "Asia", "Opening"];

export default function GalleryPage() {
  const [activeTag, setActiveTag]     = useState("All");
  const [liked, setLiked]             = useState<Set<number>>(new Set());
  const [lightbox, setLightbox]       = useState<FanPost | null>(null);

  const filtered = activeTag === "All" ? GALLERY : GALLERY.filter((p) => p.tag === activeTag);

  function toggleLike(id: number) {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function openLightbox(post: FanPost) { setLightbox(post); }
  function closeLightbox() { setLightbox(null); }

  function navLightbox(dir: 1 | -1) {
    if (!lightbox) return;
    const idx = filtered.findIndex((p) => p.id === lightbox.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next);
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="neon-badge neon-badge-pink flex items-center gap-2">
              <Zap size={10} />
              Fan Made · Community Art
            </span>
          </div>
          <h1 className="font-orbitron font-black text-3xl sm:text-5xl mb-4" style={{ color: "#ffffff" }}>
            Fan{" "}
            <span style={{ color: "#ff3366", textShadow: "0 0 20px #ff3366, 0 0 40px #ff336680" }}>
              Gallery
            </span>
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#7070a0", lineHeight: "1.8" }}>
            The wildest, craziest, most creative FIFA 2026 fan art and edits.
            Curated by the community.
          </p>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TAGS.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="px-4 py-2 rounded-lg font-orbitron text-[10px] tracking-widest uppercase transition-all duration-200"
                style={{
                  background: active ? "rgba(255,51,102,0.15)" : "rgba(13,13,34,0.8)",
                  border: `1px solid ${active ? "rgba(255,51,102,0.6)" : "rgba(255,255,255,0.08)"}`,
                  color: active ? "#ff3366" : "#7070a0",
                  boxShadow: active ? "0 0 15px rgba(255,51,102,0.2)" : "none",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p className="text-center font-orbitron text-xs mb-8" style={{ color: "#404060" }}>
          <span style={{ color: "#ff3366" }}>{filtered.length}</span> pieces
        </p>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group"
              style={{
                background: post.gradient,
                border: `1px solid ${post.tagColor}20`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${post.tagColor}50`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${post.tagColor}15, 0 8px 40px rgba(0,0,0,0.5)`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${post.tagColor}20`;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
              onClick={() => openLightbox(post)}
            >
              {/* Art area */}
              <div
                className="relative flex items-center justify-center"
                style={{ height: post.id % 3 === 0 ? "220px" : "180px" }}
              >
                <span style={{ fontSize: "5rem", filter: `drop-shadow(0 0 20px ${post.tagColor})` }}>
                  {post.emoji}
                </span>
                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <span className="font-orbitron text-xs tracking-widest" style={{ color: "#ffffff" }}>
                    View
                  </span>
                </div>
                {/* Tag badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="neon-badge"
                    style={{ borderColor: `${post.tagColor}50`, color: post.tagColor, background: `${post.tagColor}10` }}
                  >
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4" style={{ borderTop: `1px solid ${post.tagColor}15` }}>
                <h3 className="font-orbitron font-bold text-sm mb-1" style={{ color: "#ffffff" }}>
                  {post.title}
                </h3>
                <p className="text-xs mb-3" style={{ color: "#7070a0" }}>
                  by {post.author}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    className="flex items-center gap-1.5 transition-all duration-200"
                    onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                    style={{ color: liked.has(post.id) ? "#ff3366" : "#7070a0" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ff3366")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = liked.has(post.id) ? "#ff3366" : "#7070a0")}
                  >
                    <Heart size={13} fill={liked.has(post.id) ? "#ff3366" : "none"} />
                    <span className="font-orbitron text-[10px]">
                      {post.likes + (liked.has(post.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button
                    className="transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: "#7070a0" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#7070a0")}
                    title="Share"
                  >
                    <Share2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit CTA */}
        <div
          className="mt-16 rounded-2xl p-10 text-center"
          style={{ background: "rgba(13,13,34,0.8)", border: "1px solid rgba(255,51,102,0.2)" }}
        >
          <div className="text-5xl mb-4">🎨</div>
          <h2 className="font-orbitron font-black text-2xl mb-3" style={{ color: "#ff3366" }}>
            Submit Your Art
          </h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "#7070a0", lineHeight: "1.8" }}>
            Got a crazy FIFA 2026 edit? Fan art? A legendary meme?<br />
            We want it. Community submissions opening soon.
          </p>
          <button className="btn-neon btn-neon-pink inline-flex items-center gap-2" disabled>
            <Zap size={14} />
            Coming in Phase 2
          </button>
        </div>
      </div>

      {/* ─── Lightbox ───────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-lg w-full rounded-2xl overflow-hidden"
            style={{ background: lightbox.gradient, border: `1px solid ${lightbox.tagColor}40` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg transition-colors"
              style={{ background: "rgba(0,0,0,0.6)", color: "#ffffff" }}
            >
              <X size={18} />
            </button>

            {/* Art */}
            <div className="flex items-center justify-center" style={{ height: "280px" }}>
              <span style={{ fontSize: "8rem", filter: `drop-shadow(0 0 30px ${lightbox.tagColor})` }}>
                {lightbox.emoji}
              </span>
            </div>

            {/* Info */}
            <div className="p-6" style={{ borderTop: `1px solid ${lightbox.tagColor}20` }}>
              <span
                className="neon-badge mb-3 inline-block"
                style={{ borderColor: `${lightbox.tagColor}50`, color: lightbox.tagColor, background: `${lightbox.tagColor}10` }}
              >
                {lightbox.tag}
              </span>
              <h2 className="font-orbitron font-black text-xl mb-1" style={{ color: "#ffffff" }}>
                {lightbox.title}
              </h2>
              <p className="text-xs mb-3" style={{ color: lightbox.tagColor }}>by {lightbox.author}</p>
              <p className="text-sm" style={{ color: "#a0a0c0", lineHeight: "1.7" }}>{lightbox.desc}</p>

              <div className="flex items-center justify-between mt-4">
                <button
                  className="flex items-center gap-2 transition-all"
                  onClick={() => toggleLike(lightbox.id)}
                  style={{ color: liked.has(lightbox.id) ? "#ff3366" : "#7070a0" }}
                >
                  <Heart size={16} fill={liked.has(lightbox.id) ? "#ff3366" : "none"} />
                  <span className="font-orbitron text-xs">
                    {lightbox.likes + (liked.has(lightbox.id) ? 1 : 0)}
                  </span>
                </button>
                <div className="flex gap-2">
                  <button onClick={() => navLightbox(-1)} className="p-2 rounded-lg transition-colors" style={{ background: "rgba(255,255,255,0.05)", color: "#7070a0" }}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => navLightbox(1)} className="p-2 rounded-lg transition-colors" style={{ background: "rgba(255,255,255,0.05)", color: "#7070a0" }}>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
