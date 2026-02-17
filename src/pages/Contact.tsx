import { motion } from "framer-motion";
import { Linkedin, Github, BookOpen, Mail } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="py-8 min-h-[70vh] flex flex-col justify-center"
      >
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-2"
        >
          Let's <span className="text-gradient">Connect</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground mb-12 max-w-lg"
        >
          Interested in collaboration, research opportunities, or just want to talk AI? Reach out through any of these channels.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
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

        {/* Terminal-style message */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="glass p-6 font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-destructive/80" />
            <span className="w-3 h-3 rounded-full bg-secondary/60" />
            <span className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="ml-2 text-muted-foreground text-xs">terminal</span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <p>
              <span className="text-secondary">$</span> cat research_interests.txt
            </p>
            <p className="text-foreground/80">
              → AI Agents, LLMs, Human-AI Interaction, Cognitive Enhancement
            </p>
            <p>
              <span className="text-secondary">$</span> echo $STATUS
            </p>
            <p className="text-primary">Open to collaboration & research opportunities_</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;