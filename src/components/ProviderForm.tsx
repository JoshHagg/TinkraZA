import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "../lib/supabase";
import { track } from "../utils/analytics";

const initialForm = { name: "", businessName: "", email: "", website: "", category: "", description: "" };

export function ProviderForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fieldClass = "mt-2 w-full rounded-xl border border-[#20352d]/15 bg-white px-4 py-3.5 outline-none transition focus:border-[#c85a3c] focus:ring-4 focus:ring-[#c85a3c]/10";

  function update(key: keyof typeof form, value: string) { setForm((current) => ({ ...current, [key]: value })); setError(""); }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;

    const name = form.name.trim();
    const businessName = form.businessName.trim();
    const email = form.email.trim().toLowerCase();
    const website = form.website.trim();
    const category = form.category.trim();
    const description = form.description.trim();

    if (!name || !businessName || !email || !website || !category || !description) {
      setError("Please complete all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (description.length < 20) {
      setError("Please provide at least 20 characters describing your experience.");
      return;
    }

    setSubmitting(true);
    setError("");
    const providerInterest = {
      name,
      business_name: businessName,
      email,
      website_or_instagram: website,
      experience_category: category,
      experience_description: description,
    };

    try {
      const { error: insertError } = await supabase.from("provider_interests").insert(providerInterest);
      if (insertError) {
        if (insertError.code === "23505" && insertError.message.includes("provider_interests_normalized_email_uidx")) {
          setError("You're already registered!");
          return;
        }

        console.error("Provider interest submission failed", insertError);
        setError("We couldn’t save your interest right now. Please try again.");
        return;
      }

      track("provider_interest_submitted", { category });
      setSubmittedName(name);
      setForm(initialForm);
      setSubmitted(true);
    } catch (submissionError) {
      console.error("Provider interest submission failed", submissionError);
      setError("We couldn’t save your interest right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <div className="rounded-[2rem] bg-white p-8 text-center card-shadow sm:p-12"><CheckCircle2 className="mx-auto text-[#c85a3c]" size={44} /><h2 className="display-font mt-5 text-4xl">Interest registered.</h2><p className="mx-auto mt-3 max-w-md text-[#5f6c66]">Thanks, {submittedName}. We’ve received your details and will keep you in the loop.</p><button onClick={() => { setForm(initialForm); setSubmitted(false); setSubmittedName(""); setError(""); }} className="mt-7 rounded-full border border-[#20352d]/20 px-5 py-3 font-semibold">Submit another</button></div>;

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 card-shadow sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">Your name<input required value={form.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} autoComplete="name" /></label>
        <label className="text-sm font-semibold">Business name<input required value={form.businessName} onChange={(e) => update("businessName", e.target.value)} className={fieldClass} autoComplete="organization" /></label>
        <label className="text-sm font-semibold">Email<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} autoComplete="email" /></label>
        <label className="text-sm font-semibold">Website or Instagram<input required value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https:// or @handle" className={fieldClass} /></label>
        <label className="text-sm font-semibold sm:col-span-2">Experience category<Select required value={form.category} onValueChange={(value) => update("category", value)}><SelectTrigger className={`${fieldClass} h-12`} aria-label="Experience category"><SelectValue placeholder="Choose a category" /></SelectTrigger><SelectContent><SelectItem value="Make">Make</SelectItem><SelectItem value="Taste">Taste</SelectItem><SelectItem value="Learn">Learn</SelectItem><SelectItem value="Move">Move</SelectItem><SelectItem value="Other hands-on experience">Other hands-on experience</SelectItem></SelectContent></Select></label>
        <label className="text-sm font-semibold sm:col-span-2">Short description of your experience<textarea required minLength={20} rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="What will guests learn, make or try?" className={`${fieldClass} resize-y`} /></label>
      </div>
      <button type="submit" disabled={submitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c85a3c] px-6 py-3.5 font-semibold text-white transition hover:bg-[#aa462d] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Registering…" : "Register interest"} {!submitting && <ArrowRight size={18} />}</button>
      {error && <p role="alert" className="mt-3 text-center text-sm text-[#aa462d]">{error}</p>}
      <p className="mt-3 text-center text-xs text-[#6a756f]">We’ll review your details and be in touch.</p>
    </form>
  );
}
