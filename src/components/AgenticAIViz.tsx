import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// AGENTIC AI SYSTEM ARCHITECTURE VISUALIZATION
// IEEE/Academic-Quality ReAct Pattern with Tool Use, Memory & Reasoning Chains
// ═══════════════════════════════════════════════════════════════════════════════

interface AgentNode {
  id: string;
  x: number;
  y: number;
  type: "llm" | "tool" | "memory" | "reasoning" | "input" | "output";
  label: string;
  subLabel?: string;
}

interface AgentConnection {
  id: string;
  from: AgentNode;
  to: AgentNode;
  type: "data" | "reasoning" | "action" | "feedback";
  label?: string;
}

interface ThoughtBubble {
  id: number;
  x: number;
  y: number;
  text: string;
  progress: number;
}

// Color palette
const COLORS = {
  llmCore: "#E91E63",
  tool: "#3498DB",
  memory: "#9B59B6",
  reasoning: "#FFD93D",
  input: "#00D9FF",
  output: "#00FF88",
  action: "#F97316",
  feedback: "#06B6D4",
  grid: "#1e293b",
};

// Agent architecture nodes
const AGENT_NODES: AgentNode[] = [
  // Input
  { id: "input", x: 80, y: 200, type: "input", label: "User Query", subLabel: "Natural Language" },
  
  // LLM Core
  { id: "llm", x: 350, y: 200, type: "llm", label: "LLM Core", subLabel: "GPT-4 / Claude" },
  
  // Reasoning chain
  { id: "reason1", x: 350, y: 60, type: "reasoning", label: "Thought", subLabel: "Reasoning" },
  { id: "reason2", x: 450, y: 60, type: "reasoning", label: "Action", subLabel: "Planning" },
  { id: "reason3", x: 550, y: 60, type: "reasoning", label: "Observation", subLabel: "ReAct" },
  
  // Tools
  { id: "tool1", x: 550, y: 140, type: "tool", label: "Search", subLabel: "Web/RAG" },
  { id: "tool2", x: 550, y: 200, type: "tool", label: "Code", subLabel: "Interpreter" },
  { id: "tool3", x: 550, y: 260, type: "tool", label: "API", subLabel: "External" },
  { id: "tool4", x: 550, y: 320, type: "tool", label: "Calculator", subLabel: "Math" },
  
  // Memory
  { id: "stm", x: 200, y: 80, type: "memory", label: "STM", subLabel: "Working Memory" },
  { id: "ltm", x: 200, y: 320, type: "memory", label: "LTM", subLabel: "Vector Store" },
  { id: "episodic", x: 120, y: 320, type: "memory", label: "Episodic", subLabel: "History" },
  
  // Output
  { id: "output", x: 700, y: 200, type: "output", label: "Response", subLabel: "Structured Output" },
];

// Connections between nodes
const generateConnections = (): AgentConnection[] => {
  const connections: AgentConnection[] = [];
  const nodes = AGENT_NODES;
  
  const findNode = (id: string) => nodes.find(n => n.id === id)!;
  
  // Input to LLM
  connections.push({ id: "c1", from: findNode("input"), to: findNode("llm"), type: "data", label: "prompt" });
  
  // LLM to Reasoning
  connections.push({ id: "c2", from: findNode("llm"), to: findNode("reason1"), type: "reasoning", label: "think" });
  connections.push({ id: "c3", from: findNode("reason1"), to: findNode("reason2"), type: "reasoning" });
  connections.push({ id: "c4", from: findNode("reason2"), to: findNode("reason3"), type: "reasoning" });
  
  // Reasoning to Tools
  connections.push({ id: "c5", from: findNode("reason2"), to: findNode("tool1"), type: "action", label: "call" });
  connections.push({ id: "c6", from: findNode("reason2"), to: findNode("tool2"), type: "action" });
  connections.push({ id: "c7", from: findNode("reason2"), to: findNode("tool3"), type: "action" });
  connections.push({ id: "c8", from: findNode("reason2"), to: findNode("tool4"), type: "action" });
  
  // Tools feedback
  connections.push({ id: "c9", from: findNode("tool1"), to: findNode("reason3"), type: "feedback", label: "result" });
  connections.push({ id: "c10", from: findNode("tool2"), to: findNode("reason3"), type: "feedback" });
  
  // Memory connections
  connections.push({ id: "c11", from: findNode("llm"), to: findNode("stm"), type: "data", label: "store" });
  connections.push({ id: "c12", from: findNode("stm"), to: findNode("llm"), type: "feedback", label: "recall" });
  connections.push({ id: "c13", from: findNode("llm"), to: findNode("ltm"), type: "data", label: "embed" });
  connections.push({ id: "c14", from: findNode("ltm"), to: findNode("llm"), type: "feedback", label: "retrieve" });
  connections.push({ id: "c15", from: findNode("episodic"), to: findNode("ltm"), type: "data" });
  
  // Reasoning loop back
  connections.push({ id: "c16", from: findNode("reason3"), to: findNode("llm"), type: "feedback", label: "iterate" });
  
  // Output
  connections.push({ id: "c17", from: findNode("llm"), to: findNode("output"), type: "data", label: "generate" });
  
  return connections;
};

// Node Component
const AgentNodeComponent = ({ node, isActive }: { node: AgentNode; isActive: boolean }) => {
  const getNodeStyle = () => {
    switch (node.type) {
      case "llm":
        return { fill: COLORS.llmCore, size: 35, shape: "hexagon" };
      case "tool":
        return { fill: COLORS.tool, size: 18, shape: "diamond" };
      case "memory":
        return { fill: COLORS.memory, size: 20, shape: "rect" };
      case "reasoning":
        return { fill: COLORS.reasoning, size: 16, shape: "circle" };
      case "input":
        return { fill: COLORS.input, size: 22, shape: "rect" };
      case "output":
        return { fill: COLORS.output, size: 22, shape: "rect" };
      default:
        return { fill: "#666", size: 15, shape: "circle" };
    }
  };
  
  const style = getNodeStyle();
  
  return (
    <g>
      {/* Glow effect */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={style.size + 8}
        fill={style.fill}
        opacity={0.15}
        filter="url(#agentGlow)"
        animate={{
          r: [style.size + 5, style.size + 12, style.size + 5],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 2 + Math.random(),
          repeat: Infinity,
        }}
      />
      
      {/* Node shape */}
      {style.shape === "hexagon" ? (
        <motion.polygon
          points={`
            ${node.x},${node.y - style.size}
            ${node.x + style.size * 0.866},${node.y - style.size * 0.5}
            ${node.x + style.size * 0.866},${node.y + style.size * 0.5}
            ${node.x},${node.y + style.size}
            ${node.x - style.size * 0.866},${node.y + style.size * 0.5}
            ${node.x - style.size * 0.866},${node.y - style.size * 0.5}
          `}
          fill={style.fill}
          stroke={style.fill}
          strokeWidth={2}
          filter="url(#agentGlow)"
          animate={{
            scale: isActive ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
        />
      ) : style.shape === "diamond" ? (
        <motion.polygon
          points={`${node.x},${node.y - style.size} ${node.x + style.size},${node.y} ${node.x},${node.y + style.size} ${node.x - style.size},${node.y}`}
          fill="rgba(52, 152, 219, 0.2)"
          stroke={style.fill}
          strokeWidth={1.5}
          animate={{
            fill: ["rgba(52, 152, 219, 0.2)", "rgba(52, 152, 219, 0.5)", "rgba(52, 152, 219, 0.2)"],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
        />
      ) : style.shape === "rect" ? (
        <motion.rect
          x={node.x - style.size}
          y={node.y - style.size * 0.6}
          width={style.size * 2}
          height={style.size * 1.2}
          rx={4}
          fill="rgba(0,0,0,0.3)"
          stroke={style.fill}
          strokeWidth={1.5}
          animate={{
            strokeOpacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ) : (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={style.size}
          fill={style.fill}
          opacity={0.8}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
        />
      )}
      
      {/* Label */}
      <text
        x={node.x}
        y={node.type === "llm" ? node.y + 2 : node.y + 1}
        fill="white"
        fontSize={node.type === "llm" ? 8 : 6}
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {node.label}
      </text>
      
      {/* Sub-label */}
      {node.subLabel && (
        <text
          x={node.x}
          y={node.y + style.size + 12}
          fill="#64748b"
          fontSize={5}
          textAnchor="middle"
          fontFamily="monospace"
        >
          {node.subLabel}
        </text>
      )}
    </g>
  );
};

// Connection with animated flow
const ConnectionLine = ({ conn, delay }: { conn: AgentConnection; delay: number }) => {
  const getColor = () => {
    switch (conn.type) {
      case "reasoning": return COLORS.reasoning;
      case "action": return COLORS.action;
      case "feedback": return COLORS.feedback;
      default: return COLORS.input;
    }
  };
  
  const color = getColor();
  
  // Calculate path
  const dx = conn.to.x - conn.from.x;
  const dy = conn.to.y - conn.from.y;
  const midX = conn.from.x + dx * 0.5;
  const midY = conn.from.y + dy * 0.5;
  
  return (
    <g>
      {/* Connection line */}
      <motion.line
        x1={conn.from.x}
        y1={conn.from.y}
        x2={conn.to.x}
        y2={conn.to.y}
        stroke={color}
        strokeWidth={conn.type === "reasoning" ? 2 : 1}
        strokeOpacity={0.4}
        strokeDasharray={conn.type === "feedback" ? "4,2" : "none"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: delay * 0.05 }}
      />
      
      {/* Animated particle */}
      <motion.circle
        r={2}
        fill={color}
        filter="url(#agentGlow)"
        initial={{ cx: conn.from.x, cy: conn.from.y }}
        animate={{ cx: conn.to.x, cy: conn.to.y }}
        transition={{
          duration: 1.5,
          delay: delay * 0.1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Label */}
      {conn.label && (
        <text
          x={midX}
          y={midY - 5}
          fill="#64748b"
          fontSize={4}
          textAnchor="middle"
          fontFamily="monospace"
        >
          {conn.label}
        </text>
      )}
    </g>
  );
};

// ReAct Loop Visualization
const ReActLoop = () => (
  <g>
    <motion.path
      d={`M 350 60 Q 450 20 550 60 Q 600 100 550 140`}
      fill="none"
      stroke={COLORS.reasoning}
      strokeWidth={1.5}
      strokeDasharray="4,2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <text x={450} y={15} fill={COLORS.reasoning} fontSize={6} textAnchor="middle" fontFamily="monospace">
      ReAct Loop: Thought → Action → Observation
    </text>
  </g>
);

// Main Component
const AgenticAIViz = () => {
  const [connections] = useState(() => generateConnections());
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = ["input", "llm", "reason1", "reason2", "tool1", "reason3", "llm", "output"];
  
  // Animate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
      setActiveNode(steps[currentStep]);
    }, 1500);
    return () => clearInterval(interval);
  }, [currentStep]);
  
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-pink-500/20 shadow-2xl shadow-pink-500/5">
      <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="agentGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background Grid */}
        <g opacity="0.08">
          {[...Array(40)].map((_, i) => (
            <line key={`vg-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke="#E91E63" strokeWidth="0.5" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`hg-${i}`} x1="0" y1={i * 20} x2="800" y2={i * 20} stroke="#E91E63" strokeWidth="0.5" />
          ))}
        </g>
        
        {/* Connections */}
        {connections.map((conn, idx) => (
          <ConnectionLine key={conn.id} conn={conn} delay={idx} />
        ))}
        
        {/* ReAct Loop */}
        <ReActLoop />
        
        {/* Nodes */}
        {AGENT_NODES.map(node => (
          <AgentNodeComponent key={node.id} node={node} isActive={activeNode === node.id} />
        ))}
        
        {/* Section Labels */}
        <text x={350} y={385} fill="#64748b" fontSize={6} textAnchor="middle" fontFamily="monospace">
          LLM Core (Reasoning Engine)
        </text>
        <text x={550} y={385} fill="#64748b" fontSize={6} textAnchor="middle" fontFamily="monospace">
          Tool Suite (Actions)
        </text>
        <text x={160} y={385} fill="#64748b" fontSize={6} textAnchor="middle" fontFamily="monospace">
          Memory Systems
        </text>
        
        {/* Mathematical Annotations */}
        <g opacity={0.7}>
          <text x={350} y={165} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            P(a|s) = π(a|s,θ)
          </text>
          <text x={200} y={135} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            M_t = f(M_t-1, o_t)
          </text>
          <text x={550} y={95} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            r = R(s, a, s')
          </text>
          <text x={630} y={200} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            y = g(x; θ)
          </text>
        </g>
        
        {/* Step Indicator */}
        <motion.g
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x={680} y={355} width={100} height={20} rx={3} fill="rgba(0,0,0,0.5)" stroke={COLORS.llmCore} strokeWidth={1} />
          <text x={730} y={368} fill={COLORS.llmCore} fontSize={7} textAnchor="middle" fontFamily="monospace">
            Step: {steps[currentStep]}
          </text>
        </motion.g>
        
        {/* Architecture annotations */}
        <g opacity={0.5}>
          <text x={80} y={355} fill="#64748b" fontSize={5} fontFamily="monospace">
            context_window=128k
          </text>
          <text x={200} y={40} fill="#64748b" fontSize={5} fontFamily="monospace">
            buffer_size=100
          </text>
          <text x={550} y={355} fill="#64748b" fontSize={5} fontFamily="monospace">
            max_iterations=10
          </text>
        </g>
      </svg>
      
      {/* Title */}
      <div className="absolute top-2 left-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
        <span className="text-[9px] font-mono text-pink-400/80">Agentic AI Architecture (ReAct Pattern)</span>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-3 flex items-center gap-3 text-[7px] font-mono">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.llmCore }} />
          <span className="text-slate-400">LLM</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2" style={{ backgroundColor: COLORS.tool, transform: "rotate(45deg)" }} />
          <span className="text-slate-400">Tools</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: COLORS.memory }} />
          <span className="text-slate-400">Memory</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.reasoning }} />
          <span className="text-slate-400">Reasoning</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5" style={{ backgroundColor: COLORS.action }} />
          <span className="text-slate-400">Action</span>
        </div>
      </div>
    </div>
  );
};

export default AgenticAIViz;
