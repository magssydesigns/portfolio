export type Category = "Mobile" | "Systems" | "AI Workflows";

export type Metric = {
  label: string;
  value: string;
};

export type ProcessSection = {
  title: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  year: string;
  categories: Category[];
  summary: string;
  role: string;
  timeline: string;
  team: string;
  tools: string;
  index: string;
  cover: {
    from: string;
    to: string;
  };
  overview: string;
  problem: string;
  process: ProcessSection[];
  outcomes: Metric[];
  reflection: string;
  featured: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ledger",
    title: "Ledger",
    client: "A fintech scale-up",
    year: "2025",
    categories: ["Mobile", "Systems"],
    summary:
      "Rebuilding a banking app's core flows around trust, clarity, and speed — from onboarding to everyday money movement.",
    role: "Lead Product Designer",
    timeline: "8 months",
    team: "2 designers, 6 engineers, 1 PM",
    tools: "Figma, Arc, Claude for research synthesis",
    index: "01",
    cover: { from: "#1f2a1a", to: "#0f1410" },
    overview:
      "Ledger's mobile app had grown feature-by-feature for six years. Every release added a flow, a modal, a badge — and by the time I joined, the core journeys that mattered most (checking a balance, moving money, resolving a dispute) were buried under everything that mattered less. The mandate was simple to say and hard to do: rebuild the experience around the handful of moments that carried the whole relationship.",
    problem:
      "Support tickets showed the same pattern for eighteen months straight: users couldn't tell if a transfer had gone through, didn't understand why a card was declined, and abandoned onboarding at the identity-verification step at a rate of 41%. The interface wasn't broken in any single screen — it was broken in the seams between screens, where state, timing, and trust needed to be communicated and weren't.",
    process: [
      {
        title: "Mapping trust, not just flow",
        body: "I started by tracing every point where the product asked a user to trust it without evidence — a pending transfer, an unverified identity, a silent background check. We rebuilt the information architecture around these trust moments first, then fit the rest of the app around them, rather than the reverse.",
      },
      {
        title: "A systems approach to state",
        body: "Money movement has more states than most interfaces admit: pending, processing, held, partially failed, reversed. I designed a shared state model with engineering before touching visual design, so every screen could tell the truth about where a transaction actually stood.",
      },
      {
        title: "Verification as a relationship, not a gate",
        body: "The identity-verification redesign reframed the step as the bank explaining itself, not interrogating the user — showing why each piece of information was needed, in plain language, before asking for it.",
      },
    ],
    outcomes: [
      { label: "Onboarding completion", value: "+34%" },
      { label: "Support tickets on transfer status", value: "−58%" },
      { label: "Time to first transfer", value: "−41%" },
    ],
    reflection:
      "The work that mattered most here was invisible in the final screens — a shared state model that let design and engineering describe the same reality. Most of the perceived 'redesign' was really a rewrite of what the interface was allowed to say.",
    featured: true,
  },
  {
    slug: "atlas",
    title: "Atlas Design System",
    client: "An enterprise logistics platform",
    year: "2024",
    categories: ["Systems"],
    summary:
      "A design system for a 40-engineer platform team, built to survive four product lines and three years of change without another rebuild.",
    role: "Design Systems Lead",
    timeline: "11 months, ongoing",
    team: "3 designers, 1 design technologist, rotating engineers",
    tools: "Figma, Style Dictionary, Storybook",
    index: "02",
    cover: { from: "#2a2420", to: "#131110" },
    overview:
      "Four product teams had each built their own version of a data table, a filter panel, a status badge. None were wrong on their own — they were just built in isolation, under deadline, by people solving the same problem for the third time. Atlas started as a component library and became something closer to a shared language.",
    problem:
      "Engineering estimated that inconsistent components were costing roughly 15% of front-end development time in re-solved problems: re-built date pickers, re-argued spacing, re-tested accessibility that had already been tested twice elsewhere. Design had no shared vocabulary either — 'primary button' meant four different things across four Figma files.",
    process: [
      {
        title: "Auditing before naming",
        body: "Before drawing a single new component, I catalogued every existing pattern across all four products — 214 distinct components with overlapping purposes. This became the actual scope document; it made the size of the problem legible to stakeholders who had only seen their own corner of it.",
      },
      {
        title: "Tokens as the contract",
        body: "Rather than starting from components, I started from tokens — color, spacing, type, motion — because tokens are what let a system flex across four product surfaces without forking. Components were built as compositions of tokens from day one, which made later theming trivial instead of architectural.",
      },
      {
        title: "Governance as a design artifact",
        body: "A system dies from unclear ownership, not bad components. I designed the contribution model — who can propose, who can approve, how deprecation works — with as much care as the components themselves, and documented it inside the system, not in a separate wiki no one reads.",
      },
    ],
    outcomes: [
      { label: "Component reuse across products", value: "12% → 78%" },
      { label: "Front-end build time on new screens", value: "−45%" },
      { label: "Accessibility violations in audit", value: "−90%" },
    ],
    reflection:
      "Design systems are organizational work wearing a visual costume. The components were the easy part; the hard part was building a decision-making structure that four competing product teams would actually defer to.",
    featured: true,
  },
  {
    slug: "second-opinion",
    title: "Second Opinion",
    client: "A healthcare claims platform",
    year: "2025",
    categories: ["AI Workflows", "Systems"],
    summary:
      "An AI-assisted review tool that lets claims specialists work with a model instead of around one — designed for trust, not automation theater.",
    role: "Senior Product Designer, AI Experience",
    timeline: "6 months",
    team: "1 designer, 1 researcher, 4 engineers, 1 ML lead",
    tools: "Figma, Claude, internal eval harness",
    index: "03",
    cover: { from: "#241e2b", to: "#100e14" },
    overview:
      "Second Opinion surfaces a model's read on a complex insurance claim alongside a specialist's own judgment — not to replace the decision, but to make the specialist faster and harder to fool by an inconsistent claim. The central design problem wasn't the model. It was building an interface specialists would actually trust enough to use under pressure.",
    problem:
      "An earlier version of this tool auto-flagged claims with a confidence score and a single recommendation. Specialists ignored it within three weeks — either over-trusting it on cases it was wrong about, or dismissing it entirely after one bad flag. A confidence percentage, it turned out, communicates nothing about why a model thinks what it thinks.",
    process: [
      {
        title: "Designing for calibration, not confidence",
        body: "I replaced the single confidence score with a structured explanation: which specific claim details the model weighed, which precedent cases it was pattern-matching against, and where it explicitly had low signal. This gave specialists something to argue with, rather than something to obey or ignore.",
      },
      {
        title: "Making disagreement a first-class action",
        body: "The interface treats a specialist overriding the model as normal, well-supported behavior — not an edge case bolted on afterward. Overrides are captured with a lightweight reason, which became a feedback loop the ML team used for targeted retraining.",
      },
      {
        title: "Prototyping directly against the model",
        body: "Rather than designing against static mocks, I built working prompt-driven prototypes early and tested them against real historical claims with specialists in the room, so interface decisions were grounded in how the model actually behaved, not how we assumed it would.",
      },
    ],
    outcomes: [
      { label: "Specialist adoption after 90 days", value: "91%" },
      { label: "Average review time per claim", value: "−37%" },
      { label: "Override rate (healthy disagreement)", value: "22%" },
    ],
    reflection:
      "The interesting design problem in AI products is rarely the model — it's building enough legible structure around its output that a skilled human can disagree with it efficiently. Trust is a UI problem before it's a capability problem.",
    featured: true,
  },
  {
    slug: "northwind-health",
    title: "Northwind Health",
    client: "A digital primary care provider",
    year: "2023",
    categories: ["Mobile"],
    summary:
      "A patient app redesign that cut appointment scheduling from six screens to two, without removing any of the clinical safeguards.",
    role: "Senior Product Designer",
    timeline: "5 months",
    team: "2 designers, 5 engineers",
    tools: "Figma, UserTesting, Amplitude",
    index: "04",
    cover: { from: "#152329", to: "#0c1416" },
    overview:
      "Booking a same-day appointment required six screens, three of which existed purely to satisfy internal clinical triage logic that patients neither needed nor wanted to see. The redesign moved that logic behind the interface instead of through it.",
    problem:
      "36% of patients abandoned scheduling after the second screen. Interviews revealed most weren't confused — they were tired of answering questions that felt irrelevant to 'I have a fever and need to see someone today.'",
    process: [
      {
        title: "Separating triage logic from triage UI",
        body: "Clinical triage still needed every data point it collected before. The fix wasn't removing questions — it was moving most of them off the critical path, inferred from context or asked conversationally after a provider was already found.",
      },
      {
        title: "Designing for urgency as a variable",
        body: "A patient scheduling a routine check-up and a patient with acute symptoms have entirely different tolerance for friction. I designed two divergent paths from a single entry point rather than one compromise flow serving neither well.",
      },
    ],
    outcomes: [
      { label: "Scheduling completion", value: "+52%" },
      { label: "Screens to book (urgent path)", value: "6 → 2" },
      { label: "Patient satisfaction (CSAT)", value: "+18 pts" },
    ],
    reflection:
      "Most flows don't need fewer steps — they need the right steps to happen at the right time for the right person. Compression without segmentation just hides complexity instead of resolving it.",
    featured: false,
  },
  {
    slug: "drafting-room",
    title: "Drafting Room",
    client: "Internal tool, personal R&D",
    year: "2024",
    categories: ["AI Workflows"],
    summary:
      "A self-directed exploration into an AI-assisted design workflow — using structured prompting and rapid critique loops to compress early-stage exploration from days to hours.",
    role: "Designer & Builder",
    timeline: "Ongoing",
    team: "Solo",
    tools: "Claude, Figma, a small internal CLI",
    index: "05",
    cover: { from: "#2b2015", to: "#14100a" },
    overview:
      "Drafting Room started as a personal question: what does early-stage design exploration look like when a model can generate and critique variations as fast as I can describe constraints? It became a working method, detailed further on the AI workflow page, and the source of the process now used across client engagements.",
    problem:
      "Early-stage exploration is where the most design judgment gets exercised and the least of it gets documented — dozens of directions considered and discarded in a designer's head before anything is shown. That reasoning is valuable and almost always lost.",
    process: [
      {
        title: "Externalizing the critique loop",
        body: "Instead of silently generating and discarding options, I built a structured back-and-forth with a model acting as a rigorous first-pass critic — surfacing the same reasoning a senior peer review would, but available at 2am on the fourth iteration.",
      },
      {
        title: "Constraints before generation",
        body: "The workflow front-loads writing down real constraints — technical, accessibility, brand, business — as text before any visual generation happens, which made the model's output dramatically more useful and the eventual human design work faster to evaluate.",
      },
    ],
    outcomes: [
      { label: "Time to first reviewable concept", value: "−70%" },
      { label: "Documented rationale per concept", value: "Every option" },
    ],
    reflection:
      "The workflow doesn't replace design judgment — it front-loads the articulation of constraints that judgment depends on, which turned out to be the actual bottleneck.",
    featured: false,
  },
];

export function getAllCaseStudies() {
  return caseStudies;
}

export function getFeaturedCaseStudies() {
  return caseStudies.filter((c) => c.featured);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacentCaseStudy(slug: string) {
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  return next;
}

export const categories: Category[] = ["Mobile", "Systems", "AI Workflows"];
