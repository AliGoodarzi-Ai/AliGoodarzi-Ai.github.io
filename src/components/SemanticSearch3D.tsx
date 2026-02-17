import { useRef, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Document embedding node
const EmbeddingNode = ({ 
  position, 
  color,
  label,
  isQuery = false,
  similarity = 0
}: { 
  position: [number, number, number];
  color: string;
  label: string;
  isQuery?: boolean;
  similarity?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scale = isQuery ? 0.4 : 0.2 + similarity * 0.15;
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = isQuery 
        ? 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15
        : 1 + Math.sin(state.clock.elapsedTime * 2 + position[0] * 2) * 0.08;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <Float speed={isQuery ? 4 : 2} rotationIntensity={0} floatIntensity={isQuery ? 0.5 : 0.2}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={isQuery ? 0.8 : 0.3 + similarity * 0.4}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Glow effect */}
        <mesh scale={1.3}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={isQuery ? 0.2 : 0.1 + similarity * 0.1} 
          />
        </mesh>
        {/* Label */}
        <Text
          position={[0, scale + 0.3, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

// Similarity connection line with animated particles
const SimilarityConnection = ({
  start,
  end,
  similarity,
  color
}: {
  start: [number, number, number];
  end: [number, number, number];
  similarity: number;
  color: string;
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (particleRef.current) {
      const t = (state.clock.elapsedTime * 0.5 * similarity) % 1;
      particleRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
      particleRef.current.scale.setScalar(0.05 + similarity * 0.03);
    }
  });

  return (
    <group>
      <Line
        points={[start, end]}
        color={color}
        lineWidth={1 + similarity * 3}
        transparent
        opacity={0.3 + similarity * 0.5}
      />
      {/* Animated particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#00FF88" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Cosine similarity angle visualization
const CosineSimilarityArc = ({
  center,
  similarity
}: {
  center: [number, number, number];
  similarity: number;
}) => {
  const angle = Math.acos(similarity);
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const radius = 0.8;
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * angle;
      pts.push([
        center[0] + Math.cos(a) * radius,
        center[1],
        center[2] + Math.sin(a) * radius
      ]);
    }
    return pts;
  }, [center, angle]);

  return (
    <Line
      points={points}
      color="#FFD700"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
};

// Main visualization
const SemanticSearchScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Query and document embeddings (simulated 3D positions from high-dim space)
  const queryPos: [number, number, number] = [0, 0, 0];
  
  const documents = useMemo(() => [
    { pos: [1.5, 0.8, 0.5] as [number, number, number], label: "Doc A", similarity: 0.95, color: "#00FF88" },
    { pos: [1.8, 0.3, -0.8] as [number, number, number], label: "Doc B", similarity: 0.87, color: "#00D9FF" },
    { pos: [-1.2, 1.0, 0.3] as [number, number, number], label: "Doc C", similarity: 0.72, color: "#8B5CF6" },
    { pos: [0.5, -1.5, 1.2] as [number, number, number], label: "Doc D", similarity: 0.65, color: "#F97316" },
    { pos: [-1.8, -0.5, -1.0] as [number, number, number], label: "Doc E", similarity: 0.45, color: "#6366F1" },
    { pos: [2.0, -0.8, 0.0] as [number, number, number], label: "Doc F", similarity: 0.38, color: "#EC4899" },
    { pos: [-0.8, 1.8, -1.5] as [number, number, number], label: "Doc G", similarity: 0.25, color: "#14B8A6" },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Query node (center) */}
      <EmbeddingNode 
        position={queryPos} 
        color="#FFD700" 
        label="Query"
        isQuery={true}
      />
      
      {/* Document embeddings */}
      {documents.map((doc, i) => (
        <EmbeddingNode
          key={i}
          position={doc.pos}
          color={doc.color}
          label={doc.label}
          similarity={doc.similarity}
        />
      ))}
      
      {/* Similarity connections */}
      {documents.map((doc, i) => (
        <SimilarityConnection
          key={`conn-${i}`}
          start={queryPos}
          end={doc.pos}
          similarity={doc.similarity}
          color={doc.color}
        />
      ))}
      
      {/* Coordinate axes */}
      <Line points={[[-3, 0, 0], [3, 0, 0]]} color="#FF6B6B" lineWidth={1} opacity={0.3} transparent />
      <Line points={[[0, -3, 0], [0, 3, 0]]} color="#4ECB71" lineWidth={1} opacity={0.3} transparent />
      <Line points={[[0, 0, -3], [0, 0, 3]]} color="#54A0FF" lineWidth={1} opacity={0.3} transparent />
      
      {/* Embedding space grid */}
      {[-2, -1, 0, 1, 2].map((x) => (
        <Line key={`grid-x-${x}`} points={[[x, -0.01, -2], [x, -0.01, 2]]} color="#333" lineWidth={0.5} opacity={0.2} transparent />
      ))}
      {[-2, -1, 0, 1, 2].map((z) => (
        <Line key={`grid-z-${z}`} points={[[-2, -0.01, z], [2, -0.01, z]]} color="#333" lineWidth={0.5} opacity={0.2} transparent />
      ))}
    </group>
  );
};

// Loading fallback
const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshBasicMaterial color="#00D9FF" wireframe />
  </mesh>
);

// Legend component
const Legend = () => (
  <div className="absolute bottom-4 left-4 glass px-3 py-2 text-xs font-mono space-y-1">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
      <span className="text-muted-foreground">Query Vector</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2 h-px bg-gradient-to-r from-primary to-secondary" style={{ width: '20px' }} />
      <span className="text-muted-foreground">Cosine Similarity</span>
    </div>
    <div className="text-[10px] text-muted-foreground/60 mt-1">
      Brighter = Higher similarity
    </div>
  </div>
);

// Main component
const SemanticSearch3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative w-full h-[400px] rounded-xl overflow-hidden ${className}`} style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)" }}>
      <Canvas
        camera={{ position: [4, 3, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8B5CF6" />
          <pointLight position={[0, 5, 0]} intensity={0.6} color="#00D9FF" />
          
          <SemanticSearchScene />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate={false}
            minDistance={3}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
      
      {/* Title overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
        <h4 className="text-sm font-semibold text-white/90">Semantic Search</h4>
        <p className="text-[10px] text-white/60 font-mono">Vector Embedding Space</p>
      </div>
      
      <Legend />
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 right-4 text-[10px] text-white/40 font-mono">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default SemanticSearch3D;
