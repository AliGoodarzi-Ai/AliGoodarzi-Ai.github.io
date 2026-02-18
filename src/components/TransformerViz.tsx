import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DEEP NEURAL NETWORK ARCHITECTURE VISUALIZATION
// IEEE/Academic-Quality Multi-Layer Perceptron with Forward & Backward Pass
// ═══════════════════════════════════════════════════════════════════════════════

interface Neuron {
  id: string;
  x: number;
  y: number;
  layer: number;
  activation: number;
  gradient: number;
  bias: number;
}

interface Synapse {
  id: string;
  from: Neuron;
  to: Neuron;
  weight: number;
  signalStrength: number;
  gradientFlow: number;
}

interface DataPoint {
  id: number;
  x: number;
  y: number;
  progress: number;
  pathIndex: number;
  color: string;
  size: number;
}

// Layer configurations: [input, hidden1, hidden2, hidden3, hidden4, output]
const LAYER_SIZES = [6, 10, 12, 12, 10, 4];
const LAYER_LABELS = ["Input\nEmbedding", "Conv\nBlock 1", "Self\nAttention", "Feed\nForward", "Norm\n+ Residual", "Softmax\nOutput"];

// Color palette for academic visualization
const COLORS = {
  neuronActive: "#00D9FF",
  neuronInactive: "#1a2744",
  synapsePositive: "#00FF88",
  synapseNegative: "#FF6B6B",
  gradient: "#FFD93D",
  dataFlow: "#00D9FF",
  attention: "#9D4EDD",
  embedding: "#00CED1",
};

// Generate neural network structure
const generateNetwork = (): { neurons: Neuron[]; synapses: Synapse[] } => {
  const neurons: Neuron[] = [];
  const synapses: Synapse[] = [];
  
  const width = 800;
  const height = 380;
  const layerSpacing = width / (LAYER_SIZES.length + 1);
  
  // Create neurons for each layer
  LAYER_SIZES.forEach((size, layerIndex) => {
    const neuronSpacing = height / (size + 1);
    
    for (let i = 0; i < size; i++) {
      neurons.push({
        id: `n-${layerIndex}-${i}`,
        x: layerSpacing * (layerIndex + 1),
        y: neuronSpacing * (i + 1),
        layer: layerIndex,
        activation: Math.random(),
        gradient: Math.random() * 0.5,
        bias: (Math.random() - 0.5) * 2,
      });
    }
  });
  
  // Create synaptic connections between adjacent layers
  for (let l = 0; l < LAYER_SIZES.length - 1; l++) {
    const currentLayer = neurons.filter(n => n.layer === l);
    const nextLayer = neurons.filter(n => n.layer === l + 1);
    
    currentLayer.forEach(from => {
      nextLayer.forEach(to => {
        // Only connect some neurons for visual clarity (sparse connectivity)
        if (Math.random() > 0.3) {
          synapses.push({
            id: `s-${from.id}-${to.id}`,
            from,
            to,
            weight: (Math.random() - 0.5) * 2,
            signalStrength: 0,
            gradientFlow: 0,
          });
        }
      });
    });
  }
  
  return { neurons, synapses };
};

// Attention Head Visualization Component
const AttentionHead = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.g>
    {/* Attention pattern matrix */}
    {[...Array(4)].map((_, i) =>
      [...Array(4)].map((_, j) => (
        <motion.rect
          key={`att-${i}-${j}`}
          x={x + i * (size / 4)}
          y={y + j * (size / 4)}
          width={size / 4 - 1}
          height={size / 4 - 1}
          fill={COLORS.attention}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3 + Math.random() * 0.7, 0.1],
          }}
          transition={{
            duration: 2,
            delay: delay + (i + j) * 0.1,
            repeat: Infinity,
          }}
          rx={1}
        />
      ))
    )}
  </motion.g>
);

// Gradient Flow Indicator
const GradientFlowArrow = ({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  
  return (
    <motion.g>
      <motion.circle
        r={2}
        fill={COLORS.gradient}
        initial={{ cx: x2, cy: y2 }}
        animate={{ cx: x1, cy: y1 }}
        transition={{
          duration: 1.5,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.path
        d={`M ${x2} ${y2} L ${midX} ${midY}`}
        stroke={COLORS.gradient}
        strokeWidth={0.5}
        strokeDasharray="2,2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{
          duration: 1.5,
          delay,
          repeat: Infinity,
        }}
      />
    </motion.g>
  );
};

// Loss Surface Mini-Visualization
const LossSurface = ({ x, y }: { x: number; y: number }) => {
  const points = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 20; i++) {
      const xPos = x + i * 3;
      const yPos = y + Math.sin(i * 0.5) * 8 + Math.cos(i * 0.3) * 5;
      pts.push(`${xPos},${yPos}`);
    }
    return pts.join(" ");
  }, [x, y]);
  
  return (
    <g>
      <polyline
        points={points}
        fill="none"
        stroke={COLORS.gradient}
        strokeWidth={1.5}
        opacity={0.6}
      />
      <motion.circle
        r={3}
        fill={COLORS.synapsePositive}
        animate={{
          cx: [x, x + 30, x + 45, x + 60],
          cy: [y + 8, y - 3, y + 5, y - 2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <text x={x} y={y - 15} fill="#64748b" fontSize={7} fontFamily="monospace">
        ∇L(θ) convergence
      </text>
    </g>
  );
};

// Feature Map Visualization
const FeatureMap = ({ x, y, size }: { x: number; y: number; size: number }) => (
  <g>
    <text x={x} y={y - 5} fill="#64748b" fontSize={6} fontFamily="monospace">
      Feature Maps
    </text>
    {[...Array(3)].map((_, mapIndex) => (
      <g key={mapIndex}>
        {[...Array(4)].map((_, i) =>
          [...Array(4)].map((_, j) => (
            <motion.rect
              key={`fm-${mapIndex}-${i}-${j}`}
              x={x + mapIndex * (size + 4) + i * (size / 4)}
              y={y + j * (size / 4)}
              width={size / 4 - 1}
              height={size / 4 - 1}
              rx={0.5}
              fill={COLORS.embedding}
              initial={{ opacity: 0.2 }}
              animate={{ 
                opacity: [0.2, 0.3 + Math.random() * 0.6, 0.2],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                delay: mapIndex * 0.2 + (i + j) * 0.05,
                repeat: Infinity,
              }}
            />
          ))
        )}
      </g>
    ))}
  </g>
);

// Residual Connection Visualization  
const ResidualConnection = ({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) => {
  const curveHeight = 25;
  const midX = (x1 + x2) / 2;
  
  return (
    <g>
      <motion.path
        d={`M ${x1} ${y1} Q ${midX} ${y1 - curveHeight} ${x2} ${y2}`}
        fill="none"
        stroke={COLORS.synapsePositive}
        strokeWidth={1.5}
        strokeDasharray="4,2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x={midX} y={y1 - curveHeight - 5} fill={COLORS.synapsePositive} fontSize={6} textAnchor="middle" fontFamily="monospace">
        {label}
      </text>
      <motion.circle
        r={2}
        fill={COLORS.synapsePositive}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        style={{
          offsetPath: `path("M ${x1} ${y1} Q ${midX} ${y1 - curveHeight} ${x2} ${y2}")`,
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </g>
  );
};

// Weight Matrix Visualization
const WeightMatrix = ({ x, y, rows, cols, label }: { x: number; y: number; rows: number; cols: number; label: string }) => {
  const cellSize = 4;
  
  return (
    <g>
      <text x={x} y={y - 3} fill="#64748b" fontSize={5} fontFamily="monospace">
        {label}
      </text>
      {[...Array(rows)].map((_, i) =>
        [...Array(cols)].map((_, j) => (
          <motion.rect
            key={`wm-${i}-${j}`}
            x={x + j * cellSize}
            y={y + i * cellSize}
            width={cellSize - 0.5}
            height={cellSize - 0.5}
            fill={Math.random() > 0.5 ? COLORS.synapsePositive : COLORS.synapseNegative}
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: [0.3, 0.5 + Math.random() * 0.5, 0.3],
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: (i + j) * 0.02,
              repeat: Infinity,
            }}
          />
        ))
      )}
    </g>
  );
};

// Dropout Visualization
const DropoutLayer = ({ x, y, count }: { x: number; y: number; count: number }) => (
  <g>
    {[...Array(count)].map((_, i) => {
      const isDropped = Math.random() > 0.7;
      return (
        <motion.circle
          key={i}
          cx={x + (i % 5) * 6}
          cy={y + Math.floor(i / 5) * 6}
          r={2}
          fill={isDropped ? "#374151" : COLORS.neuronActive}
          stroke={isDropped ? "#4B5563" : COLORS.neuronActive}
          strokeWidth={0.5}
          initial={{ opacity: 1 }}
          animate={isDropped ? { 
            opacity: [1, 0.2, 1],
            scale: [1, 0.5, 1],
          } : {}}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        />
      );
    })}
  </g>
);

// Batch Normalization Indicator
const BatchNormIndicator = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x} y={y} width={30} height={12} rx={2} fill="rgba(0,217,255,0.1)" stroke={COLORS.neuronActive} strokeWidth={0.5} />
    <text x={x + 15} y={y + 8} fill={COLORS.neuronActive} fontSize={5} textAnchor="middle" fontFamily="monospace">
      BatchNorm
    </text>
    <motion.rect
      x={x + 2}
      y={y + 2}
      width={26}
      height={8}
      rx={1}
      fill={COLORS.neuronActive}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{ transformOrigin: `${x + 2}px ${y + 6}px` }}
    />
  </g>
);

// Main Visualization Component
const TransformerViz = () => {
  const [network] = useState(() => generateNetwork());
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [activePhase, setActivePhase] = useState<"forward" | "backward">("forward");
  const [hoveredNeuron, setHoveredNeuron] = useState<string | null>(null);
  
  // Cycle between forward and backward pass
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase(prev => prev === "forward" ? "backward" : "forward");
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  
  // Generate flowing data points
  useEffect(() => {
    const createDataPoint = () => {
      const id = Date.now() + Math.random();
      const pathIndex = Math.floor(Math.random() * LAYER_SIZES[0]);
      
      setDataPoints(prev => [
        ...prev.slice(-15), // Keep last 15 points
        {
          id,
          x: 0,
          y: 0,
          progress: 0,
          pathIndex,
          color: [COLORS.dataFlow, COLORS.synapsePositive, COLORS.attention][Math.floor(Math.random() * 3)],
          size: 2 + Math.random() * 2,
        },
      ]);
    };
    
    const interval = setInterval(createDataPoint, 400);
    return () => clearInterval(interval);
  }, []);
  
  // Animation for data flow
  useEffect(() => {
    const animate = () => {
      setDataPoints(prev => 
        prev.map(p => ({
          ...p,
          progress: p.progress + 0.008,
        })).filter(p => p.progress < 1)
      );
    };
    
    const interval = setInterval(animate, 30);
    return () => clearInterval(interval);
  }, []);
  
  // Get position along data path
  const getDataPosition = useCallback((progress: number, pathIndex: number) => {
    const layerIndex = Math.min(Math.floor(progress * LAYER_SIZES.length), LAYER_SIZES.length - 1);
    const nextLayerIndex = Math.min(layerIndex + 1, LAYER_SIZES.length - 1);
    
    const currentNeurons = network.neurons.filter(n => n.layer === layerIndex);
    const nextNeurons = network.neurons.filter(n => n.layer === nextLayerIndex);
    
    const neuronIdx = pathIndex % currentNeurons.length;
    const nextNeuronIdx = pathIndex % nextNeurons.length;
    
    const currentNeuron = currentNeurons[neuronIdx];
    const nextNeuron = nextNeurons[nextNeuronIdx];
    
    if (!currentNeuron || !nextNeuron) return { x: 0, y: 0 };
    
    const localProgress = (progress * LAYER_SIZES.length) % 1;
    
    return {
      x: currentNeuron.x + (nextNeuron.x - currentNeuron.x) * localProgress,
      y: currentNeuron.y + (nextNeuron.y - currentNeuron.y) * localProgress,
    };
  }, [network.neurons]);
  
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
      {/* SVG Neural Network */}
      <svg viewBox="0 0 850 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradients */}
          <linearGradient id="synapseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.neuronActive} stopOpacity="0.1" />
            <stop offset="50%" stopColor={COLORS.neuronActive} stopOpacity="0.4" />
            <stop offset="100%" stopColor={COLORS.neuronActive} stopOpacity="0.1" />
          </linearGradient>
          
          <radialGradient id="neuronGrad">
            <stop offset="0%" stopColor={COLORS.neuronActive} />
            <stop offset="70%" stopColor={COLORS.neuronActive} stopOpacity="0.5" />
            <stop offset="100%" stopColor={COLORS.neuronInactive} />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background Grid */}
        <g opacity="0.1">
          {[...Array(40)].map((_, i) => (
            <line key={`vg-${i}`} x1={i * 22} y1="0" x2={i * 22} y2="400" stroke="#00D9FF" strokeWidth="0.5" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`hg-${i}`} x1="0" y1={i * 22} x2="850" y2={i * 22} stroke="#00D9FF" strokeWidth="0.5" />
          ))}
        </g>
        
        {/* Synaptic Connections */}
        <g className="synapses">
          {network.synapses.map((synapse, idx) => {
            const isPositive = synapse.weight > 0;
            const opacity = Math.abs(synapse.weight) * 0.4 + 0.1;
            
            return (
              <motion.line
                key={synapse.id}
                x1={synapse.from.x}
                y1={synapse.from.y}
                x2={synapse.to.x}
                y2={synapse.to.y}
                stroke={isPositive ? COLORS.synapsePositive : COLORS.synapseNegative}
                strokeWidth={Math.abs(synapse.weight) * 1.5 + 0.3}
                strokeOpacity={opacity}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeOpacity: [opacity * 0.5, opacity, opacity * 0.5],
                }}
                transition={{ 
                  pathLength: { duration: 1, delay: idx * 0.002 },
                  strokeOpacity: { duration: 3, repeat: Infinity, delay: idx * 0.01 },
                }}
              />
            );
          })}
        </g>
        
        {/* Neurons */}
        <g className="neurons">
          {network.neurons.map((neuron, idx) => {
            const isHovered = hoveredNeuron === neuron.id;
            const layerColor = [
              COLORS.embedding,
              COLORS.synapsePositive,
              COLORS.attention,
              COLORS.dataFlow,
              COLORS.gradient,
              COLORS.synapsePositive,
            ][neuron.layer];
            
            return (
              <g key={neuron.id}>
                {/* Neuron glow */}
                <motion.circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={isHovered ? 12 : 8}
                  fill={layerColor}
                  opacity={0.15}
                  filter="url(#strongGlow)"
                  animate={{
                    r: [8, 10, 8],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: idx * 0.02,
                  }}
                />
                
                {/* Neuron core */}
                <motion.circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={4}
                  fill={COLORS.neuronInactive}
                  stroke={layerColor}
                  strokeWidth={1.5}
                  filter="url(#glow)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNeuron(neuron.id)}
                  onMouseLeave={() => setHoveredNeuron(null)}
                  animate={{
                    fill: [COLORS.neuronInactive, layerColor, COLORS.neuronInactive],
                  }}
                  transition={{
                    duration: 1.5 + neuron.activation * 2,
                    repeat: Infinity,
                    delay: neuron.layer * 0.3 + idx * 0.01,
                  }}
                />
                
                {/* Activation indicator */}
                <motion.circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={2}
                  fill={layerColor}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1 + neuron.activation,
                    repeat: Infinity,
                    delay: idx * 0.015,
                  }}
                />
              </g>
            );
          })}
        </g>
        
        {/* Data Flow Particles */}
        <AnimatePresence>
          {dataPoints.map(point => {
            const pos = getDataPosition(point.progress, point.pathIndex);
            return (
              <motion.circle
                key={point.id}
                cx={pos.x}
                cy={pos.y}
                r={point.size}
                fill={point.color}
                filter="url(#strongGlow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            );
          })}
        </AnimatePresence>
        
        {/* Backward Pass Gradient Flow */}
        {activePhase === "backward" && (
          <g className="gradients">
            {network.synapses.slice(0, 50).map((synapse, idx) => (
              <GradientFlowArrow
                key={`grad-${synapse.id}`}
                x1={synapse.from.x}
                y1={synapse.from.y}
                x2={synapse.to.x}
                y2={synapse.to.y}
                delay={idx * 0.03}
              />
            ))}
          </g>
        )}
        
        {/* Layer Labels */}
        {LAYER_LABELS.map((label, idx) => {
          const layerX = (800 / (LAYER_SIZES.length + 1)) * (idx + 1);
          return (
            <g key={`label-${idx}`}>
              <text
                x={layerX}
                y={385}
                fill="#64748b"
                fontSize={7}
                textAnchor="middle"
                fontFamily="monospace"
              >
                {label.split('\n').map((line, i) => (
                  <tspan key={i} x={layerX} dy={i === 0 ? 0 : 8}>{line}</tspan>
                ))}
              </text>
              <text
                x={layerX}
                y={15}
                fill="#00D9FF"
                fontSize={6}
                textAnchor="middle"
                fontFamily="monospace"
                opacity={0.7}
              >
                L{idx} [{LAYER_SIZES[idx]}]
              </text>
            </g>
          );
        })}
        
        {/* Annotations - Attention Heads */}
        <AttentionHead x={360} y={20} size={28} delay={0} />
        <text x={360} y={55} fill="#64748b" fontSize={5} fontFamily="monospace">
          QKV Attention
        </text>
        
        {/* Weight Matrices */}
        <WeightMatrix x={15} y={20} rows={6} cols={8} label="W_embed" />
        <WeightMatrix x={15} y={70} rows={5} cols={6} label="W_query" />
        
        {/* Feature Maps */}
        <FeatureMap x={750} y={20} size={20} />
        
        {/* Loss Surface */}
        <LossSurface x={750} y={90} />
        
        {/* Residual Connections */}
        <ResidualConnection x1={267} y1={35} x2={533} y2={35} label="Skip Connection" />
        
        {/* Batch Norm Indicators */}
        <BatchNormIndicator x={180} y={365} />
        <BatchNormIndicator x={310} y={365} />
        
        {/* Dropout Visualization */}
        <g>
          <text x={750} y={150} fill="#64748b" fontSize={6} fontFamily="monospace">
            Dropout p=0.1
          </text>
          <DropoutLayer x={750} y={155} count={15} />
        </g>
        
        {/* Phase Indicator */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x={725} y={350} width={100} height={20} rx={3} fill="rgba(0,0,0,0.5)" stroke={activePhase === "forward" ? COLORS.dataFlow : COLORS.gradient} strokeWidth={1} />
          <text x={775} y={363} fill={activePhase === "forward" ? COLORS.dataFlow : COLORS.gradient} fontSize={8} textAnchor="middle" fontFamily="monospace">
            {activePhase === "forward" ? "→ Forward Pass" : "← Backprop"}
          </text>
        </motion.g>
        
        {/* Mathematical Annotations */}
        <g opacity={0.7}>
          <text x={135} y={200} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            z = Wx + b
          </text>
          <text x={265} y={200} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            σ(z) = ReLU
          </text>
          <text x={395} y={200} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            softmax(QK^T/√d)V
          </text>
          <text x={525} y={200} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            GELU(x·W₁)·W₂
          </text>
          <text x={655} y={200} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            LayerNorm(x + F(x))
          </text>
        </g>
        
        {/* Dimension annotations */}
        <g opacity={0.5}>
          <text x={90} y={350} fill="#64748b" fontSize={5} fontFamily="monospace">
            d_model=512
          </text>
          <text x={220} y={350} fill="#64748b" fontSize={5} fontFamily="monospace">
            n_heads=8
          </text>
          <text x={350} y={350} fill="#64748b" fontSize={5} fontFamily="monospace">
            d_k=64
          </text>
          <text x={480} y={350} fill="#64748b" fontSize={5} fontFamily="monospace">
            d_ff=2048
          </text>
          <text x={610} y={350} fill="#64748b" fontSize={5} fontFamily="monospace">
            ε=1e-6
          </text>
        </g>
      </svg>
      
      {/* Title and Legend */}
      <div className="absolute top-2 left-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono text-cyan-400/80">Deep Neural Network Architecture</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-3 flex items-center gap-3 text-[7px] font-mono">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.synapsePositive }} />
          <span className="text-slate-400">w &gt; 0</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.synapseNegative }} />
          <span className="text-slate-400">w &lt; 0</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.gradient }} />
          <span className="text-slate-400">∇loss</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.attention }} />
          <span className="text-slate-400">attention</span>
        </div>
      </div>
      
      {/* Hovered Neuron Info */}
      <AnimatePresence>
        {hoveredNeuron && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-3 bg-slate-900/95 border border-cyan-500/30 rounded-lg p-2 text-[8px] font-mono"
          >
            <div className="text-cyan-400">Neuron: {hoveredNeuron}</div>
            <div className="text-slate-400">
              activation: {network.neurons.find(n => n.id === hoveredNeuron)?.activation.toFixed(3)}
            </div>
            <div className="text-slate-400">
              bias: {network.neurons.find(n => n.id === hoveredNeuron)?.bias.toFixed(3)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransformerViz;
