import { motion } from "framer-motion";

// CSS-based Neural Network that works everywhere
const NeuralNetworkCSS = () => {
  // Layer configuration
  const layers = [
    { neurons: 4, color: "#00D9FF", label: "Input" },
    { neurons: 6, color: "#8B5CF6", label: "Hidden" },
    { neurons: 6, color: "#8B5CF6", label: "Hidden" },
    { neurons: 3, color: "#00FF88", label: "Output" },
  ];

  return (
    <div className="relative w-full h-[350px] overflow-hidden rounded-xl bg-gradient-to-br from-background/80 via-muted/30 to-background/80 border border-primary/20">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Neural Network */}
      <div className="relative h-full flex items-center justify-center gap-8 sm:gap-16 px-4">
        {layers.map((layer, layerIdx) => (
          <div key={layerIdx} className="flex flex-col items-center gap-3">
            {/* Layer label */}
            <span className="text-[10px] font-mono text-muted-foreground mb-1 hidden sm:block">
              {layer.label}
            </span>
            
            {/* Neurons */}
            <div className="flex flex-col gap-2">
              {Array.from({ length: layer.neurons }).map((_, neuronIdx) => (
                <motion.div
                  key={neuronIdx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: layerIdx * 0.1 + neuronIdx * 0.05,
                    duration: 0.3
                  }}
                  className="relative"
                >
                  {/* Neuron */}
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        `0 0 10px ${layer.color}40`,
                        `0 0 20px ${layer.color}60`,
                        `0 0 10px ${layer.color}40`
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: neuronIdx * 0.2
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2"
                    style={{ 
                      backgroundColor: `${layer.color}30`,
                      borderColor: layer.color,
                    }}
                  />
                  
                  {/* Connection lines to next layer */}
                  {layerIdx < layers.length - 1 && (
                    <div className="absolute left-full top-1/2 w-8 sm:w-16 h-px">
                      {Array.from({ length: layers[layerIdx + 1].neurons }).map((_, connIdx) => {
                        const angle = ((connIdx - (layers[layerIdx + 1].neurons - 1) / 2) * 8);
                        return (
                          <motion.div
                            key={connIdx}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: layerIdx * 0.2 + 0.5 }}
                            className="absolute left-0 h-[1px] origin-left"
                            style={{
                              width: "100%",
                              background: `linear-gradient(90deg, ${layer.color}40 0%, ${layers[layerIdx + 1].color}40 100%)`,
                              transform: `rotate(${angle}deg)`,
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Data flow animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary"
            initial={{ x: "10%", y: "50%", opacity: 0 }}
            animate={{ 
              x: ["10%", "90%"],
              y: ["50%", `${30 + Math.random() * 40}%`, "50%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <span className="text-xs font-mono text-muted-foreground">
          Feed-Forward Neural Network
        </span>
      </div>
    </div>
  );
};

export default NeuralNetworkCSS;
