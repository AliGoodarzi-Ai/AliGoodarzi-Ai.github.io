import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Calendar, Users, Award, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  type: "journal" | "conference" | "thesis" | "preprint";
  abstract: string;
  tags: string[];
  links: { type: "pdf" | "doi" | "code" | "slides"; url: string }[];
  metrics?: { reads?: number; citations?: number; interest?: number };
  featured?: boolean;
}

const publications: Publication[] = [
  {
    title: "Mind Elevator: Enhancing Critical Thinking Through AI-Powered Argumentation Analysis",
    authors: ["Ali Goodarzi"],
    venue: "University of Oulu, Master's Thesis",
    year: "2025",
    type: "thesis",
    abstract:
      "A comprehensive study on integrating Toulmin argumentation analysis with semantic search and LLMs to enhance critical thinking capabilities. The system demonstrates significant improvements in reasoning quality compared to direct LLM usage.",
    tags: ["LLMs", "Argumentation", "Educational AI", "GPT-4", "Semantic Search"],
    links: [],
    metrics: { reads: 150, citations: 0 },
    featured: true,
  },
  {
    title: "Systematic Review: Machine Learning and Deep Learning Approaches for Early Alzheimer's Detection",
    authors: ["Ali Goodarzi", "et al."],
    venue: "International Journal of Medical Informatics",
    year: "2025",
    type: "journal",
    abstract:
      "A systematic review examining ML and DL approaches for early Alzheimer's detection across imaging, biosignal, and multimodal datasets. Provides comprehensive analysis of current techniques and future directions.",
    tags: ["Alzheimer's", "Medical AI", "Systematic Review", "Early Detection"],
    links: [{ type: "doi", url: "https://healthinformaticsjournal.com/index.php/IJMI/article/view/2888/2934" }],
    metrics: { reads: 85, citations: 2 },
    featured: true,
  },
  {
    title: "Transfer Learning for Diabetic Retinopathy Detection Using Ensemble Methods",
    authors: ["Ali Goodarzi"],
    venue: "ResearchGate Preprint",
    year: "2025",
    type: "preprint",
    abstract:
      "Investigation of transfer learning approaches for diabetic retinopathy detection using ResNet, EfficientNet, DenseNet, and VGG architectures with attention mechanisms and ensemble methods.",
    tags: ["Transfer Learning", "Medical Imaging", "Ensemble", "Deep Learning"],
    links: [],
    metrics: { reads: 65 },
  },
  {
    title: "ECG-Based Emotion Classification: Exploring the Brain-Heart Connection",
    authors: ["Ali Goodarzi"],
    venue: "ResearchGate",
    year: "2024",
    type: "preprint",
    abstract:
      "Novel approach to emotion recognition through ECG signal analysis. Utilizes machine learning models on MIT-BIH dataset to classify emotional states from cardiac rhythm patterns.",
    tags: ["ECG", "Emotion Recognition", "Signal Processing", "Biomedical AI"],
    links: [],
    metrics: { reads: 180, interest: 3.0 },
  },
  {
    title: "Academic Performance Forecasting: A Data Mining Approach",
    authors: ["Ali Goodarzi", "et al."],
    venue: "Conference Paper",
    year: "2024",
    type: "conference",
    abstract:
      "Data mining study analyzing factors affecting student performance. Predictive models reveal significant impact of family support and study time on academic success.",
    tags: ["Data Mining", "Educational Analytics", "Predictive Modeling"],
    links: [],
    metrics: { reads: 214, citations: 1 },
  },
];

const typeConfig = {
  journal: { label: "Journal Article", color: "text-secondary", icon: BookOpen },
  conference: { label: "Conference Paper", color: "text-primary", icon: Users },
  thesis: { label: "Thesis", color: "text-accent", icon: Award },
  preprint: { label: "Preprint", color: "text-muted-foreground", icon: FileText },
};

const Publications = () => {
  const totalCitations = publications.reduce((sum, p) => sum + (p.metrics?.citations || 0), 0);
  const totalReads = publications.reduce((sum, p) => sum + (p.metrics?.reads || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div variants={stagger} initial="hidden" animate="show" className="py-8">
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Academic <span className="text-gradient">Publications</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Research contributions in AI, machine learning, human-computer interaction, 
            and biomedical applications.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { label: "Publications", value: publications.length, icon: FileText },
            { label: "Total Reads", value: totalReads.toLocaleString(), icon: TrendingUp },
            { label: "Research Areas", value: "5+", icon: BookOpen },
          ].map((stat) => (
            <div key={stat.label} className="glass p-4 text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Research Network Visualization */}
        <motion.div
          variants={fadeUp}
          className="glass-glow p-6 mb-12 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">
              RESEARCH PROFILE ACTIVE
            </span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="https://www.researchgate.net/profile/Ali-Goodarzi-7"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 text-center hover:shadow-glow-primary transition-all group"
            >
              <div className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                ResearchGate
              </div>
              <div className="text-xs text-muted-foreground">Research Score: Active</div>
            </a>
            <a
              href="https://www.linkedin.com/in/aligoodarzi"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 text-center hover:shadow-glow-secondary transition-all group"
            >
              <div className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                LinkedIn
              </div>
              <div className="text-xs text-muted-foreground">Professional Network</div>
            </a>
            <a
              href="https://github.com/AliGoodarzi-Ai"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 text-center hover:shadow-glow-accent transition-all group"
            >
              <div className="text-lg font-bold text-accent group-hover:text-primary transition-colors">
                GitHub
              </div>
              <div className="text-xs text-muted-foreground">Code Repository</div>
            </a>
          </div>
        </motion.div>

        {/* Publications List */}
        <div className="space-y-6">
          {publications.map((pub, i) => {
            const typeInfo = typeConfig[pub.type];
            const TypeIcon = typeInfo.icon;

            return (
              <motion.article
                key={pub.title}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`tech-card p-6 sm:p-8 transition-all duration-500 hover:shadow-glow-primary ${
                  pub.featured ? "border-l-4 border-l-primary" : ""
                }`}
              >
                {/* Type & Year Badge */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${typeInfo.color}`}>
                    <TypeIcon size={14} />
                    {typeInfo.label}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {pub.year}
                  </div>
                  {pub.featured && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {pub.title}
                </h2>

                {/* Authors & Venue */}
                <div className="text-sm text-muted-foreground mb-3">
                  <span className="text-foreground/80">{pub.authors.join(", ")}</span>
                  <span className="mx-2">•</span>
                  <span className="italic">{pub.venue}</span>
                </div>

                {/* Abstract */}
                <p className="text-foreground/80 leading-relaxed mb-4 text-sm">
                  {pub.abstract}
                </p>

                {/* Metrics */}
                {pub.metrics && (
                  <div className="flex gap-6 mb-4">
                    {pub.metrics.reads && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{pub.metrics.reads}</div>
                        <div className="text-xs text-muted-foreground">Reads</div>
                      </div>
                    )}
                    {pub.metrics.citations !== undefined && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-secondary">{pub.metrics.citations}</div>
                        <div className="text-xs text-muted-foreground">Citations</div>
                      </div>
                    )}
                    {pub.metrics.interest && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-accent">{pub.metrics.interest}</div>
                        <div className="text-xs text-muted-foreground">Interest Score</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-muted/50 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {pub.links.map((link) => (
                    <Button
                      key={link.type}
                      variant="outline"
                      size="sm"
                      asChild
                      className="gap-2"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} />
                        {link.type.toUpperCase()}
                      </a>
                    </Button>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Research Interests */}
        <motion.div
          variants={fadeUp}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6">
            Research <span className="text-gradient">Interests</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { area: "Large Language Models", desc: "GPT-4, LLaMA, Agent Systems" },
              { area: "Human-AI Interaction", desc: "Cognitive Enhancement, UX" },
              { area: "Computer Vision", desc: "Medical Imaging, Object Detection" },
              { area: "Natural Language Processing", desc: "Semantic Search, Embeddings" },
              { area: "Biomedical AI", desc: "ECG, Alzheimer's, Retinopathy" },
              { area: "Explainable AI", desc: "Interpretability, Trust" },
            ].map((interest) => (
              <div
                key={interest.area}
                className="glass p-4 hover:shadow-glow-primary transition-all"
              >
                <h3 className="font-semibold text-primary mb-1">{interest.area}</h3>
                <p className="text-xs text-muted-foreground">{interest.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Publications;
