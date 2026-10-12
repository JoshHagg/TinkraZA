import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#172c25] py-10 text-[#f7f1e7]">
      <div className="page-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-semibold"><Sparkles size={18} />TinkraZA</Link>
        <p className="text-sm text-[#f7f1e7]/65">A validation prototype for curious Capetonians.</p>
        <div className="flex gap-5 text-sm"><Link to="/experiences">Explore</Link><Link to="/providers">List an experience</Link></div>
      </div>
    </footer>
  );
}
