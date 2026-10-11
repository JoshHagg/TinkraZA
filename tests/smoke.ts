import assert from "node:assert/strict";
import { experiences } from "../src/data/experiences";
import { filterExperiences, searchExperiences } from "../src/utils/filterExperiences";
import { saveEmailInterest, saveProviderInterest } from "../src/utils/storage";

const base = { category: "all", subcategory: "all", price: "all", tag: "all", area: "all" };
assert.equal(experiences.length, 15);
assert.ok(filterExperiences(experiences, { ...base, price: "under500" }).every((item) => item.price < 500));
assert.ok(filterExperiences(experiences, { ...base, tag: "Date night" }).every((item) => item.tags.includes("Date night")));
assert.ok(filterExperiences(experiences, { ...base, category: "Make" }).every((item) => ["Pottery", "Painting", "Sewing", "Jewellery", "Woodworking", "Candle making", "Leather craft", "Floristry"].includes(item.category)));
assert.equal(filterExperiences(experiences, { ...base, category: "Make" }).length, 9);
assert.ok(filterExperiences(experiences, { ...base, category: "Taste" }).every((item) => ["Cooking", "Coffee", "Chocolate"].includes(item.category)));
assert.equal(filterExperiences(experiences, { ...base, category: "Make", subcategory: "Pottery" }).length, 2);
assert.equal(filterExperiences(experiences, { ...base, category: "Taste", subcategory: "Pottery" }).length, 0);
assert.ok(filterExperiences(experiences, { ...base, area: "Woodstock" }).every((item) => item.area === "Woodstock"));
assert.deepEqual(searchExperiences(experiences, "pottery"), experiences.filter((item) => item.category === "Pottery"));
assert.deepEqual(searchExperiences(experiences, "chocolate"), experiences.filter((item) => item.category === "Chocolate"));
assert.deepEqual(searchExperiences(experiences, "espresso"), experiences.filter((item) => item.id === "barista-experience"));
assert.deepEqual(searchExperiences(experiences, "  "), experiences);

const memory = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", { value: { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => memory.set(key, value) } });
saveEmailInterest({ email: "test@example.com", experienceId: experiences[0].id });
saveProviderInterest({ name: "Test Host", businessName: "Test Studio", email: "host@example.com", website: "@test", category: "Make", description: "A hands-on beginner workshop for curious people." });
assert.equal(JSON.parse(memory.get("ctm_email_interests") ?? "[]").length, 1);
assert.equal(JSON.parse(memory.get("ctm_provider_interests") ?? "[]").length, 1);

console.log("Smoke checks passed: data, filters, email capture storage, and provider interest storage.");
