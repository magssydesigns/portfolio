import Reveal from "@/components/Reveal";
import ProjectAtAGlance from "@/components/project/ProjectAtAGlance";
import type { ProjectAtAGlanceData } from "@/lib/projects";

/**
 * Reusable "Project at a glance" section: heading + label/value fact rows
 * (Role, Scope / Core team, Collaboration / optional Platforms), matching
 * the send-parcel-in-app case study's typography, column layout, width,
 * spacing and mobile stacking exactly.
 */
export default function ProjectAtAGlanceSection({
  role,
  roleDescription,
  scope,
  contribution,
  coreTeam,
  collaborationLabel = "Collaboration teams",
  collaborationTeams,
  users,
  stage,
  markets,
  platforms,
  id = "project-at-a-glance",
  standalone = true,
  paddingBottom,
}: ProjectAtAGlanceData & {
  id?: string;
  /**
   * When true (default), wraps itself in the standard section padding so it
   * can be dropped in as a self-contained block below a hero. Pass false to
   * embed inside a parent that already supplies its own section
   * wrapper/padding (as QuickRead does for the Send case study).
   */
  standalone?: boolean;
  /** Overrides the standalone wrapper's bottom padding (px) - use to hit an exact gap before the next section. */
  paddingBottom?: number;
}) {
  const coreRow = [
    ...(coreTeam ? [{ label: "Core team", value: coreTeam }] : []),
    ...(collaborationTeams ? [{ label: collaborationLabel, value: collaborationTeams }] : []),
  ];
  const userStageRow = [
    ...(users ? [{ label: "Users", value: users }] : []),
    ...(stage ? [{ label: "Stage", value: stage }] : []),
  ];

  const rows = [
    [
      { label: "Role", value: role, description: roleDescription },
      { label: "Scope", value: scope },
    ],
    ...(contribution ? [[{ label: "Contribution", value: contribution }]] : []),
    ...(coreRow.length ? [coreRow] : []),
    ...(userStageRow.length ? [userStageRow] : []),
    ...(markets ? [[{ label: "Markets", value: markets }]] : []),
    ...(platforms ? [[{ label: "Platforms", value: platforms }]] : []),
  ];

  const content = (
    <Reveal>
      <div className="mx-auto max-w-2xl">
        <h2
          id={id}
          className="scroll-mt-40 font-display text-3xl tracking-tight sm:text-4xl lg:scroll-mt-28"
        >
          Project at a glance
        </h2>
        <div className="mt-6 max-w-2xl">
          <ProjectAtAGlance rows={rows} />
        </div>
      </div>
    </Reveal>
  );

  if (!standalone) return content;

  return (
    <section
      className={
        paddingBottom !== undefined
          ? "mx-auto max-w-[1400px] px-6 pt-10 sm:px-10 sm:pt-14"
          : "mx-auto max-w-[1400px] px-6 pt-10 pb-20 sm:px-10 sm:pt-14 sm:pb-28"
      }
      style={paddingBottom !== undefined ? { paddingBottom } : undefined}
    >
      {content}
    </section>
  );
}
