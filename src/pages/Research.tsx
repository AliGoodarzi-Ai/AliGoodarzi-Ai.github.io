import { motion } from "framer-motion";
import { 
  Brain, 
  Microscope, 
  Cpu, 
  Users, 
  HeartPulse, 
  LineChart,
  ArrowRight,
  ExternalLink,
  Calendar,
  Target,
  Sun,
  Droplet
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Research Areas / Focus
const researchAreas = [
  {
    icon: Brain,
    title: "AI Agents & LLMs",
    description: "Autonomous agents, prompt engineering, retrieval-augmented generation (RAG), and agentic systems",
    keywords: ["GPT-4", "LangChain", "Vector Embeddings", "Semantic Search"],
    color: "primary",
  },
  {
    icon: Users,
    title: "Human-AI Interaction",
    description: "Designing systems that augment human cognition through structured AI collaboration",
    keywords: ["HAI", "Cognitive Enhancement", "User Studies", "Argumentation"],
    color: "secondary",
  },
  {
    icon: Microscope,
    title: "Biomedical AI",
    description: "Machine learning for medical imaging, biosignal analysis, and clinical decision support",
    keywords: ["Medical Imaging", "ECG Analysis", "Alzheimer's Detection", "Diagnostics"],
    color: "accent",
  },
  {
    icon: Cpu,
    title: "Computer Vision",
    description: "Object detection, image classification, and affordance theory in industrial applications",
    keywords: ["YOLO", "Transfer Learning", "Industrial AI", "Safety Systems"],
    color: "primary",
  },
];

// Timeline of Research (reverse chronological: newest first)
const researchTimeline = [
  {
    year: "2024-2025",
    title: "AI-Powered Argumentation System",
    role: "Master's Thesis",
    institution: "University of Oulu",
    description: "Developed Mind Elevator, a web-based system integrating Toulmin argumentation analysis with semantic search and GPT-4. Demonstrated significant improvements in critical thinking compared to direct LLM usage.",
    impact: ["50+ users tested", "Published thesis", "Educational AI application"],
    tags: ["LLMs", "GPT-4", "Semantic Search", "Educational AI"],
    icon: Brain,
  },
  {
    year: "2025",
    title: "Medical Image Classification",
    role: "Deep Learning Research",
    institution: "Independent Research",
    description: "Transfer learning for diabetic retinopathy detection using ResNet, EfficientNet, DenseNet, VGG with attention mechanisms and ensemble methods.",
    impact: ["94.2% accuracy", "4 architecture ensemble", "Two-step fine-tuning"],
    tags: ["Transfer Learning", "Medical AI", "Ensemble", "PyTorch"],
    icon: Microscope,
  },
  {
    year: "2025",
    title: "Alzheimer's Detection Review",
    role: "Systematic Review",
    institution: "Published in JAPER",
    description: "Comprehensive systematic review of ML and DL approaches for early Alzheimer's detection across imaging, biosignal, and multimodal datasets.",
    impact: ["20+ studies analyzed", "Published in journal", "Clinical AI review"],
    tags: ["Systematic Review", "Alzheimer's", "Medical AI", "Early Detection"],
    icon: Microscope,
  },
  {
    year: "2024",
    title: "Industrial Computer Vision",
    role: "Research Project",
    institution: "University of Oulu",
    description: "Applied Gibson's affordance theory to industrial object detection with context-aware instruction generation and real-time safety monitoring.",
    impact: ["11+ objects per frame", "Real-time processing", "Safety-critical application"],
    tags: ["Computer Vision", "Affordance Theory", "Industrial AI", "YOLO"],
    icon: Cpu,
  },
  {
    year: "2024",
    title: "Therapeutic Conversational AI",
    role: "Scale Hack AI 2024",
    institution: "Hackathon Project",
    description: "Built a conversational AI agent combining speech-to-text, LLM-powered dialogue, and text-to-speech for mental health support. Features natural turn-taking and persona learning.",
    impact: ["34 older adult users", "7 min avg. conversation", "Real-time voice interaction"],
    tags: ["Voice AI", "Mental Health", "LLMs", "TTS/STT"],
    icon: HeartPulse,
  },
  {
    year: "2024",
    title: "ECG Emotion Classification",
    role: "ML Research",
    institution: "Biomedical AI",
    description: "Exploring the brain-heart connection through ECG analysis for emotion detection using MIT-BIH dataset and machine learning models.",
    impact: ["180 reads on ResearchGate", "Novel signal processing approach"],
    tags: ["ECG", "Emotion Recognition", "Signal Processing", "Biomedical AI"],
    icon: HeartPulse,
  },
  {
    year: "2024",
    title: "Academic Performance Forecasting",
    role: "Data Mining Research",
    institution: "Conference Paper",
    description: "Data mining study analyzing factors affecting student performance. Predictive models reveal impact of family support and study time on success.",
    impact: ["214 reads", "1 citation", "Educational data mining"],
    tags: ["Data Mining", "Predictive Modeling", "Educational Analytics"],
    icon: LineChart,
  },
  {
    year: "2020",
    title: "Embedded Systems for Water Level Management",
    role: "Engineering Project",
    institution: "Hardware Development",
    description: "Developed embedded system solutions for automated water level monitoring and management. Implemented sensor fusion, real-time alerts, and automated control mechanisms for industrial applications.",
    impact: ["Industrial automation", "Sensor fusion", "Real-time control systems"],
    tags: ["Embedded Systems", "Water Management", "Sensors", "Automation"],
    icon: Droplet,
  },
  {
    year: "2018",
    title: "IoT Solar Power Distribution in Autonomous Systems",
    role: "Research Project",
    institution: "Undergraduate Research",
    description: "Designed and implemented an IoT-based solar power distribution system for autonomous applications. Integrated embedded sensors with cloud monitoring for real-time power optimization and load balancing.",
    impact: ["Autonomous power management", "IoT sensor network", "Real-time monitoring"],
    tags: ["IoT", "Solar Energy", "Embedded Systems", "Autonomous Systems"],
    icon: Sun,
  },
];

const colorMap = {
  primary: "text-primary bg-primary/10 border-primary/30",
  secondary: "text-secondary bg-secondary/10 border-secondary/30",
  accent: "text-accent bg-accent/10 border-accent/30",
};

const Research = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="py-8"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Microscope className="w-6 h-6" />
            </div>
            <span className="text-sm font-mono text-muted-foreground">RESEARCH OVERVIEW</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Research <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            My research bridges AI theory and practical applications, focusing on systems that 
            enhance human capabilities through intelligent collaboration.
          </p>
        </motion.div>

        {/* Research Areas Grid */}
        <motion.div variants={fadeUp} className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Research Focus Areas
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {researchAreas.map((area) => (
              <motion.div
                key={area.title}
                variants={fadeUp}
                className={`glass p-6 hover:shadow-glow-${area.color} transition-all duration-500 group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${colorMap[area.color as keyof typeof colorMap]}`}>
                    <area.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {area.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 text-xs font-mono rounded bg-muted/50 text-muted-foreground"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research Timeline */}
        <motion.div variants={fadeUp}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-secondary" />
            Research Timeline
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[52px] sm:left-[68px] top-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-30" style={{ height: 'calc(100% - 30px)' }} />
            
            <div className="space-y-6">
              {researchTimeline.map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.05 }}
                  className="relative flex gap-4"
                >
                  {/* Year label - left side */}
                  <div className="w-12 sm:w-14 shrink-0 text-right pt-1">
                    <span className="text-xs sm:text-sm font-mono font-bold text-primary">
                      {item.year}
                    </span>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative shrink-0 pt-1.5">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background shadow-glow-primary ${idx === researchTimeline.length - 1 ? 'ring-2 ring-primary/30 ring-offset-2 ring-offset-background' : ''}`} />
                  </div>
                  
                  {/* Content card */}
                  <div className="flex-1 glass p-5 sm:p-6 hover:shadow-glow-primary transition-all duration-500 group">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground font-mono">
                            {item.role} • {item.institution}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>
                    
                    {/* Impact points */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.impact.map((point) => (
                        <span
                          key={point}
                          className="px-2 py-1 text-xs rounded bg-secondary/10 text-secondary border border-secondary/20"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-mono rounded-full bg-primary/5 text-primary/60 border border-primary/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="mt-16 text-center"
        >
          <div className="glass-glow inline-block p-8">
            <h3 className="text-2xl font-bold mb-2">Interested in Collaboration?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              I'm always open to discussing research ideas, potential collaborations, 
              and opportunities in AI and human-computer interaction.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="glow" asChild>
                <Link to="/publications">
                  View Publications <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="glow-outline" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Research;
