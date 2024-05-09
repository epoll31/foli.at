import Timeline from "@/components/Timeline";
import { WorkEntry } from "@/lib/types";
import formatDate from "@/utils/formatDate";

export default function WorkHistory({
  workEntries: unoderedWorkHistory,
}: {
  workEntries: WorkEntry[];
}) {
  const workHistory = unoderedWorkHistory.sort((a, b) => {
    if (!b.end_date) {
      return 1;
    }
    if (!a.end_date) {
      return -1;
    }
    return b.end_date.getTime() - a.end_date.getTime();
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
                <p className="text-sm">
                  {formatDate(work.start_date)}
                  {" - "}
                  {work.end_date ? formatDate(work.end_date) : "Present"}
                </p>
              </div>
              <p>{work.description}</p>
            </>
          ),
          active: !work.end_date,
        }))}
      />
    </div>
  );
}
