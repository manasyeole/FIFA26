import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-grid"
    >
      <p
        className="font-orbitron font-black mb-4"
        style={{ fontSize: "clamp(5rem, 20vw, 12rem)", color: "rgba(0,255,136,0.1)", lineHeight: 1 }}
      >
        404
      </p>

      <h1
        className="font-orbitron font-black text-2xl sm:text-3xl mb-4"
        style={{ color: "#ffffff" }}
      >
        Page Not Found
      </h1>

      <p className="text-sm mb-8 max-w-sm" style={{ color: "#7070a0", lineHeight: "1.8" }}>
        This page does not exist. Maybe the match was cancelled, or you took a wrong turn
        at the group stage.
      </p>

      <Link href={ROUTES.home} className="btn-neon">
        Back to Home
      </Link>
    </div>
  );
}
