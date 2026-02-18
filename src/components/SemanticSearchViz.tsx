import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC VECTOR SEARCH VISUALIZATION
// IEEE/Academic-Quality Embedding Space with Cosine Similarity & RAG Pipeline
// ═══════════════════════════════════════════════════════════════════════════════

interface VectorPoint {
  id: string;
  x: number;
  y: number;
  label: string;
  embedding: number[];
  similarity: number;
  cluster: number;
}

interface QueryVector {
  id: string;
  x: number;
  y: number;
  embedding: number[];
}

// Color palette
const COLORS = {
  query: "#FFD700",
  highSim: "#00FF88",
  medSim: "#00D9FF",
  lowSim: "#6366F1",
  cluster1: "#E91E63",
  cluster2: "#3498DB",
  cluster3: "#2ECC71",
  grid: "#1e293b",
  cosine: "#F97316",
  embedding: "#9B59B6",
};

// Generate mock embeddings (normalized vectors)
const generateEmbedding = (seed: number): number[] => {
  const dims = 8;
  const raw = Array.from({ length: dims }, (_, i) => 
    Math.sin(seed * (i + 1) * 0.5) + Math.cos(seed * 0.3 * i)
  );
  const magnitude = Math.sqrt(raw.reduce((sum, v) => sum + v * v, 0));
  return raw.map(v => v / magnitude);
};

// Cosine similarity
const cosineSimilarity = (a: number[], b: number[]): number => {
  return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
};

// Generate vector database points
const generateVectorDB = (): VectorPoint[] => {
  const points: VectorPoint[] = [];
  const centerX = 400;
  const centerY = 200;
  
  // Create clusters
  const clusters = [
    { cx: 280, cy: 150, color: 0 },
    { cx: 520, cy: 150, color: 1 },
    { cx: 400, cy: 280, color: 2 },
  ];
  
  const labels = [
    "neural_networks.pdf", "transformer_paper", "attention_mechanism",
    "backpropagation", "gradient_descent", "loss_function",
    "embedding_layer", "tokenization", "positional_encoding",
    "multi_head_attn", "feed_forward", "layer_norm",
    "bert_model", "gpt_architecture", "llm_training",
    "fine_tuning", "prompt_engineering", "rag_pipeline",
    "vector_database", "semantic_search", "cosine_similarity",
    "pinecone_index", "faiss_library", "qdrant_db",
  ];
  
  labels.forEach((label, i) => {
    const cluster = clusters[i % 3];
    const angle = (i / labels.length) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 40 + Math.random() * 60;
    
    const x = cluster.cx + Math.cos(angle) * radius;
    const y = cluster.cy + Math.sin(angle) * radius;
    const embedding = generateEmbedding(i + 1);
    
    points.push({
      id: `doc-${i}`,
      x,
      y,
      label,
      embedding,
      similarity: 0,
      cluster: cluster.color,
    });
  });
  
  return points;
};

// Query vector (center)
const QUERY_VECTOR: QueryVector = {
  id: "query",
  x: 400,
  y: 200,
  embedding: generateEmbedding(100),
};

// Calculate similarities
const calculateSimilarities = (docs: VectorPoint[], query: QueryVector): VectorPoint[] => {
  return docs.map(doc => ({
    ...doc,
    similarity: (cosineSimilarity(doc.embedding, query.embedding) + 1) / 2, // Normalize to 0-1
  })).sort((a, b) => b.similarity - a.similarity);
};

// Embedding Dimension Bars
const EmbeddingViz = ({ x, y, embedding, label, color }: { x: number; y: number; embedding: number[]; label: string; color: string }) => {
  return (
    <g>
      <text x={x} y={y - 5} fill="#64748b" fontSize={5} fontFamily="monospace">
        {label}
      </text>
      {embedding.slice(0, 8).map((val, i) => (
        <motion.rect
          key={i}
          x={x + i * 8}
          y={y + 20 - Math.abs(val) * 15}
          width={6}
          height={Math.abs(val) * 15}
          fill={val > 0 ? color : COLORS.lowSim}
          opacity={0.8}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        />
      ))}
      <text x={x + 32} y={y + 30} fill="#64748b" fontSize={4} textAnchor="middle" fontFamily="monospace">
        d={embedding.length}
      </text>
    </g>
  );
};

// Cosine Angle Visualization
const CosineAngleViz = ({ x, y, similarity }: { x: number; y: number; similarity: number }) => {
  const angle = Math.acos(similarity * 2 - 1) * (180 / Math.PI);
  const endX = x + Math.cos(angle * Math.PI / 180) * 25;
  const endY = y - Math.sin(angle * Math.PI / 180) * 25;
  
  return (
    <g>
      <text x={x} y={y - 30} fill="#64748b" fontSize={5} fontFamily="monospace" textAnchor="middle">
        Cosine Angle
      </text>
      {/* Reference line */}
      <line x1={x} y1={y} x2={x + 25} y2={y} stroke="#64748b" strokeWidth={1} />
      {/* Angle arc */}
      <motion.path
        d={`M ${x + 15} ${y} A 15 15 0 0 0 ${x + Math.cos(angle * Math.PI / 180) * 15} ${y - Math.sin(angle * Math.PI / 180) * 15}`}
        fill="none"
        stroke={COLORS.cosine}
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      {/* Vector line */}
      <motion.line
        x1={x}
        y1={y}
        x2={endX}
        y2={endY}
        stroke={COLORS.query}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <text x={x} y={y + 12} fill={COLORS.cosine} fontSize={5} fontFamily="monospace" textAnchor="middle">
        θ = {angle.toFixed(1)}°
      </text>
    </g>
  );
};

// Similarity Bar
const SimilarityBar = ({ x, y, docs }: { x: number; y: number; docs: VectorPoint[] }) => {
  const topK = docs.slice(0, 5);
  
  return (
    <g>
      <text x={x} y={y - 5} fill="#64748b" fontSize={6} fontFamily="monospace">
        Top-K Results (k=5)
      </text>
      {topK.map((doc, i) => {
        const barWidth = doc.similarity * 60;
        const color = doc.similarity > 0.7 ? COLORS.highSim : doc.similarity > 0.5 ? COLORS.medSim : COLORS.lowSim;
        
        return (
          <g key={doc.id}>
            <motion.rect
              x={x}
              y={y + i * 14}
              width={barWidth}
              height={10}
              fill={color}
              rx={2}
              initial={{ width: 0 }}
              animate={{ width: barWidth }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
            <text x={x + 65} y={y + i * 14 + 8} fill="#64748b" fontSize={4} fontFamily="monospace">
              {doc.similarity.toFixed(3)}
            </text>
            <text x={x + 90} y={y + i * 14 + 8} fill="#94a3b8" fontSize={3} fontFamily="monospace">
              {doc.label.slice(0, 12)}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// Vector Database Node
const VectorNode = ({ point, queryPos, isTop }: { point: VectorPoint; queryPos: { x: number; y: number }; isTop: boolean }) => {
  const color = point.similarity > 0.7 ? COLORS.highSim : point.similarity > 0.5 ? COLORS.medSim : COLORS.lowSim;
  const size = 3 + point.similarity * 4;
  
  return (
    <g>
      {/* Connection to query (only for top results) */}
      {isTop && (
        <motion.line
          x1={point.x}
          y1={point.y}
          x2={queryPos.x}
          y2={queryPos.y}
          stroke={color}
          strokeWidth={point.similarity * 2}
          strokeOpacity={point.similarity * 0.6}
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
      )}
      
      {/* Node glow */}
      <motion.circle
        cx={point.x}
        cy={point.y}
        r={size + 4}
        fill={color}
        opacity={0.15}
        animate={{
          r: [size + 2, size + 6, size + 2],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
      />
      
      {/* Node */}
      <motion.circle
        cx={point.x}
        cy={point.y}
        r={size}
        fill={color}
        opacity={0.3 + point.similarity * 0.7}
        stroke={color}
        strokeWidth={1}
        animate={{
          scale: isTop ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 1, repeat: isTop ? Infinity : 0 }}
      />
    </g>
  );
};

// Animated particle for search
const SearchParticle = ({ fromX, fromY, toX, toY, delay }: { fromX: number; fromY: number; toX: number; toY: number; delay: number }) => (
  <motion.circle
    r={2}
    fill={COLORS.query}
    filter="url(#searchGlow)"
    initial={{ cx: fromX, cy: fromY, opacity: 0 }}
    animate={{ 
      cx: [fromX, toX],
      cy: [fromY, toY],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// Main Component
const SemanticSearchViz = () => {
  const [vectorDB] = useState(() => generateVectorDB());
  const [rankedDocs, setRankedDocs] = useState<VectorPoint[]>([]);
  const [searchPhase, setSearchPhase] = useState<"embed" | "search" | "rank">("embed");
  
  // Calculate similarities on mount
  useEffect(() => {
    const docs = calculateSimilarities(vectorDB, QUERY_VECTOR);
    setRankedDocs(docs);
  }, [vectorDB]);
  
  // Cycle through search phases
  useEffect(() => {
    const phases: ("embed" | "search" | "rank")[] = ["embed", "search", "rank"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setSearchPhase(phases[idx]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const topK = rankedDocs.slice(0, 5);
  
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/20 shadow-2xl shadow-amber-500/5">
      <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="searchGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="clusterGrad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.cluster1} stopOpacity="0.1" />
            <stop offset="100%" stopColor={COLORS.cluster1} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="clusterGrad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.cluster2} stopOpacity="0.1" />
            <stop offset="100%" stopColor={COLORS.cluster2} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="clusterGrad3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.cluster3} stopOpacity="0.1" />
            <stop offset="100%" stopColor={COLORS.cluster3} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Background Grid */}
        <g opacity="0.08">
          {[...Array(40)].map((_, i) => (
            <line key={`vg-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke={COLORS.query} strokeWidth="0.5" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`hg-${i}`} x1="0" y1={i * 20} x2="800" y2={i * 20} stroke={COLORS.query} strokeWidth="0.5" />
          ))}
        </g>
        
        {/* Cluster backgrounds */}
        <circle cx={280} cy={150} r={80} fill="url(#clusterGrad1)" />
        <circle cx={520} cy={150} r={80} fill="url(#clusterGrad2)" />
        <circle cx={400} cy={280} r={80} fill="url(#clusterGrad3)" />
        
        {/* Cluster labels */}
        <text x={280} y={70} fill={COLORS.cluster1} fontSize={5} fontFamily="monospace" textAnchor="middle" opacity={0.6}>
          Cluster 0: Neural Networks
        </text>
        <text x={520} y={70} fill={COLORS.cluster2} fontSize={5} fontFamily="monospace" textAnchor="middle" opacity={0.6}>
          Cluster 1: Transformers
        </text>
        <text x={400} y={370} fill={COLORS.cluster3} fontSize={5} fontFamily="monospace" textAnchor="middle" opacity={0.6}>
          Cluster 2: Vector Search
        </text>
        
        {/* Vector database points */}
        {rankedDocs.map((point, idx) => (
          <VectorNode 
            key={point.id} 
            point={point} 
            queryPos={{ x: QUERY_VECTOR.x, y: QUERY_VECTOR.y }}
            isTop={idx < 5}
          />
        ))}
        
        {/* Query Vector */}
        <g>
          <motion.circle
            cx={QUERY_VECTOR.x}
            cy={QUERY_VECTOR.y}
            r={20}
            fill={COLORS.query}
            opacity={0.15}
            filter="url(#searchGlow)"
            animate={{
              r: [15, 25, 15],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx={QUERY_VECTOR.x}
            cy={QUERY_VECTOR.y}
            r={8}
            fill={COLORS.query}
            stroke={COLORS.query}
            strokeWidth={2}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x={QUERY_VECTOR.x} y={QUERY_VECTOR.y + 25} fill={COLORS.query} fontSize={6} fontFamily="monospace" textAnchor="middle">
            Query Vector q
          </text>
        </g>
        
        {/* Search particles */}
        {topK.map((doc, i) => (
          <SearchParticle
            key={`particle-${doc.id}`}
            fromX={QUERY_VECTOR.x}
            fromY={QUERY_VECTOR.y}
            toX={doc.x}
            toY={doc.y}
            delay={i * 0.3}
          />
        ))}
        
        {/* Embedding visualization */}
        <EmbeddingViz x={20} y={30} embedding={QUERY_VECTOR.embedding} label="Query Embedding e_q" color={COLORS.query} />
        <EmbeddingViz x={20} y={80} embedding={rankedDocs[0]?.embedding || []} label="Top Doc Embedding e_d" color={COLORS.highSim} />
        
        {/* Cosine angle */}
        <CosineAngleViz x={120} y={170} similarity={rankedDocs[0]?.similarity || 0.5} />
        
        {/* Similarity results */}
        <SimilarityBar x={650} y={50} docs={rankedDocs} />
        
        {/* Mathematical formulas */}
        <g opacity={0.8}>
          <text x={650} y={25} fill="#64748b" fontSize={6} fontFamily="serif" fontStyle="italic">
            Cosine Similarity
          </text>
          <text x={650} y={38} fill={COLORS.cosine} fontSize={7} fontFamily="serif" fontStyle="italic">
            cos(θ) = (q·d)/(||q||·||d||)
          </text>
        </g>
        
        <g opacity={0.7}>
          <text x={20} y={140} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            sim(q,d) = Σᵢ qᵢ·dᵢ
          </text>
          <text x={20} y={155} fill="#64748b" fontSize={5} fontFamily="serif" fontStyle="italic">
            L2 norm: ||v|| = √(Σᵢ vᵢ²)
          </text>
        </g>
        
        {/* Pipeline stages */}
        <g>
          <rect x={20} y={350} width={760} height={25} rx={3} fill="rgba(0,0,0,0.3)" stroke="#334155" strokeWidth={0.5} />
          
          {/* Stage boxes */}
          {["Query", "Embed", "Index", "ANN Search", "Re-rank", "Results"].map((stage, i) => {
            const isActive = (searchPhase === "embed" && i <= 1) || 
                            (searchPhase === "search" && i <= 3) ||
                            (searchPhase === "rank" && i <= 5);
            return (
              <g key={stage}>
                <motion.rect
                  x={30 + i * 125}
                  y={355}
                  width={115}
                  height={15}
                  rx={2}
                  fill={isActive ? COLORS.embedding : "transparent"}
                  opacity={isActive ? 0.3 : 0}
                  animate={{ opacity: isActive ? [0.2, 0.4, 0.2] : 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <text
                  x={87 + i * 125}
                  y={365}
                  fill={isActive ? COLORS.embedding : "#64748b"}
                  fontSize={6}
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {stage}
                </text>
                {i < 5 && (
                  <motion.path
                    d={`M ${140 + i * 125} 362 L ${150 + i * 125} 362`}
                    stroke={isActive ? COLORS.embedding : "#334155"}
                    strokeWidth={1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isActive ? 1 : 0.3 }}
                  />
                )}
              </g>
            );
          })}
        </g>
        
        {/* DB labels */}
        <g opacity={0.5}>
          <text x={650} y={170} fill="#64748b" fontSize={5} fontFamily="monospace">
            Vector DB: Pinecone
          </text>
          <text x={650} y={182} fill="#64748b" fontSize={5} fontFamily="monospace">
            Index: HNSW
          </text>
          <text x={650} y={194} fill="#64748b" fontSize={5} fontFamily="monospace">
            Dims: 384
          </text>
          <text x={650} y={206} fill="#64748b" fontSize={5} fontFamily="monospace">
            Metric: cosine
          </text>
        </g>
        
        {/* Architecture params */}
        <g opacity={0.5}>
          <text x={650} y={230} fill="#64748b" fontSize={5} fontFamily="monospace">
            top_k=5
          </text>
          <text x={650} y={242} fill="#64748b" fontSize={5} fontFamily="monospace">
            threshold=0.7
          </text>
          <text x={650} y={254} fill="#64748b" fontSize={5} fontFamily="monospace">
            ef_search=100
          </text>
        </g>
      </svg>
      
      {/* Title */}
      <div className="absolute top-2 left-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[9px] font-mono text-amber-400/80">Semantic Vector Search (RAG Pipeline)</span>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-3 flex items-center gap-3 text-[7px] font-mono">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.query }} />
          <span className="text-slate-400">Query</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.highSim }} />
          <span className="text-slate-400">sim &gt; 0.7</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.medSim }} />
          <span className="text-slate-400">sim &gt; 0.5</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.lowSim }} />
          <span className="text-slate-400">sim &lt; 0.5</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5" style={{ backgroundColor: COLORS.cosine }} />
          <span className="text-slate-400">cosine θ</span>
        </div>
      </div>
    </div>
  );
};

export default SemanticSearchViz;
