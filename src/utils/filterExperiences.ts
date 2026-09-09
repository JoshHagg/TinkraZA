import type { Experience } from "../types/experience";
import type { Filters } from "../components/FilterBar";

export const categoryGroups: Record<string, string[]> = {
  Make: ["Pottery", "Painting", "Sewing", "Jewellery", "Woodworking", "Candle making", "Leather craft", "Floristry"],
  Taste: ["Cooking", "Coffee", "Chocolate"],
  Learn: ["DJing", "Photography"],
  Move: ["Surfing", "Dance"],
};

export function filterExperiences(experiences: Experience[], filters: Filters) {
  return experiences.filter((item) => {
    const categoryMatches = filters.category === "all" || item.category === filters.category || categoryGroups[filters.category]?.includes(item.category);
    const priceMatches = filters.price === "all" || (filters.price === "under500" && item.price < 500) || (filters.price === "500to800" && item.price >= 500 && item.price <= 800) || (filters.price === "over800" && item.price > 800);
    return categoryMatches && priceMatches && (filters.tag === "all" || item.tags.includes(filters.tag)) && (filters.area === "all" || item.area === filters.area);
  });
}
