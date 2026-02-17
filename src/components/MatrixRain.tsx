import { useMemo, useState, useCallback, useRef } from "react";

interface MatrixRainProps {
  className?: string;
}

const MatrixRain = ({ className = "" }: MatrixRainProps) => {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Matrix/vector symbols
  const symbols = useMemo(() => [
    "∑", "∫", "∂", "λ", "θ", "∇", "π", "Δ", "∞", "σ", "μ", "α", "β", "ε", "ω", "φ",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "[", "]", "{", "}", "(", ")",
    "→", "←", "↑", "↓", "⊗", "⊕", "∈", "∉", "⊂", "⊃",
    "×", "+", "−", "÷", "=", "≠", "≤", "≥",
    "A", "B", "X", "Y", "W", "T", "I", "P",
  ], []);

  // Create columns
  const columns = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: 4 + i * 4,
      speed: 8 + Math.random() * 12,
      length: 6 + Math.floor(Math.random() * 12),
      delay: Math.random() * 5,
      opacity: 0.15 + Math.random() * 0.25,
      chars: Array.from({ length: 20 }, () => symbols[Math.floor(Math.random() * symbols.length)]),
    }));
  }, [symbols]);

  // Matrix notation examples - floating in background
  const matrices = useMemo(() => [
    { x: 8, y: 15, content: "[W × X + b]" },
    { x: 72, y: 35, content: "f(x) = σ(Wx)" },
    { x: 22, y: 65, content: "∇L(θ)" },
    { x: 82, y: 12, content: "softmax(z)" },
    { x: 48, y: 80, content: "P(y|x)" },
    { x: 12, y: 42, content: "h = tanh" },
    { x: 68, y: 58, content: "E[X²]" },
    { x: 38, y: 25, content: "∂L/∂w" },
  ], []);

  // Handle mouse move to detect which column is hovered
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const columnIndex = Math.floor(x / 4);
    setHoveredColumn(columnIndex);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredColumn(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ pointerEvents: "auto" }}
    >
      {/* Rain columns */}
      {columns.map((col) => {
        const isHovered = hoveredColumn !== null && Math.abs(col.id - hoveredColumn) <= 1;
        
        return (
          <div
            key={col.id}
            className="absolute font-mono text-xs select-none transition-all duration-300"
            style={{
              left: `${col.x}%`,
              top: 0,
              animation: isHovered ? "none" : `matrix-fall ${col.speed}s linear ${col.delay}s infinite`,
              opacity: isHovered ? 0.9 : col.opacity,
              transform: isHovered ? "translateY(-40px) scale(1.1)" : undefined,
              filter: isHovered ? "brightness(1.5)" : undefined,
              zIndex: isHovered ? 10 : 1,
            }}
          >
            {col.chars.slice(0, col.length).map((char, i) => {
              const isHead = i === 0;
              return (
                <div
                  key={i}
                  className="leading-tight transition-all duration-200"
                  style={{
                    color: isHead
                      ? "hsl(145 100% 70%)"
                      : `hsl(145 80% ${55 - i * 3}%)`,
                    textShadow: isHead
                      ? "0 0 10px hsl(145 100% 50%), 0 0 20px hsl(145 100% 40%)"
                      : isHovered
                      ? "0 0 8px hsl(145 90% 50%)"
                      : "none",
                    transform: isHovered ? `translateZ(${10 - i * 2}px)` : undefined,
                  }}
                >
                  {char}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Floating matrix equations - non-interactive background */}
      <div className="pointer-events-none">
        {matrices.map((m, idx) => (
          <div
            key={idx}
            className="absolute text-xs font-mono animate-pulse"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              color: "hsl(145 70% 45%)",
              opacity: 0.3,
              animationDelay: `${idx * 0.7}s`,
              textShadow: "0 0 10px hsl(145 100% 40%)",
            }}
          >
            {m.content}
          </div>
        ))}
      </div>

      {/* Floating vectors */}
      <div className="pointer-events-none">
        {[
          { x: 18, y: 52, content: "[0.8, 0.2]ᵀ" },
          { x: 58, y: 22, content: "[1, 0, 0, 1]" },
          { x: 78, y: 75, content: "x ∈ ℝⁿ" },
          { x: 32, y: 88, content: "‖w‖₂" },
          { x: 88, y: 45, content: "λmax" },
        ].map((v, idx) => (
          <div
            key={`vec-${idx}`}
            className="absolute text-[10px] font-mono"
            style={{
              left: `${v.x}%`,
              top: `${v.y}%`,
              color: "hsl(145 60% 40%)",
              opacity: 0.25,
              animation: `float ${12 + idx * 2}s ease-in-out infinite`,
              animationDelay: `${idx * 1.5}s`,
            }}
          >
            {v.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixRain;
