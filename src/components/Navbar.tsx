import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-40 border-b border-[#20352d]/10 bg-[#fbf8f2]/95 backdrop-blur">
      <div className="page-shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-[-0.02em]" aria-label="Cape Town Makers home">
          <span className="grid size-9 place-items-center rounded-full bg-[#c85a3c] text-white"><Sparkles size={17} /></span>
          <span>Cape Town Makers</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[15px] font-medium md:flex" aria-label="Main navigation">
          <Link className="transition-colors hover:text-[#c85a3c]" to="/experiences">Experiences</Link>
          <Link className="transition-colors hover:text-[#c85a3c]" to="/providers">For providers</Link>
          <Link className="rounded-full bg-[#20352d] px-5 py-3 text-white transition hover:bg-[#c85a3c]" to="/experiences">Find something to try</Link>
        </nav>
        <button onClick={() => setOpen((value) => !value)} className="grid size-11 place-items-center rounded-full border border-[#20352d]/15 md:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && <nav className="page-shell flex flex-col gap-1 border-t border-[#20352d]/10 py-3 md:hidden" aria-label="Mobile navigation"><Link onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-medium hover:bg-[#f1e9dd]" to="/experiences">Experiences</Link><Link onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-medium hover:bg-[#f1e9dd]" to="/providers">For providers</Link></nav>}
    </header>
  );
}
