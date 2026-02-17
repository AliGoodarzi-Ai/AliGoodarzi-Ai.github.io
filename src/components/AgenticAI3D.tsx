import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

// Hexagon shape for agent core
const HexagonCore = ({ position, color, size = 0.5 }: { position: [number, number, number]; color: string; size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(size * pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1, 0.3, 6]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Inner glow */}
      <mesh scale={1.3}>
        <cylinderGeometry args={[size, size, 0.2, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

// Tool node
const ToolNode = ({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime + delay;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5 + delay;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

// Memory block
const MemoryBlock = ({ position, index }: { position: [number, number, number]; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const offset = Math.sin(state.clock.elapsedTime * 1.5 + index * 0.5) * 0.05;
      meshRef.current.position.y = position[1] + offset;
    }
  });

  const colors = ["#9B59B6", "#8E44AD", "#7D3C98", "#6C3483"];
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.12, 0.15]} />
      <meshStandardMaterial 
        color={colors[index % 4]}
        emissive={colors[index % 4]}
        emissiveIntensity={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// Reasoning step
const ReasoningStep = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  return (
    <mesh position={position} scale={scale}>
      <torusGeometry args={[0.15, 0.04, 8, 24]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

// Animated connection with data flow
const AgentConnection = ({ 
  start, 
  end, 
  color,
  bidirectional = false
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  color: string;
  bidirectional?: boolean;
}) => {
  const particle1Ref = useRef<THREE.Mesh>(null);
  const particle2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (particle1Ref.current) {
      const t = (state.clock.elapsedTime * 0.6) % 1;
      particle1Ref.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
      particle1Ref.current.scale.setScalar(0.04 + Math.sin(t * Math.PI) * 0.02);
    }
    if (particle2Ref.current && bidirectional) {
      const t = (state.clock.elapsedTime * 0.6 + 0.5) % 1;
      particle2Ref.current.position.set(
        end[0] + (start[0] - end[0]) * t,
        end[1] + (start[1] - end[1]) * t,
        end[2] + (start[2] - end[2]) * t
      );
      particle2Ref.current.scale.setScalar(0.04 + Math.sin(t * Math.PI) * 0.02);
    }
  });

  return (
    <group>
      <Line points={[start, end]} color={color} lineWidth={1.5} opacity={0.4} transparent />
      <mesh ref={particle1Ref}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {bidirectional && (
        <mesh ref={particle2Ref}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  );
};

// Thought bubble orbit
const ThoughtOrbit = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Reasoning Chain */}
      <ReasoningStep position={[1.5, 0, 0]} color="#00D9FF" />
      <ReasoningStep position={[-0.75, 0, 1.3]} color="#00FF88" />
      <ReasoningStep position={[-0.75, 0, -1.3]} color="#F97316" />
      
      {/* Chain connections */}
      <Line 
        points={[[1.5, 0, 0], [-0.75, 0, 1.3], [-0.75, 0, -1.3], [1.5, 0, 0]]} 
        color="#FFD700" 
        lineWidth={1} 
        opacity={0.3} 
        transparent 
        dashed
      />
    </group>
  );
};

// Main scene
const AgenticAIScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central LLM Core */}
      <Float speed={1} floatIntensity={0.1}>
        <HexagonCore position={[0, 0, 0]} color="#E91E63" size={0.6} />
      </Float>
      
      {/* Thought/Reasoning Orbit */}
      <ThoughtOrbit />
      
      {/* Tools Section (Left) */}
      <group position={[-2.5, 0, 0]}>
        <ToolNode position={[0, 0.8, 0]} color="#3498DB" delay={0} />
        <ToolNode position={[0.3, 0.4, 0.3]} color="#2ECC71" delay={1} />
        <ToolNode position={[-0.3, 0, 0.3]} color="#F39C12" delay={2} />
        <ToolNode position={[0, -0.4, 0]} color="#9B59B6" delay={3} />
        <ToolNode position={[0.3, -0.8, 0.3]} color="#E74C3C" delay={4} />
        
        {/* Tool connections to core */}
        <AgentConnection start={[0.3, 0, 0]} end={[2, 0, 0]} color="#3498DB" bidirectional />
      </group>
      
      {/* Memory Section (Right) */}
      <group position={[2.5, 0, 0]}>
        <MemoryBlock position={[0, 0.6, 0]} index={0} />
        <MemoryBlock position={[0, 0.35, 0]} index={1} />
        <MemoryBlock position={[0, 0.1, 0]} index={2} />
        <MemoryBlock position={[0, -0.15, 0]} index={3} />
        <MemoryBlock position={[0, -0.4, 0]} index={4} />
        <MemoryBlock position={[0, -0.65, 0]} index={5} />
        
        {/* Memory connection to core */}
        <AgentConnection start={[-0.5, 0, 0]} end={[-2, 0, 0]} color="#9B59B6" bidirectional />
      </group>
      
      {/* Input (Bottom) */}
      <group position={[0, -2, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.25, 0.4]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.4} />
        </mesh>
        <AgentConnection start={[0, 0.3, 0]} end={[0, 1.4, 0]} color="#00D9FF" />
      </group>
      
      {/* Output (Top) */}
      <group position={[0, 2, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.25, 0.4]} />
          <meshStandardMaterial color="#00FF88" emissive="#00FF88" emissiveIntensity={0.4} />
        </mesh>
        <AgentConnection start={[0, -1.4, 0]} end={[0, -0.3, 0]} color="#00FF88" />
      </group>
      
      {/* Action arrows (curved paths around) */}
      <Line 
        points={[
          [-1.5, -1.5, 0.5], [-2, 0, 0.5], [-1.5, 1.5, 0.5]
        ]} 
        color="#F97316" 
        lineWidth={2} 
        opacity={0.4} 
        transparent
      />
      <Line 
        points={[
          [1.5, 1.5, 0.5], [2, 0, 0.5], [1.5, -1.5, 0.5]
        ]} 
        color="#F97316" 
        lineWidth={2} 
        opacity={0.4} 
        transparent
      />
    </group>
  );
};

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshBasicMaterial color="#E91E63" wireframe />
  </mesh>
);

// Legend
const Legend = () => (
  <div className="absolute bottom-4 left-4 glass px-3 py-2 text-[9px] sm:text-[10px] font-mono space-y-0.5">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded bg-[#E91E63]" />
      <span className="text-white/70">LLM Core (Reasoning)</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rotate-45 bg-[#3498DB]" />
      <span className="text-white/70">External Tools (APIs)</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-1.5 rounded-sm bg-[#9B59B6]" />
      <span className="text-white/70">Memory (Context)</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full border border-[#00D9FF]" />
      <span className="text-white/70">Chain-of-Thought</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-1 bg-[#F97316]" />
      <span className="text-white/70">Action Loop</span>
    </div>
  </div>
);

const AgenticAI3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative w-full h-[400px] rounded-xl overflow-hidden ${className}`} style={{ background: "linear-gradient(180deg, rgba(10,0,20,0.95) 0%, rgba(5,0,15,0.98) 100%)" }}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -5, 5]} intensity={0.4} color="#E91E63" />
          <pointLight position={[5, -5, -5]} intensity={0.3} color="#3498DB" />
          
          <AgenticAIScene />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate={false}
            minDistance={4}
            maxDistance={12}
          />
        </Suspense>
      </Canvas>
      
      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
        <h4 className="text-sm font-semibold text-white/90">Agentic AI Architecture</h4>
        <p className="text-[10px] text-white/60 font-mono">ReAct Pattern • Tool Use • Memory • Chain-of-Thought</p>
      </div>
      
      <Legend />
      
      <div className="absolute bottom-4 right-4 text-[10px] text-white/40 font-mono">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default AgenticAI3D;
