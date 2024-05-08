import Timeline from "@/components/Timeline";
import { EducationExperience } from "@/lib/testData";

const options = {
  month: "short",
  year: "numeric",
} as Intl.DateTimeFormatOptions;

export default function WorkHistory({
  educationHistory: unoderEdeducationHistory,
}: {
  educationHistory: EducationExperience[];
}) {
  const educationHistory = unoderEdeducationHistory.sort((a, b) => {
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
              <div className="flex flex-wrap justify-between">
                <p className=""> {education.degree}</p>
                <p className="text-sm ">
                  ({education.startDate.toLocaleDateString("en-US", options)} -{" "}
                  {education.endDate
                    ? education.endDate.toLocaleDateString("en-US", options)
                    : "Present"}
                  )
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
