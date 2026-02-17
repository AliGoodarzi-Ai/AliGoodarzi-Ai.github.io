import { motion } from "framer-motion";
import { Linkedin, Github, BookOpen, MapPin, GraduationCap, Sparkles } from "lucide-react";
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

// Planet data for orbit
const planets = [
  { size: 8, orbitSize: 140, duration: 12, color: "hsl(180 85% 60%)", delay: 0, name: "AI" },
  { size: 6, orbitSize: 180, duration: 18, color: "hsl(145 75% 55%)", delay: 3, name: "ML" },
  { size: 10, orbitSize: 220, duration: 25, color: "hsl(45 95% 60%)", delay: 6, name: "HCI" },
  { size: 5, orbitSize: 260, duration: 32, color: "hsl(280 70% 60%)", delay: 9, name: "NLP" },
];

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 relative overflow-hidden">
      {/* Floating stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.4,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="py-8 relative z-10"
      >
        {/* Galaxy Profile Card */}
        <motion.div
          variants={fadeUp}
          className="glass-glow p-8 sm:p-12 mb-12 relative overflow-visible"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">PROFILE ACTIVE</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Profile Image - Planetary System */}
            <motion.div 
              className="relative"
              style={{ width: 320, height: 320 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Orbital paths */}
              {planets.map((planet, idx) => (
                <div
                  key={idx}
                  className="absolute rounded-full border border-dashed"
                  style={{
                    width: planet.orbitSize,
                    height: planet.orbitSize,
                    borderColor: `${planet.color.replace(")", " / 0.2)")}`,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

              {/* Orbiting planets */}
              {planets.map((planet, idx) => (
                <div
                  key={`planet-${idx}`}
                  className="absolute"
                  style={{
                    width: planet.orbitSize,
                    height: planet.orbitSize,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    animation: `orbit ${planet.duration}s linear ${planet.delay}s infinite`,
                  }}
                >
                  <div
                    className="absolute rounded-full flex items-center justify-center text-[6px] font-bold text-background"
                    style={{
                      width: planet.size,
                      height: planet.size,
                      backgroundColor: planet.color,
                      boxShadow: `0 0 ${planet.size * 2}px ${planet.color}`,
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                    title={planet.name}
                  />
                </div>
              ))}

              {/* Central glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-30 blur-2xl animate-glow-pulse" />

              {/* Profile circle with rotating ring */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Rotating outer ring */}
                <div className="absolute -inset-4 rounded-full border-2 border-primary/40 animate-rotate" />
                <div className="absolute -inset-6 rounded-full border border-secondary/20 animate-rotate" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
                
                {/* Profile image circle */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-primary/60">
                  <img
                    src={profileImg}
                    alt="Ali Goodarzi"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating sparkles */}
                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-accent animate-pulse" />
                <Sparkles className="absolute -bottom-1 -left-3 w-4 h-4 text-primary animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full">
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

        {/* Research Areas Box */}
        <motion.div variants={fadeUp} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Research <span className="text-gradient">Domains</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { abbr: "LLMs", full: "Large Language Models", icon: "λ" },
              { abbr: "HAI", full: "Human-AI Interaction", icon: "∫" },
              { abbr: "NLP", full: "Natural Language Processing", icon: "∂" },
              { abbr: "AI", full: "Artificial Intelligence", icon: "∞" },
            ].map((area, i) => (
              <motion.div
                key={area.abbr}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass p-4 text-center hover:shadow-glow-primary transition-all duration-300 group"
              >
                <div className="text-3xl mb-2 text-primary font-mono group-hover:scale-110 transition-transform">
                  {area.icon}
                </div>
                <div className="text-lg font-bold text-gradient">{area.abbr}</div>
                <div className="text-xs text-muted-foreground">{area.full}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connect heading */}
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

        {/* Mathematical/Mystical Contact Terminal */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="glass p-6 font-mono text-sm relative overflow-hidden"
        >
          {/* Background math grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, hsl(180 85% 55% / 0.1) 20px, hsl(180 85% 55% / 0.1) 21px),
                              repeating-linear-gradient(90deg, transparent, transparent 20px, hsl(180 85% 55% / 0.1) 20px, hsl(180 85% 55% / 0.1) 21px)`,
          }} />

          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-destructive/80" />
            <span className="w-3 h-3 rounded-full bg-secondary/60" />
            <span className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="ml-2 text-muted-foreground text-xs">ali@research-station ~ </span>
          </div>
          
          <div className="space-y-3 text-muted-foreground relative z-10">
            {/* Research interests as function */}
            <div>
              <p className="flex items-center gap-2">
                <span className="text-secondary">$</span>
                <span className="text-accent">f</span>
                <span className="text-muted-foreground">(research)</span>
                <span className="text-primary">=</span>
                <span className="text-foreground/80">∫ AI ⊕ LLMs ⊕ HAI ⊕ Cognition dt</span>
              </p>
            </div>

            {/* Status as equation */}
            <div>
              <p className="flex items-center gap-2">
                <span className="text-secondary">$</span>
                <span className="text-accent">status</span>
                <span className="text-primary">∈</span>
                <span className="text-foreground/80">{`{ "collaboration", "research", "innovation" }`}</span>
              </p>
            </div>

            {/* Email as mathematical expression */}
            <div className="pt-2 border-t border-primary/10">
              <p className="flex items-center gap-2 mb-2">
                <span className="text-secondary">$</span>
                <span className="text-accent">solve</span>
                <span>(contact)</span>
              </p>
              <div className="pl-4 flex flex-wrap items-center gap-2">
                <span className="text-primary text-lg">→</span>
                <span className="text-accent/80">ψ</span>
                <span className="text-foreground/60">=</span>
                <motion.span 
                  className="px-3 py-1.5 rounded bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(180 85% 55% / 0.4)" }}
                >
                  <span className="text-primary font-bold tracking-wider">ali</span>
                  <span className="text-muted-foreground mx-1">⊛</span>
                  <span className="text-secondary font-bold">goodarzi</span>
                  <span className="text-accent mx-1">→</span>
                  <span className="text-foreground/90 font-bold">oulu</span>
                  <span className="text-muted-foreground">.</span>
                  <span className="text-accent font-bold">fi</span>
                </motion.span>
              </div>
              <p className="text-xs text-muted-foreground/60 pl-4 mt-2 flex items-center gap-1">
                <span className="text-primary">∴</span> 
                <span>where ψ represents the optimal communication channel</span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
