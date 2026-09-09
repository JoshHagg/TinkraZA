export interface EmailInterest {
  email: string;
  experienceId: string;
  submittedAt: string;
}

export interface ProviderInterest {
  name: string;
  businessName: string;
  email: string;
  website: string;
  category: string;
  description: string;
  submittedAt: string;
}

function appendLocal<T>(key: string, value: T) {
  const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as T[];
  localStorage.setItem(key, JSON.stringify([...existing, value]));
}

export function saveEmailInterest(data: Omit<EmailInterest, "submittedAt">) {
  appendLocal<EmailInterest>("ctm_email_interests", { ...data, submittedAt: new Date().toISOString() });
}

export function saveProviderInterest(data: Omit<ProviderInterest, "submittedAt">) {
  appendLocal<ProviderInterest>("ctm_provider_interests", { ...data, submittedAt: new Date().toISOString() });
}
