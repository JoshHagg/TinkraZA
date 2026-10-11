import { useState, type FormEvent } from "react";
import { ArrowRight, CalendarDays, Gift, Heart, Search, Sparkles, UserRound, UsersRound, WalletCards } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ExperienceCard } from "../components/ExperienceCard";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { experiences } from "../data/experiences";
import { track } from "../utils/analytics";

const occasions = [
  { label: "This weekend", icon: CalendarDays, tone: "bg-[#d8e7e0]" },
  { label: "Date night", icon: Heart, tone: "bg-[#f1d5cb]" },
  { label: "Good solo", icon: UserRound, tone: "bg-[#eadfbe]" },
  { label: "With friends", icon: UsersRound, tone: "bg-[#d8dfed]" },
  { label: "Under R500", icon: WalletCards, tone: "bg-[#e3dfd0]" },
  { label: "Gifts", icon: Gift, tone: "bg-[#efd9b8]" },
];

const categories = [
  { group: "Make", items: "Pottery · Painting · Sewing · Jewellery · Woodworking", color: "bg-[#c85a3c] text-white" },
  { group: "Taste", items: "Cooking · Coffee · Chocolate · Cocktails", color: "bg-[#d9a441] text-[#20352d]" },
  { group: "Learn", items: "DJing · Photography", color: "bg-[#6f8e86] text-white" },
  { group: "Move", items: "Surfing · Dance", color: "bg-[#85afc1] text-[#20352d]" },
];

export function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/experiences?search=${encodeURIComponent(query)}` : "/experiences");
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="overflow-hidden bg-[#f7f1e7] py-10 sm:py-14 lg:py-18">
          <div className="page-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative z-10 py-4">
              <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#c85a3c]"><Sparkles size={15} /> Learn · make · try</p>
              <h1 className="display-font max-w-[670px] text-[clamp(3.3rem,7vw,6.7rem)] leading-[0.92] tracking-[-0.065em] text-[#20352d]">Try something new in Cape Town.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#53635c]">Discover beginner-friendly workshops, classes and hands-on experiences happening around you.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/experiences" className="inline-flex items-center gap-2 rounded-full bg-[#c85a3c] px-6 py-3.5 font-semibold text-white transition hover:bg-[#aa462d]">Explore experiences <ArrowRight size={18} /></Link>
                <Link to="/providers" onClick={() => track("provider_cta_clicked", { placement: "hero" })} className="rounded-full border border-[#20352d]/20 px-6 py-3.5 font-semibold transition hover:border-[#20352d]">List your experience</Link>
              </div>
            </div>
            <div className="relative lg:-mr-24">
              <div className="soft-shadow aspect-[5/4] overflow-hidden rounded-[2rem_2rem_2rem_5rem] bg-[#dccdb9]">
                <img src="/images/experiences/beginner-pottery-workshop.webp" alt="A maker shaping clay at a pottery wheel" className="h-full w-full object-cover object-center" />
              </div>
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 shadow-xl sm:left-[-1.5rem] sm:bottom-8">
                <span className="grid size-10 place-items-center rounded-xl bg-[#d8e7e0] text-[#20352d]"><Sparkles size={18} /></span>
                <div><p className="text-xs text-[#68736f]">No experience needed</p><p className="font-semibold">Just bring your curiosity</p></div>
              </div>
            </div>
          </div>
          <div className="page-shell mt-14">
            <form onSubmit={submitSearch} className="card-shadow flex flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row sm:items-center sm:rounded-full sm:pl-5">
              <div className="flex flex-1 items-center gap-3 px-2"><Search size={20} className="shrink-0 text-[#c85a3c]" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="What would you like to try?" aria-label="Search experiences by name, category, or keyword" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#68736f] focus-visible:ring-2 focus-visible:ring-[#20352d]/30" /></div>
              <button type="submit" className="rounded-full bg-[#20352d] px-6 py-3.5 font-semibold text-white transition hover:bg-[#c85a3c]">Show me ideas</button>
            </form>
          </div>
        </section>

        <section className="py-20">
          <div className="page-shell">
            <div className="mb-9 flex items-end justify-between gap-4"><div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#c85a3c]">Start with the mood</p><h2 className="display-font text-4xl tracking-[-0.04em] sm:text-5xl">Browse by occasion</h2></div></div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {occasions.map(({ label, icon: Icon, tone }) => <Link key={label} to={`/experiences?tag=${encodeURIComponent(label)}`} className={`${tone} group rounded-[1.4rem] p-4 transition hover:-translate-y-1`}><Icon size={21} /><p className="mt-8 text-[15px] font-semibold">{label}</p></Link>)}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="page-shell">
            <div className="mb-9 flex items-end justify-between gap-4"><div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#c85a3c]">Worth leaving the house for</p><h2 className="display-font text-4xl tracking-[-0.04em] sm:text-5xl">Popular experiences</h2></div><Link className="hidden items-center gap-2 font-semibold sm:flex" to="/experiences">View all <ArrowRight size={17} /></Link></div>
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{experiences.filter((item) => item.featured).map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}</div>
          </div>
        </section>

        <section className="bg-[#20352d] py-24 text-[#f7f1e7]">
          <div className="page-shell">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#edaa8e]">Follow your curiosity</p><h2 className="display-font max-w-2xl text-4xl tracking-[-0.04em] sm:text-5xl">Browse by category</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <Link key={category.group} to={`/experiences?category=${category.group}`} className={`${category.color} min-h-64 rounded-[2rem] p-6 transition hover:-translate-y-1`}><p className="display-font text-4xl">{category.group}</p><p className="mt-28 text-sm leading-6 opacity-80">{category.items}</p></Link>)}</div>
          </div>
        </section>

        <section className="py-24"><div className="page-shell grid gap-12 lg:grid-cols-2 lg:items-center"><h2 className="display-font text-5xl leading-[1.03] tracking-[-0.045em] sm:text-6xl">Cape Town has loads to do. Finding it shouldn’t be difficult.</h2><div><p className="max-w-xl text-lg leading-8 text-[#5f6c66]">We bring beginner-friendly workshops and hands-on experiences together in one thoughtful place—so it is easier to choose a plan and actually try it.</p><Link className="mt-6 inline-flex items-center gap-2 font-semibold text-[#c85a3c]" to="/experiences">See what’s on <ArrowRight size={18} /></Link></div></div></section>

        <section className="pb-24"><div className="page-shell overflow-hidden rounded-[2.2rem] bg-[#e9b884] p-8 sm:p-12 lg:flex lg:items-end lg:justify-between"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]">For local makers & teachers</p><h2 className="display-font text-5xl tracking-[-0.05em]">Run workshops or experiences?</h2><p className="mt-4 max-w-xl text-lg text-[#20352d]/75">Reach people looking for something new to try.</p></div><Link to="/providers" onClick={() => track("provider_cta_clicked", { placement: "footer_cta" })} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#20352d] px-6 py-3.5 font-semibold text-white lg:mt-0">List your experience <ArrowRight size={18} /></Link></div></section>
      </main>
      <Footer />
    </>
  );
}
