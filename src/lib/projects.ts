export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type ProjectVideo = {
  src: string;
  width: number;
  height: number;
  poster?: string;
};

/** A hero image that may still be a placeholder awaiting a final asset. */
export type StandardHeroImage = ProjectImage | { kind: "placeholder"; label: string };

/** A hero image, or an interactive prototype embed shown in the hero position. */
export type ProjectHeroImage = StandardHeroImage | { kind: "embed"; src: string; title: string };

/** A media slot that may still be a placeholder awaiting a final asset. */
export type MediaSlot =
  | { kind: "image"; image: ProjectImage }
  | { kind: "video"; video: ProjectVideo; alt: string }
  | { kind: "placeholder"; label: string };

export type Block =
  | { kind: "lead"; id?: string; spacing?: "tight"; items: { label: string; body: string }[] }
  | { kind: "heading"; id?: string; text: string; tone?: "dark" | "light"; spacing?: "tight"; paddingBottom?: number }
  | { kind: "statement"; id?: string; text: string; tone?: "dark" | "light" }
  | { kind: "numbered"; id?: string; heading?: string; intro?: string; showArrow?: boolean; spacing?: "tight"; paddingTop?: number; paddingBottom?: number; items: { title: string; body: string }[] }
  | { kind: "image"; id?: string; image: ProjectImage; size?: "medium" | "wide" | "full" }
  | { kind: "beforeAfterStats"; id?: string; heading?: string; items: { label: string; before: string; after: string; description: string }[] }
  | { kind: "quote"; id?: string; heading?: string; text: string; attribution?: string }
  | { kind: "steps"; id?: string; heading?: string; spacing?: "tight"; items: { title: string; body: string }[] }
  | { kind: "twoCol"; id?: string; heading?: string; spacing?: "tight"; items: { label: string; body: string }[] }
  | { kind: "mediaNumbered"; id?: string; heading?: string; media: MediaSlot; items: { title: string; body: string }[] }
  | { kind: "beforeAfterImages"; id?: string; heading?: string; spacing?: "tight"; items: { label: string; media: MediaSlot }[] }
  /** Scoped, additive kinds used by the Send case study's full-case-study rebuild. */
  | { kind: "divider" }
  | { kind: "richText"; id?: string; heading?: string; headingLevel?: "h2" | "h3"; paragraphs: string[]; paddingTop?: number; paddingBottom?: number }
  | { kind: "arrowList"; id?: string; heading?: string; bold?: boolean; paddingTop?: number; items: string[] }
  | {
      kind: "media";
      id?: string;
      media: MediaSlot;
      caption?: string;
      width?: "reduced" | "reduced-40" | "reduced-70";
      bordered?: boolean;
      link?: { href: string; label: string; size?: number };
    }
  | { kind: "validationItem"; id?: string; question: string; status: "success" | "warning"; finding: string; update: string }
  | { kind: "stats"; id?: string; heading?: string; items: { value: string; label: string }[]; bullets?: string[] }
  | {
      kind: "metrics";
      id?: string;
      intro?: string;
      items: { title: string; definition: string; whyItMatters: string }[];
    };

export type ProjectAtAGlanceData = {
  role: string;
  roleDescription?: string;
  scope: string;
  /** Omit when there's no contribution note to show - the row is hidden cleanly, no empty column. */
  contribution?: string;
  /** Omit when there's no core team to show (e.g. a solo project) - the row is hidden cleanly if collaborationTeams is also absent. */
  coreTeam?: string;
  /** Defaults to "Collaboration teams" (e.g. "Collaboration with" for the brand-refresh archive projects). */
  collaborationLabel?: string;
  /** Omit when there's no collaboration to show (e.g. a solo project) - the row is hidden cleanly if coreTeam is also absent. */
  collaborationTeams?: string;
  /** Omit when there's no user-group information to show - the row is hidden cleanly, no empty column. */
  users?: string;
  /** Omit when there's no project-stage information to show - the row is hidden cleanly, no empty column. */
  stage?: string;
  /** Omit when there's no "what I'm focused on right now" note to show - the row is hidden cleanly, no empty column. */
  currentFocus?: string;
  /** Omit when there's no market information to show - the row is hidden cleanly, no empty column. */
  markets?: string;
  /** Omit when there's no platform information to show - the row is hidden cleanly, no empty column. */
  platforms?: string;
};

export type QuickRead = {
  tagline: string;
  /** A placeholder can stand in for a not-yet-final hero image. Omit entirely for a text-only hero (e.g. when the hero media is shown elsewhere on the page). */
  heroImage?: ProjectHeroImage;
  heroVideo?: ProjectVideo;
  summaryLabel?: string;
  challenge: string[];
  bulletedChallenge?: boolean;
  role?: string;
  /** Drives the "Project at a glance" split section (Role, Scope / Core team, Collaboration / optional Platforms). */
  roleDetails?: ProjectAtAGlanceData;
  goals?: { label?: string; items: string[] };
  constraints?: string[];
  constraintsLabel?: string;
  process?: { intro?: string; items: string[] };
  challenges?: { intro?: string; items: string[] };
  midMedia?: MediaSlot;
  keyDecisionsLabel?: string;
  keyDecisions?: string[];
  outcomes: { value: string; label: string }[];
  /** Bold arrow-prefixed bullets rendered in the "Key outcomes" section of the split (roleDetails) layout. */
  keyOutcomeBullets?: string[];
  qualitative?: { title?: string; body: string }[];
  impactStats?: { items: { label: string; before: string; after: string; description: string }[] };
  impactQuote?: { label?: string; text: string; attribution?: string };
};

export type TocEntry = { id: string; label: string };

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  color: string;
  heroBackground?: string;
  /** Renders the hero image centered above the title/tagline (like a video hero) instead of side-by-side. */
  heroStacked?: boolean;
  /** Optional "Markets" caption + flag row shown under the hero tagline (video hero only). */
  heroMarkets?: { label: string; flags: { emoji: string; name: string }[] };
  /** Overrides the stacked hero image's max-width in px (default 614.797). */
  heroImageMaxWidth?: number;
  /** Renders the shared Divider directly below the hero, before the Quick Read section begins. */
  heroDividerBelow?: boolean;
  /** Drops the hero's bottom padding (like heroDividerBelow) without inserting a divider - for a flat px gap owned entirely by the next section's top padding. */
  heroFlushBottom?: boolean;
  darkText?: boolean;
  /** Renders the standalone "Project at a glance" section below the hero, before the Quick Read/full case study content. */
  projectAtAGlance?: ProjectAtAGlanceData;
  /** Exact px gap above "Project at a glance" - pairs with heroFlushBottom to hit a flat rhythm regardless of breakpoint. */
  glancePaddingTop?: number;
  /** Inserts a SectionDivider between "Project at a glance" and the Quick summary/Quick read section that follows (and zeroes the glance section's own bottom padding so the divider owns the full 32px rhythm). */
  glanceDividerBelow?: boolean;
  /** Renders an interactive prototype embed between "Project at a glance" and "Quick summary" (e.g. when the hero itself is text-only). */
  midEmbed?: { src: string; title: string };
  quickRead: QuickRead;
  fullCaseStudy: Block[];
  /** Presence of this field opts the project into the reveal-on-click + sticky TOC behaviour. */
  toc?: TocEntry[];
  /** Promotes QuickRead's section labels to full h2s (only applies to the non-toc, non-roleDetails layout). */
  quickReadHeadingStyle?: "sidebar" | "heading";
  /** For projects meant to read as one continuous page: hides QuickRead's "Continue reading..." link/button and the "Full case study" label above the blocks below it. */
  hideContinueLink?: boolean;
};

export const projects: Project[] = [
  {
    slug: "scaling-parcel-tracking",
    title: "Scaling parcel tracking across European markets",
    shortTitle: "Scaling parcel tracking",
    client: "InPost",
    color: "#F7D60F",
    heroBackground: "#F8F4EE",
    heroMarkets: {
      label: "Markets",
      flags: [
        { emoji: "🇵🇱", name: "Poland" },
        { emoji: "🇫🇷", name: "France" },
        { emoji: "🇬🇧", name: "UK" },
        { emoji: "🇮🇹", name: "Italy" },
        { emoji: "🇪🇸", name: "Spain" },
        { emoji: "🇵🇹", name: "Portugal" },
      ],
    },
    projectAtAGlance: {
      role: "Lead Product Designer",
      scope:
        "End-to-end UX and UI for a scalable parcel-tracking experience across multiple European markets, including research, prototyping and usability testing.",
      coreTeam: "Product Manager • Engineering",
      collaborationLabel: "Collaboration teams",
      collaborationTeams: "Local market teams • UX Research • Customer Experience",
      platforms: "iOS • Android",
    },
    toc: [
      { id: "quick-summary", label: "Quick Summary" },
      { id: "process", label: "Process" },
      { id: "impact", label: "Impact" },
      { id: "business-objectives", label: "Business Objectives" },
      { id: "research-insights", label: "Research Insights" },
      { id: "design-changes", label: "Design changes" },
      { id: "before-and-after", label: "Before and after" },
    ],
    quickRead: {
      tagline:
        "Designed a scalable multi-market parcel tracking experience across European delivery flows",
      heroImage: {
        src: "/projects/scaling-parcel-tracking/hero.png",
        width: 378,
        height: 915,
        alt: "InPost parcel tracking detail screen showing a map, pickup status, and locker QR code",
      },
      heroVideo: {
        src: "/projects/scaling-parcel-tracking/scene.mp4",
        width: 1440,
        height: 1080,
      },
      bulletedChallenge: false,
      challenge: [
        "InPost needed to scale its Polish parcel-tracking experience across the UK, France and Italy. Research revealed meaningful differences in delivery models, customer expectations and operational requirements, making direct localisation unsuitable. I led the cross-market design work to create a unified tracking experience that improved clarity for customers while establishing scalable patterns for future market expansion.",
      ],
      process: {
        intro:
          "I worked with stakeholders across four markets to understand differences in delivery journeys, carrier operations and customer expectations. Through journey mapping, research with 40 participants and iterative validation, I identified the shared patterns and local flexibility required for a scalable tracking experience.",
        items: [
          "Map market journeys",
          "Research with 40 users",
          "Define shared patterns",
          "Validate across markets",
          "Refine",
        ],
      },
      midMedia: {
        kind: "video",
        video: {
          src: "/projects/scaling-parcel-tracking/mobile-app-showcase-1.mp4",
          width: 1412,
          height: 1080,
        },
        alt: "InPost parcel tracking experience shown in context",
      },
      keyDecisions: [
        "Created a shared system for parcel states and delivery communication across markets",
        "Prioritised ETA, pickup location and the customer's next action",
        "Designed reusable tracking patterns that could accommodate local delivery differences",
      ],
      outcomes: [],
      qualitative: [
        {
          title: "Faster decision-making",
          body: "Users identified next actions more quickly during delivery and pickup journeys",
        },
        {
          title: "More scalable product foundation",
          body: "Created reusable tracking patterns that supported future international expansion",
        },
        {
          title: "Improved clarity and trust",
          body: "Reduced ambiguity around parcel states, pickup timing, and delivery expectations",
        },
      ],
      impactStats: {
        items: [
          {
            label: "About delivery address",
            before: "50%",
            after: "0%",
            description: "of users reported that this information is “unavailable” or not easy enough to find.",
          },
          {
            label: "About sender details",
            before: "33%",
            after: "0%",
            description: "of users reported that this information is “unavailable” or not easy enough to find.",
          },
          {
            label: "Hierarchy of the Parcel Details page",
            before: "66%",
            after: "33%",
            description: "of users generally mentioned “issues with the hierarchy” of information on the Parcel Details page.",
          },
        ],
      },
      impactQuote: {
        label: "What users said",
        text: "This seems to be more comprehensive in terms of details\nof features when compared to major firm parcel apps\nI've seen in the UK",
      },
    },
    fullCaseStudy: [
      {
        kind: "numbered",
        id: "business-objectives",
        heading: "Business Objectives",
        showArrow: true,
        items: [
          {
            title: "Reduce development and maintenance costs",
            body: "by unifying parcel tracking interfaces across markets, minimizing duplicate design and engineering work.",
          },
          {
            title: "Gather actionable cross-market user data",
            body: "through a standardized interface, enabling more effective product decisions based on consistent metrics.",
          },
          {
            title: "Increase customer satisfaction and retention",
            body: "by providing a more intuitive, consistent tracking experience that addresses key pain points.",
          },
        ],
      },
      {
        kind: "numbered",
        id: "research-insights",
        heading: "Research Insights",
        showArrow: true,
        intro:
          "I prepared UX Research Plan to conduct survey and usability test on existing Polish app. The Research was conducted on 10 users from each market (Poland, France, UK, Italy). Test included survey part and prototype part where users performed tasks on prototypes on existing app.",
        items: [
          {
            title: "Make parcel tracking visual and simple",
            body: "Users prefer clear, visual timelines with easy-to-understand steps - not technical jargon like 'heading off to warehouse.'",
          },
          {
            title: "Be transparent about delays",
            body: "Users appreciate seeing delays in real time - even when things go wrong.",
          },
          {
            title: "Prioritize ETA and status",
            body: "Across markets, ETA ranks highest in importance, followed by pickup address and parcel status.",
          },
          {
            title: "De-emphasize package ID details",
            body: "Parcel numbers matter, but users focus more on delivery status and pickup info.",
          },
          {
            title: "Include clear, step-by-step pickup instructions",
            body: "Guided collection steps make users feel confident and informed.",
          },
          {
            title: "Give more prominence to the pick up location and mention collection requirements",
            body: "eg. is signature/ID needed, opening hours of the pickup point",
          },
        ],
      },
      {
        kind: "heading",
        id: "design-changes",
        text: "Design changes",
      },
      {
        kind: "mediaNumbered",
        heading: "New design: parcel list",
        media: {
          kind: "image",
          image: {
            src: "/projects/scaling-parcel-tracking/parcel-list-annotated.png",
            width: 2543,
            height: 11788,
            alt: "Redesigned parcel list showing out for delivery, ready to collect, redirected, and delivered states, annotated 1 to 9",
          },
        },
        items: [
          {
            title: "1. Labels",
            body: "Clear labels added for communicating most important actions for the users (eg. out for delivery, redirected parcel).",
          },
          {
            title: "2. Location Prominence",
            body: "Location information added on the list as it was described as missing by users.",
          },
          {
            title: "3. Key action button",
            body: "There's been added button next to the location (in this case home address) when the parcel can be managed (redirected, left in safe place or delivered on another day).",
          },
          {
            title: "4. Key action button - open remotely",
            body: "Open remotely button stayed in the same position as it's been used by users significantly.",
          },
          {
            title: "5. Clear number of parcels",
            body: "Clear number of parcels for multiparcel has been added on the card. Multiparcel was proven to be a new and unfamiliar concept on different markets. Thanks to this number it's more understandable for users.",
          },
          {
            title: "6. Directions button",
            body: "Directions button is placed next to address for quick access to Google Maps and navigating to desired locker.",
          },
          {
            title: "7. Colours adjusted",
            body: "All 'open remotely' buttons are being kept yellow for consistency. The time bar changes colour from yellow to black (and red when collection is nearing the limit). This is to make it more prominent and stand out from the yellow buttons more.",
          },
          {
            title: "8. Shipped label",
            body: "Exact shipping time has been mentioned by users as key information therefore it has been placed on the card.",
          },
          {
            title: "9. Archive button",
            body: "Archive button appears on delivered parcels. It helps to manage the parcel on the list faster and makes delivered parcels to stand out more.",
          },
        ],
      },
      {
        kind: "mediaNumbered",
        heading: "New design: parcel details page",
        media: {
          kind: "image",
          image: {
            src: "/projects/scaling-parcel-tracking/parcel-info-annotated.png",
            width: 2471,
            height: 13155,
            alt: "Redesigned parcel details page with map, locker QR code, and pickup instructions, annotated 1 to 8",
          },
        },
        items: [
          {
            title: "1. Tracking Number Placement",
            body: "Give tracking number less prominence but place it at the top of the page to still provide parcel identification.",
          },
          {
            title: "2. Location Prominence",
            body: "Location more prominent with map and Directions button included.",
          },
          {
            title: "3. Information Clustering",
            body: "Cluster important information on one component, use tracking component as a way to communicate most recent and any immediate action that needs to be taken next to the status.",
          },
          {
            title: "4. Progressive Disclosure",
            body: "Full tracking details are available upon clicking 'view details'.",
          },
          {
            title: "5. Clear section headers",
            body: "Add clear headers for the sections of the page to divide information more clearly. This helps especially when the pages are really long and helps to find information easier.",
          },
          {
            title: "6. Instructive Headers",
            body: "Keep the headers instructive like 'collect at' or 'scan at the locker' to emphasize better what user needs to do.",
          },
          {
            title: "7. Parcel Details",
            body: "Keep full parcel details lower down the page.",
          },
          {
            title: "8. Instructions Component",
            body: "Add component with instructions on eg. how to pick up.",
          },
        ],
      },
      {
        kind: "beforeAfterImages",
        id: "before-and-after",
        heading: "Before and after",
        items: [
          {
            label: "Before",
            media: {
              kind: "image",
              image: {
                src: "/projects/scaling-parcel-tracking/parcel-list-before.png",
                width: 2044,
                height: 9745,
                alt: "Before: the old “Shipment tracking” parcel list screen",
              },
            },
          },
          {
            label: "After",
            media: {
              kind: "image",
              image: {
                src: "/projects/scaling-parcel-tracking/parcel-list-after.png",
                width: 2044,
                height: 11789,
                alt: "After: the redesigned “Parcel tracking” parcel list screen",
              },
            },
          },
        ],
      },
    ],
  },
  {
    slug: "rapid-uk-launch",
    title: "0 → 1: Launching InPost's UK parcel tracking app",
    shortTitle: "Rapid UK app launch",
    client: "InPost",
    color: "#3355FF",
    heroBackground: "#F8F4EE",
    heroStacked: true,
    heroImageMaxWidth: 922.2,
    heroFlushBottom: true,
    glancePaddingTop: 32,
    glanceDividerBelow: true,
    projectAtAGlance: {
      role: "Lead Product Designer",
      scope:
        "Worked closely with the Product Manager to define the scope of the UK app. I redesigned key flows based on the legacy Polish product, prioritised high-value UX enhancements and created a new design system for the UK experience.",
      coreTeam: "Product Manager • Engineering",
      collaborationLabel: "Collaboration teams",
      collaborationTeams: "Marketing • Customer Experience",
      platforms: "iOS • Android",
    },
    toc: [
      { id: "quick-summary", label: "Quick Summary" },
      { id: "impact", label: "Impact" },
      { id: "the-challenge", label: "The challenge" },
      { id: "business-goals", label: "Business goals" },
      { id: "final-experience", label: "Final experience" },
      { id: "design-process", label: "Design process" },
      { id: "audit-insights", label: "Audit & insights" },
      { id: "key-design-decisions", label: "Key design decisions" },
      { id: "design-system-rebuild", label: "Design-system rebuild" },
      { id: "validation-refinement", label: "Validation and refinement" },
      { id: "outcome", label: "Outcome" },
      { id: "reflection", label: "Reflection" },
    ],
    quickRead: {
      tagline:
        "Redesigned and localised a legacy Polish app for the UK market while unifying the design system, resolving accessibility issues, and defining a phased product roadmap.",
      heroImage: {
        src: "/projects/rapid-uk-launch/App-launch.png",
        width: 15092,
        height: 11892,
        alt: "InPost UK app onboarding, locker map and parcel tracking screens shown on three phones",
      },
      bulletedChallenge: false,
      role:
        "InPost planned to launch its successful Polish consumer app in the UK within three months. Rather than redesigning the product from scratch, the challenge was to localise and modernise a legacy experience while working within the constraints of an outdated architecture and an evolving product strategy.",
      challenge: [
        "I led the UX and design system work, auditing the existing product, defining a phased roadmap, rebuilding the design system, and redesigning key customer journeys to create a scalable foundation for future releases.",
      ],
      midMedia: {
        kind: "video",
        video: {
          src: "/projects/rapid-uk-launch/onboarding.mp4",
          width: 1412,
          height: 1080,
        },
        alt: "UK onboarding experience walkthrough with refreshed brand and motion",
      },
      keyDecisions: [
        "New onboarding experience with motion + visual refresh",
        "Redesigned parcel tracking components for clarity & hierarchy",
        "Capacity checker for lockers integrated into map view",
        "Brand adapted for UK market (colours, typography, tone)",
        "Accessibility fixes to reach WCAG AA contrast levels",
      ],
      outcomes: [],
      qualitative: [
        {
          title: "Launched on time",
          body: "UK app launched on time within the 3-month deadline",
        },
        {
          title: "Design system adopted",
          body: "New design system adopted by design and dev teams, used as the base for future releases",
        },
        {
          title: "Accessibility improved",
          body: "Accessibility improved from non-compliant to WCAG AA contrast",
        },
        {
          title: "Reduced UI debt",
          body: "Reduced UI debt and increased delivery speed for next sprints",
        },
        {
          title: "Clean first release",
          body: "First release shipped without critical UX issues, enabling faster iteration instead of rebuild delays",
        },
      ],
      impactStats: {
        items: [
          {
            label: "Text styles",
            before: "40+",
            after: "12",
            description: "fragmented text styles consolidated into a semantic type scale.",
          },
          {
            label: "Colour tokens",
            before: "60+",
            after: "16",
            description: "colour tokens consolidated and renamed by function, with dark mode built in.",
          },
        ],
      },
    },
    fullCaseStudy: [
      {
        kind: "richText",
        id: "the-challenge",
        heading: "The challenge",
        paragraphs: [
          "InPost needed to launch its Polish consumer app in the UK within three months. The existing product was functional, but it had been built on a rigid XML-based architecture, contained inconsistent design patterns and did not meet the required accessibility standards.",
          "The challenge was not simply to localise the interface. I needed to determine which improvements could safely be delivered for launch, which changes required deeper architectural work and how to create a credible UK experience without delaying the release.",
          "At the same time, the UK team needed a more scalable design foundation that could support future product development rather than adding another layer of UI debt.",
        ],
      },
      { kind: "divider" },
      {
        kind: "numbered",
        id: "business-goals",
        heading: "Business goals",
        showArrow: true,
        spacing: "tight",
        items: [
          {
            title: "Launch the UK app within three months",
            body: "Deliver a reliable first version without introducing unnecessary risk into the legacy application.",
          },
          {
            title: "Adapt the experience for UK customers",
            body: "Update priority journeys, brand expression and communication patterns to better reflect UK expectations.",
          },
          {
            title: "Improve accessibility",
            body: "Resolve critical colour and contrast issues and establish WCAG AA-compliant foundations.",
          },
          {
            title: "Create a scalable product foundation",
            body: "Consolidate the fragmented design system and establish clearer patterns for future releases.",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "final-experience",
        heading: "Final experience",
        paragraphs: [
          "The UK launch combined targeted improvements to onboarding, parcel tracking and locker discovery with a rebuilt design system.",
          "Rather than redesigning the entire application, I focused the first phase on changes that could materially improve comprehension, urgency and accessibility without destabilising the legacy product.",
          "The result was a more relevant UK experience and a stronger foundation for subsequent work across the app.",
        ],
      },
      {
        kind: "media",
        media: {
          kind: "image",
          image: {
            src: "/projects/rapid-uk-launch/Final experience screenshot.png",
            width: 20916,
            height: 12608,
            alt: "Four key UK app screens: animated onboarding, locker capacity checker, parcel tracking and pick-up details",
          },
        },
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "design-process",
        heading: "Design process",
        paragraphs: [
          "I worked closely with Product and Engineering to separate launch-critical improvements from work that required deeper architectural change. Product design and design-system consolidation then progressed in parallel, allowing the team to improve the first release while establishing foundations for future development.",
        ],
      },
      {
        kind: "steps",
        spacing: "tight",
        items: [
          {
            title: "Product and UX audit",
            body: "Reviewed the Polish app to identify usability issues, inconsistent patterns, accessibility failures and design-system debt.",
          },
          {
            title: "Feasibility mapping",
            body: "Worked with Engineering to understand which improvements were possible within the existing XML architecture.",
          },
          {
            title: "Phased roadmap",
            body: "Defined what needed to ship for launch, what could follow shortly afterwards and what required deeper structural redesign.",
          },
          {
            title: "UK brand localisation",
            body: "Translated the refreshed brand into the app through updated typography, colours, tone and visual direction.",
          },
          {
            title: "Parallel design and system rebuild",
            body: "Designed launch-critical journeys while consolidating typography, colour tokens and reusable components.",
          },
          {
            title: "Validation and delivery",
            body: "Tested priority interactions, refined the designs and supported Engineering and QA through implementation.",
          },
        ],
      },
      { kind: "divider" },
      { kind: "heading", id: "audit-insights", text: "Audit & insights", spacing: "tight" },
      {
        kind: "numbered",
        spacing: "tight",
        items: [
          {
            title: "Product and system audit",
            body: "The audit revealed extensive design debt: more than 40 text styles, over 60 colour tokens without semantic naming, duplicated components, inconsistent files and limited documentation. Several colour combinations did not meet accessibility requirements, and the lack of shared usage rules increased inconsistency between design and development.",
          },
        ],
      },
      {
        kind: "media",
        media: {
          kind: "image",
          image: {
            src: "/projects/rapid-uk-launch/Product and system audit screenshot.png",
            width: 12592,
            height: 7536,
            alt: "Audit of the legacy colour and typography tokens next to the consolidated design-system tokens",
          },
        },
      },
      {
        kind: "numbered",
        spacing: "tight",
        items: [
          {
            title: "Customer insights",
            body: "Usability testing of the inherited parcel-tracking experience revealed that customers interpreted the progress bars inconsistently, did not feel enough urgency around collection windows and were unsure how many parcels were waiting for them. Locker availability was also particularly important for the UK market, where frequently full lockers could make the existing search experience unreliable.",
          },
        ],
      },
      { kind: "divider" },
      { kind: "heading", id: "key-design-decisions", text: "Key design decisions", spacing: "tight" },
      {
        kind: "twoCol",
        spacing: "tight",
        heading: "Prioritising launch-critical improvements",
        items: [
          {
            label: "Problem",
            body: "The three-month deadline and legacy architecture made a complete redesign unrealistic.",
          },
          {
            label: "Decision",
            body: "I created a phased roadmap, prioritising changes that improved comprehension, accessibility and market relevance without requiring structural rebuilding.",
          },
        ],
      },
      {
        kind: "arrowList",
        bold: true,
        paddingTop: 32,
        items: ["The team could launch on time while maintaining a clear direction for future releases."],
      },
      { kind: "divider" },
      {
        kind: "twoCol",
        spacing: "tight",
        heading: "Making collection urgency clearer",
        items: [
          {
            label: "Problem",
            body: "Customers interpreted the original progress bars inconsistently and did not recognise how urgently parcels needed to be collected.",
          },
          {
            label: "Decision",
            body: "I changed the progress indicators to decrease as time ran out, introduced red and orange urgency cues, replaced exact collection dates with clearer remaining-time messaging and added a parcel counter.",
          },
        ],
      },
      {
        kind: "arrowList",
        bold: true,
        paddingTop: 32,
        items: ["Customers could understand which parcels required attention and how quickly they needed to act."],
      },
      {
        kind: "media",
        width: "reduced-70",
        media: {
          kind: "video",
          video: {
            src: "/projects/rapid-uk-launch/parcel-list-video.mp4",
            width: 1412,
            height: 1080,
          },
          alt: "Parcel list with decreasing urgency indicators and remaining-time messaging",
        },
      },
      { kind: "divider" },
      {
        kind: "twoCol",
        spacing: "tight",
        heading: "Adapting onboarding for the UK market",
        items: [
          {
            label: "Problem",
            body: "The inherited onboarding reflected the Polish product and did not communicate the new UK brand or service proposition effectively.",
          },
          {
            label: "Decision",
            body: "I created a refreshed onboarding experience using UK-specific language, visual direction and motion.",
          },
        ],
      },
      {
        kind: "arrowList",
        bold: true,
        paddingTop: 32,
        items: [
          "The first interaction with the product felt intentional and relevant to the new market rather than directly translated.",
        ],
      },
      {
        kind: "media",
        width: "reduced-70",
        media: {
          kind: "video",
          video: {
            src: "/projects/rapid-uk-launch/onboarding.mp4",
            width: 1412,
            height: 1080,
          },
          alt: "UK onboarding experience walkthrough with refreshed brand and motion",
        },
      },
      { kind: "divider" },
      {
        kind: "twoCol",
        spacing: "tight",
        heading: "Making locker availability visible",
        items: [
          {
            label: "Problem",
            body: "Customers could navigate to a locker without knowing whether suitable compartments were available.",
          },
          {
            label: "Decision",
            body: "I introduced locker-capacity information into the map and locker-discovery experience.",
          },
        ],
      },
      {
        kind: "arrowList",
        bold: true,
        paddingTop: 32,
        items: ["Customers could make a more informed choice before travelling to a location."],
      },
      {
        kind: "media",
        width: "reduced-70",
        media: {
          kind: "video",
          video: {
            src: "/projects/rapid-uk-launch/locker-search-video.mp4",
            width: 1412,
            height: 1080,
          },
          alt: "Locker map with live capacity indicators shown while searching for a drop-off point",
        },
      },
      { kind: "divider" },
      {
        kind: "numbered",
        id: "design-system-rebuild",
        heading: "Design-system rebuild",
        paddingBottom: 0,
        items: [
          {
            title: "Creating a semantic type system",
            body: "More than 40 fragmented text styles were consolidated into 12 semantic styles organised by role and size. This made typography easier to apply consistently across design and development.",
          },
          {
            title: "Creating functional colour tokens",
            body: "More than 60 inconsistently named colour tokens were reduced to 16 tokens named according to their function, including surface and on-surface relationships. The system was created with future dark-mode support in mind and adjusted to meet accessibility requirements.",
          },
          {
            title: "Improving colour accessibility",
            body: "Brand colours and component combinations were tested against accessibility standards. Where necessary, colours or their permitted text pairings were adjusted to achieve WCAG AA contrast.",
          },
          {
            title: "Documenting components and patterns",
            body: "I documented component anatomy, spacing, colour usage and behaviour, and created reusable patterns for common states such as success and error messaging. This reduced ambiguity during handoff and improved consistency between designers and engineers.",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "validation-refinement",
        heading: "Validation and refinement",
        paddingBottom: 32,
        paragraphs: [
          "Parcel tracking was tested iteratively because it was the app's most important and frequently used experience.",
          "The first round of testing revealed ambiguity around the progress indicators, weak collection urgency and confusion about how many parcels were waiting in the locker.",
        ],
      },
      {
        kind: "validationItem",
        question: "Did customers understand the original progress bar?",
        status: "warning",
        finding: "Customers interpreted the original progress bar as delivery progress rather than time remaining.",
        update: "Reversed the direction of the indicator so it decreased as the collection deadline approached.",
      },
      { kind: "divider" },
      {
        kind: "validationItem",
        question: "Did the collection deadline feel urgent enough?",
        status: "warning",
        finding: "The collection deadline did not feel urgent enough.",
        update: "Introduced clearer remaining-time language and red or orange urgency cues.",
      },
      { kind: "divider" },
      {
        kind: "validationItem",
        question: "Did customers know how many parcels were ready?",
        status: "warning",
        finding: "Customers were unsure how many parcels were ready for collection.",
        update: "Added a visible parcel counter beside the Ready to collect heading.",
      },
      { kind: "divider" },
      {
        kind: "richText",
        paragraphs: [
          "In the second round of testing, every participant selected the version using the red or orange urgency treatment because it more clearly communicated that collection time was running out.",
        ],
      },
      { kind: "divider" },
      {
        kind: "numbered",
        id: "outcome",
        heading: "Outcome",
        showArrow: true,
        paddingTop: 0,
        items: [
          {
            title: "Launched on schedule",
            body: "The UK app launched within the three-month deadline.",
          },
          {
            title: "Created a scalable design foundation",
            body: "The rebuilt system was adopted by design and engineering teams and used as the basis for subsequent releases.",
          },
          {
            title: "Reduced design-system debt",
            body: "More than 40 text styles were consolidated into 12, while more than 60 colour tokens were reduced to 16 functional tokens.",
          },
          {
            title: "Improved accessibility",
            body: "Critical colour combinations were updated to meet WCAG AA contrast requirements.",
          },
          {
            title: "Supported faster future delivery",
            body: "The first release shipped without critical UX issues, and the clearer system reduced the need to rebuild foundational patterns in later sprints.",
          },
        ],
      },
      {
        kind: "richText",
        paragraphs: [
          "The launch also created the foundation for subsequent work on Send a Parcel, multi-market parcel tracking and the continued expansion of the InPost design system.",
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "reflection",
        heading: "Reflection",
        paddingBottom: 90,
        paragraphs: [
          "This project reinforced that working within a legacy product is as much an exercise in prioritisation as it is in interface design.",
          "A full redesign was neither technically realistic nor necessary for the first release. The greatest value came from identifying the changes that would materially improve the UK experience, separating them from deeper structural work and creating a system that allowed the product to evolve after launch.",
          "Balancing immediate delivery with longer-term foundations allowed the team to launch on time without treating the first release as a disposable solution.",
        ],
      },
    ],
  },
  {
    slug: "send-parcel-in-app",
    title: "Enabling 2M+ users to send parcels in app",
    shortTitle: "Enabling users to send parcels",
    client: "InPost",
    color: "#B8481F",
    heroBackground: "#F8F4EE",
    heroStacked: true,
    heroDividerBelow: true,
    toc: [
      { id: "the-challenge", label: "The challenge" },
      { id: "business-goals", label: "Business goals" },
      { id: "final-experience", label: "Final experience" },
      { id: "design-process", label: "Design process" },
      { id: "how-the-experience-evolved", label: "How the experience evolved" },
      { id: "validation-and-refinement", label: "Validation and refinement" },
      { id: "outcome", label: "Outcome" },
      { id: "making-the-experience-measurable", label: "Making the experience measurable" },
      { id: "reflection", label: "Reflection" },
    ],
    quickRead: {
      tagline: "Enabling customers to send parcels directly within the InPost app.",
      heroImage: {
        src: "/projects/send-parcel-in-app/send-hero.png",
        width: 7434,
        height: 8919,
        alt: "InPost send a parcel screen showing size selection and an About sizes bottom-sheet modal",
      },
      summaryLabel: "Project at a glance",
      challenge: [
        "The UK InPost app didn't allow customers to send parcels, despite the feature already existing in the Polish product. My role was to adapt the experience for the UK market within a short delivery timeline, reusing the existing product where possible while introducing UK-specific functionality such as parcel cover. Rather than redesigning the journey from scratch, I focused on improving usability, simplifying key interactions and reducing friction to create a more intuitive experience for UK customers.",
      ],
      roleDetails: {
        role: "Lead Product Designer",
        roleDescription:
          "Led the end-to-end UX and UI design of the parcel sending experience for the UK InPost app.",
        scope:
          "End-to-end UX & UI, from discovery through delivery, including user research, prototyping and usability testing.",
        coreTeam: "Product Manager • Engineering",
        collaborationLabel: "Collaboration teams",
        collaborationTeams: "Marketing • Customer Experience",
        platforms: "iOS • Android",
      },
      outcomes: [
        { value: "25–30%", label: "reduction in address entry time after introducing address lookup, which also helped prevent errors" },
        { value: "~15%", label: "fewer abandoned parcels after making the summary editable, so users could fix issues without restarting" },
      ],
      keyOutcomeBullets: [
        "Enabled additional revenue opportunities through parcel cover and promotional functionality.",
        "Improved clarity around ETA, parcel value and delivery expectations for UK customers.",
        "Established the foundation for measuring the Send flow experience, later expanded through a cross-functional UX Metrics Workshop.",
      ],
    },
    fullCaseStudy: [
      {
        kind: "heading",
        id: "the-challenge",
        text: "The challenge",
        spacing: "tight",
      },
      {
        kind: "richText",
        paragraphs: [
          "The UK InPost app didn't support parcel sending, despite the feature already existing in the Polish product.",
          "The challenge wasn't to redesign the experience from scratch. Instead, I needed to adapt an existing journey for UK customers while working within a short delivery timeline, existing technical constraints and limited engineering capacity.",
          "The goal was to identify where targeted UX improvements would have the greatest impact while preserving the existing product architecture.",
        ],
      },
      { kind: "divider" },
      {
        kind: "heading",
        id: "business-goals",
        text: "Business goals",
        spacing: "tight",
      },
      {
        kind: "arrowList",
        items: [
          "Launch parcel sending for UK customers using the existing Polish product as the foundation.",
          "Introduce UK-specific functionality, including parcel cover, to better meet local customer expectations.",
          "Improve clarity, usability and conversion without rebuilding the entire journey.",
          "Deliver the feature within a tight release timeline.",
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "final-experience",
        heading: "Final experience",
        paragraphs: [
          "The final experience reused the existing Polish flow while introducing targeted improvements for the UK market. Rather than redesigning every screen, I focused on reducing friction at key decision points, improving clarity and supporting confident decision making throughout the journey.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        media: {
          kind: "image",
          image: {
            src: "/projects/send-parcel-in-app/Final%20experience.png",
            width: 6952,
            height: 9900,
            alt: "Final send-a-parcel experience screens for the UK app",
          },
        },
      },
      { kind: "divider" },
      {
        kind: "heading",
        id: "design-process",
        text: "Design process",
        spacing: "tight",
      },
      {
        kind: "steps",
        spacing: "tight",
        items: [
          {
            title: "Discovery",
            body: "Aligned with stakeholders on business goals, technical constraints and success criteria.",
          },
          {
            title: "Research",
            body: "Reviewed competitor journeys, UX best practices and existing customer pain points.",
          },
          {
            title: "Exploration",
            body: "Created concepts and wireframes to validate improvements before investing in final UI.",
          },
          {
            title: "Validation",
            body: "Tested prototypes with users and iterated based on findings.",
          },
          {
            title: "Delivery",
            body: "Final UI design, stakeholder reviews and engineering handoff.",
          },
          {
            title: "Measuring success",
            body: "Established the foundation for future UX metrics, later expanded through a dedicated Design Metrics Workshop.",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "heading",
        id: "how-the-experience-evolved",
        text: "How the experience evolved",
        spacing: "tight",
      },
      {
        kind: "twoCol",
        spacing: "tight",
        heading: "Making address entry easier",
        items: [
          { label: "Problem", body: "Users had to type the address manually." },
          {
            label: "Decision",
            body: "Added a address lookup which enabled users to select address faster and avoid any spelling mistakes.",
          },
        ],
      },
      {
        kind: "media",
        width: "reduced",
        bordered: true,
        media: {
          kind: "video",
          video: {
            src: "/projects/send-parcel-in-app/send-address.mp4",
            width: 1412,
            height: 1080,
          },
          alt: "Address entry screen with address lookup replacing manual typing",
        },
      },
      { kind: "divider" },
      {
        kind: "twoCol",
        spacing: "tight",
        heading: "Summary page",
        items: [
          { label: "Problem", body: "Users needed to correct mistakes without restarting checkout." },
          {
            label: "Decision",
            body: "Made parcel details, addresses and parcel size editable directly from the Summary page.",
          },
        ],
      },
      {
        kind: "media",
        bordered: true,
        media: {
          kind: "image",
          image: {
            src: "/projects/send-parcel-in-app/Send-summary.png",
            width: 8887,
            height: 6101,
            alt: "Editable Summary page showing parcel details, address and size",
          },
        },
      },
      { kind: "divider" },
      {
        kind: "twoCol",
        spacing: "tight",
        heading: "Parcel cover",
        items: [
          {
            label: "Problem",
            body: "Parcel cover was a new UK-specific feature that needed to feel valuable without becoming intrusive.",
          },
          {
            label: "Decision",
            body: "Designed contextual education, optional upsell moments and supporting information that allowed users to make informed decisions.",
          },
        ],
      },
      {
        kind: "media",
        width: "reduced",
        bordered: true,
        media: {
          kind: "video",
          video: {
            src: "/projects/send-parcel-in-app/parcel-cover.mp4",
            width: 1412,
            height: 1080,
          },
          alt: "Parcel cover add-on and up-sell moment in the send flow",
        },
      },
      { kind: "divider" },
      {
        kind: "twoCol",
        spacing: "tight",
        heading: "Pricing & ETA",
        items: [
          {
            label: "Problem",
            body: "Users relied heavily on delivery estimates and wanted reassurance that pricing updated correctly.",
          },
          {
            label: "Decision",
            body: "Surfaced ETA earlier, improved pricing visibility and clearly communicated changes throughout the journey.",
          },
        ],
      },
      {
        kind: "media",
        bordered: true,
        media: {
          kind: "image",
          image: {
            src: "/projects/send-parcel-in-app/Send-timeandprice.png",
            width: 8887,
            height: 6101,
            alt: "Pricing and ETA surfaced earlier in the send flow",
          },
        },
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "validation-and-refinement",
        heading: "Validation and refinement",
        paragraphs: [
          "The final concepts were tested with users in prototype usability testing to validate key assumptions before development.",
        ],
      },
      {
        kind: "validationItem",
        question: "Can users understand delivery expectations?",
        status: "warning",
        finding: "Users looked for estimated delivery information throughout the journey.",
        update: "Made ETA more prominent on both the first and Summary screens.",
      },
      { kind: "divider" },
      {
        kind: "validationItem",
        question: "Is parcel sizing understandable?",
        status: "success",
        finding: "Visual size guidance significantly reduced uncertainty when selecting parcel dimensions.",
        update: "Expanded sizing information and supporting illustrations remained part of the redesign.",
      },
      { kind: "divider" },
      {
        kind: "validationItem",
        question: "Can users edit parcel details?",
        status: "success",
        finding: "9 out of 10 participants successfully edited parcel details without restarting the journey.",
        update: "Editable Summary page retained in the final design.",
      },
      { kind: "divider" },
      {
        kind: "stats",
        id: "outcome",
        heading: "Outcome",
        items: [
          {
            value: "25–30%",
            label: "reduction in address entry time after introducing address lookup, which also helped prevent errors",
          },
          {
            value: "~15%",
            label: "fewer abandoned parcels after making the summary editable, so users could fix issues without restarting",
          },
          { value: "9/10", label: "Participants successfully edited parcel details during usability testing." },
        ],
        bullets: [
          "Enabled additional revenue opportunities through parcel cover and promotional functionality.",
          "Improved clarity around ETA, parcel value and delivery expectations for UK customers.",
          "Established the foundation for measuring the Send flow experience, later expanded through a cross-functional UX Metrics Workshop.",
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "making-the-experience-measurable",
        heading: "Making the experience measurable",
        paragraphs: [
          "To ensure the Send journey could be evaluated beyond launch, I facilitated two cross-functional workshops to define what success should look like across the experience. We mapped the end-to-end journey, prioritised the moments that mattered most and translated them into actionable behavioural and experience metrics.",
        ],
      },
      {
        kind: "media",
        width: "reduced-40",
        bordered: true,
        link: {
          href: "/projects/send-parcel-in-app/C2X%20-%20design%20metrics%20workshop.pdf",
          label: "View workshop in PDF",
          size: 140,
        },
        media: {
          kind: "image",
          image: {
            src: "/projects/send-parcel-in-app/workshop-image.png",
            width: 7840,
            height: 5672,
            alt: "UX Metrics Workshop mapping the Send journey and defining success measures",
          },
        },
      },
      {
        kind: "richText",
        paragraphs: [
          "The work created a shared measurement framework for the Send journey and a reusable workshop format that could be applied to other product areas.",
        ],
      },
      {
        kind: "metrics",
        intro: "Example of some metrics established:",
        items: [
          {
            title: "Metric 1 — Time on task (Address Lookup)",
            definition:
              "Time spent searching for the recipient's address - measured from the moment the user starts typing until selecting an address from the list.",
            whyItMatters:
              "This metric helps evaluate the efficiency and usability of the address lookup field. A long completion time may indicate issues such as low accuracy of search results, or confusing UI hierarchy.",
          },
          {
            title: "Metric 2 — % of Users Editing Parcel Details on Summary Screen",
            definition:
              "Percentage of users who return to edit parcel details (e.g., size or cover) after reaching the summary step.",
            whyItMatters:
              "Frequent edits at this stage may suggest earlier steps lack clarity or users are unsure about their previous choices.",
          },
          {
            title: "Metric 3 — % of Undelivered or Returned Parcels Due to Bad Address",
            definition:
              "Proportion of parcels marked as undelivered or returned because of incorrect or incomplete address data.",
            whyItMatters:
              "A high rate here signals that input validation and address accuracy need improvement. It also impacts customer satisfaction and support costs.",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "reflection",
        heading: "Reflection",
        paragraphs: [
          "Working within an existing product taught me that successful product design isn't always about redesigning entire experiences.",
          "The biggest impact often comes from identifying a handful of high-value improvements that balance user needs, business goals and technical constraints.",
          "Rather than starting from a blank canvas, this project focused on making thoughtful decisions within real-world limitations—an approach that ultimately led to a faster launch and a better experience for UK customers.",
        ],
        paddingBottom: 72,
      },
    ],
  },
  {
    slug: "kashtkaar",
    title: "Designing Kashtkaar's first farm management experience",
    shortTitle: "Kashtkaar farm management",
    client: "Kashtkaar",
    color: "#2E7D32",
    heroBackground: "#F8F4EE",
    heroStacked: true,
    heroDividerBelow: true,
    glancePaddingTop: 32,
    midEmbed: {
      src: "https://union-park-04897894.figma.site/",
      title: "Interactive Kashtkaar farm management prototype",
    },
    toc: [
      { id: "quick-summary", label: "Quick Summary" },
      { id: "the-opportunity", label: "The opportunity" },
      { id: "defining-the-product-concept", label: "Defining the product concept" },
      { id: "designing-the-core-experience", label: "Designing the core experience" },
      { id: "prototype-testing-and-refinement", label: "Prototype testing and refinement" },
      { id: "building-the-foundations", label: "Building the foundations" },
      { id: "outcome-and-reflection", label: "Outcome and reflection" },
    ],
    projectAtAGlance: {
      role: "Product Designer",
      scope:
        "Product discovery, competitor research, information architecture, UX/UI design, interactive prototyping, early usability testing and design-system foundations.",
      coreTeam: "Founder • Engineering",
      collaborationLabel: "Collaboration with",
      collaborationTeams: "Local research team • Agricultural specialists",
      users: "Farmers • Field officers • Agronomists • Processors",
      stage: "Early product concept and first prototype iterations",
    },
    quickRead: {
      tagline:
        "An early-stage mobile concept helping farmers in Pakistan record farm activities, follow crop guidance and connect with agricultural communities and services.",
      challenge: [
        "Kashtkaar was an early-stage mobile product designed to support farmers in Pakistan while improving agricultural data collection across a sustainable rice supply chain. The concept combined a familiar, feed-based experience with practical farm-management tools, helping farmers access guidance, record activities and follow their crop cycle in one place.",
        "I shaped the initial product concept through competitor research, information architecture and UX exploration. I designed the first two to three iterations of the app, including the Farm hub, crop calendar, activity-recording journeys and the relationship between farm management and the community feed. I also created the initial interactive prototypes and established the foundations of the design system.",
        "The prototypes were tested in Urdu with farmers by local members of the team. I used the findings to simplify navigation, refine terminology and improve how farmers recorded activities and moved between planning, monitoring and community content. I left the project after the initial concept and validation stages, while the founder and engineering team continued developing the product.",
      ],
      outcomes: [],
    },
    fullCaseStudy: [
      {
        kind: "richText",
        id: "the-opportunity",
        heading: "The opportunity",
        paragraphs: [
          "Kashtkaar began as an internal data-collection tool supporting a sustainable rice programme. Field officers visited farms, advised farmers and recorded agricultural activities, but the process was difficult to scale and offered limited direct value to farmers.",
          "The opportunity was to create a product that made agricultural data easier to record while also giving farmers useful guidance, crop-planning support, local information and access to a wider agricultural network.",
        ],
      },
      { kind: "divider" },
      {
        kind: "lead",
        spacing: "tight",
        items: [
          {
            label: "Farmer support",
            body: "Accessible guidance and advice throughout the crop cycle.",
          },
          {
            label: "Data collection",
            body: "Simplified recording of farm activities, quantities and crop conditions.",
          },
          {
            label: "Supply-chain connection",
            body: "Connecting farmers, field officers, processors and agricultural services.",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "defining-the-product-concept",
        heading: "Defining the product concept",
        paddingBottom: 32,
        paragraphs: [
          "The founder wanted to combine the accessibility and familiarity of a social-media feed with the practical tools of a farm-management product. I explored how these two behaviours could coexist without making the application feel fragmented.",
          "The resulting concept had two connected layers:",
        ],
      },
      {
        kind: "twoCol",
        spacing: "tight",
        items: [
          {
            label: "Discover",
            body: "A feed for educational content, community knowledge, agricultural updates and relevant advice.",
          },
          {
            label: "Farm",
            body: "A dedicated space for crop planning, farm health, activity recording and day-to-day management.",
          },
        ],
      },
      {
        kind: "richText",
        paddingTop: 32,
        paddingBottom: 24,
        paragraphs: [
          "The concept allowed farmers to use familiar feed-based interactions while keeping private farm records and management tools organised in a dedicated area.",
        ],
      },
      {
        kind: "beforeAfterImages",
        spacing: "tight",
        items: [
          {
            label: "Discover",
            media: { kind: "placeholder", label: "kashtkaar-discover" },
          },
          {
            label: "Farm",
            media: { kind: "placeholder", label: "kashtkaar-farm-hub" },
          },
        ],
      },
      {
        kind: "media",
        media: { kind: "placeholder", label: "kashtkaar-product-architecture" },
      },
      { kind: "divider" },
      {
        kind: "heading",
        id: "designing-the-core-experience",
        text: "Designing the core experience",
        spacing: "tight",
        paddingBottom: 0,
      },
      {
        kind: "richText",
        heading: "Making activity recording easier",
        headingLevel: "h3",
        paddingTop: 32,
        paragraphs: [
          "Recording farm activity was the product's most important behaviour, but lengthy forms risked becoming another administrative burden for farmers and field officers.",
          "I explored a prominent one-tap action, guided data entry and context-specific questions based on the farmer's crop stage. The goal was to collect useful information without asking farmers to complete the same long form for every activity.",
        ],
      },
      {
        kind: "media",
        media: { kind: "placeholder", label: "kashtkaar-activity-recording" },
      },
      { kind: "divider" },
      {
        kind: "richText",
        heading: "Turning the crop calendar into guidance",
        headingLevel: "h3",
        paddingBottom: 32,
        paragraphs: [
          "The crop calendar needed to do more than display dates. I explored how it could guide farmers through key stages such as land preparation, sowing, irrigation, chemical application and harvest while collecting the information required by field officers and processors.",
          "I proposed what information should be requested at each stage of the rice-growing cycle and explored several calendar structures before recommending a direction for testing.",
        ],
      },
      {
        kind: "beforeAfterImages",
        spacing: "tight",
        items: [
          {
            label: "Exploration",
            media: { kind: "placeholder", label: "kashtkaar-crop-calendar-exploration" },
          },
          {
            label: "Prototype",
            media: { kind: "placeholder", label: "kashtkaar-crop-calendar-prototype" },
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        heading: "Connecting farm management with the community",
        headingLevel: "h3",
        paragraphs: [
          "I explored how activities recorded in the Farm area could optionally be shared to the Discover feed. This created a bridge between private farm management and community knowledge without requiring farmers to enter the same information twice.",
          "The experience needed to make the distinction between recording an activity and publishing content clear, so sharing remained optional and intentional.",
        ],
      },
      {
        kind: "media",
        media: { kind: "placeholder", label: "kashtkaar-share-to-discover" },
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "prototype-testing-and-refinement",
        heading: "Prototype testing and refinement",
        paragraphs: [
          "I created a clickable prototype covering the main navigation, crop planning and activity-recording journeys. Local members of the team tested the concept in Urdu with farmers, allowing the product to be evaluated in the language and context in which it would be used.",
          "Testing focused on whether farmers could record an activity quickly, understand the relationship between Plan, Health and Log, and move naturally between farm-management tools and the community feed.",
        ],
      },
      {
        kind: "media",
        media: { kind: "placeholder", label: "kashtkaar-prototype-testing" },
      },
      {
        kind: "numbered",
        spacing: "tight",
        items: [
          {
            title: "Navigation needed to feel unified",
            body: "The earlier separation between Grow and Track created confusion. The experience was consolidated into a single Farm hub containing Plan, Health and Log.",
          },
          {
            title: "Terminology needed to be more direct",
            body: "Labels such as Activity, Task, Record and Add task were reviewed to make the difference between recording completed work and planning future work clearer.",
          },
          {
            title: "Sharing needed to remain optional",
            body: "The connection between logging an activity and sharing it to Discover needed to feel helpful rather than automatic or intrusive.",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "building-the-foundations",
        heading: "Building the foundations",
        paddingBottom: 32,
        paragraphs: [
          "Alongside the core journeys, I established the initial visual and interaction foundations for the product. This included accessible colour and typography choices, reusable interface components and patterns that could support both farm-management tools and social content.",
          "I also identified and corrected early accessibility issues so the prototypes provided a more consistent and usable foundation for continued development.",
        ],
      },
      {
        kind: "beforeAfterImages",
        spacing: "tight",
        items: [
          {
            label: "Design system",
            media: { kind: "placeholder", label: "kashtkaar-design-system" },
          },
          {
            label: "Components",
            media: { kind: "placeholder", label: "kashtkaar-components" },
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "outcome-and-reflection",
        heading: "Outcome and reflection",
        paragraphs: [
          "The work turned Kashtkaar's early vision into a testable mobile product, including the initial architecture, core journeys, design iterations, clickable prototype and design-system foundations. Urdu prototype testing informed improvements to navigation, terminology and activity recording before the founder and engineering team continued development.",
          "The project reinforced the value of designing around familiar behaviours. While the social feed created an accessible entry point, the product's real value depended on making agricultural guidance and farm data collection feel simple, relevant and useful.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx + 1) % projects.length];
}

export function getPreviousProject(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx - 1 + projects.length) % projects.length];
}

/**
 * Archive projects use a deliberately lighter shape than `Project`: a hero
 * (image + title + subtitle), a "Project at a glance" section and an
 * optional "Quick summary". No fullCaseStudy, no toc, no quickRead - the
 * /projects/[slug] route renders these through a separate, shorter template.
 */
export type ArchiveProject = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: StandardHeroImage;
  /** Overrides the media shown on the /archive listing card; falls back to heroImage when absent. */
  cardMedia?: MediaSlot;
  /** Overrides the card's media-container background (ProjectCard defaults to bg-paper-dim). */
  mediaBackground?: string;
  projectAtAGlance: ProjectAtAGlanceData;
  /** Narrative paragraph(s) shown in a "Quick summary" section below "Project at a glance". */
  quickSummary?: string[];
  /** Optional visual shown below the "Quick summary" section. */
  belowSummaryMedia?: MediaSlot;
};

export const archiveProjects: ArchiveProject[] = [
  {
    slug: "designability",
    title: "Designability",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/designability/designabilitycover.png",
      width: 4956,
      height: 3946,
      alt: "Designability design guidelines shown across a grid of mobile screens",
    },
    cardMedia: {
      kind: "image",
      image: {
        src: "/projects/designability/designabilitycover.png",
        width: 4956,
        height: 3946,
        alt: "Designability cover image",
      },
    },
    projectAtAGlance: {
      role: "Lead UX/UI Designer",
      scope:
        "Brand refresh for the Designability Design Guidelines. I proposed the digital design direction for the brand and used the existing design system to create the website designs.",
      coreTeam: "Project Manager • Engineering",
      collaborationLabel: "Collaboration with",
      collaborationTeams: "Art Director • UX Designer",
    },
    quickSummary: [
      "I led the creative direction and UI design for Designability's Online Design Resource, helping turn complex accessibility guidance for electric vehicle charging points into a clear, engaging and easy-to-navigate digital experience. Working within the existing design system, I developed the visual direction, responsive page designs and reusable modules in collaboration with the client, UX, engineering and art direction teams.",
    ],
    belowSummaryMedia: {
      kind: "image",
      image: {
        src: "/projects/designability/moodboards.webp",
        width: 1920,
        height: 1541,
        alt: "Designability brand direction moodboards exploring tone, typography and photography options",
      },
    },
  },
  {
    slug: "tigi",
    title: "TIGI",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/tigi/tigi-1.webp",
      width: 1920,
      height: 1102,
      alt: "TIGI Bed Head website homepage shown on desktop and mobile",
    },
    cardMedia: {
      kind: "image",
      image: {
        src: "/projects/tigi/tigi-cover.png",
        width: 4956,
        height: 3946,
        alt: "TIGI cover image",
      },
    },
    projectAtAGlance: {
      role: "Lead UX/UI Designer",
      scope:
        "Brand refresh for the TIGI website. I proposed the digital design direction based on the brand's print guidelines, translating the existing brand book into a cohesive digital experience.",
      coreTeam: "Project Manager • Engineering",
      collaborationLabel: "Collaboration with",
      collaborationTeams: "Art Director • UX Designer",
    },
    quickSummary: [
      "I redesigned the TIGI Bed Head website to reflect the brand's updated grunge-inspired identity. Working from guidelines created primarily for print, I translated the visual direction into a distinctive yet user-friendly digital experience, balancing the brand's fragmented, expressive style with clear navigation and responsive web design.",
    ],
    belowSummaryMedia: {
      kind: "image",
      image: {
        src: "/projects/tigi/tigi-4.webp",
        width: 2877,
        height: 1626,
        alt: "TIGI Bed Head product page shown across desktop and mobile breakpoints",
      },
    },
  },
  {
    slug: "migarage",
    title: "MiGarage",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/MIGarage/migarage-3.webp",
      width: 1920,
      height: 1199,
      alt: "MiGarage website shown across a row of mobile screens",
    },
    cardMedia: {
      kind: "image",
      image: {
        src: "/projects/MIGarage/migarage-cover.png",
        width: 1600,
        height: 1200,
        alt: "MiGarage cover image",
      },
    },
    projectAtAGlance: {
      role: "Lead UX/UI Designer",
      scope:
        "Brand refresh for the Digital Catapult websites. I proposed the digital design direction for the brand and used the existing design system to create the website designs.",
      coreTeam: "Project Manager • Engineering",
      collaborationLabel: "Collaboration with",
      collaborationTeams: "Art Director • UX Designer",
    },
    quickSummary: [
      "Digital Catapult underwent a full brand refresh across its digital platforms. My role was to apply the new visual identity to both new and existing websites and designing two new websites - MiGarage and Futurescope, as a part of Digital Catapult Brand. The main challenge was to update the design language without altering the component structures - spacing, image ratios, padding, or interactions had to remain intact. I designed the brand application for MiGarage and Futurescope (newly launched websites) as well as adapted the branding for the existing Creative XR website, ensuring a consistent and modern look across the organization's digital presence.",
    ],
    belowSummaryMedia: {
      kind: "image",
      image: {
        src: "/projects/MIGarage/migarage-4.webp",
        width: 1357,
        height: 1920,
        alt: "MiGarage news and highlights screens shown on mobile",
      },
    },
  },
  {
    slug: "creative-xr",
    title: "Creative XR",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/creative xr/crx-2 copy.webp",
      width: 1920,
      height: 1357,
      alt: "Creative XR homepage shown on desktop and mobile",
    },
    cardMedia: {
      kind: "video",
      video: {
        src: "/projects/creative xr/crx-1 copy.mp4",
        width: 1920,
        height: 1080,
      },
      alt: "Creative XR project video",
    },
    mediaBackground: "#ffffff",
    projectAtAGlance: {
      role: "Lead UX/UI Designer",
      scope:
        "Brand refresh for the Digital Catapult websites. I proposed the digital design direction for the brand and used the existing design system to create the website designs.",
      coreTeam: "Project Manager • Engineering",
      collaborationLabel: "Collaboration with",
      collaborationTeams: "Art Director • UX Designer",
    },
    quickSummary: [
      "Digital Catapult underwent a full brand refresh across its digital platforms. My role was to apply the new visual identity to both new and existing websites and designing two new websites - MiGarage and Futurescope, as a part of Digital Catapult Brand. The main challenge was to update the design language without altering the component structures - spacing, image ratios, padding, or interactions had to remain intact. I designed the brand application for MiGarage and Futurescope (newly launched websites) as well as adapted the branding for the existing Creative XR website, ensuring a consistent and modern look across the organization's digital presence.",
    ],
    belowSummaryMedia: {
      kind: "image",
      image: {
        src: "/projects/creative xr/crx-3 copy.webp",
        width: 1920,
        height: 1358,
        alt: "Creative XR full page layouts shown across the programme timeline and application sections",
      },
    },
  },
  {
    slug: "futurescope",
    title: "Futurescope",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/futurescope/f-2.webp",
      width: 1920,
      height: 1194,
      alt: "FutureScope homepage shown on desktop and mobile",
    },
    cardMedia: {
      kind: "image",
      image: {
        src: "/projects/futurescope/futurescope-cover.png",
        width: 1600,
        height: 1200,
        alt: "Futurescope cover image",
      },
    },
    projectAtAGlance: {
      role: "Lead UX/UI Designer",
      scope:
        "Brand refresh for the Digital Catapult websites. I proposed the digital design direction for the brand and used the existing design system to create the website designs.",
      coreTeam: "Project Manager • Engineering",
      collaborationLabel: "Collaboration with",
      collaborationTeams: "Art Director • UX Designer",
    },
    quickSummary: [
      "Digital Catapult underwent a full brand refresh across its digital platforms. My role was to apply the new visual identity to both new and existing websites and designing two new websites - MiGarage and Futurescope, as a part of Digital Catapult Brand. The main challenge was to update the design language without altering the component structures - spacing, image ratios, padding, or interactions had to remain intact. I designed the brand application for MiGarage and Futurescope (newly launched websites) as well as adapted the branding for the existing Creative XR website, ensuring a consistent and modern look across the organization's digital presence.",
    ],
    belowSummaryMedia: {
      kind: "image",
      image: {
        src: "/projects/futurescope/f-3.webp",
        width: 1920,
        height: 1194,
        alt: "FutureScope structure and vision sections shown on desktop and mobile",
      },
    },
  },
];

export function getArchiveProjectBySlug(slug: string) {
  return archiveProjects.find((p) => p.slug === slug);
}

/**
 * Lightweight "work in progress" project pages: a hero, a "Project at a
 * glance" section and a "Quick summary" only - no full case study, no
 * previous/next nav. Linked only from specific entry points (e.g. the nav's
 * "Currently building" button), so deliberately kept out of `projects` and
 * `archiveProjects` and therefore out of the homepage, /work and /archive
 * listings.
 */
export type WorkInProgressProject = {
  slug: string;
  /** Shown as the hero's uppercase eyebrow label (e.g. "PropFuse"). */
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: StandardHeroImage;
  projectAtAGlance: ProjectAtAGlanceData;
  quickSummary: string[];
};

export const workInProgressProjects: WorkInProgressProject[] = [
  {
    slug: "propfuse",
    eyebrow: "PropFuse",
    title: "Designing a simpler way to manage fragmented maintenance requests",
    subtitle:
      "An early-stage AI-assisted workflow that helps property teams organise maintenance communication without introducing another platform they need to monitor.",
    heroImage: { kind: "placeholder", label: "propfuse-hero" },
    projectAtAGlance: {
      role: "Founder and Product Designer",
      scope:
        "Problem discovery, user research, product strategy, UX/UI design, workflow automation and frontend prototyping.",
      stage: "Early concept and MVP development",
      users: "Property managers • Letting agencies • Maintenance teams",
      currentFocus: "Validating the proposition and building the first working workflow",
    },
    quickSummary: [
      "PropFuse is an early-stage product experiment exploring how property teams could manage maintenance requests arriving through fragmented channels such as email, messaging and phone calls.",
      "The problem is not necessarily the absence of repair software. Many agencies already have access to specialist platforms, but communication remains fragmented and adoption is inconsistent across tenants, contractors and internal teams.",
      "Rather than asking property managers to monitor another platform throughout the day, the initial concept focuses on turning incoming maintenance information into a clearer, prioritised summary delivered through channels they already use.",
      "I am currently defining the product, validating the proposition with property professionals and prototyping the first end-to-end workflow. The project also allows me to expand my React, TypeScript, automation and AI-product development skills while taking an idea from early discovery towards a working product.",
    ],
  },
];

export function getWorkInProgressProjectBySlug(slug: string) {
  return workInProgressProjects.find((p) => p.slug === slug);
}
