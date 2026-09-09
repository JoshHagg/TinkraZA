import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Filters {
  category: string;
  price: string;
  tag: string;
  area: string;
}

interface FilterBarProps {
  filters: Filters;
  categories: string[];
  areas: string[];
  onChange: (key: keyof Filters, value: string) => void;
  onReset: () => void;
}

const quickFilters = ["Under R500", "Date night", "Good solo", "This weekend", "Beginner friendly"];

export function FilterBar({ filters, categories, areas, onChange, onReset }: FilterBarProps) {
  const selectClass = "h-11 w-full rounded-xl border-[#20352d]/15 bg-white px-4 shadow-none md:w-auto md:min-w-44";
  return (
    <div className="rounded-[1.5rem] border border-[#20352d]/10 bg-[#f1e9dd] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between"><p className="flex items-center gap-2 font-semibold"><SlidersHorizontal size={18} />Filter experiences</p><button onClick={onReset} className="flex items-center gap-1.5 text-sm font-semibold text-[#a74730]"><RotateCcw size={14} />Reset</button></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select value={filters.category} onValueChange={(value) => onChange("category", value)}><SelectTrigger className={selectClass} aria-label="Filter by category"><SelectValue placeholder="All categories" /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.price} onValueChange={(value) => onChange("price", value)}><SelectTrigger className={selectClass} aria-label="Filter by price"><SelectValue placeholder="Any price" /></SelectTrigger><SelectContent><SelectItem value="all">Any price</SelectItem><SelectItem value="under500">Under R500</SelectItem><SelectItem value="500to800">R500–R800</SelectItem><SelectItem value="over800">Over R800</SelectItem></SelectContent></Select>
        <Select value={filters.tag} onValueChange={(value) => onChange("tag", value)}><SelectTrigger className={selectClass} aria-label="Filter by occasion"><SelectValue placeholder="Any occasion" /></SelectTrigger><SelectContent><SelectItem value="all">Any occasion</SelectItem>{quickFilters.slice(1).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
        <Select value={filters.area} onValueChange={(value) => onChange("area", value)}><SelectTrigger className={selectClass} aria-label="Filter by area"><SelectValue placeholder="All areas" /></SelectTrigger><SelectContent><SelectItem value="all">All areas</SelectItem>{areas.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none" aria-label="Quick filters">
        {quickFilters.map((item) => {
          const active = item === "Under R500" ? filters.price === "under500" : filters.tag === item;
          return <button key={item} aria-pressed={active} onClick={() => item === "Under R500" ? onChange("price", active ? "all" : "under500") : onChange("tag", active ? "all" : item)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-[#20352d] bg-[#20352d] text-white" : "border-[#20352d]/15 bg-white hover:border-[#20352d]/45"}`}>{item}</button>;
        })}
      </div>
    </div>
  );
}
