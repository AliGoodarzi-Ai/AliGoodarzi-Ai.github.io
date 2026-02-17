import { motion } from "framer-motion";
import { Linkedin, Github, BookOpen, Mail, MapPin, GraduationCap, Sparkles } from "lucide-react";
import profileImg from "@/assets/profile.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const socials = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aligoodarzi",
    desc: "Professional network & updates",
    glowClass: "hover:shadow-glow-primary hover:border-primary/50",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/AliGoodarzi-Ai",
    desc: "Open source projects & code",
    glowClass: "hover:shadow-glow-secondary hover:border-secondary/50",
  },
  {
    icon: BookOpen,
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Ali-Goodarzi-7",
    desc: "Publications & academic work",
    glowClass: "hover:shadow-glow-accent hover:border-accent/50",
  },
];

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="py-8"
      >
        {/* NASA-Style Profile Card */}
        <motion.div
          variants={fadeUp}
          className="glass-glow p-8 sm:p-12 mb-12 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">PROFILE ACTIVE</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Profile Image - Hexagonal NASA Style */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Outer rotating ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30 animate-rotate" />
              
              {/* Glow effect */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-40 blur-xl animate-glow-pulse" />
              
              {/* Hexagonal clip container */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                {/* Hexagonal border */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <polygon
                    points="50,2 95,25 95,75 50,98 5,75 5,25"
                    fill="none"
                    stroke="hsl(180 85% 55% / 0.6)"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="50,6 91,27 91,73 50,94 9,73 9,27"
                    fill="none"
                    stroke="hsl(180 85% 55% / 0.3)"
                    strokeWidth="0.5"
                  />
                </svg>
                
                {/* Profile image with hexagonal clip */}
                <div 
                  className="absolute inset-2 overflow-hidden"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <img
                    src={profileImg}
                    alt="Ali Goodarzi"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Corner indicators */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>

              {/* Status indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full">
                <span className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400">ONLINE</span>
                </span>
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <span className="text-xs font-mono text-primary px-2 py-0.5 rounded bg-primary/10">
                  ID: ALI-GOODARZI-001
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                <span className="text-gradient">Ali Goodarzi</span>
              </h1>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  PhD Student
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-secondary" />
                  University of Oulu
                </span>
              </div>

              <p className="text-foreground/80 max-w-lg mb-6">
                AI Researcher specializing in Human-AI Interaction, Large Language Models, 
                and cognitive enhancement systems. Building the future of intelligent collaboration.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {[
                  { label: "PUBLICATIONS", value: "10+" },
                  { label: "PROJECTS", value: "7" },
                  { label: "EXPERIENCE", value: "5+ YRS" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-primary">{stat.value}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section header */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-bold mb-6"
        >
          Connect <span className="text-gradient">With Me</span>
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass p-6 text-center transition-all duration-500 group ${s.glowClass}`}
            >
              <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 mb-4">
                <s.icon size={28} />
              </div>
              <h3 className="font-semibold mb-1">{s.label}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Terminal-style message - kept but enhanced */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="glass p-6 font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-destructive/80" />
            <span className="w-3 h-3 rounded-full bg-secondary/60" />
            <span className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="ml-2 text-muted-foreground text-xs">ali@research-station ~ </span>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <span className="text-secondary">$</span> cat research_interests.txt
            </p>
            <p className="text-foreground/80 pl-4">
              → AI Agents, LLMs, Human-AI Interaction, Cognitive Enhancement
            </p>
            <p>
              <span className="text-secondary">$</span> echo $STATUS
            </p>
            <p className="text-primary pl-4">
              → Open to collaboration & research opportunities
            </p>
            <p>
              <span className="text-secondary">$</span> ./contact --method=email
            </p>
            <p className="text-accent pl-4 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>ali.goodarzi [at] oulu.fi</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;