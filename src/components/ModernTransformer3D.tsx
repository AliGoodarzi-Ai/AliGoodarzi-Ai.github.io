import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

// Component block with label
const Block = ({ 
  position, 
  size = [1, 0.3, 0.8],
  color,
  emissive = 0.3,
  opacity = 1
}: { 
  position: [number, number, number];
  size?: [number, number, number];
  color: string;
  emissive?: number;
  opacity?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + position[1] * 0.5) * 0.02;
      meshRef.current.scale.set(size[0] * pulse, size[1], size[2]);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={emissive}
        transparent
        opacity={opacity}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

// Attention head visualization
const AttentionHead = ({ position, index }: { position: [number, number, number]; index: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index * 0.5;
    }
  });

  const headColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"];
  
  return (
    <group ref={groupRef} position={position}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 2) * 0.15, 0, Math.sin(i * Math.PI / 2) * 0.15]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial 
            color={headColors[(index * 4 + i) % 8]} 
            emissive={headColors[(index * 4 + i) % 8]}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Data flow arrow
const DataFlow = ({ start, end, color = "#00D9FF" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) => {
  const particleRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (particleRef.current) {
      const t = (state.clock.elapsedTime * 0.8 + start[1] * 0.2) % 1;
      particleRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
      particleRef.current.scale.setScalar(0.03 + Math.sin(t * Math.PI) * 0.02);
    }
  });

  return (
    <group>
      <Line points={[start, end]} color={color} lineWidth={1} opacity={0.3} transparent />
      <mesh ref={particleRef}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

// Skip connection (residual)
const SkipConnection = ({ start, end }: { start: [number, number, number]; end: [number, number, number] }) => {
  const points = useMemo(() => {
    const midX = start[0] + 1.2;
    return [
      start,
      [midX, start[1], start[2]] as [number, number, number],
      [midX, end[1], end[2]] as [number, number, number],
      end
    ];
  }, [start, end]);

  return (
    <Line 
      points={points} 
      color="#FFD700" 
      lineWidth={2} 
      opacity={0.5} 
      transparent 
      dashed
      dashScale={10}
      dashSize={0.1}
      dashOffset={0}
    />
  );
};

// Single Transformer Layer
const TransformerLayer = ({ yOffset, layerIndex }: { yOffset: number; layerIndex: number }) => {
  const layerHeight = 1.8;
  const baseY = yOffset;
  
  return (
    <group>
      {/* Layer Norm 1 */}
      <Block position={[0, baseY + 1.5, 0]} size={[1.4, 0.15, 0.6]} color="#9B59B6" />
      
      {/* Multi-Head Self-Attention */}
      <Block position={[0, baseY + 1.1, 0]} size={[1.4, 0.4, 0.6]} color="#3498DB" emissive={0.5} />
      
      {/* Attention Heads */}
      <AttentionHead position={[-0.4, baseY + 1.1, 0.4]} index={layerIndex * 2} />
      <AttentionHead position={[0.4, baseY + 1.1, 0.4]} index={layerIndex * 2 + 1} />
      
      {/* Layer Norm 2 */}
      <Block position={[0, baseY + 0.6, 0]} size={[1.4, 0.15, 0.6]} color="#9B59B6" />
      
      {/* Feed-Forward Network */}
      <Block position={[0, baseY + 0.2, 0]} size={[1.4, 0.3, 0.6]} color="#E74C3C" emissive={0.4} />
      
      {/* Skip connections */}
      <SkipConnection 
        start={[-0.8, baseY + 1.5, 0]} 
        end={[-0.8, baseY + 0.6, 0]} 
      />
      <SkipConnection 
        start={[-0.8, baseY + 0.6, 0]} 
        end={[-0.8, baseY - 0.1, 0]} 
      />
      
      {/* Data flow */}
      <DataFlow start={[0, baseY - 0.1, 0]} end={[0, baseY + 1.5, 0]} />
    </group>
  );
};

// Main scene
const TransformerScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Input Embedding */}
      <Float speed={1} floatIntensity={0.1}>
        <Block position={[0, -2.5, 0]} size={[1.6, 0.35, 0.7]} color="#2ECC71" />
      </Float>
      
      {/* Positional Encoding */}
      <Block position={[0, -2.0, 0]} size={[1.6, 0.2, 0.7]} color="#F39C12" emissive={0.4} />
      
      {/* Transformer Layers (N x) */}
      <TransformerLayer yOffset={-1.2} layerIndex={0} />
      <TransformerLayer yOffset={0.8} layerIndex={1} />
      
      {/* Layer indicator */}
      <Block position={[0, 2.8, 0]} size={[0.4, 0.15, 0.4]} color="#1ABC9C" opacity={0.7} />
      
      {/* Output Head */}
      <Block position={[0, 3.2, 0]} size={[1.4, 0.25, 0.6]} color="#E91E63" emissive={0.5} />
      
      {/* Main data flow */}
      <DataFlow start={[0, -2.5, 0]} end={[0, 3.2, 0]} color="#00FF88" />
    </group>
  );
};

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshBasicMaterial color="#3498DB" wireframe />
  </mesh>
);

// Legend
const Legend = () => (
  <div className="absolute bottom-4 left-4 glass px-3 py-2 text-[9px] sm:text-[10px] font-mono space-y-0.5">
    <div className="flex items-center gap-2">
      <div className="w-3 h-2 rounded-sm bg-[#2ECC71]" />
      <span className="text-white/70">Token Embedding</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-2 rounded-sm bg-[#F39C12]" />
      <span className="text-white/70">Positional Encoding</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-2 rounded-sm bg-[#3498DB]" />
      <span className="text-white/70">Multi-Head Attention</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-2 rounded-sm bg-[#9B59B6]" />
      <span className="text-white/70">Layer Normalization</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-2 rounded-sm bg-[#E74C3C]" />
      <span className="text-white/70">Feed-Forward (MLP)</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-1 rounded-sm bg-[#FFD700]" />
      <span className="text-white/70">Residual Connection</span>
    </div>
  </div>
);

const ModernTransformer3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative w-full h-[400px] rounded-xl overflow-hidden ${className}`} style={{ background: "linear-gradient(180deg, rgba(0,8,20,0.95) 0%, rgba(0,4,12,0.98) 100%)" }}>
      <Canvas
        camera={{ position: [3, 1, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-5, 5, -5]} intensity={0.4} color="#3498DB" />
          <pointLight position={[0, -5, 5]} intensity={0.3} color="#E74C3C" />
          
          <TransformerScene />
          
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
        <h4 className="text-sm font-semibold text-white/90">GPT-style Transformer Block</h4>
        <p className="text-[10px] text-white/60 font-mono">Pre-Norm Architecture • N Layers • Multi-Head Attention</p>
      </div>
      
      <Legend />
      
      <div className="absolute bottom-4 right-4 text-[10px] text-white/40 font-mono">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ModernTransformer3D;
