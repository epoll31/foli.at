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
      <div className="flex flex-col">
        {workHistory.map((work) => (
          <div
            key={work.company}
            className="relative  border-l-2 px-4 [&:not(:last-child)]:pb-8 hover:scale-110 origin-left transition-transform"
          >
            <span
              className={`absolute top-0 left-0 w-4 h-4 rounded-full border border-red-300 ${
                !work.endDate ? "bg-red-300" : "bg-red-50"
              } translate-x-[calc(-50%-1px)] translate-y-1/2`}
            />
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
          </div>
        ))}
      </div>
    </div>
  );
}
