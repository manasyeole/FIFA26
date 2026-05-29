export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Spinning neon ring */}
        <div
          className="w-16 h-16 rounded-full border-t-2 border-r-2 animate-spin"
          style={{
            borderColor: "#00ff88",
            boxShadow: "0 0 15px rgba(0,255,136,0.4)",
          }}
        />
        <p
          className="font-orbitron text-xs tracking-[0.3em] uppercase"
          style={{ color: "#7070a0" }}
        >
          Loading
        </p>
      </div>
    </div>
  );
}
