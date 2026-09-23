import { motion } from "framer-motion";
import { Mail, Linkedin, Github, GraduationCap, BookOpen } from "lucide-react";
import profileImg from "@/assets/profile.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const EMAIL = "ali.goodarzi@oulu.fi";

const links = [
  { icon: Mail, label: "Email", href: `mailto:${EMAIL}` },
  {
    icon: GraduationCap,
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=G9GnajEAAAAJ&hl=en",
  },
  {
    icon: BookOpen,
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Ali-Goodarzi-7",
  },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aligoodarzi" },
  { icon: Github, label: "GitHub", href: "https://github.com/AliGoodarzi-Ai" },
];

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="py-16 flex flex-col items-center text-center"
      >
        {/* Profile circle */}
        <motion.img
          variants={fadeUp}
          src={profileImg}
          alt="Ali Goodarzi"
          className="w-24 h-24 rounded-full object-cover border border-border shadow-md mb-6"
        />

        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold mb-2 tracking-normal hover:tracking-[0.3em] transition-[letter-spacing] duration-500 ease-out cursor-default"
        >
          Ali Goodarzi
        </motion.h1>
        <motion.p variants={fadeUp} className="text-foreground/75 mb-1">
          Doctoral Researcher in Computer Science
        </motion.p>
        <motion.p variants={fadeUp} className="text-sm text-muted-foreground mb-8">
          Centre for Applied Computing, University of Oulu
        </motion.p>

        {/* Collaboration invite */}
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-foreground/80 leading-relaxed mb-10"
        >
          I'm always open to collaboration and new ideas. If you would like to build
          something together, run a joint study, or simply exchange thoughts on human-AI
          interaction, please feel free to reach out. The best way to contact me is by
          email.
        </motion.p>

        {/* Simple links */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </a>
          ))}
        </motion.div>

        <motion.a
          variants={fadeUp}
          href={`mailto:${EMAIL}`}
          className="mt-8 text-primary font-medium hover:underline underline-offset-4"
        >
          {EMAIL}
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Contact;
