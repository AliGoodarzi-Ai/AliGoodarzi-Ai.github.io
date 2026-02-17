import { useMemo } from "react";

interface CosmicParticlesProps {
  className?: string;
}

const CosmicParticles = ({ className = "" }: CosmicParticlesProps) => {
  // Create floating particles - stars, glowing orbs, cosmic dust
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      type: Math.random() > 0.7 ? "glow" : "star",
      color: ["primary", "secondary", "accent"][Math.floor(Math.random() * 3)] as "primary" | "secondary" | "accent",
    }));
  }, []);

  // Shooting stars
  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: 10 + Math.random() * 30,
      startY: 5 + Math.random() * 20,
      duration: 2 + Math.random() * 2,
      delay: i * 7 + Math.random() * 5,
    }));
  }, []);

  // Nebula clouds
  const nebulae = useMemo(() => {
    return [
      { x: 20, y: 30, size: 200, color: "primary", opacity: 0.03 },
      { x: 70, y: 60, size: 250, color: "secondary", opacity: 0.025 },
      { x: 50, y: 80, size: 180, color: "accent", opacity: 0.02 },
    ];
  }, []);

  const colorValues = {
    primary: "hsl(180 85% 55%)",
    secondary: "hsl(145 75% 55%)",
    accent: "hsl(45 95% 60%)",
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Nebula background clouds */}
      {nebulae.map((nebula, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute rounded-full blur-3xl animate-glow-pulse"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: nebula.size,
            height: nebula.size,
            background: `radial-gradient(circle, ${colorValues[nebula.color as keyof typeof colorValues]}, transparent 70%)`,
            opacity: nebula.opacity,
            transform: "translate(-50%, -50%)",
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `float-cosmic ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        >
          {p.type === "glow" ? (
            <div
              className="rounded-full animate-glow-pulse"
              style={{
                width: p.size * 2,
                height: p.size * 2,
                background: `radial-gradient(circle, ${colorValues[p.color]}, transparent 70%)`,
                boxShadow: `0 0 ${p.size * 3}px ${colorValues[p.color]}`,
              }}
            />
          ) : (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: "white",
                opacity: 0.3 + Math.random() * 0.5,
                boxShadow: "0 0 3px white",
              }}
            />
          )}
        </div>
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={`shooting-${star.id}`}
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            animation: `shooting-star ${star.duration}s ease-in ${star.delay}s infinite`,
          }}
        >
          <div
            className="h-px bg-gradient-to-r from-white via-primary to-transparent"
            style={{ width: 60, transform: "rotate(45deg)" }}
          />
        </div>
      ))}
    </div>
  );
};

export default CosmicParticles;
