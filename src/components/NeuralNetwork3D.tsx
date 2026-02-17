import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Neuron component with glow effect
const Neuron = ({ 
  position, 
  color,
  size = 0.15,
  pulseSpeed = 2,
  pulseIntensity = 0.15
}: { 
  position: [number, number, number];
  color: string;
  size?: number;
  pulseSpeed?: number;
  pulseIntensity?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed + position[0] * 2 + position[1]) * pulseIntensity;
      meshRef.current.scale.setScalar(size * pulse);
    }
    if (glowRef.current) {
      const glow = 0.3 + Math.sin(state.clock.elapsedTime * pulseSpeed + position[0]) * 0.15;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glow;
    }
  });

  return (
    <group position={position}>
      {/* Core neuron */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Glow effect */}
      <mesh ref={glowRef} scale={1.8}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

// Animated connection with signal propagation
const Connection = ({
  start,
  end,
  color,
  signalColor = "#00FF88",
  signalSpeed = 0.8
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  signalColor?: string;
  signalSpeed?: number;
}) => {
  const signalRef = useRef<THREE.Mesh>(null);
  const lineOpacity = useRef(0.2);
  
  useFrame((state) => {
    if (signalRef.current) {
      // Signal travels along the connection
      const t = ((state.clock.elapsedTime * signalSpeed + start[0] * 0.5 + start[1] * 0.3) % 1);
      signalRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
      // Fade signal at ends
      const fade = Math.sin(t * Math.PI);
      signalRef.current.scale.setScalar(0.03 + fade * 0.02);
      (signalRef.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.9;
    }
  });

  return (
    <group>
      {/* Connection line */}
      <Line
        points={[start, end]}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.25}
      />
      {/* Signal particle */}
      <mesh ref={signalRef}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={signalColor} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Layer label
const LayerLabel = ({ position, text, color }: { position: [number, number, number], text: string, color: string }) => {
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[1.2, 0.3]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

// Main Neural Network
const NeuralNetworkScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Layer configuration (Input -> Hidden1 -> Hidden2 -> Hidden3 -> Output)
  const layers = useMemo(() => [
    { x: -4, neurons: 5, color: "#00D9FF", label: "Input" },
    { x: -2, neurons: 8, color: "#8B5CF6", label: "Hidden" },
    { x: 0, neurons: 10, color: "#8B5CF6", label: "Hidden" },
    { x: 2, neurons: 6, color: "#8B5CF6", label: "Hidden" },
    { x: 4, neurons: 3, color: "#00FF88", label: "Output" },
  ], []);

  // Generate neuron positions
  const neurons = useMemo(() => {
    const result: { position: [number, number, number]; color: string; layer: number }[] = [];
    layers.forEach((layer, layerIdx) => {
      const spacing = 4 / Math.max(layer.neurons - 1, 1);
      for (let i = 0; i < layer.neurons; i++) {
        const y = layer.neurons === 1 ? 0 : (i - (layer.neurons - 1) / 2) * spacing * 0.5;
        // Add slight z variation for depth
        const z = Math.sin(i * 0.5 + layerIdx) * 0.3;
        result.push({
          position: [layer.x, y, z],
          color: layer.color,
          layer: layerIdx
        });
      }
    });
    return result;
  }, [layers]);

  // Generate connections (not fully connected for visual clarity)
  const connections = useMemo(() => {
    const result: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerNeurons = neurons.filter(n => n.layer === l);
      const nextLayerNeurons = neurons.filter(n => n.layer === l + 1);
      
      // Connect each neuron to ~60% of next layer for visual effect
      currentLayerNeurons.forEach((current, ci) => {
        nextLayerNeurons.forEach((next, ni) => {
          // Create some sparsity
          if ((ci + ni) % 2 === 0 || Math.random() > 0.4) {
            result.push({
              start: current.position,
              end: next.position,
              color: "#4A5568"
            });
          }
        });
      });
    }
    return result;
  }, [neurons, layers]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connections first (behind neurons) */}
      {connections.map((conn, i) => (
        <Connection 
          key={`conn-${i}`} 
          start={conn.start} 
          end={conn.end} 
          color={conn.color}
          signalSpeed={0.5 + Math.random() * 0.5}
        />
      ))}
      
      {/* Neurons */}
      {neurons.map((neuron, i) => (
        <Float key={`neuron-${i}`} speed={1.5} rotationIntensity={0} floatIntensity={0.1}>
          <Neuron 
            position={neuron.position} 
            color={neuron.color}
            size={0.12 + (neuron.layer === 0 || neuron.layer === layers.length - 1 ? 0.03 : 0)}
            pulseSpeed={2 + neuron.layer * 0.3}
          />
        </Float>
      ))}
      
      {/* Ground grid */}
      {[-4, -2, 0, 2, 4].map((x) => (
        <Line 
          key={`grid-${x}`} 
          points={[[x, -2.5, -1], [x, -2.5, 1]]} 
          color="#333" 
          lineWidth={0.5} 
          opacity={0.15} 
          transparent 
        />
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

// Main component
const NeuralNetwork3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative w-full h-[400px] rounded-xl overflow-hidden ${className}`} style={{ background: "linear-gradient(180deg, rgba(0,10,20,0.9) 0%, rgba(0,5,15,0.95) 100%)" }}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#fff" />
          <pointLight position={[-10, 5, -10]} intensity={0.4} color="#8B5CF6" />
          <pointLight position={[0, -5, 5]} intensity={0.3} color="#00D9FF" />
          
          <NeuralNetworkScene />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate={false}
            minDistance={5}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2 + 0.3}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
      
      {/* Title overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
        <h4 className="text-sm font-semibold text-white/90">Deep Neural Network</h4>
        <p className="text-[10px] text-white/60 font-mono">5 Layers • 32 Neurons • Signal Propagation</p>
      </div>
      
      {/* Layer labels */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-around px-8 text-[10px] font-mono text-white/50">
        <span className="text-[#00D9FF]">Input</span>
        <span className="text-[#8B5CF6]">Hidden</span>
        <span className="text-[#8B5CF6]">Hidden</span>
        <span className="text-[#8B5CF6]">Hidden</span>
        <span className="text-[#00FF88]">Output</span>
      </div>
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 right-4 text-[10px] text-white/40 font-mono">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default NeuralNetwork3D;
