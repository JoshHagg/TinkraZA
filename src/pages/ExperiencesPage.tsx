import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExperienceGrid } from "../components/ExperienceGrid";
import { FilterBar, type Filters } from "../components/FilterBar";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { experiences } from "../data/experiences";
import { track } from "../utils/analytics";
import { categoryGroups, filterExperiences, searchExperiences } from "../utils/filterExperiences";

export function ExperiencesPage() {
  const [params] = useSearchParams();
  const requestedCategory = params.get("category") ?? "all";
  const requestedSubcategory = params.get("subcategory") ?? "all";
  const requestedTag = params.get("tag") ?? "all";
  const requestedSearch = params.get("search") ?? "";
  const legacySubcategoryGroup = Object.entries(categoryGroups).find(([, subcategories]) => subcategories.includes(requestedCategory))?.[0];
  const initialCategory = categoryGroups[requestedCategory] ? requestedCategory : legacySubcategoryGroup ?? "all";
  const initialSubcategory = legacySubcategoryGroup
    ? requestedCategory
    : categoryGroups[initialCategory]?.includes(requestedSubcategory)
      ? requestedSubcategory
      : "all";
  const [filters, setFilters] = useState<Filters>({ category: initialCategory, subcategory: initialSubcategory, price: requestedTag === "Under R500" ? "under500" : "all", tag: requestedTag === "Under R500" ? "all" : requestedTag, area: "all" });
  const categories = Object.keys(categoryGroups);
  const areas = [...new Set(experiences.map((item) => item.area))].sort();
  const availableCategoryGroups = Object.fromEntries(
    Object.entries(categoryGroups).map(([group, subcategories]) => [
      group,
      subcategories.filter((subcategory) => experiences.some((item) => item.category === subcategory)),
    ]),
  );

  const filtered = useMemo(() => filterExperiences(searchExperiences(experiences, requestedSearch), filters), [filters, requestedSearch]);

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value, ...(key === "category" ? { subcategory: "all" } : {}) }));
    track("filter_used", { filter: key, value });
  }

  return <><Navbar /><main className="min-h-[75vh]"><section className="border-b border-[#20352d]/10 bg-[#f7f1e7] py-14 sm:py-18"><div className="page-shell"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#c85a3c]">Cape Town, made curious</p><h1 className="display-font mt-3 text-5xl tracking-[-0.05em] sm:text-7xl">Find your next first.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#5f6c66]">Workshops and hands-on experiences where beginners are genuinely welcome.</p></div></section><section className="py-10 sm:py-14"><div className="page-shell"><FilterBar filters={filters} categories={categories} categoryGroups={availableCategoryGroups} areas={areas} onChange={updateFilter} onReset={() => setFilters({ category: "all", subcategory: "all", price: "all", tag: "all", area: "all" })} /><div className="mb-8 mt-10 flex items-end justify-between"><div><p className="text-sm text-[#66736d]">{filtered.length} {filtered.length === 1 ? "experience" : "experiences"}</p><h2 className="display-font mt-1 text-3xl sm:text-4xl">Things to learn, make or try</h2></div></div><ExperienceGrid experiences={filtered} /></div></section></main><Footer /></>;
}
