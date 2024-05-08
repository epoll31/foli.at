import Timeline from "@/components/Timeline";
import { WorkExperience } from "@/lib/testData";

const options = {
  month: "short",
  year: "numeric",
} as Intl.DateTimeFormatOptions;

export default function WorkHistory({
  workHistory: unoderedWorkHistory,
}: {
  workHistory: WorkExperience[];
}) {
  const workHistory = unoderedWorkHistory.sort((a, b) => {
    if (!b.endDate) {
      return 1;
    }
    if (!a.endDate) {
      return -1;
    }
    return b.endDate.getTime() - a.endDate.getTime();
  });

  return (
    <div className="my-8 max-w-prose">
      <h3 className="text-3xl mb-4">Work History</h3>
      <Timeline
        items={workHistory.map((work) => ({
          node: (
            <>
              <h4 className="text-xl font-semibold">{work.title}</h4>
              <div className="flex flex-wrap justify-between">
                <p className=""> {work.company}</p>
                <p className="text-sm ">
                  ({work.startDate.toLocaleDateString("en-US", options)} -{" "}
                  {work.endDate
                    ? work.endDate.toLocaleDateString("en-US", options)
                    : "Present"}
                  )
                </p>
              </div>
              <p>{work.description}</p>
            </>
          ),
          active: !work.endDate,
        }))}
      />
    </div>
  );
}
