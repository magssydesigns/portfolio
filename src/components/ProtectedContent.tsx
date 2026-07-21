"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ClipboardEvent, ReactNode } from "react";

/** Routes that must never have selection/copy restricted (the password gate itself). */
const UNPROTECTED_PATHS = new Set(["/enter"]);

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return true;
  return target.isContentEditable;
}

/**
 * Lightweight, deterrent-only protection for the password-gated portfolio's
 * copy: disables mouse/long-press text selection (via the .protected-content
 * CSS below) and blocks copy/cut plus the Cmd/Ctrl+A and Cmd/Ctrl+C
 * shortcuts, while leaving form fields, buttons and navigation fully
 * interactive. This is not real DRM - a determined visitor can always view
 * source - it just removes casual copy/paste of case-study writing.
 *
 * Select-all is a document-level browser command (it isn't scoped to
 * whatever element the mouse last clicked), so the keydown guard listens on
 * `document` rather than only on this wrapper - a page.tsx-scoped React
 * handler would miss Ctrl/Cmd+A pressed while nothing in particular has
 * focus, which is the common case.
 */
export default function ProtectedContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const enabled = !(pathname && UNPROTECTED_PATHS.has(pathname));

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const key = e.key.toLowerCase();
      if (key !== "a" && key !== "c") return;
      if (isEditableTarget(e.target)) return;
      e.preventDefault();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  const blockClipboardEvent = (e: ClipboardEvent<HTMLDivElement>) => {
    if (isEditableTarget(e.target)) return;
    e.preventDefault();
  };

  return (
    <div className="protected-content" onCopy={blockClipboardEvent} onCut={blockClipboardEvent}>
      {children}
    </div>
  );
}
