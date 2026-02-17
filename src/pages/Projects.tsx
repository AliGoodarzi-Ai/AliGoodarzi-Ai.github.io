import { motion } from "framer-motion";
import { ExternalLink, Github, Zap, Brain, Bot, Eye, MessageSquare, FileText, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AmbientOrbs from "@/components/AmbientOrbs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  icon: React.ElementType;
  color: "primary" | "secondary" | "accent";
  status: "live" | "development" | "research";
  links: { type: "github" | "demo" | "paper"; url: string }[];
  metrics?: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    title: "Mind Elevator",
    description: "AI-Powered Argumentation System",
    longDescription:
      "Web-based system integrating Toulmin argumentation analysis with real-time semantic search. Features multi-stage semantic processing utilizing vector embeddings and GPT-4 API to enhance critical thinking in educational settings.",
    tags: ["LLMs", "GPT-4", "Semantic Search", "Education", "React", "Python"],
    icon: Brain,
    color: "primary",
    status: "live",
    links: [
      { type: "github", url: "https://github.com/AliGoodarzi-Ai" },
    ],
    metrics: [
      { label: "Users Tested", value: "50+" },
      { label: "Impact", value: "High" },
    ],
  },
  {
    title: "Therapeutic Companion",
    description: "Conversational AI for Mental Health",
    longDescription:
      "Conversational AI agent combining speech-to-text, LLM-powered dialogue, and text-to-speech for mental health support. Features natural turn-taking and persistent persona learning for older adults.",
    tags: ["Voice AI", "LLMs", "Mental Health", "TTS", "STT", "Python"],
    icon: MessageSquare,
    color: "secondary",
    status: "development",
    links: [{ type: "github", url: "https://github.com/AliGoodarzi-Ai" }],
    metrics: [
      { label: "Users Tested", value: "34" },
      { label: "Avg. Conv.", value: "7 min" },
    ],
  },
  {
    title: "Industrial Vision AI",
    description: "Affordance Theory Computer Vision",
    longDescription:
      "Computer vision system applying Gibson's affordance theory to industrial object detection and context-aware instruction generation with real-time safety monitoring.",
    tags: ["Computer Vision", "YOLO", "Affordance Theory", "Industrial AI", "Safety"],
    icon: Eye,
    color: "accent",
    status: "research",
    links: [{ type: "github", url: "https://github.com/AliGoodarzi-Ai" }],
    metrics: [
      { label: "Objects/Frame", value: "11+" },
      { label: "Processing", value: "Real-time" },
    ],
  },
  {
    title: "Medical Image AI",
    description: "Diabetic Retinopathy Detection",
    longDescription:
      "Transfer learning for diabetic retinopathy detection using ResNet, EfficientNet, DenseNet, VGG architectures. Features attention mechanisms, two-step fine-tuning, and five ensemble methods.",
    tags: ["Transfer Learning", "Medical AI", "PyTorch", "CNN", "Ensemble"],
    icon: Cpu,
    color: "primary",
    status: "research",
    links: [
      { type: "paper", url: "https://www.researchgate.net/profile/Ali-Goodarzi-7" },
    ],
    metrics: [
      { label: "Accuracy", value: "94.2%" },
      { label: "Models", value: "4" },
    ],
  },
  {
    title: "ECG Emotion AI",
    description: "Heart-Based Emotion Classification",
    longDescription:
      "Exploring brain-heart connection through ECG analysis for emotion detection. ML models using MIT-BIH dataset to classify emotional states from heart rhythm patterns.",
    tags: ["ECG", "Emotion Recognition", "Signal Processing", "Biomedical AI"],
    icon: Zap,
    color: "secondary",
    status: "research",
    links: [
      { type: "paper", url: "https://www.researchgate.net/profile/Ali-Goodarzi-7" },
    ],
    metrics: [
      { label: "Reads", value: "180" },
      { label: "Interest", value: "3.0" },
    ],
  },
  {
    title: "GNN Fraud Detection",
    description: "Graph Neural Networks for Finance",
    longDescription:
      "GNN architectures for transaction and entity-graph modelling to detect anomalies and fraud, with attention to temporal dynamics and interpretability.",
    tags: ["GNNs", "Financial AI", "Anomaly Detection", "XAI", "PyTorch Geometric"],
    icon: Bot,
    color: "accent",
    status: "development",
    links: [{ type: "github", url: "https://github.com/AliGoodarzi-Ai" }],
    metrics: [
      { label: "Accuracy", value: "96.1%" },
      { label: "Graphs", value: "4" },
    ],
  },
  {
    title: "iSafe PDF",
    description: "Intelligent PDF Compression Tool",
    longDescription:
      "Python tool leveraging PyMuPDF and Pillow for PDF compression with batch processing, CLI, and automation via batch scripts. Achieves up to 10x compression.",
    tags: ["Python", "Automation", "PyMuPDF", "CLI", "Batch Processing"],
    icon: FileText,
    color: "primary",
    status: "live",
    links: [{ type: "github", url: "https://github.com/AliGoodarzi-Ai" }],
    metrics: [
      { label: "Compression", value: "10×" },
      { label: "Processing", value: "Batch" },
    ],
  },
  {
    title: "Mineral Particle Mass Calculation",
    description: "Embedded Vision System with STM32",
    longDescription:
      "Embedded computer vision system using STM32 microcontroller and modular camera module for real-time mineral particle mass estimation. Custom PCB design in Altium Designer with on-board image processing pipeline.",
    tags: ["STM32", "Embedded Vision", "Altium Designer", "PCB Design", "Image Processing"],
    icon: Cpu,
    color: "secondary",
    status: "live",
    links: [{ type: "github", url: "https://github.com/AliGoodarzi-Ai" }],
    metrics: [
      { label: "Platform", value: "STM32" },
      { label: "Processing", value: "On-device" },
    ],
  },
  {
    title: "Reddit Conversational Agent",
    description: "RAG-Augmented Knowledge Assistant",
    longDescription:
      "Agentic conversational system with retrieval-augmented generation (RAG) for context-aware responses. Implements vector embeddings, semantic search, and multi-turn dialogue management with persistent memory.",
    tags: ["AI Agents", "RAG", "LangChain", "Vector DB", "Semantic Search", "Python"],
    icon: Bot,
    color: "accent",
    status: "development",
    links: [{ type: "github", url: "https://github.com/AliGoodarzi-Ai" }],
    metrics: [
      { label: "Architecture", value: "Agentic" },
      { label: "Memory", value: "Persistent" },
    ],
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
    shadow: "hover:shadow-glow-primary",
  },
  secondary: {
    bg: "bg-secondary/10",
    text: "text-secondary",
    border: "border-secondary/30",
    shadow: "hover:shadow-glow-secondary",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/30",
    shadow: "hover:shadow-glow-accent",
  },
};

const statusConfig = {
  live: { label: "Live", color: "bg-green-500" },
  development: { label: "In Development", color: "bg-yellow-500" },
  research: { label: "Research", color: "bg-blue-500" },
};

const Projects = () => {
  return (
    <div className="relative min-h-screen">
      {/* Ambient background effect */}
      <AmbientOrbs className="z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="py-8">
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A showcase of AI systems, research implementations, and tools I've built.
              Each project represents a step forward in human-AI interaction.
            </p>
        </motion.div>

        {/* AI Processing Indicator */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 glass px-4 py-2 text-sm font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>LOADING PROJECTS...</span>
            <span className="text-primary animate-blink">|</span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => {
            const colors = colorMap[project.color];
            const status = statusConfig[project.status];
            const Icon = project.icon;

            return (
              <motion.article
                key={project.title}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`tech-card group p-6 sm:p-8 transition-all duration-500 ${colors.shadow}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-muted-foreground font-mono">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                    <span className="text-muted-foreground">{status.label}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {project.longDescription}
                </p>

                {/* Metrics */}
                {project.metrics && (
                  <div className="flex gap-6 mb-4">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className={`text-lg font-bold ${colors.text}`}>{m.value}</div>
                        <div className="text-xs text-muted-foreground">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-muted/50 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.links.map((link) => (
                    <Button
                      key={link.type}
                      variant="outline"
                      size="sm"
                      asChild
                      className="gap-2"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.type === "github" && <Github size={14} />}
                        {link.type === "demo" && <ExternalLink size={14} />}
                        {link.type === "paper" && <FileText size={14} />}
                        {link.type === "github" ? "Code" : link.type === "demo" ? "Demo" : "Paper"}
                      </a>
                    </Button>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          className="text-center mt-16"
        >
          <div className="glass-glow inline-block p-8">
            <h3 className="text-2xl font-bold mb-2">Interested in Collaboration?</h3>
            <p className="text-muted-foreground mb-4">
              Let's build the future of Human-AI interaction together.
            </p>
            <Button variant="glow" size="lg" asChild>
              <a href="#/contact">Get in Touch</a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
};

export default Projects;
