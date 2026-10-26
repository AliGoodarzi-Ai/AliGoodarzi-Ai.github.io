import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profileImg from "@/assets/portrait.jpg";
import MindElevatorDemo from "@/components/MindElevatorDemo";
import CapaCoachDemo from "@/components/CapaCoachDemo";
import GraphFigure from "@/components/GraphFigure";

const SCHOLAR = "https://scholar.google.com/citations?user=G9GnajEAAAAJ&hl=en";
const RESEARCHGATE = "https://www.researchgate.net/profile/Ali-Goodarzi-7";
const REDDITPERSONA = "https://arxiv.org/abs/2606.06027";

const interests = [
  "Human-AI interaction",
  "Human-computer interaction",
  "Large language models",
  "Conversational agents",
  "Metacognition and learning",
  "Well-being and behaviour change",
  "Mixed-methods research",
];

const focus = [
  {
    title: "User agency and actionable plans",
    desc: "Agents that give people plans they can act on, built from their own circumstances and kept under their control.",
  },
  {
    title: "Metacognition",
    desc: "How feedback from AI can help people reflect on and assess their own thinking.",
  },
  {
    title: "Argumentation and reasoning",
    desc: "Systems that help people build, question and strengthen their own arguments.",
  },
  {
    title: "Fine-tuning LLMs with human data",
    desc: "Adapting language models to real human discourse, such as Reddit communities, so their output reflects how those communities write.",
  },
];

const btn = "inline-flex items-center px-5 py-2.5 rounded-md text-base font-semibold transition-colors";

const Index = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6">
    {/* Hero */}
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14 py-12 lg:py-16"
    >
      <div className="flex-1 text-center lg:text-left">
        <p className="text-sm sm:text-base font-semibold tracking-wide text-primary mb-3 uppercase">
          PhD Researcher in Computer Science
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Ali Goodarzi</h1>
        <p className="text-lg sm:text-xl text-foreground/90 mb-4">
          I'm a doctoral researcher in computer science at the{" "}
          <a
            href="https://crowdcomputing.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
          >
            Centre for Applied Computing
          </a>
          , University of Oulu, working in human-AI interaction. I am supervised by Prof.
          Simo Hosio and Dr. Aku Visuri. I design and study conversational AI systems that
          adapt to what a person can genuinely do, so that support fits their capabilities,
          resources and context.
        </p>
        <p className="text-lg sm:text-xl text-foreground/90 mb-8">
          My work combines large language models, human-centred design and mixed-methods
          research to build tools that strengthen human reasoning and well-being. I hold a
          Master's degree in Artificial Intelligence.
        </p>
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <a href={SCHOLAR} target="_blank" rel="noopener noreferrer" className={`${btn} bg-primary text-primary-foreground hover:bg-primary/90`}>
            Google Scholar
          </a>
          <a href={RESEARCHGATE} target="_blank" rel="noopener noreferrer" className={`${btn} border border-border hover:bg-muted`}>
            ResearchGate
          </a>
          <Link to="/contact" className={`${btn} border border-border hover:bg-muted`}>
            Contact
          </Link>
        </div>
      </div>

      <img
        src={profileImg}
        alt="Ali Goodarzi"
        className="w-64 sm:w-80 lg:w-[23rem] aspect-[3/4] rounded-lg object-cover object-top border border-border shrink-0"
      />
    </motion.section>

    {/* Interests */}
    <section className="py-8 border-t border-border">
      <h2 className="text-2xl mb-3">Research interests</h2>
      <p className="text-lg text-foreground/85">{interests.join(" · ")}</p>
    </section>

    {/* Focus */}
    <section className="py-8 border-t border-border">
      <h2 className="text-2xl mb-4">What I work on</h2>
      <dl className="space-y-5 max-w-3xl">
        {focus.map((f) => (
          <div key={f.title}>
            <dt className="text-lg font-semibold">{f.title}</dt>
            <dd className="text-foreground/80">{f.desc}</dd>
          </div>
        ))}
      </dl>
    </section>

    {/* Systems */}
    <section className="py-8 border-t border-border">
      <h2 className="text-2xl mb-2">Selected systems</h2>
      <p className="text-foreground/75 mb-8 max-w-3xl">
        Research prototypes I have built and studied with people. The walkthroughs below use
        a scripted example. They run in your browser and send no data anywhere.
      </p>

      <article className="mb-12">
        <h3 className="text-xl sm:text-2xl mb-2">Mind Elevator</h3>
        <p className="text-foreground/85 mb-2 max-w-3xl">
          A conversational system that reads a learner's own argumentative essay and gives
          feedback on each part of the argument using Toulmin's model. It then links the
          learner to related discussions written by people, where the same question is
          argued from several sides. The learner revises the essay themselves.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Argumentation · Toulmin model · Semantic search · LLMs
        </p>
        <MindElevatorDemo />
      </article>

      <article className="mb-8">
        <h3 className="text-xl sm:text-2xl mb-2">CapaCoach</h3>
        <p className="text-foreground/85 mb-2 max-w-3xl">
          A conversational agent grounded in the Capability Approach. It builds a profile of
          a person's own circumstances in their own words and writes an activity plan from
          it through a chain of prompts. The profile stays visible so the person can check
          and correct it.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Capability Approach · Prompt chaining · Personalisation · Behaviour change
        </p>
        <CapaCoachDemo />
      </article>

      <p className="text-foreground/80">
        I also co-authored{" "}
        <a
          href={REDDITPERSONA}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
        >
          RedditPersona
        </a>
        , a framework for adapting a language model to an online community.
      </p>
    </section>

    {/* Structure */}
    <section className="py-8 border-t border-border grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl mb-3">Learning over structure</h2>
        <p className="text-foreground/85">
          Beyond text, I'm interested in how information moves through structure: graphs of
          people, arguments and concepts. In a graph neural network, each layer updates a
          node from its own features and its neighbours' features, weighted by node degree.
          The figure computes this propagation live, layer by layer.
        </p>
      </div>
      <div className="flex justify-center">
        <GraphFigure />
      </div>
    </section>
  </div>
);

export default Index;
