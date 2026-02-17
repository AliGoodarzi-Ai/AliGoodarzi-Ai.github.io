import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

// Neuron (node) component
const Neuron = ({ 
  position, 
  color = "#00D9FF",
  scale = 1
}: { 
  position: [number, number, number];
  color?: string;
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        scale * (1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1)
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
};

// Connection (edge) component using drei's Line
const Connection = ({
  start,
  end,
  color = "#4A5568",
  opacity = 0.4
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  opacity?: number;
}) => {
  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  );
};

// Data pulse traveling along connection
const DataPulse = ({
  start,
  end,
  color = "#00FF88"
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = ((state.clock.elapsedTime * 0.5) % 1);
      meshRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
      meshRef.current.scale.setScalar(0.05 * (1 + Math.sin(t * Math.PI) * 0.5));
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

// Main neural network structure
const NeuralNetworkStructure = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Define layer positions (4 layers: input, 2 hidden, output)
  const layers = [
    { x: -3, neurons: 4, color: "#00D9FF" },   // Input
    { x: -1, neurons: 6, color: "#8B5CF6" },   // Hidden 1
    { x: 1, neurons: 6, color: "#8B5CF6" },    // Hidden 2
    { x: 3, neurons: 3, color: "#00FF88" },    // Output
  ];

  // Generate neuron positions
  const neurons = useMemo(() => {
    const result: { position: [number, number, number]; color: string; layer: number }[] = [];
    layers.forEach((layer, layerIdx) => {
      const spacing = 3 / layer.neurons;
      for (let i = 0; i < layer.neurons; i++) {
        const y = (i - (layer.neurons - 1) / 2) * spacing;
        result.push({
          position: [layer.x, y, 0],
          color: layer.color,
          layer: layerIdx
        });
      }
    });
    return result;
  }, []);

  // Generate connections
  const connections = useMemo(() => {
    const result: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerNeurons = neurons.filter(n => n.layer === l);
      const nextLayerNeurons = neurons.filter(n => n.layer === l + 1);
      
      currentLayerNeurons.forEach((current) => {
        nextLayerNeurons.forEach((next) => {
          result.push({
            start: current.position,
            end: next.position,
            color: "#4A5568"
          });
        });
      });
    }
    return result;
  }, [neurons]);

  // Select some connections for data pulses
  const pulseConnections = useMemo(() => {
    return connections.filter((_, i) => i % 7 === 0);
  }, [connections]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection key={`conn-${i}`} {...conn} />
      ))}
      
      {/* Data pulses */}
      {pulseConnections.map((conn, i) => (
        <DataPulse key={`pulse-${i}`} start={conn.start} end={conn.end} />
      ))}
      
      {/* Neurons */}
      {neurons.map((neuron, i) => (
        <Float key={`neuron-${i}`} speed={2} rotationIntensity={0} floatIntensity={0.3}>
          <Neuron position={neuron.position} color={neuron.color} />
        </Float>
      ))}
    </group>
  );
};

// Loading fallback
const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="#00D9FF" wireframe />
  </mesh>
);

// Main component
const NeuralNetwork3D = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-[400px] rounded-xl overflow-hidden ${className}`} style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
          
          <NeuralNetworkStructure />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default NeuralNetwork3D;
