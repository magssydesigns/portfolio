"use client";

import { useEffect, useRef, useState } from "react";

const LENGTH = 4;

/**
 * Four accessible, individually-focusable digit inputs that behave as one
 * cohesive passcode field: typing advances focus, Backspace on an empty box
 * moves back, pasting a full code distributes it across all four boxes, and
 * Enter submits the surrounding form. A hidden input (name="code") carries
 * the combined value so the server action only ever reads one field.
 */
export default function PasscodeInput({
  formId,
  resetSignal = 0,
  disabled,
}: {
  /** Id of the <form> this input's Enter key should submit. */
  formId: string;
  /** Changing this value clears all boxes and refocuses the first one (used after a failed attempt). */
  resetSignal?: number;
  disabled?: boolean;
}) {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [prevResetSignal, setPrevResetSignal] = useState(resetSignal);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (resetSignal !== prevResetSignal) {
    setPrevResetSignal(resetSignal);
    setDigits(Array(LENGTH).fill(""));
  }

  // Focus (and re-select) the first box on mount, and again every time resetSignal changes -
  // pure DOM interaction, no state updates here, so this can't cascade into extra renders.
  useEffect(() => {
    inputRefs.current[0]?.focus();
    inputRefs.current[0]?.select();
  }, [resetSignal]);

  const setDigitAt = (index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "");
    if (!value) {
      setDigitAt(index, "");
      return;
    }
    // Only ever keep the most recently typed digit in this box.
    setDigitAt(index, value.slice(-1));
    if (index < LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      setDigitAt(index - 1, "");
    } else if (e.key === "Enter") {
      const form = document.getElementById(formId) as HTMLFormElement | null;
      form?.requestSubmit();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    const lastIndex = Math.min(pasted.length, LENGTH) - 1;
    inputRefs.current[Math.max(lastIndex, 0)]?.focus();
  };

  const code = digits.join("");

  return (
    <div>
      <input type="hidden" name="code" value={code} />
      <div role="group" aria-label="4-digit passcode" className="flex justify-center gap-3">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${LENGTH}`}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className="h-14 w-12 rounded-xl border border-line bg-white text-center text-xl text-ink outline-none transition-colors focus:border-ink/40 focus:ring-2 focus:ring-ink/10 disabled:cursor-not-allowed disabled:opacity-60 sm:h-16 sm:w-14"
          />
        ))}
      </div>
    </div>
  );
}
