"user client";

import useKeyedItems from "../utils/useKeyedItems";
import { NoId, WorkEntry } from "@/lib/types";
import Input from "@/components/ui/Input";
import TrashButton from "./TrashButtons";
import TextArea from "@/components/ui/TextArea";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { useState } from "react";
import ChevronUp from "@/components/icons/chevron-up";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";

type PartialWorkEntry = Omit<NoId<WorkEntry>, "start_date" | "end_date"> & {
  start_date: Date | undefined;
  end_date: Date | undefined;
};
export default function WorkSection({
  workEntries,
}: {
  workEntries: WorkEntry[];
}) {
  const [open, setOpen] = useState(false);

  const {
    items: workKeys,
    addItem: addWork,
    removeItem: removeWork,
  } = useKeyedItems<PartialWorkEntry>(
    workEntries.map((entry) => ({
      ...entry,
      end_date: entry.end_date ? entry.end_date : undefined,
    })),
    {
      title: "",
      company: "",
      description: "",
      start_date: undefined,
      end_date: undefined,
    }
  );

  //TODO: fix border doubling between form sections (work, education, links, etc.)
  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn(
          "relative text-center bg-neutral-100 py-3 border-y border-neutral-200"
        )}
      >
        Work Experience
        {
          <ChevronUp
            className={cn(
              `absolute top-0 h-full end-3 -rotate-180 transition-transform text-neutral-400`,
              open && "rotate-0"
            )}
          />
        }
      </AccordionTrigger>
      <AccordionContent className="flex flex-col justify-center">
        {workKeys.map((item) => (
          <>
            <div key={item.key} className="flex flex-col relative px-6 gap-3">
              <div className="w-full grid grid-cols-[min-content_1fr] items-baseline gap-x-3 gap-y-3">
                <label htmlFor={`work-title-${item.key}`}>Title:</label>
                <div className="grid grid-cols-[1fr_min-content] gap-4">
                  <Input
                    className="w-full"
                    id={`work-title-${item.key}`}
                    name={`work-title-${item.key}`}
                    defaultValue={item.value.title}
                    required
                  />
                  <TrashButton onClick={() => removeWork(item.key)} />
                </div>
                <label htmlFor={`work-company-${item.key}`}>Company:</label>
                <Input
                  className="w-full"
                  id={`work-company-${item.key}`}
                  name={`work-company-${item.key}`}
                  defaultValue={item.value.company}
                  required
                />
              </div>
              <div className="flex flex-row items-baseline gap-x-3 gap-y-3">
                <label htmlFor={`work-start_date-${item.key}`}>From:</label>
                <Input
                  className="w-full"
                  id={`work-start_date-${item.key}`}
                  name={`work-start_date-${item.key}`}
                  type="month"
                  defaultValue={
                    item.value.start_date &&
                    item.value.start_date.toISOString().slice(0, 7)
                  }
                  required
                />
                <label htmlFor={`work-end_date-${item.key}`}>To:</label>
                <Input
                  className="w-full"
                  id={`work-end_date-${item.key}`}
                  name={`work-end_date-${item.key}`}
                  type="month"
                  defaultValue={
                    item.value.end_date &&
                    item.value.end_date.toISOString().slice(0, 7)
                  }
                />
              </div>
              <label htmlFor={`work-description-${item.key}`}>
                Description:
              </label>
              <TextArea
                className="h-32"
                id={`work-description-${item.key}`}
                name={`work-description-${item.key}`}
                defaultValue={item.value.description}
                required
              />
            </div>
            <span className="w-full h-px my-3 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
          </>
        ))}
        <Button
          type="button"
          onClick={addWork}
          className="mx-auto w-fit text-center"
        >
          Add Work
        </Button>
      </AccordionContent>
    </Accordion>
  );
}
