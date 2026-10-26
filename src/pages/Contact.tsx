import profileImg from "@/assets/avatar.jpg";

const EMAIL = "ali.goodarzi@oulu.fi";

const links = [
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=G9GnajEAAAAJ&hl=en" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Ali-Goodarzi-7" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aligoodarzi" },
  { label: "GitHub", href: "https://github.com/AliGoodarzi-Ai" },
];

const Contact = () => (
  <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center">
    <img
      src={profileImg}
      alt="Ali Goodarzi"
      className="w-24 h-24 rounded-full object-cover border border-border mb-6"
    />
    <h1 className="text-3xl sm:text-4xl font-bold mb-2 hover:tracking-[0.3em] transition-[letter-spacing] duration-500 ease-out cursor-default">
      Ali Goodarzi
    </h1>
    <p className="text-lg text-foreground/80">Doctoral Researcher in Computer Science</p>
    <p className="text-muted-foreground mb-8">Centre for Applied Computing, University of Oulu</p>

    <p className="text-lg text-foreground/85 mb-8">
      I'm always open to collaboration. If you would like to build something together, run
      a joint study, or exchange ideas on human-AI interaction, please get in touch. Email
      is the best way to reach me.
    </p>

    <a
      href={`mailto:${EMAIL}`}
      className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90 mb-8"
    >
      {EMAIL}
    </a>

    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/75 underline underline-offset-4 decoration-border hover:text-primary hover:decoration-primary"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Contact;
