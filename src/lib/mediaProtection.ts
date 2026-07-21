import type { DragEvent, MouseEvent } from "react";

function preventDrag(e: DragEvent) {
  e.preventDefault();
}

function preventContextMenu(e: MouseEvent) {
  e.preventDefault();
}

/**
 * Spread onto <img>/<video> elements to deter casual "Save image as", asset
 * dragging and right-click access. This is a lightweight deterrent only -
 * it doesn't block anything a determined visitor could do via devtools -
 * and it never touches click behaviour, so existing product interactions
 * (card navigation, prototype links) are unaffected.
 */
export const mediaProtectionProps = {
  draggable: false,
  onDragStart: preventDrag,
  onContextMenu: preventContextMenu,
} as const;
