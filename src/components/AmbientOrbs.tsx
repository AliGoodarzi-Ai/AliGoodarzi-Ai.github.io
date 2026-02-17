import { useMemo } from "react";

interface AmbientOrbsProps {
  className?: string;
}

const AmbientOrbs = ({ className = "" }: AmbientOrbsProps) => {
  // Floating light orbs - soft, gentle, slow-moving
  const orbs = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: 80 + Math.random() * 200,
      duration: 25 + Math.random() * 35,
      delay: Math.random() * 15,
      color: ["primary", "secondary", "accent"][i % 3] as "primary" | "secondary" | "accent",
      opacity: 0.02 + Math.random() * 0.04,
    }));
  }, []);

  // Small floating particles - like gentle snow or stardust
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: -5 - Math.random() * 10,
      size: 2 + Math.random() * 4,
      duration: 30 + Math.random() * 40,
      delay: Math.random() * 20,
      drift: -20 + Math.random() * 40,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  // Constellation lines - subtle connecting lines
  const connections = useMemo(() => {
    const points = Array.from({ length: 8 }, () => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    }));
    
    const lines: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      if (Math.random() > 0.4) {
        lines.push({
          x1: points[i].x,
          y1: points[i].y,
          x2: points[i + 1].x,
          y2: points[i + 1].y,
          delay: i * 0.5,
        });
      }
    }
    return { points, lines };
  }, []);

  const colorValues = {
    primary: "hsl(180 85% 55%)",
    secondary: "hsl(145 75% 55%)",
    accent: "hsl(270 65% 65%)",
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large soft glowing orbs */}
      {orbs.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${colorValues[orb.color]}, transparent 70%)`,
            opacity: orb.opacity,
            transform: "translate(-50%, -50%)",
            animation: `drift ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
          }}
        />
      ))}

      {/* Gentle falling particles - like light snow */}
      {particles.map((p) => (
        <div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-foreground/30"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `gentle-fall ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: "0 0 6px rgba(255,255,255,0.3)",
          }}
        />
      ))}

      {/* Constellation SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
        {/* Connection lines */}
        {connections.lines.map((line, i) => (
          <line
            key={`line-${i}`}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="hsl(180 85% 55%)"
            strokeWidth="0.5"
            style={{
              animation: `data-flow 10s ease-in-out ${line.delay}s infinite`,
              strokeDasharray: 100,
            }}
          />
        ))}
        
        {/* Star points */}
        {connections.points.map((point, i) => (
          <circle
            key={`star-${i}`}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r="2"
            fill="hsl(180 85% 70%)"
            style={{
              animation: `glow-pulse 3s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </svg>

      {/* Floating tech symbols - very subtle */}
      <div className="absolute inset-0">
        {[
          { x: 15, y: 20, symbol: "◇" },
          { x: 78, y: 35, symbol: "○" },
          { x: 45, y: 75, symbol: "△" },
          { x: 88, y: 65, symbol: "□" },
          { x: 25, y: 85, symbol: "◇" },
        ].map((s, i) => (
          <div
            key={`symbol-${i}`}
            className="absolute text-primary/10 font-mono"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: 20 + Math.random() * 20,
              animation: `float ${20 + i * 5}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          >
            {s.symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbientOrbs;
