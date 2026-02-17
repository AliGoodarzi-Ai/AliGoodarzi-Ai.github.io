import { motion } from "framer-motion";

// Transformer Architecture Visualization
const TransformerViz = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-gradient-to-br from-background/80 via-muted/30 to-background/80 border border-secondary/20">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-secondary/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/40 rounded-full blur-3xl" />
      </div>

      <div className="relative h-full flex items-center justify-center px-4">
        {/* Encoder Stack */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground mb-2">Encoder</span>
          
          {/* Encoder Layers */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`enc-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="flex flex-col gap-1 p-3 rounded-lg border border-primary/30 bg-primary/5">
                {/* Multi-Head Attention */}
                <motion.div 
                  className="flex items-center gap-1 px-2 py-1 rounded bg-primary/20 text-[9px] sm:text-xs font-mono text-primary"
                  animate={{ boxShadow: ["0 0 0px #00D9FF", "0 0 10px #00D9FF", "0 0 0px #00D9FF"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <span className="hidden sm:inline">Multi-Head</span> Attention
                </motion.div>
                
                {/* FFN */}
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/20 text-[9px] sm:text-xs font-mono text-secondary">
                  <span className="hidden sm:inline">Feed-Forward</span> FFN
                </div>
              </div>
              
              {/* Skip connection */}
              <div className="absolute -right-2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50" />
            </motion.div>
          ))}
          
          {/* Input Embedding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 px-3 py-1.5 rounded-lg border border-accent/30 bg-accent/10 text-[10px] sm:text-xs font-mono text-accent"
          >
            Input Embedding
          </motion.div>
        </div>

        {/* Connector Arrow */}
        <motion.div 
          className="mx-4 sm:mx-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-primary via-secondary to-primary" />
          
          {/* Data flow dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-secondary"
              animate={{ 
                x: [-30, 30],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.3 + 0.8,
                repeat: Infinity
              }}
            />
          ))}
        </motion.div>

        {/* Decoder Stack */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground mb-2">Decoder</span>
          
          {/* Decoder Layers */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`dec-${i}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 + 0.3 }}
              className="relative"
            >
              <div className="flex flex-col gap-1 p-3 rounded-lg border border-secondary/30 bg-secondary/5">
                {/* Masked Multi-Head Attention */}
                <motion.div 
                  className="flex items-center gap-1 px-2 py-1 rounded bg-accent/20 text-[9px] sm:text-xs font-mono text-accent"
                  animate={{ boxShadow: ["0 0 0px #00FF88", "0 0 10px #00FF88", "0 0 0px #00FF88"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  Masked <span className="hidden sm:inline">Attention</span>
                </motion.div>
                
                {/* Cross Attention */}
                <motion.div 
                  className="flex items-center gap-1 px-2 py-1 rounded bg-primary/20 text-[9px] sm:text-xs font-mono text-primary"
                  animate={{ boxShadow: ["0 0 0px #00D9FF", "0 0 8px #00D9FF", "0 0 0px #00D9FF"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 + 0.5 }}
                >
                  Cross <span className="hidden sm:inline">Attention</span>
                </motion.div>
                
                {/* FFN */}
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/20 text-[9px] sm:text-xs font-mono text-secondary">
                  FFN
                </div>
              </div>
              
              {/* Skip connection */}
              <div className="absolute -left-2 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/50 via-accent/50 to-secondary/50" />
            </motion.div>
          ))}
          
          {/* Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-2 px-3 py-1.5 rounded-lg border border-accent/30 bg-accent/10 text-[10px] sm:text-xs font-mono text-accent"
          >
            Output Probs
          </motion.div>
        </div>
      </div>

      {/* Attention visualization */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-dashed border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
      </motion.div>

      {/* Label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <span className="text-xs font-mono text-muted-foreground">
          Transformer Architecture
        </span>
      </div>
    </div>
  );
};

export default TransformerViz;
