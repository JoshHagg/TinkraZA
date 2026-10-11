import type { Experience } from "../types/experience";
import type { Filters } from "../components/FilterBar";

export const categoryGroups: Record<string, string[]> = {
  Make: ["Pottery", "Painting", "Sewing", "Jewellery", "Woodworking", "Candle making", "Leather craft", "Floristry"],
  Taste: ["Cooking", "Coffee", "Chocolate"],
  Learn: ["DJing", "Photography"],
  Move: ["Surfing", "Dance"],
};

export function searchExperiences(experiences: Experience[], query: string) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return experiences;

  return experiences.filter((item) => {
    const groups = Object.entries(categoryGroups)
      .filter(([, categories]) => categories.includes(item.category))
      .map(([group]) => group);
    const searchableText = [
      item.title,
      item.category,
      item.description,
      ...item.tags,
      ...item.included,
      ...groups,
    ].join(" ").toLocaleLowerCase();

    return terms.every((term) => searchableText.includes(term));
  });
}

export function filterExperiences(experiences: Experience[], filters: Filters) {
  return experiences.filter((item) => {
    const categoryMatches = filters.category === "all" || item.category === filters.category || categoryGroups[filters.category]?.includes(item.category);
    const subcategoryMatches = filters.subcategory === "all" || item.category === filters.subcategory;
    const priceMatches = filters.price === "all" || (filters.price === "under500" && item.price < 500) || (filters.price === "500to800" && item.price >= 500 && item.price <= 800) || (filters.price === "over800" && item.price > 800);
    return categoryMatches && subcategoryMatches && priceMatches && (filters.tag === "all" || item.tags.includes(filters.tag)) && (filters.area === "all" || item.area === filters.area);
  });
}
