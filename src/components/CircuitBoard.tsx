import { motion } from "framer-motion";

interface CircuitBoardProps {
  className?: string;
}

const CircuitBoard = ({ className = "" }: CircuitBoardProps) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central processor */}
        <motion.rect
          x="75"
          y="75"
          width="50"
          height="50"
          rx="8"
          fill="none"
          stroke="hsl(180 85% 55% / 0.6)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.rect
          x="80"
          y="80"
          width="40"
          height="40"
          rx="4"
          fill="hsl(180 85% 55% / 0.1)"
          stroke="hsl(180 85% 55% / 0.4)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Circuit paths */}
        {[
          "M100,75 L100,40 L60,40 L60,30",
          "M100,75 L100,40 L140,40 L140,30",
          "M125,100 L160,100 L160,60",
          "M125,100 L160,100 L160,140",
          "M100,125 L100,160 L60,160 L60,170",
          "M100,125 L100,160 L140,160 L140,170",
          "M75,100 L40,100 L40,60",
          "M75,100 L40,100 L40,140",
        ].map((path, i) => (
          <motion.path
            key={i}
            d={path}
            fill="none"
            stroke="hsl(180 85% 55% / 0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}

        {/* Connection nodes */}
        {[
          { cx: 60, cy: 30 },
          { cx: 140, cy: 30 },
          { cx: 160, cy: 60 },
          { cx: 160, cy: 140 },
          { cx: 60, cy: 170 },
          { cx: 140, cy: 170 },
          { cx: 40, cy: 60 },
          { cx: 40, cy: 140 },
        ].map((pos, i) => (
          <motion.circle
            key={i}
            cx={pos.cx}
            cy={pos.cy}
            r="4"
            fill="hsl(180 85% 55% / 0.8)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              delay: 0.8 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}

        {/* Data flow particles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={`particle-${i}`}
            r="2"
            fill="hsl(145 75% 50%)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
              path={
                i === 0
                  ? "M100,100 L100,40 L60,40 L60,30"
                  : i === 1
                  ? "M100,100 L160,100 L160,60"
                  : i === 2
                  ? "M100,100 L100,160 L140,160 L140,170"
                  : "M100,100 L40,100 L40,140"
              }
            />
          </motion.circle>
        ))}

        {/* Inner grid lines */}
        <motion.g opacity="0.3">
          {[85, 95, 105, 115].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="85"
              x2={x}
              y2="115"
              stroke="hsl(180 85% 55%)"
              strokeWidth="0.5"
            />
          ))}
          {[85, 95, 105, 115].map((y) => (
            <line
              key={`h-${y}`}
              x1="85"
              y1={y}
              x2="115"
              y2={y}
              stroke="hsl(180 85% 55%)"
              strokeWidth="0.5"
            />
          ))}
        </motion.g>

        {/* Center dot */}
        <motion.circle
          cx="100"
          cy="100"
          r="3"
          fill="hsl(180 85% 55%)"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

export default CircuitBoard;
