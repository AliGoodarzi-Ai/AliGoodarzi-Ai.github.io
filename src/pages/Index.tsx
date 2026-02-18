import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Cpu, Users, Sparkles, Zap, Code, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AIChatSimulator from "@/components/AIChatSimulator";
import TypewriterText from "@/components/TypewriterText";
import CircuitBoard from "@/components/CircuitBoard";
import TransformerViz from "@/components/TransformerViz";
import AgenticAIViz from "@/components/AgenticAIViz";
import SemanticSearchViz from "@/components/SemanticSearchViz";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

const focuses = [
  {
    icon: Brain,
    title: "AI Agents & LLMs",
    desc: "Building intelligent agents powered by large language models for complex reasoning and decision-making tasks.",
    color: "primary" as const,
  },
  {
    icon: Users,
    title: "Human-AI Interaction",
    desc: "Designing systems that augment human cognition through structured AI collaboration.",
    color: "secondary" as const,
  },
  {
    icon: Cpu,
    title: "Deep Learning",
    desc: "Neural architectures for computer vision, NLP, signal processing, and multimodal learning.",
    color: "accent" as const,
  },
  {
    icon: BookOpen,
    title: "Research Methods",
    desc: "Experimental design, statistical modeling, and quantitative evaluation of AI systems.",
    color: "primary" as const,
  },
];

const colorMap = {
  primary: { bg: "bg-primary/10", text: "text-primary", hover: "group-hover:bg-primary/20" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", hover: "group-hover:bg-secondary/20" },
  accent: { bg: "bg-accent/10", text: "text-accent", hover: "group-hover:bg-accent/20" },
};

const stats = [
  { value: "5+", label: "Research Projects", icon: BookOpen },
  { value: "10+", label: "Publications", icon: Zap },
  { value: "9", label: "AI Systems Built", icon: Code },
  { value: "50+", label: "Users Tested", icon: Users },
];

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Hero */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-12"
      >
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Status badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              AVAILABLE FOR RESEARCH COLLABORATION
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          >
            <span className="text-gradient">Ali</span>
            <br />
            <span className="text-foreground">Goodarzi</span>
          </motion.h1>

          {/* Dynamic subtitle */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl font-mono text-muted-foreground mb-6 h-8"
          >
            <TypewriterText
              texts={[
                "PhD Student in Computer Science",
                "AI Researcher & Engineer",
                "Human-AI Interaction Specialist",
                "LLM & Agent Developer",
              ]}
              className="text-primary"
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-xl text-foreground/80 leading-relaxed mb-8 text-lg"
          >
            Applying theoretical frameworks to design{" "}
            <span className="text-primary font-medium">human-AI interaction systems</span> that enhance
            cognitive abilities. Specializing in{" "}
            <span className="text-secondary font-medium">Large Language Models</span>,{" "}
            <span className="text-accent font-medium">AI agents</span>, and interactive argumentation systems.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button variant="glow" size="xl" asChild>
              <Link to="/research">
                View Research <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button variant="glow-outline" size="xl" asChild>
              <Link to="/projects">Explore Projects</Link>
            </Button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Interactive elements */}
        <motion.div
          variants={scaleIn}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-lg"
        >
          {/* Circuit board decoration */}
          <div className="relative">
            <div className="absolute -top-20 -right-10 w-40 h-40 opacity-30">
              <CircuitBoard />
            </div>
            <AIChatSimulator />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 opacity-20">
              <CircuitBoard />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Research Focus */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-20"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Research <span className="text-gradient">Focus</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bridging the gap between artificial intelligence and human cognition through innovative research.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {focuses.map((f, i) => {
            const colors = colorMap[f.color];
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="tech-card p-6 sm:p-8 hover:shadow-glow-primary transition-all duration-500 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${colors.bg} ${colors.text} ${colors.hover} transition-colors`}>
                    <f.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Architecture Visualizations */}
        <motion.div 
          variants={fadeUp}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-gradient">Deep Learning</span> & AI Systems
            </h3>
            <p className="text-sm text-muted-foreground">
              IEEE/Academic-quality visualizations with mathematical annotations, data flow & architecture details
            </p>
          </div>
          
          {/* Three IEEE-quality Visualizations */}
          <div className="space-y-6">
            <TransformerViz />
            <AgenticAIViz />
            <SemanticSearchViz />
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Work */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20"
      >
        <div className="glass-glow p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">FEATURED</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <span className="text-sm font-mono text-primary">MASTER'S THESIS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Mind <span className="text-gradient">Elevator</span>
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                An AI-powered argumentation system that enhances critical thinking through 
                Toulmin analysis and GPT-4 integration. Demonstrated significant improvements 
                in reasoning quality compared to direct LLM usage through rigorous user studies.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["LLMs", "GPT-4", "Semantic Search", "Education", "React", "Python"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button variant="glow" asChild>
                <Link to="/projects">
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Visual representation */}
            <div className="relative">
              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-mono text-muted-foreground">SYSTEM OUTPUT</span>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span className="text-foreground/80">Analyzing argument structure...</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary">→</span>
                    <span className="text-foreground/80">Applying Toulmin framework...</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent">→</span>
                    <span className="text-foreground/80">Generating semantic embeddings...</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-primary">Critical thinking enhanced by 40%</span>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 inset-0 blur-3xl bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* About snippet */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20"
      >
        <div className="glass p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-sm text-muted-foreground font-mono">BACKGROUND & EXPERTISE</p>
            </div>
          </div>
          <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
            <p>
              I hold a <span className="text-primary font-medium">Master's degree in Computer Science and Engineering</span> from the University of
              Oulu. My background is in applied artificial intelligence, with experience designing
              and building intelligent systems for real-world impact.
            </p>
            <p>
              I developed <span className="text-secondary font-medium">Mind Elevator</span>, an
              interactive argumentation system enhancing critical thinking through structured
              human-AI collaboration, demonstrating significant improvements in reasoning compared
              to direct LLM usage.
            </p>
            <p>
              My research combines <span className="text-accent font-medium">user study methodologies</span> with AI system
              development to create tools that augment rather than replace human cognitive
              capabilities.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="glow-outline" asChild>
              <Link to="/publications">View Publications</Link>
            </Button>
            <Button variant="glow-outline" asChild>
              <Link to="/skills">See Skills</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;