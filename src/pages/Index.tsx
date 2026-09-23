import { motion } from "framer-motion";
import {
  ArrowUpRight,
  GraduationCap,
  BookOpen,
  Mail,
  MessagesSquare,
  ListChecks,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/PROFIELR.png";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const SCHOLAR = "https://scholar.google.com/citations?user=G9GnajEAAAAJ&hl=en";
const RESEARCHGATE = "https://www.researchgate.net/profile/Ali-Goodarzi-7";
const REDDITPERSONA = "https://arxiv.org/abs/2606.06027";

const interests = [
  "Human-AI Interaction",
  "Human-Computer Interaction",
  "Large Language Models",
  "Conversational Agents",
  "Metacognition & Learning",
  "Well-being & Behaviour Change",
  "Mixed-Methods Research",
];

const focus = [
  {
    title: "User agency & actionable plans",
    desc: "Building agents that give people personalised, actionable plans while keeping them in control of their own decisions.",
  },
  {
    title: "Metacognition skills",
    desc: "Studying how AI can help people strengthen their own thinking, reflection, and self-assessment.",
  },
  {
    title: "Argumentation & reasoning",
    desc: "Designing systems that help people build and evaluate stronger arguments, instead of writing for them.",
  },
  {
    title: "Fine-tuning LLMs with human data",
    desc: "Adapting language models to real human discourse from sources like Reddit, so they reflect genuine community voices.",
  },
];

const Index = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Hero */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="min-h-[80vh] flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 py-16"
      >
        <div className="flex-1 text-center lg:text-left">
          <motion.p
            variants={fadeUp}
            className="text-base font-semibold tracking-wide text-primary mb-4 uppercase"
          >
            PhD Researcher in Computer Science · Human-AI Interaction
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            Ali Goodarzi
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-xl text-foreground/90 leading-relaxed mb-4"
          >
            I'm a doctoral researcher in computer science at the{" "}
            <a
              href="https://crowdcomputing.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              Centre for Applied Computing
            </a>
            , University of Oulu, working in human-AI interaction and supervised by Prof.
            Simo Hosio and Dr. Aku Visuri. I design and study conversational AI systems that
            adapt to what a person can genuinely do, so that support fits their real
            capabilities, resources, and context.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-xl text-foreground/90 leading-relaxed mb-8"
          >
            My work brings together large language models, human-centred design, and
            mixed-methods research to build tools that strengthen human reasoning and
            well-being. I hold a Master's degree in Artificial Intelligence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <Button asChild size="lg">
              <a href={SCHOLAR} target="_blank" rel="noopener noreferrer">
                <GraduationCap className="w-4 h-4" /> Google Scholar
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={RESEARCHGATE} target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-4 h-4" /> ResearchGate
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/contact">
                <Mail className="w-4 h-4" /> Contact
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div variants={fadeUp} className="shrink-0">
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-xl opacity-60" />
            <img
              src={profileImg}
              alt="Ali Goodarzi"
              className="relative w-72 sm:w-80 lg:w-[23rem] aspect-[3/4] rounded-2xl object-cover object-top border border-border shadow-lg"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Research interests */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-12"
      >
        <motion.h2 variants={fadeUp} className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
          Research interests
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
          {interests.map((it) => (
            <span
              key={it}
              className="px-4 py-2 rounded-full text-base bg-muted/60 text-foreground/90 border border-border/60"
            >
              {it}
            </span>
          ))}
        </motion.div>
      </motion.section>

      {/* What I work on */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-12"
      >
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold mb-8">
          What I work on
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {focus.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="glass p-6 h-full">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-foreground/80 leading-relaxed text-base">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Selected systems */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-12"
      >
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold mb-2">
          Selected systems
        </motion.h2>
        <motion.p variants={fadeUp} className="text-foreground/60 mb-8 max-w-2xl">
          Research prototypes I have designed and studied with people.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mind Elevator */}
          <motion.div variants={fadeUp} className="glass p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <MessagesSquare className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Mind Elevator</h3>
            </div>
            <p className="text-foreground/75 leading-relaxed mb-6">
              A conversational system that reads a learner's own argumentative writing and
              scaffolds each part of the argument, then points them to real human
              discussions so they do the reasoning themselves, instead of generating the
              text for them.
            </p>

            <div className="mt-auto rounded-xl border border-border/60 bg-background/40 p-4">
              <div className="text-xs text-muted-foreground mb-3">Argument breakdown</div>
              <ul className="space-y-2 text-sm">
                {["Claim", "Grounds", "Warrant", "Rebuttal"].map((c) => (
                  <li key={c} className="flex items-center gap-2 text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium">{c}</span>
                    <span className="h-1.5 flex-1 rounded-full bg-muted/70 overflow-hidden">
                      <span className="block h-full w-2/3 bg-primary/50 rounded-full" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Argumentation", "Toulmin model", "Semantic search", "LLMs"].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CapaCoach */}
          <motion.div variants={fadeUp} className="glass p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">CapaCoach</h3>
            </div>
            <p className="text-foreground/75 leading-relaxed mb-6">
              A conversational agent that builds a visible profile of a person's own
              context and writes activity plans fitted to what they can actually do,
              keeping the profile open for the person to see and correct.
            </p>

            <div className="mt-auto rounded-xl border border-border/60 bg-background/40 p-4">
              <div className="text-xs text-muted-foreground mb-3">Capability profile to plan</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {["Resources", "Energy", "Context", "Goals", "Constraints"].map((chip) => (
                  <span
                    key={chip}
                    className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>A plan fitted to this person</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Capability Approach", "Personalisation", "Behaviour change", "LLMs"].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p variants={fadeUp} className="text-sm text-foreground/60 mt-6">
          I also co-authored{" "}
          <a
            href={REDDITPERSONA}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 font-medium"
          >
            RedditPersona
          </a>
          , a framework for adapting a language model to an online community.
        </motion.p>
      </motion.section>

      {/* Learning over structure (GNN) */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-12"
      >
        <div className="glass p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Learning over structure</h2>
            <p className="text-foreground/75 leading-relaxed">
              Beyond text, I'm interested in how information moves through structure: graphs
              of people, arguments, and concepts. Graph neural networks pass messages along
              edges, so each node reflects its neighbours.
            </p>
          </div>
          <div className="flex justify-center">
            <GraphFigure />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// A lightweight, dynamic message-passing graph (animated with SVG/SMIL).
const GraphFigure = () => {
  const nodes = [
    { id: 0, x: 45, y: 55 },
    { id: 1, x: 145, y: 30 },
    { id: 2, x: 245, y: 60 },
    { id: 3, x: 95, y: 140 },
    { id: 4, x: 195, y: 150 },
    { id: 5, x: 280, y: 130 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [3, 4],
    [2, 5],
    [4, 5],
    [2, 4],
  ];
  return (
    <svg viewBox="0 0 320 185" className="w-full max-w-md h-auto">
      {edges.map(([a, b], i) => {
        const A = nodes[a];
        const B = nodes[b];
        const dur = 2.4 + (i % 3) * 0.8;
        return (
          <g key={i}>
            <line
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.28"
              strokeWidth="1.5"
            />
            {/* travelling signal */}
            <circle r="3" fill="hsl(var(--primary))">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                path={`M${A.x},${A.y} L${B.x},${B.y}`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${dur}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="12"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
          />
          <circle cx={n.x} cy={n.y} r="4" fill="hsl(var(--primary))">
            <animate
              attributeName="r"
              values="3;5.5;3"
              dur="3s"
              begin={`${n.id * 0.35}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="3s"
              begin={`${n.id * 0.35}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
};

export default Index;
