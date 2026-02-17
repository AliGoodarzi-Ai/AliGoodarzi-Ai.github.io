import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

interface Project {
  title: string;
  type: string;
  date: string;
  desc: string;
  tags: string[];
  stats: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    title: "Mind Elevator: AI-Powered Argumentation System",
    type: "Master's Thesis",
    date: "2024–2025",
    desc: "Web-based system integrating Toulmin argumentation analysis with real-time semantic search. Features MSSP utilizing vector embeddings and GPT-4 API to enhance critical thinking in educational settings.",
    tags: ["LLMs", "Semantic Search", "Educational AI", "GPT-4"],
    stats: [{ label: "Grade", value: "5/5" }, { label: "Status", value: "Published" }],
  },
  {
    title: "Therapeutic Companion: Conversational AI Agent",
    type: "Hackathon",
    date: "Scale Hack AI 2024",
    desc: "Conversational AI agent combining speech-to-text, LLM-powered dialogue, and text-to-speech for mental health support with older adults. Features natural turn-taking and persistent persona learning.",
    tags: ["Conversational AI", "Voice", "LLMs", "Mental Health"],
    stats: [{ label: "Users Tested", value: "34" }, { label: "Avg. Conv.", value: "7 min" }],
  },
  {
    title: "Industrial AI: Affordance Theory Implementation",
    type: "Research Project",
    date: "2024",
    desc: "Computer vision system applying Gibson's affordance theory to industrial object detection and context-aware instruction generation with real-time safety monitoring.",
    tags: ["Computer Vision", "Affordance Theory", "Industrial AI", "Safety"],
    stats: [{ label: "Objects/Frame", value: "11+" }, { label: "Processing", value: "Real-time" }],
  },
  {
    title: "Transfer Learning for Medical Image Classification",
    type: "Deep Learning Research",
    date: "January 2025",
    desc: "Transfer learning for diabetic retinopathy detection using ResNet, EfficientNet, DenseNet, VGG. Attention mechanisms, two-step fine-tuning, and five ensemble methods.",
    tags: ["Transfer Learning", "Medical AI", "Ensemble", "Computer Vision"],
    stats: [{ label: "Reads", value: "5" }, { label: "Models", value: "4" }],
  },
  {
    title: "ECG-Based Emotion Classification",
    type: "ML Research",
    date: "October 2024",
    desc: "Brain-heart connection through ECG analysis for emotion detection. ML models using MIT-BIH dataset to classify emotional states from heart rhythm patterns.",
    tags: ["ECG", "Emotion Recognition", "Biomedical AI", "Signal Processing"],
    stats: [{ label: "Reads", value: "180" }, { label: "Interest", value: "3.0" }],
  },
  {
    title: "Systematic Review: AI for Alzheimer's Detection",
    type: "Literature Review",
    date: "2025",
    desc: "Systematic review of ML and DL approaches for early Alzheimer's detection across imaging, biosignal, and multimodal datasets. Published in JAPER.",
    tags: ["Alzheimer's", "Medical AI", "Early Detection", "Review"],
    stats: [{ label: "Studies", value: "20+" }, { label: "Status", value: "Published" }],
  },
  {
    title: "Graph Neural Networks for Financial Anomaly Detection",
    type: "Data Science Research",
    date: "2025",
    desc: "GNN architectures for transaction and entity-graph modelling to detect anomalies and fraud, with attention to temporal dynamics and interpretability.",
    tags: ["GNNs", "Financial AI", "Anomaly Detection", "Explainable AI"],
    stats: [{ label: "Eval", value: "Model Optimization" }, { label: "Benchmarked", value: "✓" }],
  },
  {
    title: "Academic Performance Forecasting",
    type: "Data Mining Research",
    date: "April 2024",
    desc: "Data mining study analyzing student performance factors. Predictive models revealing impact of family support and study time on academic success.",
    tags: ["Data Mining", "Predictive Modeling", "Educational Analytics"],
    stats: [{ label: "Reads", value: "214" }, { label: "Citations", value: "1" }],
  },
  {
    title: "iSafe PDF: Intelligent Compression Tool",
    type: "Software Development",
    date: "2025",
    desc: "Python tool leveraging PyMuPDF and Pillow for PDF compression with batch processing, CLI, and automation via batch scripts.",
    tags: ["Python", "Automation", "PyMuPDF", "CLI"],
    stats: [{ label: "Compression", value: "10×" }, { label: "Processing", value: "Batch" }],
  },
];

const Research = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="py-8"
      >
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-2"
        >
          Research <span className="text-gradient">Projects</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground mb-10 max-w-2xl"
        >
          A collection of AI research spanning LLMs, computer vision, biomedical AI, and human-AI interaction.
        </motion.p>

        <div className="grid gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="glass p-6 sm:p-8 hover:shadow-glow-primary transition-all duration-500 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    {p.type} • {p.date}
                  </p>
                </div>
                <div className="flex gap-4 shrink-0">
                  {p.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-lg font-bold text-primary">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary/80 border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Research;