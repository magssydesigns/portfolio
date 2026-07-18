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

/** A media slot that may still be a placeholder awaiting a final asset. */
export type MediaSlot =
  | { kind: "image"; image: ProjectImage }
  | { kind: "video"; video: ProjectVideo; alt: string }
  | { kind: "placeholder"; label: string };

export type Block =
  | { kind: "lead"; id?: string; items: { label: string; body: string }[] }
  | { kind: "heading"; id?: string; text: string; tone?: "dark" | "light" }
  | { kind: "statement"; id?: string; text: string; tone?: "dark" | "light" }
  | { kind: "numbered"; id?: string; heading?: string; intro?: string; showArrow?: boolean; items: { title: string; body: string }[] }
  | { kind: "image"; id?: string; image: ProjectImage; size?: "medium" | "wide" | "full" }
  | { kind: "beforeAfterStats"; id?: string; heading?: string; items: { label: string; before: string; after: string; description: string }[] }
  | { kind: "quote"; id?: string; heading?: string; text: string; attribution?: string }
  | { kind: "steps"; id?: string; heading?: string; items: { title: string; body: string }[] }
  | { kind: "twoCol"; id?: string; items: { label: string; body: string }[] }
  | { kind: "mediaNumbered"; id?: string; heading?: string; media: MediaSlot; items: { title: string; body: string }[] }
  | { kind: "beforeAfterImages"; id?: string; heading?: string; items: { label: string; media: MediaSlot }[] };

export type QuickRead = {
  tagline: string;
  heroImage: ProjectImage;
  heroVideo?: ProjectVideo;
  summaryLabel?: string;
  challenge: string[];
  bulletedChallenge?: boolean;
  role?: string;
  /** Rows of label/value items (e.g. Role, Scope / Core team, Platforms). Each inner array is one row. */
  roleDetails?: { label: string; value: string; description?: string }[][];
  goals?: { label?: string; items: string[] };
  constraints?: string[];
  constraintsLabel?: string;
  process?: { intro?: string; items: string[] };
  challenges?: { intro?: string; items: string[] };
  midMedia?: MediaSlot;
  keyDecisionsLabel?: string;
  keyDecisions: string[];
  outcomes: { value: string; label: string }[];
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
  /** Renders the shared Divider directly below the hero, before the Quick Read section begins. */
  heroDividerBelow?: boolean;
  darkText?: boolean;
  quickRead: QuickRead;
  fullCaseStudy: Block[];
  /** Presence of this field opts the project into the reveal-on-click + sticky TOC behaviour. */
  toc?: TocEntry[];
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
        "The goal was to scale an existing parcel tracking flow from Poland to multiple international markets. Through research, I identified significant differences in delivery behaviours, carrier logic, and customer expectations, making a simple localisation approach unsuitable. As the Product Designer for the UK app team, I led the initiative to create a unified tracking experience across the UK, France, and Poland, designing a scalable solution that could support future market expansion.",
      ],
      process: {
        intro:
          "I worked closely with stakeholders across multiple markets to understand differences in delivery flows, carrier behaviours, and operational constraints. Process included:",
        items: [
          "mapping parcel tracking journeys across markets",
          "conducting surveys and usability testing with 40 users",
          "revisiting information hierarchy to prioritise ETA, pickup location, and next-step clarity",
          "validating flows with stakeholders across markets",
          "iterating on parcel states, action visibility, and pickup interactions based on feedback",
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
        "Simplified parcel states and delivery communication",
        "Prioritised next actions and pickup visibility",
        "Introduced more scalable tracking patterns",
        "Reduced ambiguity across delivery scenarios",
        "Improved locker and QR-based interaction",
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
    title: "Rapid UK app launch & design system rebuild",
    shortTitle: "Rapid UK app launch",
    client: "InPost",
    color: "#3355FF",
    heroBackground: "#F8F4EE",
    heroStacked: true,
    toc: [
      { id: "quick-summary", label: "Quick Summary" },
      { id: "process", label: "Process" },
      { id: "challenges", label: "Challenges" },
      { id: "impact", label: "Impact" },
      { id: "key-changes", label: "Key changes" },
      { id: "onboarding", label: "Onboarding" },
      { id: "parcel-tracking", label: "Parcel tracking" },
      { id: "locker-search", label: "Locker search" },
      { id: "design-system-rebuild", label: "Design System Rebuild" },
      { id: "collaboration", label: "Collaboration" },
    ],
    quickRead: {
      tagline:
        "Redesigned and localised a legacy Polish app for the UK market while unifying the design system, resolving accessibility issues, and defining a phased product roadmap.",
      heroImage: {
        src: "/projects/rapid-uk-launch/hero.png",
        width: 580,
        height: 1000,
        alt: "InPost UK app 'Ready to collect' parcel tracking screen on a yellow background",
      },
      bulletedChallenge: false,
      role:
        "InPost planned to launch its successful Polish consumer app in the UK within three months. Rather than redesigning the product from scratch, the challenge was to localise and modernise a legacy experience while working within the constraints of an outdated architecture and an evolving product strategy.",
      challenge: [
        "I led the UX and design system work, auditing the existing product, defining a phased roadmap, rebuilding the design system, and redesigning key customer journeys to create a scalable foundation for future releases.",
      ],
      process: {
        intro: "My ownership included:",
        items: [
          "scoping the phased product plan (what now vs later)",
          "leading UX/UI decisions and defining the MVP feature set",
          "rebuilding the design system for the UK team",
          "aligning with marketing, web, and global stakeholder expectations",
          "guiding a newly formed squad through delivery",
        ],
      },
      challenges: {
        items: [
          "Launch the UK version of the app within a 3-month deadline while maintaining a high-quality user experience.",
          "Modernise a legacy XML-based application with limited flexibility for structural UX changes.",
          "Balance immediate launch requirements with a long-term product and design system vision.",
          "Consolidate a fragmented design system with 60+ text styles, duplicated components and inconsistent design patterns.",
          "Improve accessibility and ensure the new experience met WCAG AA standards without delaying delivery.",
          "Align product decisions across UK and Polish product, engineering, marketing and brand teams, each with different priorities.",
          "Define a phased roadmap, deciding what needed to ship for launch and what could be postponed to future releases.",
        ],
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
        kind: "numbered",
        id: "key-changes",
        heading: "Planned for later phases",
        intro:
          "Phase 1 focused on launch-critical fixes. The following were scoped into later phases of the roadmap:",
        items: [
          {
            title: "Send a Parcel flow",
            body: "Introducing the send a parcel flow to the UK app.",
          },
          {
            title: "Empty & error states",
            body: "Improved empty and error states throughout the app.",
          },
          {
            title: "Map & locker finder redesign",
            body: "A full visual redesign of the map and finding-a-locker flow.",
          },
          {
            title: "Motion system",
            body: "An animation and micro-interaction system, replacing one-off animations.",
          },
          {
            title: "In-app service expansion",
            body: "Expansion of in-app services and monetisation features.",
          },
        ],
      },
      {
        kind: "beforeAfterImages",
        id: "onboarding",
        heading: "Onboarding",
        items: [
          {
            label: "Before",
            media: {
              kind: "image",
              image: {
                src: "/projects/rapid-uk-launch/onboarding-before.png",
                width: 635,
                height: 950,
                alt: "Old Polish onboarding screens with illustrated truck and locker graphics",
              },
            },
          },
          {
            label: "After",
            media: {
              kind: "image",
              image: {
                src: "/projects/rapid-uk-launch/onboarding-after.png",
                width: 1170,
                height: 1160,
                alt: "New UK onboarding screen reading 'Drop, lock and off you pop' on a yellow background",
              },
            },
          },
        ],
      },
      {
        kind: "lead",
        id: "parcel-tracking",
        items: [
          {
            label: "Why it mattered",
            body: "This is the most important feature of the app - tracking parcels - so I tested this flow twice with users before deciding on evolving the inherited Polish design.",
          },
          {
            label: "Round one findings",
            body: "An initial usability test on the UK market uncovered issues with understanding the UI: users had varying interpretations of the progress bar, didn't find the collection window urgent enough, and were confused about how many parcels were waiting for them in the locker.",
          },
        ],
      },
      {
        kind: "numbered",
        heading: "New design recommendations",
        items: [
          {
            title: "Progress bar colour",
            body: "Changed progress bars to a light red/orange colour to signal urgency and fix a colour-accessibility issue - yellow wasn't accessible on the grey or white background.",
          },
          {
            title: "Progress direction",
            body: "Changed the direction of the progress bars to decrease rather than progress, indicating time running out.",
          },
          {
            title: "Parcel counter",
            body: "Added a parcel counter for parcels ready to collect, preventing misunderstandings about how many are waiting.",
          },
          {
            title: "Time format",
            body: "Changed the time-left format to a rough number of hours rather than an exact date - this felt more urgent to users and encouraged them to collect parcels promptly rather than leaving it to the last minute.",
          },
        ],
      },
      {
        kind: "quote",
        heading: "Second round of testing",
        text: "100% of users mentioned they chose this design because of the colour red and the urgency it signifies.",
        attribution: "Usability testing, round 2",
      },
      {
        kind: "beforeAfterImages",
        heading: "Tested design vs new design",
        items: [
          {
            label: "Tested design",
            media: {
              kind: "image",
              image: {
                src: "/projects/rapid-uk-launch/tracking-tested.png",
                width: 440,
                height: 940,
                alt: "Tested parcel tracking design with grey progress bars",
              },
            },
          },
          {
            label: "New design",
            media: {
              kind: "image",
              image: {
                src: "/projects/rapid-uk-launch/tracking-new.png",
                width: 450,
                height: 940,
                alt: "New parcel tracking design with red and orange urgency progress bars and a parcel counter",
              },
            },
          },
        ],
      },
      {
        kind: "quote",
        id: "locker-search",
        heading: "Locker search",
        text: "Another important flow, locker search, was redesigned with locker capacity. In the UK it's been important to show users locker capacity, as lockers would overfill quite often.",
      },
      {
        kind: "beforeAfterImages",
        heading: "Polish design vs new UK design",
        items: [
          {
            label: "Polish design",
            media: {
              kind: "image",
              image: {
                src: "/projects/rapid-uk-launch/locker-polish.png",
                width: 430,
                height: 945,
                alt: "Polish locker map design showing a list of nearby InPost points",
              },
            },
          },
          {
            label: "New UK design",
            media: {
              kind: "image",
              image: {
                src: "/projects/rapid-uk-launch/locker-new.png",
                width: 590,
                height: 980,
                alt: "New UK locker map design with capacity indicators shown on the map pins",
              },
            },
          },
        ],
      },
      {
        kind: "heading",
        id: "design-system-rebuild",
        text: "Design System Rebuild",
      },
      {
        kind: "twoCol",
        items: [
          {
            label: "Typography - before",
            body: "40+ text styles, many of which were nearly identical and could be merged.",
          },
          {
            label: "Typography - after",
            body: "Clustered styles into buckets by role - Title, Label, Caption - each with small, medium and large sizes, plus a dedicated style for large marketing slogans.",
          },
        ],
      },
      {
        kind: "twoCol",
        items: [
          {
            label: "Colour tokens - before",
            body: "60+ colour tokens with no naming logic - colours were named things like 'Gray 1' or 'Gray 2' with no function specified.",
          },
          {
            label: "Colour tokens - after",
            body: "Renamed colours based on function (e.g. 'surface', 'on-surface'), designed with dark mode in mind, and adjusted for accessibility.",
          },
        ],
      },
      {
        kind: "quote",
        heading: "Colour accessibility",
        text: "All new brand colours were tested against accessibility standards and adjusted with the right font styles they could be used with. Some colours had to be adjusted slightly to meet accessibility criteria.",
      },
      {
        kind: "numbered",
        heading: "Reworking & documenting components",
        items: [
          {
            title: "Documentation",
            body: "Created documentation for every component, describing its anatomy, spacing and colours.",
          },
          {
            title: "Patterns",
            body: "Created concise patterns for certain components, like error and success messages.",
          },
        ],
      },
      {
        kind: "numbered",
        id: "collaboration",
        heading: "Collaboration",
        items: [
          {
            title: "Product",
            body: "Worked with the UK PM to define phased scope and product priorities.",
          },
          {
            title: "Engineering",
            body: "Coordinated with the Polish dev team to align on feasibility, and partnered with brand and marketing for UK visual alignment.",
          },
          {
            title: "Remote support",
            body: "Created async updates, video walkthroughs, and annotated files to support the remote team.",
          },
          {
            title: "QA",
            body: "Supported the QA team with accessibility test criteria.",
          },
        ],
      },
      {
        kind: "numbered",
        heading: "What I planned to do next",
        items: [
          {
            title: "Structural redesign",
            body: "Move from patch-layer UX to a full structural redesign of core flows.",
          },
          {
            title: "Multi-platform design system",
            body: "Expand the design system into a multi-platform tokenised system across web, app and parcel machine UI.",
          },
          {
            title: "Design QA",
            body: "Introduce design QA and developer-friendly documentation.",
          },
          {
            title: "Post-launch testing",
            body: "Run usability testing in the UK market to validate flow assumptions post-launch.",
          },
          {
            title: "Motion guidelines",
            body: "Build motion and interaction guidelines into the design system instead of one-off animations.",
          },
          {
            title: "Localisation strategy",
            body: "Create a scalable UX strategy for future localisation (e.g. DE, FR, ES).",
          },
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
      { id: "quick-summary", label: "Project at a Glance" },
      { id: "process", label: "Process" },
      { id: "impact", label: "Impact" },
      { id: "business-objectives", label: "Business Objectives" },
      { id: "flow-overview", label: "Flow overview" },
      { id: "design-process", label: "Design process" },
      { id: "benchmark-research", label: "Benchmark research" },
      { id: "parcel-cover", label: "Parcel cover" },
      { id: "summary-page", label: "Summary page" },
      { id: "usability-testing", label: "Usability testing" },
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
        "The UK InPost app didn't allow customers to send parcels, even though the feature already existed in the Polish version. The challenge was to adapt the existing experience for UK users while working within a short delivery timeline and existing technical constraints.",
        "Rather than redesigning the entire journey, I enhanced the existing flow by introducing UK-specific functionality, improving usability, simplifying key interactions and reducing friction throughout the experience.",
      ],
      roleDetails: [
        [
          {
            label: "Role",
            value: "Lead Product Designer",
            description:
              "Led the end-to-end UX and UI design of the parcel sending experience for the UK InPost app.",
          },
          {
            label: "Scope",
            value:
              "End-to-end UX & UI, from discovery through delivery, including user research, prototyping and usability testing.",
          },
        ],
        [
          { label: "Core team", value: "Product Manager • Engineering" },
          { label: "Collaboration teams", value: "Marketing • Customer Experience" },
          { label: "Platforms", value: "iOS • Android" },
        ],
      ],
      goals: {
        label: "Project goals",
        items: [
          "Launch parcel sending for UK customers using the existing Polish product as the foundation.",
          "Adapt the experience to UK users' expectations and market requirements.",
          "Introduce UK-specific functionality such as parcel cover.",
          "Improve clarity, usability and conversion without rebuilding the entire flow.",
        ],
      },
      constraintsLabel: "Key constraints",
      constraints: [
        "Short delivery timeline.",
        "Existing Polish flow had to be reused.",
        "Limited engineering capacity, so improvements focused on UX enhancements rather than a full redesign.",
      ],
      process: {
        intro: "Research & UX input:",
        items: [
          "Competitor analysis (Evri, Royal Mail, Yodel, etc.)",
          "UX benchmarking using Baymard Institute findings",
          "Usability testing on prototypes to validate sizing, pricing, and summary flow",
          "Key findings: users needed clear step structure, editable order details, visual sizing help, real-time price updates, and clearer parcel cover explanation.",
        ],
      },
      keyDecisions: [
        "Added stepper to show progress + reduce drop-off",
        "Introduced address lookup to prevent delivery failures",
        "Added parcel cover add-on (UK-specific revenue feature)",
        "Made all details editable in Summary (before payment)",
        "Added ETA and delivery info earlier in flow + on summary page",
        "Improved visual clarity of sizing, pricing, and up-sell states",
        "Added promo code support and clearer price breakdown",
      ],
      outcomes: [
        { value: "25–30%", label: "reduction in address entry time after introducing address lookup, which also helped prevent errors" },
        { value: "~15%", label: "fewer abandoned parcels after making the summary editable, so users could fix issues without restarting" },
      ],
      qualitative: [
        { body: "Added new revenue stream via parcel cover + promo functionality" },
        { body: "9/10 users successfully edited parcel size and details during testing" },
        { body: "Improved clarity around ETA and parcel value, reducing decision hesitation on the new market" },
        { body: "Created foundation for future UX metric tracking across send flow - followed with a UX Metrics Workshop with the team" },
      ],
    },
    fullCaseStudy: [
      {
        kind: "lead",
        items: [
          {
            label: "My role",
            body: "As a Product Designer for UK app team, I designed the process of sending the parcel in the UK app.",
          },
          {
            label: "Overview",
            body: "The new feature was introduced in the UK based on already working feature in the Polish app. In this project I enhanced elements of the existing process and adapted it for the UK market.",
          },
        ],
      },
      {
        kind: "statement",
        tone: "dark",
        text:
          "There is no current process of sending a parcel inside the UK app. The biggest challenge was to deliver the project very quicky and with existing constraints from the Polish market. We couldn't re-design the process entirely due to tight deadlines but decided to enhance it as much as we can.",
      },
      {
        kind: "numbered",
        id: "business-objectives",
        heading: "Business Objectives",
        items: [
          {
            title: "Provide UK users with possibility of sending parcels in app as soon as possible",
            body: "by introducing feature which is already existing in Poland. The feature would bring significant earnings.",
          },
          {
            title: "Introduce extra feature inside send - parcel cover",
            body: "which is not available in Poland but widely used in UK market. That would bring extra earnings.",
          },
        ],
      },
      {
        kind: "heading",
        id: "flow-overview",
        text: "Flow overview - final design",
      },
      {
        kind: "image",
        size: "full",
        image: {
          src: "/projects/send-parcel-in-app/flow-overview.png",
          width: 1470,
          height: 1710,
          alt: "Six-screen flow of the final send-a-parcel design: send to, recipient, parcel details, sender, summary, and ready to drop off",
        },
      },
      {
        kind: "steps",
        id: "design-process",
        heading: "Design process",
        items: [
          {
            title: "Project kick-off",
            body: "Project kick-off to discuss business objectives, challenges and success criteria of the project",
          },
          {
            title: "Benchmark research",
            body: "Gathering best practices and coming up with general UX recommendations for the flow",
          },
          {
            title: "Initial wireframes",
            body: "Simple sketches/wireframes outlining the proposed changes to be presented to stakeholders and engineering team",
          },
          {
            title: "Usability testing",
            body: "Usability testing on first wireframes/designs to establish if the changes are effective and beneficial to the users",
          },
          {
            title: "Refining designs",
            body: "Final changes to the design that came from feedback from stakeholders, developers and users during usability testing",
          },
          {
            title: "Final designs & handover",
            body: "Final design presentation and handover to the engineering team",
          },
          {
            title: "Establishing metrics",
            body: "After this project is finished I planned to run a Design Metrics workshop where I would work with stakeholders and engineering team to establish metrics for this flow.",
          },
        ],
      },
      {
        kind: "numbered",
        id: "benchmark-research",
        heading: "Benchmark research & general UX recommendations",
        intro:
          "There's no current metrics being measured on this flow besides general conversion so I decided to do competitors' and UX research and see if I can include any good UX practices into this flow.",
        items: [
          {
            title: "Include stepper at the top",
            body: "Include information on how many steps user has to complete to send a parcel. This prevents users' uncertainty, provides easier navigation and prevents user drop off rate during process.",
          },
          {
            title: "Add address lookup when choosing address",
            body: "A lot of undelivered parcels are currently undelivered due to issues with address entered incorrectly. Address lookup will prevent mistakes in manually typed home addresses.",
          },
          {
            title: "Make options in summary page fully editable from that page",
            body: "Users need to be able to edit all details before proceeding with payment. This prevents from users dropping off at this step and starting new process of sending. Allow users to edit data directly at the “Order Review” step (38% get it wrong) - source: Baymard Institute.",
          },
          {
            title: "Include clear, step-by-step 'send a parcel' information at the end",
            body: "Guided collection steps make users feel confident and informed. This will educate about the still fairly new concept of lockers in the UK.",
          },
          {
            title: "Include ETA on home page and summary page",
            body: "According to Baymard Institute this is one of crucial information that should be included at the beginning and the end of purchase process. It will enable users to make quicker decisions between choosing options and confirm choice at the end.",
          },
          {
            title: "Inform about any price changes during the process",
            body: "Communicate clearly any price changes when user changes size or delivery method. This will prevent from uncertainty and abandoned checkouts. What information to display at the “Order Review” step (12% get it wrong) - source: Baymard Institute. Display visually a change in price after editing information in order review.",
          },
        ],
      },
      {
        kind: "heading",
        id: "parcel-cover",
        text: "New designs - parcel cover",
      },
      {
        kind: "image",
        size: "medium",
        image: {
          src: "/projects/send-parcel-in-app/parcel-cover.png",
          width: 625,
          height: 925,
          alt: "Parcel details screen with a new full-value coverage add-on block, priced at plus fifty pence",
        },
      },
      {
        kind: "numbered",
        heading: "Key changes - parcel cover, a new section",
        items: [
          {
            title: "Extra cover block",
            body: "Extra parcel cover block is appearing when user types in an amount of £25 or larger.",
          },
          {
            title: "Extra up-sell pop up",
            body: "There's an extra pop-up appearing persuading users to buy an extra cover. The pop up appears when user entered parcel value larger than £25 and tries to continue without choosing the cover.",
          },
          {
            title: "More information about cover",
            body: "There's more information hidden in bottom sheet outlining rules and benefits of parcel cover.",
          },
        ],
      },
      {
        kind: "numbered",
        id: "summary-page",
        heading: "Key changes - summary page",
        items: [
          {
            title: "Message block",
            body: "Extra message block at the top of the Summary page with information to check all details. Details of the parcel cannot be amended after making a payment. Cancellation and refund would have to be done.",
          },
          {
            title: "Clear titles",
            body: "Clear titles were added throughout the page to sort the content better and making it clearer to skip through for the user.",
          },
          {
            title: "Location and estimated times",
            body: "Sending location added more clearly and estimated arrival time mentioned. Arrival time is very important for senders however we didn't want to overpromise delivery times, therefore it is not too prominent.",
          },
          {
            title: "Editable details",
            body: "Details can be edited from this point in the flow without the need to go back in the process.",
          },
          {
            title: "Editable size",
            body: "Editable size has also been introduced as it wasn't available in the Polish flow. It helps user to change the size quickly before payment.",
          },
          {
            title: "Price summary",
            body: "Price summary was added at the bottom of the page. It is especially useful when more add-ons are being chosen (eg. extra cover or discount applied).",
          },
          {
            title: "Promotion",
            body: "New feature added - users can apply promo code before continuing to the payment.",
          },
        ],
      },
      {
        kind: "numbered",
        id: "usability-testing",
        heading: "Usability testing results",
        intro: "Example questions from usability testing and their impact on the final design.",
        items: [
          {
            title: "In how many days is the parcel expected to arrive when sent directly to door?",
            body: "More than 50% of users answered correctly, though some didn't find the answer right away - several missed the estimated dates being at the top (4/9), 2 users checked whether estimated delivery times would change if they changed the parcel size, and only 3/9 answered without any hesitation. The reviewed design, with estimated dates and address options made more prominent, caused no confusion.",
          },
          {
            title: "Preferred icon for the 'Send' feature on the navigation bar",
            body: "Given 3 different icon options, 55.6% of participants (5) preferred Icon A, 11% (1) preferred Icon C, and the remainder preferred Icon B.",
          },
          {
            title: "Change the parcel size from Small to Medium at the summary step",
            body: "9/10 users changed the size successfully at the summary page. 1 user didn't realize right away that they could scroll down but in the end managed to choose the right size.",
          },
        ],
      },
    ],
  },
  {
    slug: "establishing-design-metrics",
    title: "Establishing design metrics for key flow in the app",
    shortTitle: "Establishing design metrics",
    client: "InPost",
    color: "#7C3AED",
    toc: [
      { id: "quick-summary", label: "Quick Summary" },
      { id: "process", label: "Process" },
      { id: "impact", label: "Impact" },
      { id: "approach", label: "Approach" },
      { id: "flow", label: "Send a parcel flow" },
      { id: "key-metrics", label: "Key Metrics" },
    ],
    quickRead: {
      tagline:
        "Led a pilot Design Metrics Workshop to establish actionable UX metrics for the 'Send a Parcel' flow.",
      heroImage: {
        src: "/projects/establishing-design-metrics/hero.png",
        width: 430,
        height: 940,
        alt: "InPost send a parcel screen showing locker or home address delivery options and size selection",
      },
      challenge: [
        "Our teams often relied on anecdotal evidence or business KPIs like conversion or retention, without clear visibility into user-centered design metrics. There was no unified framework for tracking how design changes affect user experience or business value, which led to misalignment between product, data, and design teams.",
        "Lack of shared metrics caused repeated work and inconsistent evaluation of feature success. Design impact was hard to prove - especially for UX optimisations that don't directly tie to revenue. Establishing a repeatable process for design metrics would help shift the culture toward data-informed design and accountability.",
      ],
      role:
        "Senior Product Designer. To improve how our product team measures design impact, I led a pilot Design Metrics Workshop focused on the 'Send a Parcel' flow in our mobile app.",
      process: {
        intro:
          "The goal was to identify actionable metrics tied to user experience and business outcomes, and to create a reusable workshop template for future use across other flows. The workshop was conducted with two groups of stakeholders - including designers, product managers, and engineers - to ensure metrics were both measurable and meaningful across functions.",
        items: [
          "framed the workshop goal: define measurable UX and behavioural metrics for each step of the Send a Parcel journey",
          "ran two 90-minute collaborative sessions with cross-functional groups",
          "defined ownership - each metric was linked to a data or product owner for implementation",
          "held follow-up and retrospective sessions to discuss the format of the workshop",
          "documented learnings in a shared template to guide future design metric workshops across the company",
        ],
      },
      keyDecisionsLabel: "Metrics established",
      keyDecisions: [
        "Time on task for address lookup",
        "% of users editing parcel details on the summary screen",
        "Locker search speed",
        "% of undelivered or returned parcels due to bad address",
        "Draft conversion rate",
        "Payment method conversion",
        "Repeated recipient rate",
      ],
      outcomes: [],
      qualitative: [
        {
          title: "8+ actionable UX metrics",
          body: "A set of 8+ actionable UX metrics identified for the Send a Parcel flow",
        },
        {
          title: "Reusable workshop template",
          body: "Created for use across other product areas",
        },
        {
          title: "Cross-team alignment",
          body: "Achieved between design, product, and data stakeholders",
        },
        {
          title: "Follow-up sessions initiated",
          body: "With product managers and data teams to integrate the metrics into tracking dashboards",
        },
      ],
    },
    fullCaseStudy: [
      {
        kind: "steps",
        id: "approach",
        heading: "Approach",
        items: [
          {
            title: "Framing the goal",
            body: "Defined measurable UX and behavioural metrics for each step of the Send a Parcel journey.",
          },
          {
            title: "Collaborative sessions",
            body: "Ran two 90-minute workshops with cross-functional groups.",
          },
          {
            title: "Defining ownership",
            body: "Each metric was linked to a data or product owner for implementation.",
          },
          {
            title: "Follow-up and retrospection",
            body: "Shortly after the workshops, we held team follow-up sessions to discuss the format of the workshop.",
          },
          {
            title: "Documenting learnings",
            body: "Documented learnings in a shared template to guide future design metric workshops across the company.",
          },
        ],
      },
      {
        kind: "heading",
        id: "flow",
        text: "Send a parcel flow",
      },
      {
        kind: "image",
        size: "full",
        image: {
          src: "/projects/send-parcel-in-app/flow-overview.png",
          width: 1470,
          height: 1710,
          alt: "Six-screen Send a Parcel flow examined during the workshop: send to, recipient, parcel details, sender, summary, and ready to drop off",
          caption: "The flow examined during the workshop.",
        },
      },
      {
        kind: "numbered",
        id: "key-metrics",
        heading: "Key Metrics",
        intro: "Seven examples of the actionable UX metrics established during the workshop.",
        items: [
          {
            title: "1. Time on task (address lookup)",
            body: "Definition: time spent searching for the recipient's address, measured from when the user starts typing to selecting an address from the list. Why it matters: a long completion time may indicate low search accuracy or a confusing UI hierarchy.",
          },
          {
            title: "2. % of users editing parcel details on the summary screen",
            body: "Definition: percentage of users who return to edit parcel details (e.g. size or cover) after reaching the summary step. Why it matters: frequent edits at this stage may suggest earlier steps lack clarity, or that users are unsure about their previous choices.",
          },
          {
            title: "3. Locker search speed",
            body: "Definition: % of users who find their preferred locker or shop within 15 seconds during the recipient details step. Why it matters: slow searches may indicate poor search performance, unclear results, or decision overload.",
          },
          {
            title: "4. % of undelivered or returned parcels due to bad address",
            body: "Definition: proportion of parcels marked undelivered or returned because of incorrect or incomplete address data. Why it matters: a high rate signals that input validation and address accuracy need improvement, and it impacts customer satisfaction and support costs.",
          },
          {
            title: "5. Draft conversion rate",
            body: "Definition: % of users who save a parcel as a draft and later complete the purchase. Why it matters: shows whether users are abandoning due to friction or uncertainty, and how often they re-engage later.",
          },
          {
            title: "6. Payment method conversion",
            body: "Definition: % of successful label purchases broken down by payment method. Why it matters: identifies whether specific payment methods correlate with higher drop-offs or errors.",
          },
          {
            title: "7. Repeated recipient rate",
            body: "Definition: % of users sending multiple parcels to the same recipient (name + phone + postcode) within 180 days. Why it matters: shows potential for efficiency features, such as 'Saved Recipients', to reduce repetitive input.",
          },
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
 * (image + title + subtitle) and a four-field quick summary only. No
 * fullCaseStudy, no toc, no quickRead - the /projects/[slug] route renders
 * these through a separate, shorter template.
 */
export type ArchiveProject = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: ProjectImage;
  /** Overrides the media shown on the /archive listing card; falls back to heroImage when absent. */
  cardMedia?: MediaSlot;
  /** Overrides the card's media-container background (ProjectCard defaults to bg-paper-dim). */
  mediaBackground?: string;
  quickSummary: {
    role: string;
    overview: string;
    contribution: string;
    outcome: string;
  };
};

const PLACEHOLDER_QUICK_SUMMARY = {
  role: "[Add role]",
  overview: "[Add a concise summary of the project, problem and context.]",
  contribution: "[Add the key work and responsibilities.]",
  outcome: "[Add the result, impact or final deliverable.]",
};

export const archiveProjects: ArchiveProject[] = [
  {
    slug: "designability",
    title: "Designability",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/designability/designability-hero-placeholder.png",
      width: 1600,
      height: 1200,
      alt: "Designability - placeholder image",
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
    quickSummary: PLACEHOLDER_QUICK_SUMMARY,
  },
  {
    slug: "tigi",
    title: "TIGI",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/tigi/tigi-hero-placeholder.png",
      width: 1600,
      height: 1200,
      alt: "TIGI - placeholder image",
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
    quickSummary: PLACEHOLDER_QUICK_SUMMARY,
  },
  {
    slug: "migarage",
    title: "MiGarage",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/migarage/migarage-hero-placeholder.png",
      width: 1600,
      height: 1200,
      alt: "MiGarage - placeholder image",
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
    quickSummary: PLACEHOLDER_QUICK_SUMMARY,
  },
  {
    slug: "creative-xr",
    title: "Creative XR",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/creative-xr/creative-xr-hero-placeholder.png",
      width: 1600,
      height: 1200,
      alt: "Creative XR - placeholder image",
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
    quickSummary: PLACEHOLDER_QUICK_SUMMARY,
  },
  {
    slug: "futurescope",
    title: "Futurescope",
    subtitle: "[Add project subtitle]",
    heroImage: {
      src: "/projects/futurescope/futurescope-hero-placeholder.png",
      width: 1600,
      height: 1200,
      alt: "Futurescope - placeholder image",
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
    quickSummary: PLACEHOLDER_QUICK_SUMMARY,
  },
];

export function getArchiveProjectBySlug(slug: string) {
  return archiveProjects.find((p) => p.slug === slug);
}
