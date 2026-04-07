import { AWARD_CATEGORIES } from "@/data/awards";
import { AwardDetailCard } from "./AwardDetailCard";

export function AwardsDetailList() {
  return (
    <div className="flex-1 flex flex-col gap-20">
      {AWARD_CATEGORIES.map((award, index) => (
        <div key={award.id}>
          <section id={award.anchor}>
            <AwardDetailCard award={award} />
          </section>
          {index < AWARD_CATEGORIES.length - 1 && (
            <hr className="border-[#2E3940] mt-20" />
          )}
        </div>
      ))}
    </div>
  );
}
