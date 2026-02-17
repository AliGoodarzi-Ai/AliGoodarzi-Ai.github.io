import { useMemo } from "react";

const NeuralBackground = () => {
  const nodes = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        x: (i * 31 + 13) % 100,
        y: (i * 47 + 7) % 100,
        size: 2 + (i % 5),
        delay: i * 0.6,
        duration: 10 + (i % 10) * 2,
      })),
    []
  );

  const connections = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        x1: (i * 23 + 5) % 90 + 5,
        y1: (i * 37 + 10) % 80 + 10,
        x2: (i * 41 + 20) % 85 + 10,
        y2: (i * 53 + 25) % 75 + 15,
        delay: i * 0.8,
        duration: 4 + (i % 4),
      })),
    []
  );

  const gears = useMemo(
    () => [
      { cx: 85, cy: 15, r: 60, teeth: 12, delay: 0, reverse: false },
      { cx: 15, cy: 85, r: 45, teeth: 10, delay: 2, reverse: true },
      { cx: 92, cy: 75, r: 35, teeth: 8, delay: 1, reverse: false },
      { cx: 8, cy: 25, r: 50, teeth: 11, delay: 3, reverse: true },
    ],
    []
  );

  const symbols = useMemo(() => {
    const syms = ["∑", "∫", "∂", "λ", "θ", "∇", "π", "Δ", "∞", "σ", "μ", "α", "β", "ε", "ω", "φ"];
    return syms.map((s, i) => ({
      symbol: s,
      x: (i * 43 + 17) % 88 + 6,
      y: (i * 61 + 23) % 78 + 11,
      delay: i * 1.2,
      duration: 15 + (i % 6) * 3,
      size: 14 + (i % 5) * 6,
    }));
  }, []);

  const circuitPaths = useMemo(
    () => [
      "M0,30 C20,30 30,50 50,50 L80,50 L80,70 L100,70",
      "M100,20 L70,20 L70,40 C70,60 50,60 30,60 L0,60",
      "M20,100 L20,80 C20,60 40,60 60,60 L60,40 L100,40",
      "M0,80 L30,80 L30,60 C30,40 50,40 70,40 L70,20 L100,20",
    ],
    []
  );

  const aiIcons = useMemo(
    () => [
      { icon: "⚙", x: 78, y: 88, size: 28, delay: 0 },
      { icon: "🤖", x: 12, y: 45, size: 20, delay: 2 },
      { icon: "🧠", x: 88, y: 45, size: 22, delay: 1 },
      { icon: "💡", x: 50, y: 12, size: 18, delay: 3 },
      { icon: "⚡", x: 25, y: 70, size: 16, delay: 1.5 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30" />

      {/* Animated circuit paths */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {circuitPaths.map((path, i) => (
          <g key={`circuit-${i}`}>
            <path
              d={path}
              fill="none"
              stroke="hsl(180 85% 55% / 0.3)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <circle r="3" fill="hsl(180 85% 55%)">
              <animateMotion
                dur={`${6 + i * 2}s`}
                repeatCount="indefinite"
                path={path}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${6 + i * 2}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Animated gears */}
      <svg className="absolute inset-0 w-full h-full">
        {gears.map((gear, i) => (
          <g
            key={`gear-${i}`}
            style={{
              transformOrigin: `${gear.cx}% ${gear.cy}%`,
              animation: `rotate-slow ${20 + i * 5}s linear infinite ${gear.reverse ? 'reverse' : 'normal'}`,
              animationDelay: `${gear.delay}s`,
            }}
          >
            <circle
              cx={`${gear.cx}%`}
              cy={`${gear.cy}%`}
              r={gear.r}
              fill="none"
              stroke="hsl(180 85% 55% / 0.08)"
              strokeWidth="2"
              strokeDasharray={`${gear.r / 3} ${gear.r / 6}`}
            />
            <circle
              cx={`${gear.cx}%`}
              cy={`${gear.cy}%`}
              r={gear.r * 0.6}
              fill="none"
              stroke="hsl(145 75% 50% / 0.05)"
              strokeWidth="1"
            />
            <circle
              cx={`${gear.cx}%`}
              cy={`${gear.cy}%`}
              r={gear.r * 0.2}
              fill="hsl(180 85% 55% / 0.1)"
            />
          </g>
        ))}
      </svg>

      {/* Neural network connections */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {connections.map((conn, i) => (
          <line
            key={`conn-${i}`}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="hsl(180 85% 55% / 0.4)"
            strokeWidth="1"
            style={{
              strokeDasharray: '100',
              strokeDashoffset: '100',
              animation: `data-flow ${conn.duration}s ease-in-out ${conn.delay}s infinite`,
            }}
          />
        ))}
      </svg>

      {/* Gradient blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] animate-drift"
        style={{
          top: "10%",
          left: "15%",
          background: "radial-gradient(circle, hsl(180 85% 55% / 0.08), transparent 70%)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] animate-drift"
        style={{
          bottom: "15%",
          right: "10%",
          animationDelay: "-10s",
          background: "radial-gradient(circle, hsl(145 75% 50% / 0.06), transparent 70%)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] animate-drift"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animationDelay: "-20s",
          background: "radial-gradient(circle, hsl(270 65% 65% / 0.05), transparent 70%)",
        }}
      />

      {/* Floating nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            background: i % 3 === 0 
              ? 'hsl(180 85% 55% / 0.3)'
              : i % 3 === 1 
              ? 'hsl(145 75% 50% / 0.25)'
              : 'hsl(270 65% 65% / 0.2)',
            boxShadow: `0 0 ${node.size * 3}px hsl(180 85% 55% / 0.2)`,
            animationDelay: `${node.delay}s`,
            animationDuration: `${node.duration}s`,
          }}
        />
      ))}

      {/* Floating AI icons */}
      {aiIcons.map((item, i) => (
        <div
          key={`ai-${i}`}
          className="absolute animate-float-slow select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: item.size,
            animationDelay: `${item.delay}s`,
            filter: 'grayscale(100%) brightness(0.6)',
            opacity: 0.15,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Floating math symbols */}
      {symbols.map((sym, i) => (
        <div
          key={`sym-${i}`}
          className="absolute font-mono select-none animate-float-slow"
          style={{
            left: `${sym.x}%`,
            top: `${sym.y}%`,
            fontSize: sym.size,
            color: i % 2 === 0 ? 'hsl(180 85% 55% / 0.12)' : 'hsl(145 75% 50% / 0.1)',
            animationDelay: `${sym.delay}s`,
            animationDuration: `${sym.duration}s`,
          }}
        >
          {sym.symbol}
        </div>
      ))}

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, hsl(180 85% 55% / 0.02) 50%, transparent 100%)',
          backgroundSize: '100% 200%',
          animation: 'scan 8s linear infinite',
        }}
      />
    </div>
  );
};

export default NeuralBackground;