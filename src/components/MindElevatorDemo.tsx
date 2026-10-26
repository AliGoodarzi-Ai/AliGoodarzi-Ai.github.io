import { useState } from "react";

type Part = "Claim" | "Grounds" | "Warrant" | "Backing" | "Qualifier" | "Rebuttal";
type Status = "Present" | "Weak" | "Missing";

// HSL triples, readable on both the paper and the page background.
const colour: Record<Part, string> = {
  Claim: "215 65% 48%",
  Grounds: "150 50% 36%",
  Warrant: "32 85% 45%",
  Backing: "275 40% 52%",
  Qualifier: "190 60% 36%",
  Rebuttal: "355 60% 50%",
};

const essay: { text: string; part?: Part }[] = [
  { text: "Public transport in cities should be free for everyone.", part: "Claim" },
  { text: " " },
  {
    text: "Many people already struggle with the cost of tickets, and free buses would mean more people use them.",
    part: "Grounds",
  },
  { text: " " },
  { text: "When more people take the bus, there are fewer cars on the road.", part: "Warrant" },
  { text: " So making it free is the right choice." },
];

const feedback: Record<Part, { status: Status; role: string; note: string }> = {
  Claim: {
    status: "Present",
    role: "The position you want the reader to accept.",
    note: "Your position is clear in the first sentence. Check whether \"everyone\" is what you mean, or whether the claim should name a specific group.",
  },
  Grounds: {
    status: "Present",
    role: "The reasons or evidence offered for the claim.",
    note: "You give ticket cost as a reason. Ask yourself what would show a reader that cost really keeps people off the bus.",
  },
  Warrant: {
    status: "Weak",
    role: "The link that explains why the grounds support the claim.",
    note: "The step from more riders to fewer cars is assumed. Spell out why one leads to the other so the reader can follow it.",
  },
  Backing: {
    status: "Missing",
    role: "Support for the warrant itself.",
    note: "Nothing yet supports that link. What kind of source or experience would make it convincing to a sceptical reader?",
  },
  Qualifier: {
    status: "Missing",
    role: "How strongly, and in which cases, the claim holds.",
    note: "The claim reads as true in every case. Think about where it holds strongly and where it might hold less.",
  },
  Rebuttal: {
    status: "Missing",
    role: "An opposing view, raised and answered.",
    note: "No opposing view appears yet. What would someone who disagrees say first, and how would you answer them?",
  },
};

const threads = [
  { title: "Has your city tried fare-free buses? What actually changed?", angle: "Personal experience" },
  { title: "Free transit sounds good, but who pays for it?", angle: "Opposing view" },
  { title: "Is ticket price really what keeps people in their cars?", angle: "Questions the warrant" },
];

const tabs = ["1. Your essay", "2. Toulmin feedback", "3. Human discussions"];

const MindElevatorDemo = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Part>("Warrant");
  const current = feedback[selected];

  const node = (part: Part) => {
    const s = feedback[part].status;
    const on = selected === part;
    return (
      <button
        type="button"
        onClick={() => setSelected(part)}
        aria-pressed={on}
        className="w-full px-2 py-1.5 rounded text-xs sm:text-sm font-semibold border-2 transition-colors"
        style={{
          borderColor: s === "Missing" ? "hsl(var(--border))" : `hsl(${colour[part]})`,
          borderStyle: s === "Present" ? "solid" : "dashed",
          background: on ? `hsl(${colour[part]} / 0.15)` : "transparent",
          color: s === "Missing" ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))",
        }}
      >
        {part}
      </button>
    );
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-2 px-4 pt-3 border-b border-border bg-muted/40">
        <p className="font-semibold pb-2">Mind Elevator</p>
        <div className="flex flex-wrap" role="tablist" aria-label="Walkthrough steps">
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={step === i}
              onClick={() => setStep(i)}
              className={`px-3 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                step === i ? "border-primary text-primary" : "border-transparent text-foreground/65 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_20rem]">
        {/* Paper */}
        <div className="p-4 sm:p-6 bg-muted/20">
          <div className="mx-auto max-w-prose rounded-sm bg-[hsl(40_30%_98%)] text-[hsl(222_25%_16%)] shadow-sm px-6 py-8 sm:px-10">
            <p className="text-xs uppercase tracking-wider text-[hsl(222_10%_45%)] mb-4">Draft 1</p>
            <p className="font-serif text-lg leading-loose">
              {essay.map((seg, i) => {
                if (!seg.part || step === 0) return <span key={i}>{seg.text}</span>;
                const c = colour[seg.part];
                return (
                  <span
                    key={i}
                    style={{
                      textDecorationLine: "underline",
                      textDecorationColor: `hsl(${c})`,
                      textDecorationThickness: "3px",
                      textUnderlineOffset: "5px",
                      background: step === 1 && seg.part === selected ? `hsl(${c} / 0.18)` : "transparent",
                    }}
                  >
                    {seg.text}
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        {/* Margin */}
        <div className="p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-border" aria-live="polite">
          {step === 0 && (
            <div className="space-y-3 text-foreground/85">
              <p>The student picks a topic they know and writes an argumentative essay on their own.</p>
              <p>Mind Elevator reads the essay and looks for the six parts of an argument in Toulmin's model.</p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold"
              >
                Analyse the essay
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Argument structure</p>
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1 mb-1">
                {node("Grounds")}
                <span aria-hidden="true" className="text-muted-foreground">→</span>
                {node("Qualifier")}
                <span aria-hidden="true" className="text-muted-foreground">→</span>
                {node("Claim")}
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-1">
                <div className="col-span-3 flex flex-col items-center gap-1">
                  <span aria-hidden="true" className="text-xs text-muted-foreground">since</span>
                  <div className="w-2/3">{node("Warrant")}</div>
                  <span aria-hidden="true" className="text-xs text-muted-foreground">because</span>
                  <div className="w-2/3">{node("Backing")}</div>
                </div>
                <div />
                <div className="flex flex-col items-center gap-1">
                  <span aria-hidden="true" className="text-xs text-muted-foreground">unless</span>
                  {node("Rebuttal")}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Solid: present. Dashed: weak or missing.</p>

              <div className="mt-4 pl-3 border-l-4" style={{ borderColor: `hsl(${colour[selected]})` }}>
                <p className="font-semibold">
                  {selected} <span className="text-sm text-muted-foreground font-normal">· {current.status}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-1">{current.role}</p>
                <p className="text-foreground/90">{current.note}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                The feedback explains each part and asks questions. It does not supply facts or rewrite the text.
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-foreground/85 mb-3">
                The essay is matched by meaning to discussions written by people on Reddit.
              </p>
              <ul className="space-y-2">
                {threads.map((t) => (
                  <li key={t.title} className="rounded-md border border-border p-3">
                    <p className="text-xs text-muted-foreground mb-1">Reddit discussion · {t.angle}</p>
                    <p className="font-medium text-foreground/90 leading-snug">{t.title}</p>
                  </li>
                ))}
              </ul>
              <p className="text-foreground/85 mt-3">The student reads these perspectives, then writes Draft 2 on their own.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindElevatorDemo;
