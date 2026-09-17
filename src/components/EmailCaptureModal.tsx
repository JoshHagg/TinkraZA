import { FormEvent, useState } from "react";
import { BellRing } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "../lib/supabase";
import type { Experience } from "../types/experience";
import { track } from "../utils/analytics";

export function EmailCaptureModal({ experience, open, onOpenChange }: { experience: Experience; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;

    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");
    const { error: insertError } = await supabase.from("waitlist_signups").insert({ email: normalizedEmail });

    if (insertError) {
      console.error("Waitlist signup failed", insertError);
      setError("We couldn’t save your email right now. Please try again.");
      setSubmitting(false);
      return;
    }

    track("email_submitted", { experienceId: experience.id });
    setEmail("");
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { onOpenChange(next); if (!next) window.setTimeout(() => { setSubmitted(false); setError(""); setEmail(""); }, 200); }}>
      <DialogContent className="rounded-[1.75rem] border-0 bg-[#fbf8f2] p-7 sm:max-w-md sm:p-9">
        {submitted ? <div className="py-7 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-[#d8e7e0]"><BellRing size={23} /></span><DialogTitle className="display-font mt-5 text-3xl">You’re on the list.</DialogTitle><DialogDescription className="mt-3 text-base leading-7">We’ll let you know when {experience.title} becomes bookable through us.</DialogDescription><button onClick={() => onOpenChange(false)} className="mt-6 rounded-full bg-[#20352d] px-6 py-3 font-semibold text-white">Done</button></div> : <><DialogHeader><span className="mb-3 grid size-12 place-items-center rounded-full bg-[#efd9b8]"><BellRing size={20} /></span><DialogTitle className="display-font text-3xl leading-tight">Be first to know</DialogTitle><DialogDescription className="text-base leading-7 text-[#5f6c66]">We’re getting ready to launch. Want to know when this experience becomes bookable through us?</DialogDescription></DialogHeader><form onSubmit={submit} className="mt-2"><label htmlFor="waitlist-email" className="mb-2 block text-sm font-semibold">Email address</label><input id="waitlist-email" type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} placeholder="you@example.com" className="w-full rounded-xl border border-[#20352d]/20 bg-white px-4 py-3.5 outline-none transition focus:border-[#c85a3c] focus:ring-4 focus:ring-[#c85a3c]/10" aria-invalid={Boolean(error)} aria-describedby={error ? "waitlist-error" : undefined} /><button type="submit" disabled={submitting} className="mt-4 w-full rounded-full bg-[#c85a3c] px-6 py-3.5 font-semibold text-white transition hover:bg-[#aa462d] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Joining…" : "Let me know"}</button>{error && <p id="waitlist-error" role="alert" className="mt-3 text-center text-sm text-[#aa462d]">{error}</p>}<p className="mt-3 text-center text-xs text-[#6a756f]">Your email will be added to our waitlist.</p></form></>}
      </DialogContent>
    </Dialog>
  );
}
