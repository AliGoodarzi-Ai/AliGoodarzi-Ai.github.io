// A few soft, slow-drifting orbs. No lines, no clutter, just a quiet backdrop.
const orbs = [
  { x: "18%", y: "22%", size: 340, color: "hsl(var(--primary))", duration: 46, delay: 0 },
  { x: "78%", y: "30%", size: 300, color: "hsl(var(--accent))", duration: 58, delay: 6 },
  { x: "60%", y: "78%", size: 380, color: "hsl(var(--secondary))", duration: 52, delay: 3 },
];

const NeuralBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {orbs.map((o, i) => (
      <div
        key={i}
        className="absolute rounded-full blur-3xl"
        style={{
          left: o.x,
          top: o.y,
          width: o.size,
          height: o.size,
          background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
          opacity: 0.06,
          transform: "translate(-50%, -50%)",
          animation: `drift ${o.duration}s ease-in-out ${o.delay}s infinite`,
        }}
      />
    ))}
  </div>
);

export default NeuralBackground;
