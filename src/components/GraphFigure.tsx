import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { propagate, type Edge } from "@/lib/gcn";

const nodes = [
  { x: 45, y: 60 },
  { x: 150, y: 32 },
  { x: 255, y: 62 },
  { x: 95, y: 150 },
  { x: 200, y: 160 },
  { x: 290, y: 140 },
];
const edges: Edge[] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [3, 4],
  [2, 5],
  [4, 5],
  [2, 4],
];
const LAYERS = 4;
const h0 = [1, 0, 0, 0, 0, 0];

const GraphFigure = () => {
  const [k, setK] = useState(0);
  const [playing, setPlaying] = useState(true);

  const H = useMemo(() => {
    const out = [h0];
    for (let i = 1; i < LAYERS; i++) out.push(propagate(nodes.length, edges, out[i - 1]));
    return out;
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setK((x) => (x + 1) % LAYERS), 2600);
    return () => window.clearInterval(id);
  }, [playing]);

  const h = H[k];
  const max = Math.max(...h);
  const directed = edges.flatMap(([a, b]) => [
    [a, b],
    [b, a],
  ]);
  const prev = H[(k + LAYERS - 1) % LAYERS];

  return (
    <figure className="w-full max-w-md">
      <svg viewBox="0 0 330 195" className="w-full h-auto" role="img" aria-label={`Graph convolution, layer ${k}`}>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="hsl(var(--primary))"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
        ))}
        {k > 0 &&
          directed
            .filter(([u]) => prev[u] > 0)
            .map(([u, v]) => (
              <motion.circle
                key={`${k}-${u}-${v}`}
                r={2 + 2.5 * (prev[u] / Math.max(...prev))}
                fill="hsl(var(--primary))"
                initial={{ cx: nodes[u].x, cy: nodes[u].y, opacity: 0.9 }}
                animate={{ cx: nodes[v].x, cy: nodes[v].y, opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            ))}
        {nodes.map((n, v) => (
          <g key={v}>
            <circle
              cx={n.x}
              cy={n.y}
              r="16"
              fill="hsl(var(--primary))"
              fillOpacity={0.08 + 0.8 * (h[v] / max)}
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              style={{ transition: "fill-opacity 0.8s ease" }}
            />
            <text
              x={n.x}
              y={n.y + 3.5}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="hsl(var(--foreground))"
            >
              {h[v].toFixed(2)}
            </text>
            <text x={n.x} y={n.y + 29} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">
              v{v + 1}
            </text>
          </g>
        ))}
      </svg>

      <figcaption className="mt-3 text-sm text-foreground/80 space-y-2">
        <p className="text-base text-center">
          h<sub>v</sub><sup>(k+1)</sup> = Σ<sub>u ∈ N(v) ∪ {"{v}"}</sub>{" "}
          h<sub>u</sub><sup>(k)</sup> / √((d<sub>u</sub>+1)(d<sub>v</sub>+1))
        </p>
        <div className="flex items-center justify-center gap-2">
          {H.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setPlaying(false);
                setK(i);
              }}
              aria-pressed={k === i}
              className={`px-2.5 py-1 rounded-md text-sm border ${
                k === i ? "border-primary text-primary bg-primary/10" : "border-border text-foreground/70"
              }`}
            >
              k = {i}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="px-2.5 py-1 rounded-md text-sm border border-border text-foreground/70"
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>
        <p className="text-muted-foreground text-center">
          One graph-convolution layer per step, with the weight matrix set to the identity and
          no nonlinearity. A signal starting at v1 reaches nodes k hops away after k layers.
        </p>
      </figcaption>
    </figure>
  );
};

export default GraphFigure;
