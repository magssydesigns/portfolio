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
  | { kind: "numbered"; id?: string; heading?: string; intro?: string; showArrow?: boolean; itemStyle?: "plain"; spacing?: "tight"; paddingTop?: number; paddingBottom?: number; items: { title: string; body: string }[] }
  | { kind: "image"; id?: string; image: ProjectImage; size?: "medium" | "wide" | "full" }
  | { kind: "beforeAfterStats"; id?: string; heading?: string; items: { label: string; before: string; after: string; description: string }[] }
  | { kind: "quote"; id?: string; heading?: string; text: string; attribution?: string }
  | { kind: "steps"; id?: string; heading?: string; spacing?: "tight"; items: { title: string; body: string }[] }
  | { kind: "twoCol"; id?: string; heading?: string; spacing?: "tight"; items: { label: string; body: string }[] }
  | { kind: "mediaNumbered"; id?: string; heading?: string; media: MediaSlot; items: { title: string; body: string }[] }
  | {
      kind: "beforeAfterImages";
      id?: string;
      heading?: string;
      spacing?: "tight";
      bordered?: boolean;
      /** Overrides the default 50%-of-column image cap (tuned for narrow phone mockups); set to 100 for wider screenshots that need to stay legible. */
      imageMaxWidthPercent?: number;
      items: { label: string; media: MediaSlot }[];
    }
  /** Icon-prefixed sub-heading + rich (partial-bold) paragraphs + single image - used for the Tracking European "Design changes" callouts. */
  | {
      kind: "calloutSection";
      id?: string;
      heading: string;
      paragraphs: { text: string; bold?: boolean }[][];
      media: MediaSlot;
      bordered?: boolean;
      /** Overrides the default 50%-width desktop image size for this section only. Mobile is always full width. */
      desktopWidthPercent?: number;
    }
  /** Icon-prefixed heading + two side-by-side (mobile: stacked) images + a two-column numbered breakdown - used for Tracking European's "Parcel list" redesign. */
  | {
      kind: "numberedShowcase";
      id?: string;
      heading: string;
      images: [MediaSlot, MediaSlot];
      bordered?: boolean;
      leftItems: { title: string; body: string }[];
      rightItems: { title: string; body: string }[];
    }
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
      /** Content-safe mobile-only zoom tier for screenshots/mock-ups that sit small inside a large card on narrow viewports. */
      mobileZoom?: "sm" | "md" | "lg";
      /** Replaces media with a swipeable, dot-navigated carousel of these images below the lg breakpoint only. Desktop keeps media unchanged. */
      mobileCarousel?: ProjectImage[];
      /** Overrides the carousel slide's default 85%-width image sizing (percentage of slide width). */
      mobileCarouselImageScale?: number;
      /** Video only: swaps in this source below 768px via a native <source media> query. Desktop keeps the video's own src unchanged. */
      mobileSrc?: string;
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
  /** Overrides midMedia's max-width in px (default 864). */
  midMediaMaxWidth?: number;
  /** Small left-aligned caption shown under midMedia. */
  midMediaHint?: string;
  /** Content-safe mobile-only zoom tier for midMedia, same treatment as Block["media"].mobileZoom. */
  midMediaMobileZoom?: "sm" | "md" | "lg";
  /** Crops midMedia into a 4:5 portrait container below the md breakpoint (768px) (object-fit: cover, centred) - for a wide landscape video/image whose subject occupies a small central area. Desktop keeps the natural aspect ratio and composition. */
  midMediaMobilePortrait?: boolean;
  /** For a video midMedia: swaps in a natively-portrait video source below 768px via a <source media> query, instead of (or alongside) CSS-cropping the desktop source. Desktop keeps midMedia.video.src unchanged. */
  midMediaMobileSrc?: string;
  /** Replaces midMedia with a swipeable, dot-navigated carousel of these images below the lg breakpoint only. Desktop keeps rendering midMedia unchanged. */
  midMediaMobileCarousel?: ProjectImage[];
  keyDecisionsLabel?: string;
  keyDecisions?: string[];
  /** Swaps the default dash bullet for the same blue arrow used in Business Objectives / Process. */
  keyDecisionsShowArrow?: boolean;
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
  /** Content-safe mobile-only zoom tier for the stacked hero image, same treatment as Block["media"].mobileZoom. */
  heroImageMobileZoom?: "sm" | "md" | "lg";
  /** Renders the shared Divider directly below the hero, before the Quick Read section begins. */
  heroDividerBelow?: boolean;
  /** Drops the hero's bottom padding (like heroDividerBelow) without inserting a divider - for a flat px gap owned entirely by the next section's top padding. */
  heroFlushBottom?: boolean;
  darkText?: boolean;
  /** Renders the standalone "Project at a glance" section below the hero, before the Quick Read/full case study content. */
  projectAtAGlance?: ProjectAtAGlanceData;
  /** Exact px gap above "Project at a glance" - pairs with heroFlushBottom to hit a flat rhythm regardless of breakpoint. */
  glancePaddingTop?: number;
  /** Overrides the default 32px gap below "Project at a glance" (before Quick summary/Quick read) when there's no divider. */
  glancePaddingBottom?: number;
  /** Inserts a SectionDivider between "Project at a glance" and the Quick summary/Quick read section that follows (and zeroes the glance section's own bottom padding so the divider owns the full 32px rhythm). */
  glanceDividerBelow?: boolean;
  /** Renders an interactive prototype embed between "Project at a glance" and "Quick summary" (e.g. when the hero itself is text-only). */
  midEmbed?: { src: string; title: string };
  /** The project's primary opening visual, rendered between "Project at a glance" and "Quick summary" - takes precedence over midEmbed as the main opening visual when both might otherwise apply. */
  heroVisual?: {
    media: MediaSlot;
    mobileCarousel?: ProjectImage[];
    /** Caption shown under the visual, left-aligned (matches QuickRead's midMediaHint treatment). */
    hint?: string;
    /** A secondary text link shown below the visual, e.g. out to a live/interactive prototype. */
    prototypeLink?: { href: string; label: string };
  };
  /** An always-visible framing section rendered directly after "Quick summary" (before the "Continue reading"-gated full case study) - for a project that wants to introduce a secondary storyline (e.g. parallel design-system work) ahead of the narrative detail. */
  openingNote?: {
    heading: string;
    paragraph: string;
    columns: [{ heading: string; items: string[] }, { heading: string; items: string[] }];
  };
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
    glancePaddingBottom: 56,
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
          "Mapping market journeys and comparing differences",
          "Unmoderated usability test with users across 4 markets",
          "Defining shared patterns and painpoints from usability tests and consolidating feedback",
          "Actioning user's pain points in new redesign",
          "Re-testing new design with another batch of users",
          "Alignment on the new design with stakeholders",
          "Design refinement and developer hand off",
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
      midMediaMobileSrc: "/projects/scaling-parcel-tracking/tracking-mobileonly.mp4",
      keyDecisionsShowArrow: true,
      keyDecisions: [
        "Designed more visual components that are flexible, reusable and used in one global design system",
        "Designed tracking experience that was addressing users' needs from different markets and adhering to different logistic systems in each market",
        "Designed reusable tracking patterns that could accommodate local delivery differences",
        "Added more transparency when communicating parcels' delays",
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
        kind: "calloutSection",
        heading: "Making tracking more visual and connected to contextual actions",
        bordered: true,
        paragraphs: [
          [
            { text: "At the top of the redesigned experience, I introduced " },
            {
              text: "a visual timeline component that brings together parcel status, time of arrival, and any actions the user needs to take contextually.",
              bold: true,
            },
            {
              text: " This component was designed to clearly visualise the parcel journey, highlight the next steps, and surface anything the user needs to do right now.",
            },
          ],
          [
            { text: "The redesigned view also brings the " },
            {
              text: "most important information together in one place: collection code, location, opening hours, directions, parcel details and clear pickup guidance",
              bold: true,
            },
            { text: ", so users can scan the screen and take action faster." },
          ],
        ],
        media: {
          kind: "image",
          image: {
            src: "/projects/scaling-parcel-tracking/tracking-after1.png",
            width: 5311,
            height: 5133,
            alt: "Annotated parcel info screen showing location, contextual actions, status and collection deadline, and CTA to view full tracking",
          },
        },
      },
      {
        kind: "calloutSection",
        heading: "Making delivery issues visible and actionable",
        bordered: true,
        paragraphs: [
          [
            { text: "Research showed that when something went wrong with a parcel, " },
            { text: "users valued transparency more than a reassuring-looking experience.", bold: true },
            {
              text: " A delay or failed delivery was frustrating, but uncertainty about what was happening created even more anxiety.",
            },
          ],
          [
            { text: "I introduced" },
            { text: " clear delay states", bold: true },
            {
              text: " directly into the visual tracking timeline, explaining delays and delivery problems at the point they occurred. ",
            },
            {
              text: "Contextual actions such as “I’m not going to be in” and “I need more help” gave users an immediate next step",
              bold: true,
            },
            { text: " when they wanted to act, rather than leaving them to search elsewhere for support." },
          ],
        ],
        media: {
          kind: "image",
          image: {
            src: "/projects/scaling-parcel-tracking/Tracking-issues.png",
            width: 5311,
            height: 5229,
            alt: "Two parcel info screens showing a delayed delivery with an ‘I'm not going to be in’ action, and a returned parcel with an ‘I need more help’ action",
          },
        },
      },
      {
        kind: "calloutSection",
        heading: "Keeping detailed tracking accessible without clutter",
        bordered: true,
        desktopWidthPercent: 65,
        paragraphs: [
          [
            {
              text: "The CX team highlighted that detailed parcel history still needed to be available for customers who wanted to understand exactly what had happened during the journey. Showing all of that information by default, however, would have made the main tracking view dense and harder to scan.",
            },
          ],
          [
            { text: "I used" },
            {
              text: " progressive disclosure to keep the primary experience focused on the current status and next action,",
              bold: true,
            },
            { text: " while making the full tracking history naturally " },
            { text: "discoverable through “View all details.”", bold: true },
            {
              text: " Customers could then expand individual events when they needed more context, without that level of detail competing with the information most relevant in the moment.",
            },
          ],
        ],
        media: {
          kind: "image",
          image: {
            src: "/projects/scaling-parcel-tracking/tracking-disclosure.png",
            width: 6739,
            height: 5136,
            alt: "Parcel info screen next to the expanded tracking details view, annotated to show progressive disclosure of detailed tracking information",
          },
        },
      },
      {
        kind: "numberedShowcase",
        heading: "Parcel list: Clearer way of sorting incoming parcels",
        bordered: true,
        images: [
          {
            kind: "image",
            image: {
              src: "/projects/scaling-parcel-tracking/parcel-list-after-1.png",
              width: 5311,
              height: 5229,
              alt: "Redesigned parcel list showing an out-for-delivery card with a status label and manage action, annotated with clear labels, contextual action, pickup location, collection deadline and multi-parcel number",
            },
          },
          {
            kind: "image",
            image: {
              src: "/projects/scaling-parcel-tracking/parcel-list-after-2.png",
              width: 5311,
              height: 5229,
              alt: "Redesigned parcel list showing a redirected parcel card and shipped status, annotated with redirection label, contextual action, key action CTA and enhanced shipped status",
            },
          },
        ],
        leftItems: [
          {
            title: "1. Clear status labels",
            body: "Added concise, scannable labels to surface the most important information at a glance — such as “Arriving today 2–4 PM”, “Redirected to Shop” and “Multi-parcel.” This helped users understand the parcel state without needing to open the detail view.",
          },
          {
            title: "2. Location made more prominent",
            body: "Research showed that collection and delivery location was key information users expected to see immediately. I brought the address directly into each parcel card so users could quickly understand where their parcel was going or waiting for collection.",
          },
          {
            title: "3. Contextual actions",
            body: "Actions were tailored to the parcel state and placed alongside the information they relate to. For example, “Manage” gives users control over an upcoming delivery, while “Directions” provides immediate navigation to a redirected collection point.",
          },
          {
            title: "4. Key action kept prominent",
            body: "High-frequency actions such as “Open remotely” remained highly visible and in a consistent position. Keeping this familiar behaviour reduced unnecessary relearning while making the primary action easy to find.",
          },
          {
            title: "5. Making multi-parcel deliveries clearer",
            body: "Multi-parcel deliveries were unfamiliar to users in several markets, so I added an explicit “Multi-parcel” label and the number of parcels directly to the card. This made it clearer that several items belonged to the same delivery.",
          },
        ],
        rightItems: [
          {
            title: "6. Faster access to collection points",
            body: "For parcels redirected to a shop or locker, I added a “Directions” action next to the collection location. This gave users a direct route into navigation without requiring them to search for the address separately.",
          },
          {
            title: "7. Collection deadlines surfaced visually",
            body: "Collection time limits were made more prominent through a dedicated progress indicator and urgency states. The treatment becomes more noticeable as the deadline approaches, helping users understand when action is needed without competing with the primary CTA.",
          },
          {
            title: "8. Shipping information added to the card",
            body: "Research showed that users valued knowing when a parcel had actually entered the delivery journey. I surfaced the exact shipped date and time directly on the parcel card, making this information available without requiring users to open the full tracking history.",
          },
          {
            title: "9. Clearer hierarchy across parcel states",
            body: "The redesigned cards use stronger hierarchy to distinguish what matters for each parcel state — current status, location, timing and the most relevant action. Rather than giving every piece of information equal prominence, the card adapts to what the user is most likely to need at that moment.",
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
                src: "/projects/scaling-parcel-tracking/parcel-list-before.webp",
                width: 700,
                height: 3337,
                alt: "Before: the old “Shipment tracking” parcel list screen",
              },
            },
          },
          {
            label: "After",
            media: {
              kind: "image",
              image: {
                src: "/projects/scaling-parcel-tracking/parcel-list-after.webp",
                width: 700,
                height: 4037,
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
    heroImageMobileZoom: "sm",
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
      { id: "uk-launch-priorities", label: "UK launch priorities" },
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
        src: "/projects/rapid-uk-launch/App-launch.webp",
        width: 2600,
        height: 2049,
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
      midMediaMobilePortrait: true,
      midMediaMobileSrc: "/projects/rapid-uk-launch/onboarding-mobile.mp4",
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
        kind: "heading",
        id: "uk-launch-priorities",
        text: "What we prioritised for the UK launch",
        spacing: "tight",
        paddingBottom: 0,
      },
      {
        kind: "richText",
        paddingTop: 32,
        paragraphs: [
          "With only three months to launch, we couldn't bring every possible feature into the first UK release. I worked closely with Product and Engineering to decide what was genuinely important for UK customers, what we could safely inherit from the Polish app, and what could wait.",
        ],
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "Locker availability was a must-have",
        paddingTop: 32,
        paragraphs: [
          "One of the clearest UK-specific needs was locker availability. This wasn't a feature in the Polish app because the locker network in Poland is much denser — if one locker is full, there is usually another one nearby.",
          "That wasn't the same in the UK, where the network was still growing. I pushed for locker availability to be part of the launch because choosing a locker without knowing whether there was space could create a frustrating experience from the start.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        width: "reduced-70",
        media: { kind: "placeholder", label: "LOCKER AVAILABILITY / CAPACITY CHECKER" },
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "Collection deadlines needed much more support",
        paddingTop: 32,
        paragraphs: [
          "UK customers were also much less familiar with parcel lockers than users in Poland. Parcels only stay in a locker for a limited amount of time, and I didn't want customers to lose a parcel simply because they didn't understand when they needed to collect it.",
          "I made the collection deadline much more visible in the app, with clearer time-left messaging and stronger signposting as the deadline got closer.",
          "I also worked with Marketing and CX on supporting email communications for customers who weren't actively using the app. The experience couldn't rely on an app notification alone.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        width: "reduced-70",
        media: { kind: "placeholder", label: "TIME TO COLLECT — IN-APP EXAMPLES" },
      },
      {
        kind: "media",
        bordered: true,
        width: "reduced-70",
        media: { kind: "placeholder", label: "COLLECTION NOTIFICATIONS / EMAIL EXAMPLES" },
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "Remote opening could wait",
        paddingTop: 32,
        paragraphs: [
          "Remote opening was a feature I wanted in the product because it gave the app something the web experience couldn't offer — users could open the locker directly from their phone.",
          "But it wasn't essential for the first release. It also needed more in-person testing to make sure the interaction between the app and physical locker worked reliably.",
          "I classified it as a nice-to-have and we postponed it rather than adding more risk to an already tight launch.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        width: "reduced-70",
        media: { kind: "placeholder", label: "REMOTE OPENING — LATER FEATURE" },
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "What this meant for the launch",
        paddingTop: 32,
        paragraphs: [
          "The goal wasn't to fit as many features as possible into three months. It was to make sure the first UK version solved the problems that mattered most in this market.",
          "That meant introducing things that didn't exist in the Polish product, making some existing information much clearer, and being comfortable leaving a good feature out when it wasn't essential yet.",
        ],
      },
      {
        kind: "twoCol",
        spacing: "tight",
        items: [
          {
            label: "Must have for UK",
            body: "Locker availability, a clear collection deadline and supporting notifications.",
          },
          { label: "Later", body: "Remote opening." },
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
            src: "/projects/rapid-uk-launch/Final experience screenshot.webp",
            width: 2600,
            height: 1567,
            alt: "Four key UK app screens: animated onboarding, locker capacity checker, parcel tracking and pick-up details",
          },
        },
        mobileCarousel: [
          {
            src: "/projects/rapid-uk-launch/rapidlaunch-carousel-1/Final-experience-mobile-1.webp",
            width: 1300,
            height: 2307,
            alt: "Animated onboarding screen in the UK app",
            caption: "Animated onboarding",
          },
          {
            src: "/projects/rapid-uk-launch/rapidlaunch-carousel-1/Final-experience-mobile-2.webp",
            width: 1300,
            height: 2307,
            alt: "Locker finder and capacity checker screen in the UK app",
            caption: "Locker finder and capacity checker",
          },
          {
            src: "/projects/rapid-uk-launch/rapidlaunch-carousel-1/Final-experience-mobile-3.webp",
            width: 1300,
            height: 2307,
            alt: "Refreshed parcel tracking list screen in the UK app",
            caption: "Refreshed parcel tracking list",
          },
          {
            src: "/projects/rapid-uk-launch/rapidlaunch-carousel-1/Final-experience-mobile-4.webp",
            width: 1300,
            height: 2307,
            alt: "Parcel collection instructions screen in the UK app",
            caption: "Parcel collection instructions",
          },
        ],
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
            src: "/projects/rapid-uk-launch/Product and system audit screenshot.webp",
            width: 2600,
            height: 1556,
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
        mobileSrc: "/projects/rapid-uk-launch/parcel-list-mobile.mp4",
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
        mobileSrc: "/projects/rapid-uk-launch/onboarding-mobile.mp4",
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
        mobileSrc: "/projects/rapid-uk-launch/locker-search-mobile.mp4",
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
    heroImageMobileZoom: "sm",
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
        src: "/projects/send-parcel-in-app/send-hero.webp",
        width: 2100,
        height: 2519,
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
            src: "/projects/send-parcel-in-app/Final%20experience.webp",
            width: 2600,
            height: 3703,
            alt: "Final send-a-parcel experience screens for the UK app",
          },
        },
        mobileCarousel: [
          {
            src: "/projects/send-parcel-in-app/send-1.png",
            width: 2361,
            height: 5170,
            alt: "Final send-a-parcel experience screen 1",
          },
          {
            src: "/projects/send-parcel-in-app/send-2.png",
            width: 2361,
            height: 5170,
            alt: "Final send-a-parcel experience screen 2",
          },
          {
            src: "/projects/send-parcel-in-app/send-3.png",
            width: 2361,
            height: 5170,
            alt: "Final send-a-parcel experience screen 3",
          },
          {
            src: "/projects/send-parcel-in-app/send-4.png",
            width: 2361,
            height: 5170,
            alt: "Final send-a-parcel experience screen 4",
          },
          {
            src: "/projects/send-parcel-in-app/send-5.png",
            width: 2361,
            height: 5170,
            alt: "Final send-a-parcel experience screen 5",
          },
        ],
        mobileCarouselImageScale: 76.5,
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
        mobileSrc: "/projects/send-parcel-in-app/send-address-mobile.mp4",
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
          kind: "video",
          video: {
            src: "/projects/send-parcel-in-app/Send-change-size-desktop.mp4",
            width: 1412,
            height: 1080,
          },
          alt: "Editable Summary page showing parcel details, address and size",
        },
        mobileSrc: "/projects/send-parcel-in-app/Send-change-size-mobile.mp4",
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
        mobileSrc: "/projects/send-parcel-in-app/parcel-cover-mobile.mp4",
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
            src: "/projects/send-parcel-in-app/Send-timeandprice.webp",
            width: 2600,
            height: 1785,
            alt: "Pricing and ETA surfaced earlier in the send flow",
          },
        },
        mobileCarousel: [
          {
            src: "/projects/send-parcel-in-app/send-timeandprice-1.png",
            width: 2590,
            height: 5111,
            alt: "Pricing and ETA surfaced earlier in the send flow, screen 1",
          },
          {
            src: "/projects/send-parcel-in-app/send-timeandprice-2.png",
            width: 2590,
            height: 5111,
            alt: "Pricing and ETA surfaced earlier in the send flow, screen 2",
          },
          {
            src: "/projects/send-parcel-in-app/send-timeandprice-3.png",
            width: 2590,
            height: 5111,
            alt: "Pricing and ETA surfaced earlier in the send flow, screen 3",
          },
        ],
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
            src: "/projects/send-parcel-in-app/workshop-image.webp",
            width: 2600,
            height: 1881,
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
    title: "Designing Kashtkaar from 0→1 — product experience and design system",
    shortTitle: "Kashtkaar farm management",
    client: "Kashtkaar",
    color: "#2E7D32",
    heroBackground: "#F8F4EE",
    heroStacked: true,
    heroDividerBelow: true,
    glancePaddingTop: 32,
    heroVisual: {
      media: {
        kind: "image",
        image: {
          src: "/projects/kashtkaar/branded-flow.webp",
          width: 2600,
          height: 1418,
          alt: "Branded Kashtkaar onboarding and farm-health screens",
        },
      },
      mobileCarousel: [
        {
          src: "/projects/kashtkaar/kashtkaar-carousel-1/branded-flow-mobile-1.webp",
          width: 1300,
          height: 2458,
          alt: "Kashtkaar welcome and onboarding screen",
        },
        {
          src: "/projects/kashtkaar/kashtkaar-carousel-1/branded-flow-mobile-2.webp",
          width: 1300,
          height: 2458,
          alt: "Kashtkaar farm health and sustainability score screen",
        },
        {
          src: "/projects/kashtkaar/kashtkaar-carousel-1/branded-flow-mobile-3.webp",
          width: 1300,
          height: 2458,
          alt: "Kashtkaar farm task tracking screen",
        },
      ],
      hint: "Flow with branded components applied",
    },
    openingNote: {
      heading: "Building the product and the system together",
      paragraph:
        "I wasn't only defining Kashtkaar's first product journeys. Because the product was being created from scratch, I also established the initial design-system foundations so new features could evolve without fragmenting the experience. Engineering planned to use shadcn as the implementation foundation, so I adapted that structure in Figma with Kashtkaar-specific tokens, components and variants.",
      columns: [
        {
          heading: "Product",
          items: ["Architecture", "Core journeys", "Interactive prototype", "Testing"],
        },
        {
          heading: "System",
          items: ["Tokens", "Components", "Variants", "Consistency governance"],
        },
      ],
    },
    toc: [
      { id: "the-opportunity", label: "The opportunity" },
      { id: "the-core-product-challenge", label: "The core product challenge" },
      { id: "building-the-system-alongside-the-product", label: "Building the system" },
      { id: "decision-01-discover-and-farm", label: "Decision 01: Discover and Farm" },
      { id: "decision-02-activity-recording", label: "Decision 02: Activity recording" },
      { id: "decision-03-crop-calendar", label: "Decision 03: Crop calendar" },
      { id: "decision-04-sharing", label: "Decision 04: Sharing" },
      { id: "testing-the-concept", label: "Testing the concept" },
      { id: "reflection", label: "Reflection" },
    ],
    projectAtAGlance: {
      role: "Product Designer",
      scope:
        "Product discovery, information architecture, UX/UI design, interactive prototyping, testing synthesis and design-system foundations.",
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
        "I helped shape Kashtkaar from an early agricultural data-collection concept into a testable mobile product for farmers in Pakistan. I defined the product architecture, core farm-management and community journeys, interactive prototypes and initial design-system foundations, then refined the experience using feedback from farmer testing conducted in Urdu by the local team.",
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
        kind: "heading",
        id: "the-core-product-challenge",
        text: "The core product challenge",
        spacing: "tight",
        paddingBottom: 0,
      },
      {
        kind: "statement",
        tone: "light",
        text: "“How could we make farm activity recording genuinely useful for farmers, while still capturing the useful data the programme needed?”",
      },
      {
        kind: "numbered",
        showArrow: true,
        itemStyle: "plain",
        paddingTop: 32,
        items: [
          {
            title: "Make recording quick and low-effort",
            body: "Farmers shouldn't have to work through long administrative forms.",
          },
          {
            title: "Give value back through guidance",
            body: "Recording activity needed to help farmers understand their crop cycle and what to do next.",
          },
          {
            title: "Fit naturally into everyday farm management",
            body: "Planning, monitoring and recording needed to feel like one connected experience rather than separate data-collection tasks.",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "heading",
        id: "building-the-system-alongside-the-product",
        text: "Building the system alongside the product",
        spacing: "tight",
        paddingBottom: 0,
      },
      {
        kind: "richText",
        paddingTop: 32,
        paragraphs: [
          "Kashtkaar was evolving quickly as a 0→1 product. Alongside my product-design work, the founder was also using Claude to rapidly explore new screens and journeys.",
          "That speed was useful for testing ideas, but it also created a new design challenge: explorations could introduce different typography, colours, components or interaction patterns before they had been reconciled with the emerging product system.",
          "Because engineering planned to use shadcn as an implementation foundation, I had already adapted that structure in Figma with Kashtkaar-specific colours, typography, spacing, components and variants. I needed a way to keep rapid exploration possible while bringing promising ideas back into a coherent, usable system.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        width: "reduced-70",
        media: {
          kind: "image",
          image: {
            src: "/projects/kashtkaar/design%20system/tokens-3.png",
            width: 1827,
            height: 785,
            alt: "Kashtkaar design-system token definitions in Figma",
          },
        },
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "Using AI to audit and refine new explorations",
        paddingTop: 32,
        paragraphs: [
          "I used Claude Code, connected directly to Figma, with a design-system skill to review new screens against the Kashtkaar Design System.",
          "The agent could inspect the actual Figma structure rather than only looking at screenshots — including bound variables, component references, text styles and the libraries those values came from.",
          "This made it useful as a first-pass audit for both design-system consistency and UX refinement. It helped me identify where a new exploration was re-creating an existing pattern, introducing inconsistent styles, missing important states or creating friction across the wider journey.",
          "I reviewed those findings and decided what should change before the exploration became part of the product.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        width: "reduced-70",
        caption:
          "Claude auditing a dashboard exploration against the actual Kashtkaar Figma library, variables and component structure.",
        media: {
          kind: "image",
          image: {
            src: "/projects/kashtkaar/design%20system/Kashtkaar%20dashboard%20audit.png",
            width: 1664,
            height: 1396,
            alt: "AI-assisted audit comparing a new Kashtkaar dashboard exploration against the existing design system",
          },
        },
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "From exploration to system-aligned UI",
        paddingTop: 32,
        paragraphs: [
          "The audit was not only diagnostic. Once I had reviewed the recommendations, I used the agent to apply the Kashtkaar system back to the design.",
          "In this example, an early AI-assisted exploration used different typography, colour values and hand-built UI. The refined version was mapped back to the correct Kashtkaar styles and components. Existing patterns were reused where possible — for example, ‘View all’ was replaced with the established link component rather than remaining bespoke UI.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        width: "reduced-70",
        caption:
          "Typography and colour tokens were aligned, existing library components were reused, and repeated UI was converted into reusable system components.",
        media: { kind: "placeholder", label: "EXPLORATION → SYSTEM-ALIGNED VERSION" },
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "Extending the library when the product genuinely needed it",
        paddingTop: 32,
        paragraphs: [
          "When a recurring pattern did not yet exist, I used the same workflow to turn it into a proper reusable component. Claude created the component in the Kashtkaar Design System file, bound its properties to the correct variables and styles, and then replaced repeated hand-built versions across the relevant Figma frames.",
          "I reviewed the generated components and their states before they became part of the system.",
          "The wider audit and clean-up resulted in 8 new component sets with 47 variants, including Status Pill, Section Header, Stat Ring, Crop Card, Alert Card, Community Card, Weather Chip and Carousel.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        width: "reduced-70",
        media: { kind: "placeholder", label: "NEW AND EXTENDED KASHTKAAR COMPONENTS" },
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "Where my judgement mattered",
        paddingTop: 32,
        paragraphs: [],
      },
      {
        kind: "steps",
        spacing: "tight",
        items: [
          {
            title: "Source of truth",
            body: "The agent initially followed references to another design-system library. I recognised that it was not the correct source of truth and redirected the work to use only the Kashtkaar Design System.",
          },
          {
            title: "Typography",
            body: "The dashboard used Geist while the Kashtkaar system was based on DM Sans. Claude surfaced the trade-off rather than silently changing it. I chose to align the product with the existing DM Sans system and reviewed the resulting layout changes.",
          },
          {
            title: "Reuse before adding",
            body: "The agent initially proposed creating a new App Bar. Further inspection showed that Kashtkaar already had a Top Bar serving the same purpose, so I chose to reuse the existing component rather than introduce another pattern.",
          },
        ],
      },
      {
        kind: "richText",
        paddingTop: 32,
        paragraphs: ["Rapid exploration → AI-assisted audit → UX + design review → system-aligned product"],
      },
      {
        kind: "richText",
        headingLevel: "h3",
        heading: "Outcome",
        paddingTop: 32,
        paddingBottom: 32,
        paragraphs: [
          "The workflow gave me a practical way to bring fast AI-assisted exploration back into a coherent product system.",
          "The audited dashboard was aligned with Kashtkaar's own tokens, typography and components, while the design-system library gained reusable patterns and previously missing states.",
          "It also clarified how I want to use AI in product-design work: the agent is particularly useful for inspecting large Figma structures, identifying drift, mapping tokens and handling repetitive component work. I still own the UX, source of truth, visual trade-offs and the final decision about what belongs in the product.",
        ],
      },
      {
        kind: "stats",
        items: [
          { value: "8", label: "new component sets" },
          { value: "47", label: "component variants" },
          { value: "1", label: "Kashtkaar source of truth" },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "decision-01-discover-and-farm",
        heading: "Decision 01: Separate community discovery from farm management",
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
        kind: "media",
        bordered: true,
        media: {
          kind: "image",
          image: {
            src: "/projects/kashtkaar/kashtkaar-product-architecture.webp",
            width: 2600,
            height: 1305,
            alt: "Kashtkaar product architecture showing the Discover feed and Farm hub",
          },
        },
        mobileCarousel: [
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-4/kashtkaar-product-architecture-mobile-1.webp",
            width: 1300,
            height: 2072,
            alt: "Discover community feed showing a farmer's post about rice fertiliser timing",
          },
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-4/kashtkaar-product-architecture-mobile-2.webp",
            width: 1300,
            height: 2072,
            alt: "Farm hub screen showing current tasks for a rice plot",
          },
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-4/kashtkaar-product-architecture-mobile-3.webp",
            width: 1300,
            height: 2072,
            alt: "Farmer profile screen showing farms, businesses and followers",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "decision-02-activity-recording",
        heading: "Decision 02: Make activity recording feel like completing a task, not filling out a form",
        paddingBottom: 32,
        paragraphs: [
          "Activity recording was the product's most important behaviour, but long forms risked becoming another administrative burden for farmers and field officers.",
          "I explored one-tap entry, guided activity selection and context-specific questions based on the farmer's crop stage. The principle was to ask only for the information needed at that moment, not the same long form for every activity.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        media: {
          kind: "image",
          image: {
            src: "/projects/kashtkaar/kashtkaar-activity-recording.webp",
            width: 2600,
            height: 1305,
            alt: "Activity-recording screens for logging farm tasks",
          },
        },
        mobileCarousel: [
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-3/kashtkaar-activity-recording-mobile-1.webp",
            width: 1300,
            height: 2072,
            alt: "\"What do you want to do?\" menu for logging a farm activity, adding a task or sharing to the community",
          },
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-3/kashtkaar-activity-recording-mobile-2.webp",
            width: 1300,
            height: 2072,
            alt: "Add activity or task screen listing land preparation and crop activity types",
          },
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-3/kashtkaar-activity-recording-mobile-3.webp",
            width: 1300,
            height: 2072,
            alt: "Add task detail form for a Dry ploughing task, with schedule, farm and plot fields",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "decision-03-crop-calendar",
        heading: "Decision 03: Turn the crop calendar into guidance",
        paddingBottom: 32,
        paragraphs: [
          "The crop calendar needed to guide farmers through key stages, not only display dates. I explored how it could connect land preparation, sowing, irrigation, chemical application and harvest with both farmer guidance and the structured agricultural data collection needed by field officers and processors.",
          "I proposed what information should be requested at each stage of the rice-growing cycle and explored several calendar structures before recommending a direction for testing.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        media: {
          kind: "image",
          image: {
            src: "/projects/kashtkaar/kashtkaar-crop-calendar-exploration.webp",
            width: 2600,
            height: 1305,
            alt: "Crop calendar exploration screens for tracking rice-growing stages",
          },
        },
        mobileCarousel: [
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-2/kashtkaar-crop-calendar-exploration-mobile-1.webp",
            width: 1300,
            height: 2307,
            alt: "Farm plot screen showing the current growth stage and in-progress and other tasks",
          },
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-2/kashtkaar-crop-calendar-exploration-mobile-2.webp",
            width: 1300,
            height: 2307,
            alt: "My Calendar screen listing upcoming crop stages by month",
          },
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-2/kashtkaar-crop-calendar-exploration-mobile-3.webp",
            width: 1300,
            height: 2307,
            alt: "Monthly calendar grid with colour-coded crop stages and a selected day's task detail",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "decision-04-sharing",
        heading: "Decision 04: Keep community sharing optional",
        paddingBottom: 32,
        paragraphs: [
          "Farm activities could optionally be shared to the Discover feed, bridging private farm management and community knowledge without requiring farmers to enter the same information twice.",
          "Recording and publishing remained separate actions, so a farmer could record information privately without automatically sharing it to the community.",
        ],
      },
      {
        kind: "media",
        bordered: true,
        media: {
          kind: "image",
          image: {
            src: "/projects/kashtkaar/kashtkaar-share-to-discover.webp",
            width: 2600,
            height: 1305,
            alt: "Sharing a recorded farm activity to the Discover community feed",
          },
        },
        mobileCarousel: [
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-5/kashtkaar-share-to-discover-mobile-1.webp",
            width: 1300,
            height: 2072,
            alt: "\"What do you want to do?\" menu with the option to share to community",
          },
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-5/kashtkaar-share-to-discover-mobile-2.webp",
            width: 1300,
            height: 2072,
            alt: "Share your recent farm activity screen listing recently completed activities",
          },
          {
            src: "/projects/kashtkaar/kashtkaar-carousel-5/kashtkaar-share-to-discover-mobile-3.webp",
            width: 1300,
            height: 2072,
            alt: "Create Post screen with a completed watering activity ready to share",
          },
        ],
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "testing-the-concept",
        heading: "Testing the concept with farmers in Urdu",
        paragraphs: [
          "I created a clickable prototype covering the main navigation, crop planning and activity-recording journeys. Local members of the team tested the concept in Urdu with farmers, allowing the product to be evaluated in the language and context in which it would be used.",
          "Testing focused on whether farmers could record an activity quickly, understand the relationship between Plan, Health and Log, and move naturally between farm-management tools and the community feed.",
        ],
      },
      {
        kind: "validationItem",
        question: "Navigation needed to feel unified",
        status: "warning",
        finding: "The separation between Grow and Track created confusion.",
        update: "Consolidated them into a single Farm hub containing Plan, Health and Log.",
      },
      { kind: "divider" },
      {
        kind: "validationItem",
        question: "Terminology needed to be more direct",
        status: "warning",
        finding: "Labels such as Activity, Task, Record and Add task were difficult to differentiate.",
        update: "Simplified the language around completed work versus future work.",
      },
      { kind: "divider" },
      {
        kind: "validationItem",
        question: "Sharing needed to remain optional",
        status: "warning",
        finding: "Recording farm activity and publishing to the community needed to feel clearly different.",
        update: "Separated the two actions explicitly.",
      },
      { kind: "divider" },
      {
        kind: "richText",
        id: "reflection",
        heading: "What this project reinforced for me",
        paddingBottom: 90,
        paragraphs: [
          "Kashtkaar reinforced the value of designing around familiar behaviours when introducing unfamiliar tools. The community feed created an accessible entry point, but the product's real value depended on making agricultural guidance and farm-data collection simple enough to become part of everyday work.",
          "It also changed how I think about AI-assisted design: speed of exploration only becomes valuable when it is paired with strong system governance and deliberate design judgement.",
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
  /** Shows a video hero instead of the image hero when set (takes precedence). */
  heroVideo?: ProjectVideo;
  /** Overrides the hero media's max-width in px (default 614.797, the site's standard stacked-hero size). */
  heroImageMaxWidth?: number;
  /** Overrides the media shown on the /archive listing card; falls back to heroImage when absent. */
  cardMedia?: MediaSlot;
  /** Overrides the card's media-container background (ProjectCard defaults to bg-paper-dim). */
  mediaBackground?: string;
  projectAtAGlance: ProjectAtAGlanceData;
  /** Narrative paragraph(s) shown in a "Quick summary" section below "Project at a glance". */
  quickSummary?: string[];
  /** Optional visual(s) shown below the "Quick summary" section, stacked in order. */
  belowSummaryMedia?: { media: MediaSlot; heightPx?: number }[];
  /** Drops belowSummaryMedia's beige card/padding in favour of a larger, full-width, tap-to-enlarge image. */
  belowSummaryMediaEnlarged?: boolean;
};

export const archiveProjects: ArchiveProject[] = [
  {
    slug: "designability",
    title: "Designability",
    subtitle:
      "Creative direction & UI Design for an Online Design Resource promoting accessible Electric Vehicle Charging Points",
    heroImage: {
      src: "/projects/designability/designabilitycover.webp",
      width: 2100,
      height: 1672,
      alt: "Designability design guidelines shown across a grid of mobile screens",
    },
    heroImageMaxWidth: 922.2,
    cardMedia: {
      kind: "image",
      image: {
        src: "/projects/designability/designabilitycover.webp",
        width: 2100,
        height: 1672,
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
    belowSummaryMedia: [
      {
        media: {
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
        media: {
          kind: "image",
          image: {
            src: "/projects/designability/final1.webp",
            width: 1920,
            height: 1210,
            alt: "Final Designability desktop and mobile page design showing an EV charging point accessibility guide",
          },
        },
      },
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/designability/kick off workshop.webp",
            width: 2636,
            height: 1496,
            alt: "Kick-off workshop research board reviewing tone and layout references for the Designability site",
          },
        },
      },
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/designability/likethisexample.webp",
            width: 1057,
            height: 1187,
            alt: "Designability page detail showing an accessibility callout and quote section on desktop and mobile",
          },
        },
      },
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/designability/mobile.webp",
            width: 1920,
            height: 1210,
            alt: "Designability mobile screens showing testimonial, page detail and design guide content",
          },
        },
      },
    ],
  },
  {
    slug: "tigi",
    title: "TIGI",
    subtitle: "Website redesign according to brand updates",
    heroImage: {
      src: "/projects/tigi/tigi-1.webp",
      width: 1920,
      height: 1102,
      alt: "TIGI Bed Head website homepage shown on desktop and mobile",
    },
    heroImageMaxWidth: 922.2,
    cardMedia: {
      kind: "image",
      image: {
        src: "/projects/tigi/tigi-cover.webp",
        width: 1500,
        height: 1194,
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
    belowSummaryMedia: [
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/tigi/tigi-2.webp",
            width: 1920,
            height: 1098,
            alt: "TIGI Bed Head homepage shown on desktop and mobile",
          },
        },
      },
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/tigi/tigi-5.webp",
            width: 2877,
            height: 1626,
            alt: "TIGI Bed Head product and Thrill Seeker range pages shown across desktop and mobile",
          },
        },
      },
      {
        media: {
          kind: "video",
          video: {
            src: "/projects/tigi/tigi-6.mp4",
            width: 1920,
            height: 1080,
          },
          alt: "TIGI Bed Head website interaction detail",
        },
      },
      {
        media: {
          kind: "video",
          video: {
            src: "/projects/tigi/tigi-7.mp4",
            width: 1740,
            height: 1088,
          },
          alt: "TIGI Bed Head website scroll interaction",
        },
      },
      {
        media: {
          kind: "video",
          video: {
            src: "/projects/tigi/tigi-8.mp4",
            width: 1740,
            height: 1088,
          },
          alt: "TIGI Bed Head website navigation interaction",
        },
      },
    ],
  },
  {
    slug: "migarage",
    title: "MiGarage",
    subtitle: "Redesigning existing website and proposing digital brand direction",
    heroImage: {
      src: "/projects/MIGarage/migarage-3.webp",
      width: 1920,
      height: 1199,
      alt: "MiGarage website shown across a row of mobile screens",
    },
    heroImageMaxWidth: 922.2,
    cardMedia: {
      kind: "image",
      image: {
        src: "/projects/MIGarage/migarage-3.webp",
        width: 1920,
        height: 1199,
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
    belowSummaryMedia: [
      {
        media: {
          kind: "video",
          video: {
            src: "/projects/MIGarage/migarage-2.mp4",
            width: 1920,
            height: 1088,
          },
          alt: "MiGarage website walkthrough",
        },
      },
      {
        media: {
          kind: "video",
          video: {
            src: "/projects/MIGarage/migarage-1.mp4",
            width: 1136,
            height: 1796,
          },
          alt: "MiGarage mobile website interaction",
        },
        heightPx: 700,
      },
    ],
  },
  {
    slug: "creative-xr",
    title: "Creative XR",
    subtitle:
      "Redesigning Creative XR website, building on top of existing branding and providing digital brand direction",
    heroImage: {
      src: "/projects/creative xr/crx-2 copy.webp",
      width: 1920,
      height: 1357,
      alt: "Creative XR homepage shown on desktop and mobile",
    },
    heroVideo: {
      src: "/projects/creative xr/crx-1 copy.mp4",
      width: 1920,
      height: 1080,
    },
    heroImageMaxWidth: 922.2,
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
    belowSummaryMedia: [
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/creative xr/crx-2 copy.webp",
            width: 1920,
            height: 1357,
            alt: "Creative XR homepage shown on desktop and mobile",
          },
        },
      },
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/creative xr/crx-4 copy.webp",
            width: 1920,
            height: 1357,
            alt: "Creative XR 2020 Partners page shown on desktop and mobile",
          },
        },
      },
    ],
  },
  {
    slug: "futurescope",
    title: "Futurescope",
    subtitle:
      "Proposing new UI and UX enhancements to new website for Futurescope as well as building on top of existing print branding by proposing digital brand direction.",
    heroImage: {
      src: "/projects/futurescope/f-2.webp",
      width: 1920,
      height: 1194,
      alt: "FutureScope homepage shown on desktop and mobile",
    },
    heroVideo: {
      src: "/projects/futurescope/f-1.mp4",
      width: 1920,
      height: 1080,
    },
    heroImageMaxWidth: 922.2,
    cardMedia: {
      kind: "image",
      image: {
        src: "/projects/futurescope/f-4.webp",
        width: 1920,
        height: 1280,
        alt: "Futurescope cover image",
      },
    },
    belowSummaryMediaEnlarged: true,
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
    belowSummaryMedia: [
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/futurescope/f-4.webp",
            width: 1920,
            height: 1280,
            alt: "FutureScope mobile screens shown in a repeating grid",
          },
        },
      },
      {
        media: {
          kind: "image",
          image: {
            src: "/projects/futurescope/f-2.webp",
            width: 1920,
            height: 1194,
            alt: "FutureScope homepage shown on desktop and mobile",
          },
        },
      },
    ],
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
  /** Overrides the stacked hero image's max-width in px (default 614.797, the site's standard stacked-hero size). */
  heroImageMaxWidth?: number;
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
    heroImage: {
      src: "/projects/propfuse/propfuse.webp",
      width: 2100,
      height: 1465,
      alt: "PropFuse landing page showing the daily property digest concept",
    },
    heroImageMaxWidth: 1045.15,
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
