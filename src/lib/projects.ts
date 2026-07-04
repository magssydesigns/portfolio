export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type Block =
  | { kind: "lead"; items: { label: string; body: string }[] }
  | { kind: "heading"; text: string; tone?: "dark" | "light" }
  | { kind: "statement"; text: string; tone?: "dark" | "light" }
  | { kind: "numbered"; heading?: string; intro?: string; items: { title: string; body: string }[] }
  | { kind: "image"; image: ProjectImage; size?: "medium" | "wide" | "full" }
  | { kind: "beforeAfterStats"; heading: string; items: { label: string; before: string; after: string; description: string }[] }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "steps"; heading?: string; items: { title: string; body: string }[] }
  | { kind: "twoCol"; items: { label: string; body: string }[] };

export type QuickRead = {
  tagline: string;
  heroImage: ProjectImage;
  challenge: string[];
  role?: string;
  constraints?: string[];
  process?: { intro?: string; items: string[] };
  keyDecisions: string[];
  outcomes: { value: string; label: string }[];
  qualitative?: { title?: string; body: string }[];
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  color: string;
  darkText?: boolean;
  quickRead: QuickRead;
  fullCaseStudy: Block[];
};

export const projects: Project[] = [
  {
    slug: "scaling-parcel-tracking",
    title: "Scaling parcel tracking across European markets",
    shortTitle: "Scaling parcel tracking",
    client: "InPost",
    color: "#F7D60F",
    quickRead: {
      tagline:
        "Designed a scalable multi-market parcel tracking experience across European delivery flows",
      heroImage: {
        src: "/projects/scaling-parcel-tracking/hero.png",
        width: 378,
        height: 915,
        alt: "InPost parcel tracking detail screen showing a map, pickup status, and locker QR code",
      },
      challenge: [
        "Stakeholders wanted to scale an existing Polish parcel tracking flow globally.",
        "I identified that delivery behaviours, carrier logic, and user expectations differed significantly between markets, making a direct rollout risky.",
        "Instead of adapting screens market by market, I redesigned the tracking structure for international scale.",
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
      keyDecisions: [
        "Simplified parcel states and delivery communication",
        "Prioritised next actions and pickup visibility",
        "Introduced more scalable tracking patterns",
        "Reduced ambiguity across delivery scenarios",
        "Improved locker and QR-based interaction",
      ],
      outcomes: [
        { value: "66%", label: "drop in complaints about missing pickup information" },
        { value: "50%", label: "improvement in “unable to find address” usability task" },
      ],
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
    },
    fullCaseStudy: [
      {
        kind: "lead",
        items: [
          {
            label: "My role",
            body: "As a Product Designer for UK app team, I initiated the project of unifying app experience into one from different markets (UK, France, Poland).",
          },
          {
            label: "Overview",
            body: "We have different apps on different markets which, in future, we plan to unify into one app. However, we do not have any in-depth research which would help us to unify this experience for the users.",
          },
        ],
      },
      {
        kind: "statement",
        tone: "dark",
        text:
          "Existing parcel tracking information architecture lacks consistency and hierarchy across markets, leading to users' inability to determine parcel status and delivery times. It either overwhelms users with unnecessary information or fails to provide enough at crucial steps of the journey.",
      },
      {
        kind: "numbered",
        heading: "Business Objectives",
        items: [
          {
            title: "Reduce development and maintenance costs",
            body: "by unifying parcel tracking interfaces across markets, minimizing duplicate design and engineering work.",
          },
          {
            title: "Increase customer satisfaction and retention",
            body: "by providing a more intuitive, consistent tracking experience that addresses key pain points.",
          },
          {
            title: "Gather actionable cross-market user data",
            body: "through a standardized interface, enabling more effective product decisions based on consistent metrics.",
          },
        ],
      },
      {
        kind: "numbered",
        heading: "Research Insights",
        intro:
          "I prepared UX Research Plan to conduct survey and usability test on existing Polish app. The Research was conducted on 10 users from each market (Poland, France, UK, Italy). Test included survey part and prototype part where users performed tasks on prototypes on existing app.",
        items: [
          {
            title: "Make parcel tracking visual and simple",
            body: "Users prefer clear, visual timelines with easy-to-understand steps — not technical jargon like 'heading off to warehouse.'",
          },
          {
            title: "De-emphasize package ID details",
            body: "Parcel numbers matter, but users focus more on delivery status and pickup info.",
          },
          {
            title: "Be transparent about delays",
            body: "Users appreciate seeing delays in real time — even when things go wrong.",
          },
          {
            title: "Include clear, step-by-step pickup instructions",
            body: "Guided collection steps make users feel confident and informed.",
          },
          {
            title: "Prioritize ETA and status",
            body: "Across markets, ETA ranks highest in importance, followed by pickup address and parcel status.",
          },
          {
            title: "Give more prominence to the pick up location and mention collection requirements",
            body: "eg. is signature/ID needed, opening hours of the pickup point",
          },
        ],
      },
      {
        kind: "heading",
        text: "New design — parcel list",
      },
      {
        kind: "image",
        size: "medium",
        image: {
          src: "/projects/scaling-parcel-tracking/new-design-list.png",
          width: 440,
          height: 2030,
          alt: "Redesigned parcel list showing out for delivery, ready to collect, redirected, and delivered states",
        },
      },
      {
        kind: "heading",
        text: "New design — parcel details page",
      },
      {
        kind: "image",
        size: "medium",
        image: {
          src: "/projects/scaling-parcel-tracking/new-design-details.png",
          width: 545,
          height: 2100,
          alt: "Redesigned parcel details page with map, locker QR code, and pickup instructions, annotated 1 to 8",
        },
      },
      {
        kind: "beforeAfterStats",
        heading: "Round 2 of usability testing — the effect of the new design on UX",
        items: [
          {
            label: "About delivery address",
            before: "50%",
            after: "0%",
            description: "of users reported that this information is “unavailable” or not easy enough to find",
          },
          {
            label: "About sender details",
            before: "33%",
            after: "0%",
            description: "of users reported that this information is “unavailable” or not easy enough to find",
          },
          {
            label: "Hierarchy of the Parcel Details page",
            before: "66%",
            after: "33%",
            description: "of users generally mentioned “issues with the hierarchy” of information",
          },
        ],
      },
      {
        kind: "quote",
        text:
          "this seems to be more comprehensive in terms of details of features when compared to major firm parcel apps I've seen in thee UK",
        attribution: "Participant ZRZR0",
      },
      {
        kind: "heading",
        text: "Before & after",
      },
      {
        kind: "image",
        size: "full",
        image: {
          src: "/projects/scaling-parcel-tracking/before-after.png",
          width: 1710,
          height: 850,
          alt: "Before and after comparison of the parcel details screen across the Polish and redesigned UK experience",
        },
      },
    ],
  },
  {
    slug: "send-parcel-in-app",
    title: "Enabling 2M+ users to send parcels in app",
    shortTitle: "Enabling users to send parcels",
    client: "InPost",
    color: "#01D46B",
    quickRead: {
      tagline: "Providing customers with option of sending parcels inside the InPost app",
      heroImage: {
        src: "/projects/send-parcel-in-app/hero.png",
        width: 390,
        height: 770,
        alt: "InPost send a parcel screen showing locker or home address delivery options and size selection",
      },
      challenge: [
        "The UK InPost app didn't yet allow users to send parcels, even though the feature existed in the Polish version. The business needed to launch the feature quickly in the UK, reusing the existing flow — but the UX wasn't fully aligned to UK users' expectations, market behaviour, or pricing model.",
        "Goal: adapt and enhance the existing Polish “Send a Parcel” flow for the UK market, introduce new features like parcel cover, and improve UX friction points without rebuilding the entire experience.",
      ],
      role: "Product Designer — led UX, UI, benchmarking, prototyping, usability testing, design improvements, and design hand-off.",
      constraints: [
        "Very short delivery timeline",
        "Required to reuse most of the original flow",
        "Limited engineering capacity → focus on UX refinements, not full redesign",
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
        { body: "Created foundation for future UX metric tracking across send flow — followed with a UX Metrics Workshop with the team" },
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
        heading: "Business Objectives",
        items: [
          {
            title: "Provide UK users with possibility of sending parcels in app as soon as possible",
            body: "by introducing feature which is already existing in Poland. The feature would bring significant earnings.",
          },
          {
            title: "Introduce extra feature inside send — parcel cover",
            body: "which is not available in Poland but widely used in UK market. That would bring extra earnings.",
          },
        ],
      },
      {
        kind: "heading",
        text: "Flow overview — final design",
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
            body: "Users need to be able to edit all details before proceeding with payment. This prevents from users dropping off at this step and starting new process of sending. Allow users to edit data directly at the “Order Review” step (38% get it wrong) — source: Baymard Institute.",
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
            body: "Communicate clearly any price changes when user changes size or delivery method. This will prevent from uncertainty and abandoned checkouts. What information to display at the “Order Review” step (12% get it wrong) — source: Baymard Institute. Display visually a change in price after editing information in order review.",
          },
        ],
      },
      {
        kind: "heading",
        text: "New designs — parcel cover",
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
        heading: "Key changes — parcel cover, a new section",
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
        heading: "Key changes — summary page",
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
            body: "New feature added — users can apply promo code before continuing to the payment.",
          },
        ],
      },
      {
        kind: "numbered",
        heading: "Usability testing results",
        intro: "Example questions from usability testing and their impact on the final design.",
        items: [
          {
            title: "In how many days is the parcel expected to arrive when sent directly to door?",
            body: "More than 50% of users answered correctly, though some didn't find the answer right away — several missed the estimated dates being at the top (4/9), 2 users checked whether estimated delivery times would change if they changed the parcel size, and only 3/9 answered without any hesitation. The reviewed design, with estimated dates and address options made more prominent, caused no confusion.",
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
