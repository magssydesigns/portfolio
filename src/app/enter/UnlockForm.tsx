"use client";

import { useActionState, useState } from "react";
import { unlockPortfolio, type UnlockState } from "@/lib/auth/actions";
import PasscodeInput from "./PasscodeInput";

const FORM_ID = "unlock-form";

export default function UnlockForm({ from }: { from: string }) {
  const [state, formAction, pending] = useActionState<UnlockState, FormData>(unlockPortfolio, undefined);
  const [prevState, setPrevState] = useState(state);
  const [resetSignal, setResetSignal] = useState(0);

  // Bump resetSignal whenever a fresh error comes back from the server action, so
  // PasscodeInput clears itself and refocuses - adjusted during render (not an
  // effect) per React's guidance for syncing state to a changed prop/value.
  if (state !== prevState) {
    setPrevState(state);
    if (state?.error) setResetSignal((n) => n + 1);
  }

  return (
    <form id={FORM_ID} action={formAction} className="mt-8 text-center">
      <input type="hidden" name="from" value={from} />

      <PasscodeInput formId={FORM_ID} resetSignal={resetSignal} disabled={pending} />

      <div className="mt-4 min-h-[20px]">
        {state?.error && (
          <p role="alert" className="text-[13px] text-accent">
            {state.error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink px-8 py-3 text-sm text-paper transition-all duration-300 ease-out hover:opacity-85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Enter
      </button>
    </form>
  );
}
