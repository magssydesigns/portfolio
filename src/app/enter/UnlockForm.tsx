"use client";

import { useActionState } from "react";
import { unlockPortfolio, type UnlockState } from "@/lib/auth/actions";

export default function UnlockForm({ from }: { from: string }) {
  const [state, formAction, pending] = useActionState<UnlockState, FormData>(unlockPortfolio, undefined);

  return (
    <form action={formAction} className="mt-10 space-y-5 text-left">
      <input type="hidden" name="from" value={from} />

      <div>
        <label htmlFor="password" className="text-[13px] uppercase tracking-[0.14em] text-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          required
          aria-invalid={state?.error ? true : undefined}
          aria-describedby={state?.error ? "password-error" : undefined}
          className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-base text-ink outline-none transition-colors focus:border-ink/40 focus:ring-2 focus:ring-ink/10"
        />
      </div>

      {state?.error && (
        <p id="password-error" role="alert" className="text-[13px] text-accent">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-ink px-4 py-3 text-[13px] text-paper transition-all duration-300 ease-out hover:opacity-85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Unlocking…" : "Unlock Portfolio →"}
      </button>
    </form>
  );
}
