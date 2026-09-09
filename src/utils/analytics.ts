export type AnalyticsEvent =
  | "experience_viewed"
  | "availability_clicked"
  | "email_submitted"
  | "filter_used"
  | "provider_cta_clicked"
  | "provider_interest_submitted";

export function track(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  console.info(`[analytics] ${event}`, properties);
}
