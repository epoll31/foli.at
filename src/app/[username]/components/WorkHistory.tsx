import { WorkExperience } from "@/lib/testData";

export default function WorkHistory({
  workHistory,
}: {
  workHistory: WorkExperience[];
}) {
  return (
    <div className="my-8">
      <h3 className="text-3xl">Work History</h3>
      {workHistory.map((work) => (
        <div key={work.company} className="my-4">
          <h4 className="text-2xl">{work.title}</h4>
          <p>{work.company}</p>
          <p>
            {work.startDate} - {work.endDate}
          </p>
          <p>{work.description}</p>
        </div>
      ))}
    </div>
  );
}
