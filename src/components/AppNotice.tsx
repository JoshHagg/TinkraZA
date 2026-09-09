import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function AppNotice() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const listener = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail);
      window.setTimeout(() => setMessage(""), 4000);
    };
    window.addEventListener("ctm-notice", listener);
    return () => window.removeEventListener("ctm-notice", listener);
  }, []);
  if (!message) return null;
  return <div role="status" className="fixed bottom-5 left-1/2 z-[70] flex w-[min(92vw,430px)] -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#20352d] px-5 py-4 text-sm font-medium text-white shadow-2xl"><CheckCircle2 size={20} className="shrink-0 text-[#efb487]" />{message}</div>;
}
