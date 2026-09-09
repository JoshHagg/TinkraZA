import { useEffect } from "react";
import { experiences } from "../data/experiences";
import { saveEmailInterest, saveProviderInterest } from "../utils/storage";

function validEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function notify(message: string) {
  window.dispatchEvent(new CustomEvent("ctm-notice", { detail: message }));
}

export function useWebMcp() {
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();

    const register = (tool: WebMcpTool) => {
      try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(console.error); }
      catch (error) { console.error(error); }
    };

    register({
      name: "join_experience_waitlist",
      title: "Join an experience waitlist",
      description: "Save an email address to the local waitlist for one listed experience.",
      inputSchema: { type: "object", properties: { experienceId: { type: "string" }, email: { type: "string", format: "email" } }, required: ["experienceId", "email"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const value = input as { experienceId?: unknown; email?: unknown };
        if (!validEmail(value.email) || typeof value.experienceId !== "string" || !experiences.some((item) => item.id === value.experienceId)) throw new Error("Provide a valid experienceId and email address.");
        saveEmailInterest({ email: value.email, experienceId: value.experienceId });
        notify("You’re on the list. We’ll let you know when booking opens.");
        return { status: "saved", experienceId: value.experienceId };
      },
    });

    register({
      name: "register_provider_interest",
      title: "Register provider interest",
      description: "Save a Cape Town experience provider's interest details locally.",
      inputSchema: { type: "object", properties: { name: { type: "string" }, businessName: { type: "string" }, email: { type: "string", format: "email" }, website: { type: "string" }, category: { type: "string" }, description: { type: "string" } }, required: ["name", "businessName", "email", "category", "description"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const value = input as Record<string, unknown>;
        if (!["name", "businessName", "category", "description"].every((key) => typeof value[key] === "string" && value[key].trim()) || !validEmail(value.email)) throw new Error("Complete the required provider details with a valid email address.");
        saveProviderInterest({ name: String(value.name), businessName: String(value.businessName), email: value.email, website: typeof value.website === "string" ? value.website : "", category: String(value.category), description: String(value.description) });
        notify("Thanks — your provider interest has been registered.");
        return { status: "saved", businessName: value.businessName };
      },
    });

    return () => lifecycle.abort();
  }, []);
}
