"use client";

import { useRef, type ReactNode } from "react";
import InteractiveGradientBackground from "./InteractiveGradientBackground";
import CometCursorTrail from "./CometCursorTrail";

/**
 * Shared shell for the homepage's interactive scene. Owns the one container
 * ref both the gradient (scroll + pointer parallax) and the cursor trail
 * (pointer position) need, and enforces the layering:
 * 1. #F8F4EE base (body background)
 * 2. gradient
 * 3. cursor trail
 * 4. content
 */
export default function GradientScene({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative isolate overflow-hidden">
      <InteractiveGradientBackground containerRef={containerRef} />
      <CometCursorTrail containerRef={containerRef} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
