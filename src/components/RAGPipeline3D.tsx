import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

// Document chunk
const DocumentChunk = ({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1;
      meshRef.current.scale.set(0.3 * pulse, 0.15, 0.02);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// Embedding vector representation
const EmbeddingVector = ({ position, isQuery = false }: { position: [number, number, number]; isQuery?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bars = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      height: 0.1 + Math.random() * 0.3,
      color: isQuery ? "#FFD700" : "#00D9FF"
    }));
  }, [isQuery]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const newHeight = 0.1 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.1 + 0.2;
          child.scale.y = newHeight;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {bars.map((bar, i) => (
        <mesh key={i} position={[(i - 3.5) * 0.06, bar.height / 2, 0]}>
          <boxGeometry args={[0.04, 1, 0.04]} />
          <meshStandardMaterial 
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Vector database node
const VectorDBNode = ({ position, similarity, index }: { position: [number, number, number]; similarity: number; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 0.08 + similarity * 0.12;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  const color = similarity > 0.8 ? "#00FF88" : similarity > 0.5 ? "#FFD700" : "#666";
  
  return (
    <Float speed={1.5} floatIntensity={0.1}>
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={[1]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={similarity * 0.6}
          transparent
          opacity={0.3 + similarity * 0.7}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

// Data flow particle
const DataFlowParticle = ({ path, color, speed = 1, delay = 0 }: { path: [number, number, number][]; color: string; speed?: number; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && path.length >= 2) {
      const t = ((state.clock.elapsedTime * speed * 0.3 + delay) % 1);
      const totalLength = path.length - 1;
      const segment = Math.floor(t * totalLength);
      const segmentT = (t * totalLength) % 1;
      
      const start = path[Math.min(segment, path.length - 1)];
      const end = path[Math.min(segment + 1, path.length - 1)];
      
      meshRef.current.position.set(
        start[0] + (end[0] - start[0]) * segmentT,
        start[1] + (end[1] - start[1]) * segmentT,
        start[2] + (end[2] - start[2]) * segmentT
      );
      meshRef.current.scale.setScalar(0.04 + Math.sin(t * Math.PI) * 0.02);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
};

// LLM Generator block
const LLMBlock = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 8]} />
        <meshStandardMaterial 
          color="#E91E63"
          emissive="#E91E63"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Glow */}
      <mesh scale={1.2}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 8]} />
        <meshBasicMaterial color="#E91E63" transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

// Main RAG Scene
const RAGScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Vector DB nodes with similarities
  const vectorNodes = useMemo(() => [
    { pos: [0, 0.8, 0] as [number, number, number], sim: 0.95 },
    { pos: [0.5, 0.4, 0.3] as [number, number, number], sim: 0.88 },
    { pos: [-0.4, 0.2, -0.3] as [number, number, number], sim: 0.75 },
    { pos: [0.3, -0.3, 0.4] as [number, number, number], sim: 0.62 },
    { pos: [-0.5, -0.6, 0.2] as [number, number, number], sim: 0.45 },
    { pos: [0.4, -0.8, -0.3] as [number, number, number], sim: 0.35 },
    { pos: [-0.3, 0.5, 0.5] as [number, number, number], sim: 0.82 },
    { pos: [0.6, 0, -0.4] as [number, number, number], sim: 0.55 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
    }
  });

  // Flow paths
  const queryToEmbedPath: [number, number, number][] = [[-3.5, 0, 0], [-2.5, 0, 0]];
  const embedToVectorPath: [number, number, number][] = [[-2, 0, 0], [-0.8, 0, 0]];
  const vectorToContextPath: [number, number, number][] = [[0.8, 0, 0], [2, 0, 0]];
  const contextToLLMPath: [number, number, number][] = [[2.5, 0, 0], [3.5, 0, 0]];

  return (
    <group ref={groupRef}>
      {/* Stage 1: Query Input */}
      <group position={[-3.5, 0, 0]}>
        <DocumentChunk position={[0, 0.15, 0]} color="#00D9FF" />
        <DocumentChunk position={[0, 0, 0]} color="#00D9FF" delay={0.5} />
        <DocumentChunk position={[0, -0.15, 0]} color="#00D9FF" delay={1} />
      </group>
      
      {/* Arrow 1 */}
      <Line points={queryToEmbedPath} color="#00D9FF" lineWidth={2} opacity={0.5} transparent />
      <DataFlowParticle path={queryToEmbedPath} color="#00D9FF" speed={1} delay={0} />
      
      {/* Stage 2: Embedding */}
      <group position={[-2.2, 0, 0]}>
        <EmbeddingVector position={[0, 0, 0]} isQuery={true} />
      </group>
      
      {/* Arrow 2 */}
      <Line points={embedToVectorPath} color="#FFD700" lineWidth={2} opacity={0.5} transparent />
      <DataFlowParticle path={embedToVectorPath} color="#FFD700" speed={1} delay={0.25} />
      
      {/* Stage 3: Vector Database (center) */}
      <group position={[0, 0, 0]}>
        {/* DB Container */}
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
          <meshStandardMaterial color="#1a1a2e" transparent opacity={0.5} />
        </mesh>
        
        {/* Vector nodes */}
        {vectorNodes.map((node, i) => (
          <VectorDBNode key={i} position={node.pos} similarity={node.sim} index={i} />
        ))}
        
        {/* Similarity search lines (to top matches) */}
        {vectorNodes.filter(n => n.sim > 0.7).map((node, i) => (
          <Line 
            key={`sim-${i}`}
            points={[[0, 0, 0], node.pos]} 
            color="#00FF88" 
            lineWidth={1 + node.sim * 2} 
            opacity={node.sim * 0.6} 
            transparent 
          />
        ))}
      </group>
      
      {/* Arrow 3 */}
      <Line points={vectorToContextPath} color="#00FF88" lineWidth={2} opacity={0.5} transparent />
      <DataFlowParticle path={vectorToContextPath} color="#00FF88" speed={1} delay={0.5} />
      
      {/* Stage 4: Retrieved Context */}
      <group position={[2.2, 0, 0]}>
        <DocumentChunk position={[0, 0.2, 0]} color="#00FF88" />
        <DocumentChunk position={[0, 0, 0]} color="#00FF88" delay={0.3} />
        <DocumentChunk position={[0, -0.2, 0]} color="#00FF88" delay={0.6} />
      </group>
      
      {/* Arrow 4 */}
      <Line points={contextToLLMPath} color="#E91E63" lineWidth={2} opacity={0.5} transparent />
      <DataFlowParticle path={contextToLLMPath} color="#E91E63" speed={1} delay={0.75} />
      
      {/* Stage 5: LLM Generator */}
      <LLMBlock position={[3.8, 0, 0]} />
      
      {/* Output */}
      <group position={[3.8, -1.2, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.2, 0.3]} />
          <meshStandardMaterial color="#9B59B6" emissive="#9B59B6" emissiveIntensity={0.4} />
        </mesh>
        <Line points={[[0, 0.8, 0], [0, 0.2, 0]]} color="#9B59B6" lineWidth={2} opacity={0.5} transparent />
        <DataFlowParticle path={[[0, 0.8, 0], [0, 0.2, 0]]} color="#9B59B6" speed={0.8} delay={0} />
      </group>
    </group>
  );
};

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshBasicMaterial color="#00D9FF" wireframe />
  </mesh>
);

// Legend
const Legend = () => (
  <div className="absolute bottom-4 left-4 glass px-3 py-2 text-[9px] sm:text-[10px] font-mono space-y-0.5">
    <div className="flex items-center gap-2">
      <div className="w-3 h-1.5 rounded-sm bg-[#00D9FF]" />
      <span className="text-white/70">Query / Documents</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 flex gap-0.5">
        {[1,2,3].map(i => <div key={i} className="w-0.5 h-full bg-[#FFD700]" />)}
      </div>
      <span className="text-white/70">Embeddings (384-dim)</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-[#00FF88]" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
      <span className="text-white/70">Vector DB (FAISS/Pinecone)</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded bg-[#E91E63]" />
      <span className="text-white/70">LLM Generator</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-1.5 rounded-sm bg-[#9B59B6]" />
      <span className="text-white/70">Generated Response</span>
    </div>
  </div>
);

const RAGPipeline3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative w-full h-[400px] rounded-xl overflow-hidden ${className}`} style={{ background: "linear-gradient(180deg, rgba(0,5,15,0.95) 0%, rgba(0,10,25,0.98) 100%)" }}>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, 5, -5]} intensity={0.4} color="#00D9FF" />
          <pointLight position={[5, -5, 5]} intensity={0.3} color="#E91E63" />
          
          <RAGScene />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate={false}
            minDistance={5}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>
      
      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
        <h4 className="text-sm font-semibold text-white/90">RAG Pipeline</h4>
        <p className="text-[10px] text-white/60 font-mono">Query → Embed → Retrieve → Augment → Generate</p>
      </div>
      
      {/* Stage labels */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-around px-4 text-[8px] sm:text-[9px] font-mono text-white/50">
        <span>Query</span>
        <span>Embed</span>
        <span>Vector DB</span>
        <span>Context</span>
        <span>LLM</span>
      </div>
      
      <Legend />
      
      <div className="absolute bottom-4 right-4 text-[10px] text-white/40 font-mono">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default RAGPipeline3D;
