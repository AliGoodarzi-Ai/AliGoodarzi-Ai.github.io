import { motion } from "framer-motion";
import {
  Brain,
  Code,
  FlaskConical,
  Zap,
  Award,
  GraduationCap,
} from "lucide-react";
import MatrixRain from "@/components/MatrixRain";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const skillCategories = [
  {
    icon: Brain,
    title: "Machine Learning & AI",
    color: "primary" as const,
    skills: [
      "Large Language Models (LLMs)",
      "BERT, GPT-4, LangChain",
      "PyTorch, TensorFlow",
      "Vector Embeddings & Semantic Search",
      "Prompt Engineering",
      "Deep Learning (CNNs, DNNs)",
      "AI Agents & RAG Systems",
    ],
  },
  {
    icon: Code,
    title: "Programming & Development",
    color: "secondary" as const,
    skills: [
      "Python, R, JavaScript",
      "React.js, MATLAB, SQL",
      "VHDL & System Design",
      "Git, Docker, RESTful APIs",
      "MLaaS Implementation",
      "GPU Computing",
    ],
  },
  {
    icon: FlaskConical,
    title: "Research & Analysis",
    color: "accent" as const,
    skills: [
      "Experimental Design",
      "Statistical Analysis",
      "Time-series Forecasting",
      "Data Mining & Visualization",
      "Cross-disciplinary Research",
      "Critical Thinking Frameworks",
    ],
  },
  {
    icon: Zap,
    title: "Hardware & Embedded Systems",
    color: "primary" as const,
    skills: [
      "PCB Design (Altium Designer)",
      "ESP32, Arduino, IoT",
      "PLC Programming (Siemens)",
      "MQTT, LoRaWAN Protocols",
      "Strain Gauge Calibration",
      "Industrial Automation",
    ],
  },
];

const certifications = [
  { issuer: "Stanford University (ICME)", name: "Mathematical Thinking" },
  { issuer: "Stanford Online", name: "Unsupervised Learning, Recommenders, RL" },
  { issuer: "DataCamp", name: "Deep Learning for Text with PyTorch" },
  { issuer: "Stanford Online", name: "Supervised ML: Regression & Classification" },
  { issuer: "DataCamp", name: "Deep Reinforcement Learning" },
  { issuer: "DataCamp", name: "Hierarchical & Recursive Queries in SQL Server" },
  { issuer: "DataCamp", name: "Intermediate Docker" },
  { issuer: "DataCamp", name: "RL with Gymnasium in Python" },
  { issuer: "Udemy", name: "100 Days of Code: Python Pro Bootcamp" },
  { issuer: "Coursera", name: "AI For Everyone" },
  { issuer: "DataCamp", name: "Building Recommendation Engines with PySpark" },
  { issuer: "Google", name: "Introduction to Large Language Models" },
];

const shadowMap = {
  primary: "hover:shadow-glow-primary",
  secondary: "hover:shadow-glow-secondary",
  accent: "hover:shadow-glow-accent",
};

const bgMap = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
};

const Skills = () => {
  return (
    <div className="relative min-h-screen">
      {/* Matrix Rain Background */}
      <MatrixRain className="z-0" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="py-8">
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold mb-2"
          >
            Technical <span className="text-gradient">Expertise</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground mb-10"
          >
            Core skills across AI research, software engineering, and hardware systems.
          </motion.p>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-20">
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.title}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className={`glass p-6 transition-all duration-500 ${shadowMap[cat.color]} backdrop-blur-xl`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-lg ${bgMap[cat.color]}`}>
                    <cat.icon size={22} />
                  </div>
                  <h2 className="text-lg font-semibold">{cat.title}</h2>
                </div>
                <ul className="space-y-2.5">
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-3 text-sm text-foreground/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-2"
          >
            <span className="text-gradient">Certifications</span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.3 }}
                className="glass p-4 hover:shadow-glow-primary transition-all duration-300 group backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <Award size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{c.issuer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;