import { Check } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ProviderForm } from "../components/ProviderForm";
import { track } from "../utils/analytics";

export function ProvidersPage() {
  return <><Navbar /><main className="bg-[#f7f1e7] py-14 sm:py-20"><div className="page-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div className="lg:sticky lg:top-10"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#c85a3c]">For Cape Town hosts</p><h1 className="display-font mt-3 text-5xl leading-[1] tracking-[-0.05em] sm:text-7xl">List your experience</h1><p className="mt-6 max-w-lg text-lg leading-8 text-[#5f6c66]">We’re building a place that helps local experience providers reach people actively looking for something new to try.</p><ul className="mt-8 space-y-4">{["Reach curious locals and visitors", "Show what guests will learn, make or try", "Register interest with no commitment"].map((item) => <li key={item} className="flex items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-[#d8e7e0]"><Check size={15} /></span>{item}</li>)}</ul></div><div onFocus={() => track("provider_cta_clicked")}><ProviderForm /></div></div></main><Footer /></>;
}
