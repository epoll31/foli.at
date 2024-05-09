import Timeline from "@/components/Timeline";
import { EducationEntry } from "@/lib/types";
import formatDate from "@/utils/formatDate";

const options = {
  month: "short",
  year: "numeric",
} as Intl.DateTimeFormatOptions;

export default function WorkHistory({
  educationEntries: unorderedEducationHistory,
}: {
  educationEntries: EducationEntry[];
}) {
  const educationHistory = unorderedEducationHistory.sort((a, b) => {
    if (!b.end_date) {
      return 1;
    }
    if (!a.end_date) {
      return -1;
    }
    return b.end_date.getTime() - a.end_date.getTime();
  });

  return (
    <div className="my-8 w-full">
      <h3 className="text-3xl mb-4">Education History</h3>
      <Timeline
        items={educationHistory.map((education) => ({
          node: (
            <>
              <h4 className="text-xl font-semibold">{education.school}</h4>
              <div className="flex flex-wrap justify-between">
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
                  {formatDate(education.start_date)} {" - "}{" "}
                  {education.end_date
                    ? formatDate(education.end_date)
                    : "Present"}
                </p>
              </div>
              <p>{education.description}</p>
            </>
          ),
          active: !education.end_date,
        }))}
      />
    </div>
  );
}
