import type { MediaSlot } from "@/lib/projects";
import { archiveProjects } from "@/lib/projects";

/**
 * Shared shape for anything rendered as a homepage-style ProjectCard: the
 * homepage grid, /work, and /archive all read from this instead of each
 * hardcoding their own card list.
 */
export type ProjectCardData = {
  title: string;
  slug: string;
  subtitle?: string;
  media: MediaSlot;
  /** Overrides ProjectCard's default media-container background (bg-paper-dim). */
  mediaBackground?: string;
  type: "homepage" | "archive";
  isArchive: boolean;
};

/**
 * The four active case studies featured on the homepage. /work reuses this
 * exact array so the two pages can never drift apart.
 */
export const homepageCards: ProjectCardData[] = [
  {
    title: "Scaling parcel tracking across European markets",
    slug: "scaling-parcel-tracking",
    media: {
      kind: "video",
      video: {
        src: "/projects/scaling-parcel-tracking/scene.mp4",
        width: 1440,
        height: 1080,
      },
      alt: "InPost parcel tracking experience shown in context",
    },
    type: "homepage",
    isArchive: false,
  },
  {
    title: "0 → 1: Launching InPost's UK parcel tracking app",
    slug: "rapid-uk-launch",
    media: {
      kind: "image",
      image: {
        src: "/homepage/app-in-uk.png",
        width: 4956,
        height: 3946,
        alt: "InPost parcel tracking screen and design system colour tokens",
      },
    },
    type: "homepage",
    isArchive: false,
  },
  {
    title: "Enabling 2M+ users to send parcels in app",
    slug: "send-parcel-in-app",
    media: {
      kind: "image",
      image: {
        src: "/homepage/send-a-parcel.png",
        width: 4956,
        height: 3946,
        alt: "InPost send a parcel screen showing locker or home address delivery options",
      },
    },
    type: "homepage",
    isArchive: false,
  },
  {
    title: "Shaping an early-stage farming app for Pakistan",
    slug: "farming-app-pakistan",
    media: { kind: "placeholder", label: "Cover image placeholder" },
    type: "homepage",
    isArchive: false,
  },
  {
    title: "Designing Kashtkaar's first farm management experience",
    slug: "kashtkaar",
    media: { kind: "placeholder", label: "kashtkaar-hero" },
    type: "homepage",
    isArchive: false,
  },
];

/**
 * Archive project cards, derived from `archiveProjects` so a new archive
 * entry only ever needs to be added in one place (src/lib/projects.ts).
 */
export const archiveCards: ProjectCardData[] = archiveProjects.map((project) => ({
  title: project.title,
  slug: project.slug,
  subtitle: project.subtitle,
  media: project.cardMedia ?? ("kind" in project.heroImage ? project.heroImage : { kind: "image", image: project.heroImage }),
  mediaBackground: project.mediaBackground,
  type: "archive",
  isArchive: true,
}));

export function cardHref(card: ProjectCardData) {
  return `/projects/${card.slug}`;
}
