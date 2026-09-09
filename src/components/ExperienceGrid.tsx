import type { Experience } from "../types/experience";
import { ExperienceCard } from "./ExperienceCard";

export function ExperienceGrid({ experiences }: { experiences: Experience[] }) {
  if (!experiences.length) return <div className="rounded-[1.5rem] border border-dashed border-[#20352d]/25 bg-white p-10 text-center"><h2 className="display-font text-3xl">Nothing matches just yet.</h2><p className="mt-2 text-[#617069]">Try clearing a filter or choosing a different price range.</p></div>;
  return <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">{experiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}</div>;
}
