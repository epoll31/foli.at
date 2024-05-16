import Timeline from "@/components/Timeline";
import { EducationHistory } from "@/lib/types";
import { formatDate } from "@/utils/formatDate";

const options = {
  month: "short",
  year: "numeric",
} as Intl.DateTimeFormatOptions;

export default function EducationSection({
  educationHistories: unorderedEducationHistory,
}: {
  educationHistories: EducationHistory[];
}) {
  const educationHistory = unorderedEducationHistory.sort((a, b) => {
    if (!b.endDate) {
      return 1;
    }
    if (!a.endDate) {
      return -1;
    }
    return b.endDate.getTime() - a.endDate.getTime();
  });

  return (
    <div className="my-8 w-full">
      <h3 className="text-3xl mb-4">Education History</h3>
      <Timeline
        items={educationHistory.map((education) => ({
          node: (
            <>
              <h4 className="text-xl font-semibold">{education.school}</h4>
              <div className="flex flex-wrap justify-between items-baseline">
                <p className="">
                  {education.degree}
                  {education.major && (
                    <span>
                      <span className="px-3">&bull;</span>
                      <span className="">{education.major}</span>
                    </span>
                  )}
                </p>
                <p className="text-sm ">
                  {formatDate(education.startDate)} {" - "}{" "}
                  {education.endDate
                    ? formatDate(education.endDate)
                    : "Present"}
                </p>
              </div>
              <p>{education.description}</p>
            </>
          ),
          active: !education.endDate,
        }))}
      />
    </div>
  );
}
