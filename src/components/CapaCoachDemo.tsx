import { useState } from "react";
import { motion } from "framer-motion";

type Heading =
  | "What you do"
  | "What you could do"
  | "Personal factors"
  | "Social factors"
  | "Environmental factors"
  | "Resources"
  | "Goals and values"
  | "Hard-day minimum"
  | "Never suggest";

const headings: Heading[] = [
  "What you do",
  "What you could do",
  "Personal factors",
  "Social factors",
  "Environmental factors",
  "Resources",
  "Goals and values",
  "Hard-day minimum",
  "Never suggest",
];

const turns: { agent: string; person: string; adds: [Heading, string][] }[] = [
  {
    agent: "Let's start with your week. What does a usual weekday look like?",
    person: "I work from home nine to five. The kids are back by four and evenings are busy.",
    adds: [
      ["What you do", "works from home, nine to five"],
      ["Social factors", "kids home by four, busy evenings"],
    ],
  },
  {
    agent: "What kind of movement do you do now, or used to enjoy?",
    person: "I used to run. My knee doesn't bend far anymore, so I mostly walk.",
    adds: [
      ["What you do", "walks"],
      ["What you could do", "used to run"],
      ["Personal factors", "knee doesn't bend far"],
    ],
  },
  {
    agent: "What is around you that makes moving easier?",
    person: "There's a trail near the house, and a bike trainer set up in the living room.",
    adds: [
      ["Environmental factors", "trail near the house"],
      ["Resources", "bike trainer in the living room"],
    ],
  },
  {
    agent: "On a hard day, what is the least you could still manage?",
    person: "Ten minutes on the trainer while the kids do homework.",
    adds: [["Hard-day minimum", "ten minutes on the trainer"]],
  },
  {
    agent: "Is there anything a plan should never ask of you?",
    person: "No early mornings. I don't sleep well.",
    adds: [["Never suggest", "early mornings"]],
  },
  {
    agent: "Which day should we plan, and what would make it a good day for you?",
    person: "Thursday. I'd like to feel less stiff.",
    adds: [["Goals and values", "Thursday, feel less stiff"]],
  },
];

const chain = [
  { name: "Extract", desc: "Records answers under the profile headings, in the person's words." },
  { name: "Coverage", desc: "Finds what the profile still lacks and picks the next question." },
  { name: "Synthesis", desc: "Finds where the factors converge and where they conflict." },
  { name: "Plan", desc: "Writes the day's plan from the profile." },
];

type Slot = { time: string; text: string; clash?: string };

const plans: Record<"Baseline" | "Partial" | "Full", { uses: string; slots: Slot[] }> = {
  Baseline: {
    uses: "Chosen activity, day and weather only.",
    slots: [
      {
        time: "07:00",
        text: "Brisk 30-minute jog before work. The weather looks dry.",
        clash: "early morning, and running with a stiff knee",
      },
    ],
  },
  Partial: {
    uses: "Adds current activity, goals, resources, energy and obstacles.",
    slots: [
      { time: "12:30", text: "Walk for 30 minutes at lunchtime." },
      { time: "19:00", text: "Optional 15 minutes on the bike trainer.", clash: "evenings are busy" },
    ],
  },
  Full: {
    uses: "Uses everything in the profile.",
    slots: [
      { time: "12:30", text: "Walk the trail near the house for 25 minutes, keeping to the flat sections for your knee." },
      { time: "16:15", text: "Ten easy minutes on the living-room trainer while the kids do homework." },
      { time: "Fallback", text: "If the day goes wrong, the ten minutes on the trainer is enough." },
      { time: "Boundary", text: "Nothing scheduled in the early morning." },
    ],
  },
};

type PlanKey = keyof typeof plans;

const SYNTHESIS = turns.length;
const PLAN = turns.length + 1;

const CapaCoachDemo = () => {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<PlanKey>("Full");

  const shown = turns.slice(0, Math.min(step + 1, turns.length));
  const profile = new Map<Heading, string[]>();
  shown.forEach((t) => t.adds.forEach(([h, v]) => profile.set(h, [...(profile.get(h) ?? []), v])));
  const latest = new Set(step < SYNTHESIS ? turns[step].adds.map(([h]) => h) : []);
  const active = step < SYNTHESIS ? [0, 1] : step === SYNTHESIS ? [2] : [3];

  const nextLabel =
    step < SYNTHESIS - 1 ? "Next turn" : step === SYNTHESIS - 1 ? "Synthesise" : step === SYNTHESIS ? "Write plan" : "Start again";

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      {/* Prompt chain */}
      <ol className="flex flex-wrap sm:flex-nowrap items-stretch gap-2 p-3 border-b border-border bg-accent/5" aria-label="Prompt chain">
        {chain.map((c, i) => {
          const on = active.includes(i);
          return (
            <li key={c.name} className="flex items-center gap-2 basis-[calc(50%-0.25rem)] sm:basis-0 sm:flex-1">
              <div className={`flex-1 h-full rounded-lg px-3 py-2 border ${on ? "border-accent bg-accent/15" : "border-border"}`}>
                <p className={`text-sm font-semibold ${on ? "text-accent" : "text-foreground/70"}`}>
                  <span className="inline-flex w-5 h-5 mr-1.5 items-center justify-center rounded-full border border-current text-xs">
                    {i + 1}
                  </span>
                  {c.name}
                </p>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{c.desc}</p>
              </div>
              {i < chain.length - 1 && (
                <span aria-hidden="true" className="hidden sm:inline text-muted-foreground">→</span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="grid lg:grid-cols-[1fr_19rem]">
        {/* Main column: chat, synthesis, or plan */}
        <div className="p-4 sm:p-5 min-h-[22rem] flex flex-col" aria-live="polite">
          {step < SYNTHESIS && (
            <ul className="space-y-3 flex-1">
              {shown.map((t, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5">
                    <p className="text-xs font-semibold text-accent mb-0.5">CapaCoach</p>
                    <p className="text-foreground/90 leading-snug">{t.agent}</p>
                  </div>
                  <div className="max-w-[85%] ml-auto rounded-2xl rounded-tr-sm bg-accent text-accent-foreground px-4 py-2.5">
                    <p className="leading-snug">{t.person}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}

          {step === SYNTHESIS && (
            <div className="flex-1">
              <p className="text-lg font-semibold mb-3">Where the profile converges and conflicts</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-accent mb-1">Converges</p>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/85">
                    <li>Trail near the house, walking, and a free midday point to a lunchtime walk.</li>
                    <li>The trainer and the homework hour fit the hard-day minimum.</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive mb-1">Conflicts</p>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/85">
                    <li>Busy evenings and no early mornings leave only midday and late afternoon.</li>
                    <li>The knee rules out running and steep sections.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === PLAN && (
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-1 mb-3 p-1 rounded-lg bg-muted w-fit" role="group" aria-label="Plan version">
                {(Object.keys(plans) as PlanKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setPlan(k)}
                    aria-pressed={plan === k}
                    className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
                      plan === k ? "bg-card text-foreground shadow-sm" : "text-foreground/65"
                    }`}
                  >
                    {k} profile
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{plans[plan].uses}</p>
              <p className="text-lg font-semibold mb-2">Thursday</p>
              <ol className="relative border-l-2 border-accent/40 ml-2 space-y-4">
                {plans[plan].slots.map((s) => (
                  <li key={s.text} className="pl-4 relative">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent" aria-hidden="true" />
                    <p className="text-sm font-semibold text-accent">{s.time}</p>
                    <p className="text-foreground/90">{s.text}</p>
                    {s.clash && <p className="text-sm text-destructive mt-0.5">Ignores the profile: {s.clash}</p>}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-5 pt-3 border-t border-border flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-4 py-2 rounded-full border border-border text-sm font-semibold disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => (s === PLAN ? 0 : s + 1))}
              className="ml-auto px-5 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold"
            >
              {nextLabel}
            </button>
          </div>
        </div>

        {/* Profile sidebar */}
        <aside aria-label="Capability profile" className="p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-border bg-muted/30">
          <p className="font-semibold">Capability profile</p>
          <p className="text-xs text-muted-foreground mb-3">Visible to the person and open to correction.</p>
          <ul className="space-y-2">
            {headings.map((h) => {
              const vals = profile.get(h);
              return (
                <li
                  key={h}
                  className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${latest.has(h) ? "bg-accent/15" : ""}`}
                >
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className={`w-2 h-2 rounded-full ${vals ? "bg-accent" : "border border-muted-foreground/50"}`}
                    />
                    {h}
                  </p>
                  {vals ? (
                    vals.map((v) => (
                      <p key={v} className="pl-4 text-foreground">
                        {v}
                      </p>
                    ))
                  ) : (
                    <p className="pl-4 text-muted-foreground/60">not yet asked</p>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CapaCoachDemo;
