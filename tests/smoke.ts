import assert from "node:assert/strict";
import { experiences } from "../src/data/experiences";
import { filterExperiences } from "../src/utils/filterExperiences";
import { saveEmailInterest, saveProviderInterest } from "../src/utils/storage";

const base = { category: "all", price: "all", tag: "all", area: "all" };
assert.equal(experiences.length, 15);
assert.ok(filterExperiences(experiences, { ...base, price: "under500" }).every((item) => item.price < 500));
assert.ok(filterExperiences(experiences, { ...base, tag: "Date night" }).every((item) => item.tags.includes("Date night")));
assert.ok(filterExperiences(experiences, { ...base, category: "Make" }).every((item) => ["Pottery", "Painting", "Sewing", "Jewellery", "Woodworking", "Candle making", "Leather craft", "Floristry"].includes(item.category)));
assert.ok(filterExperiences(experiences, { ...base, area: "Woodstock" }).every((item) => item.area === "Woodstock"));

const memory = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", { value: { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => memory.set(key, value) } });
saveEmailInterest({ email: "test@example.com", experienceId: experiences[0].id });
saveProviderInterest({ name: "Test Host", businessName: "Test Studio", email: "host@example.com", website: "@test", category: "Make", description: "A hands-on beginner workshop for curious people." });
assert.equal(JSON.parse(memory.get("ctm_email_interests") ?? "[]").length, 1);
assert.equal(JSON.parse(memory.get("ctm_provider_interests") ?? "[]").length, 1);

console.log("Smoke checks passed: data, filters, email capture storage, and provider interest storage.");
