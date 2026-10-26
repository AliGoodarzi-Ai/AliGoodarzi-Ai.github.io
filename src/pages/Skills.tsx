const groups = [
  {
    title: "AI and machine learning",
    items: [
      "Large language models",
      "Retrieval-augmented generation",
      "Fine-tuning and prompt engineering",
      "Prompt chaining",
      "Semantic search and vector embeddings",
      "Conversational agents",
      "PyTorch and deep learning",
    ],
  },
  {
    title: "Programming and development",
    items: [
      "Python",
      "JavaScript and TypeScript",
      "React and full-stack web applications",
      "SQL",
      "Git and Docker",
      "REST APIs",
    ],
  },
  {
    title: "Research methods",
    items: [
      "Experimental design",
      "Quantitative analysis",
      "Semi-structured interviews",
      "Thematic analysis",
      "Mixed-methods studies",
      "Studies with human participants",
      "Literature reviews",
    ],
  },
];

const certifications = [
  { issuer: "Stanford University (ICME)", name: "Mathematical Thinking" },
  { issuer: "Stanford Online", name: "Unsupervised Learning, Recommenders, Reinforcement Learning" },
  { issuer: "Stanford Online", name: "Supervised Machine Learning: Regression and Classification" },
  { issuer: "Google", name: "Introduction to Large Language Models" },
  { issuer: "DataCamp", name: "Deep Learning for Text with PyTorch" },
  { issuer: "DataCamp", name: "Deep Reinforcement Learning" },
  { issuer: "DataCamp", name: "Reinforcement Learning with Gymnasium in Python" },
  { issuer: "DataCamp", name: "Building Recommendation Engines with PySpark" },
  { issuer: "DataCamp", name: "Intermediate Docker" },
  { issuer: "DataCamp", name: "Hierarchical and Recursive Queries in SQL Server" },
  { issuer: "Udemy", name: "100 Days of Code: Python Pro Bootcamp" },
  { issuer: "Coursera", name: "AI For Everyone" },
];

const Skills = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
    <h1 className="text-4xl font-bold mb-3">Skills</h1>
    <p className="text-lg text-foreground/80 mb-10">
      AI and machine learning, software development, and empirical research methods.
    </p>

    <div className="divide-y divide-border border-y border-border mb-14">
      {groups.map((g) => (
        <section key={g.title} className="py-6 grid md:grid-cols-[16rem_1fr] gap-2 md:gap-8">
          <h2 className="text-xl">{g.title}</h2>
          <ul className="text-foreground/85 grid sm:grid-cols-2 gap-x-8 gap-y-1">
            {g.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>

    <h2 className="text-2xl mb-4">Certifications</h2>
    <ul className="divide-y divide-border border-y border-border">
      {certifications.map((c) => (
        <li key={c.name} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className="text-foreground/90">{c.name}</span>
          <span className="text-sm text-muted-foreground">{c.issuer}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Skills;
