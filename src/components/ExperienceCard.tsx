import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/experiences";
import type { Experience } from "../types/experience";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link to={`/experiences/${experience.id}`} className="group block min-w-0">
      <article>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[#e7ddcf]">
          <img src={experience.image} alt={`${experience.title} experience`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" style={{ objectPosition: experience.imagePosition }} />
          <span className="absolute left-4 top-4 rounded-full bg-[#fbf8f2]/95 px-3 py-1.5 text-xs font-semibold text-[#20352d]">{experience.category}</span>
          <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white text-[#20352d] opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={18} /></span>
        </div>
        <div className="pt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-[-0.025em]">{experience.title}</h3>
            <p className="whitespace-nowrap text-[15px] font-semibold">{formatPrice(experience.price)} <span className="text-xs font-normal text-[#5f6c66]">pp</span></p>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#5f6c66]">
            <span className="flex items-center gap-1.5"><MapPin size={14} />{experience.area}</span>
            <span className="flex items-center gap-1.5"><Clock3 size={14} />{experience.duration}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
