import { useMemo, useEffect, useState } from "react";

interface MatrixRainProps {
  className?: string;
}

const MatrixRain = ({ className = "" }: MatrixRainProps) => {
  const [tick, setTick] = useState(0);

  // Trigger re-render for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Matrix/vector symbols
  const symbols = useMemo(() => {
    const chars = [
      "∑", "∫", "∂", "λ", "θ", "∇", "π", "Δ", "∞", "σ", "μ", "α", "β", "ε", "ω", "φ",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "[", "]", "{", "}", "(", ")", 
      "→", "←", "↑", "↓", "⊗", "⊕", "∈", "∉", "⊂", "⊃",
      "×", "+", "−", "÷", "=", "≠", "≤", "≥",
      "A", "B", "X", "Y", "W", "T", "I", "P",
    ];
    return chars;
  }, []);

  // Create columns
  const columns = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      x: 5 + i * 5,
      speed: 0.5 + Math.random() * 1.5,
      length: 5 + Math.floor(Math.random() * 10),
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  // Matrix notation examples
  const matrices = useMemo(() => [
    { x: 10, y: 20, content: "[W₁ × X + b₁]", delay: 0 },
    { x: 75, y: 40, content: "f(x) = σ(Wx)", delay: 2 },
    { x: 25, y: 70, content: "∇L(θ)", delay: 4 },
    { x: 85, y: 15, content: "softmax(z)", delay: 1 },
    { x: 50, y: 85, content: "P(y|x)", delay: 3 },
    { x: 15, y: 45, content: "h = tanh(Wx)", delay: 5 },
    { x: 70, y: 65, content: "E[X²]", delay: 2.5 },
    { x: 40, y: 30, content: "∂L/∂w", delay: 1.5 },
  ], []);

  // Floating vectors
  const vectors = useMemo(() => [
    { x: 20, y: 55, content: "[0.8, 0.2, -0.5]ᵀ" },
    { x: 60, y: 25, content: "[1, 0, 0, 1]" },
    { x: 80, y: 80, content: "x ∈ ℝⁿ" },
    { x: 35, y: 90, content: "‖w‖₂" },
    { x: 90, y: 50, content: "λmax" },
  ], []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Rain columns */}
      {columns.map((col, colIdx) => (
        <div
          key={colIdx}
          className="absolute font-mono text-xs"
          style={{
            left: `${col.x}%`,
            top: 0,
            animation: `matrix-fall ${8 / col.speed}s linear ${col.delay}s infinite`,
            opacity: col.opacity,
          }}
        >
          {Array.from({ length: col.length }, (_, i) => {
            const charIdx = (tick + i + colIdx * 7) % symbols.length;
            const isHead = i === 0;
            return (
              <div
                key={i}
                className="leading-tight"
                style={{
                  color: isHead 
                    ? "hsl(145 100% 70%)" 
                    : `hsl(145 80% ${50 - i * 4}%)`,
                  textShadow: isHead 
                    ? "0 0 10px hsl(145 100% 50%), 0 0 20px hsl(145 100% 40%)"
                    : "none",
                }}
              >
                {symbols[charIdx]}
              </div>
            );
          })}
        </div>
      ))}

      {/* Floating matrix equations */}
      {matrices.map((matrix, i) => (
        <div
          key={`matrix-${i}`}
          className="absolute font-mono text-green-400/40 text-sm animate-float"
          style={{
            left: `${matrix.x}%`,
            top: `${matrix.y}%`,
            animationDelay: `${matrix.delay}s`,
            animationDuration: "12s",
            textShadow: "0 0 15px hsl(145 80% 40% / 0.5)",
          }}
        >
          {matrix.content}
        </div>
      ))}

      {/* Floating vectors */}
      {vectors.map((vec, i) => (
        <div
          key={`vec-${i}`}
          className="absolute font-mono text-green-500/30 text-xs animate-float-slow"
          style={{
            left: `${vec.x}%`,
            top: `${vec.y}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: "15s",
          }}
        >
          {vec.content}
        </div>
      ))}

      {/* Glow overlay at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, hsl(145 80% 50% / 0.05), transparent)",
        }}
      />
    </div>
  );
};

export default MatrixRain;
