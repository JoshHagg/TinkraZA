import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { track } from "../utils/analytics";
import { saveProviderInterest } from "../utils/storage";

const initialForm = { name: "", businessName: "", email: "", website: "", category: "", description: "" };

export function ProviderForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const fieldClass = "mt-2 w-full rounded-xl border border-[#20352d]/15 bg-white px-4 py-3.5 outline-none transition focus:border-[#c85a3c] focus:ring-4 focus:ring-[#c85a3c]/10";

  function update(key: keyof typeof form, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  function submit(event: FormEvent) {
    event.preventDefault();
    saveProviderInterest(form);
    track("provider_interest_submitted", { category: form.category });
    setSubmitted(true);
  }

  if (submitted) return <div className="rounded-[2rem] bg-white p-8 text-center card-shadow sm:p-12"><CheckCircle2 className="mx-auto text-[#c85a3c]" size={44} /><h2 className="display-font mt-5 text-4xl">Interest registered.</h2><p className="mx-auto mt-3 max-w-md text-[#5f6c66]">Thanks, {form.name}. We’ve saved your details on this device for the prototype and will keep you in the loop.</p><button onClick={() => { setForm(initialForm); setSubmitted(false); }} className="mt-7 rounded-full border border-[#20352d]/20 px-5 py-3 font-semibold">Submit another</button></div>;

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
      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c85a3c] px-6 py-3.5 font-semibold text-white transition hover:bg-[#aa462d]">Register interest <ArrowRight size={18} /></button>
      <p className="mt-3 text-center text-xs text-[#6a756f]">For this prototype, submissions are saved locally on this device.</p>
    </form>
  );
}
