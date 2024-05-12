"user client";

import useKeyedItems from "../utils/useKeyedItems";
import { EducationEntry, NoId } from "@/lib/types";
import Input from "@/components/ui/Input";
import TrashButton from "./TrashButtons";
import TextArea from "@/components/ui/TextArea";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import ChevronUp from "@/components/icons/chevron-up";
import { cn } from "@/utils/cn";
import { useState } from "react";
import Button from "@/components/ui/Button";

type PartialEducationEntry = Omit<
  NoId<EducationEntry>,
  "start_date" | "end_date"
> & {
  start_date: Date | undefined;
  end_date: Date | undefined;
};
export default function EducationSection({
  educationEntries,
}: {
  educationEntries: EducationEntry[];
}) {
  const [open, setOpen] = useState(false);

  const {
    items: educationKeys,
    addItem: addEducation,
    removeItem: removeEducation,
  } = useKeyedItems<PartialEducationEntry>(
    educationEntries.map((entry) => ({
      ...entry,
      end_date: entry.end_date ? entry.end_date : undefined,
    })),
    {
      school: "",
      degree: "",
      major: "",
      description: "",
      start_date: undefined,
      end_date: undefined,
    }
  );

  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn(
          "relative text-center bg-neutral-100 py-3 border-y border-neutral-200"
        )}
      >
        Education History
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
        {educationKeys.map((item, index) => (
          <>
            <div key={item.key} className="flex flex-col relative px-6 gap-3">
              <div className="grid grid-cols-[min-content_1fr] items-baseline gap-3">
                <label htmlFor={`education-school-${item.key}`}>School:</label>
                <div className="grid grid-cols-[1fr_min-content] gap-3">
                  <Input
                    className="w-full"
                    id={`education-school-${item.key}`}
                    name={`education-school-${item.key}`}
                    defaultValue={item.value.school}
                    required
                  />
                  <TrashButton onClick={() => removeEducation(item.key)} />
                </div>
                <label htmlFor={`education-degree-${item.key}`}>Degree:</label>
                <Input
                  className="w-full"
                  id={`education-degree-${item.key}`}
                  name={`education-degree-${item.key}`}
                  defaultValue={item.value.degree}
                  required
                />
                <label htmlFor={`education-major-${item.key}`}>Major:</label>
                <Input
                  className="w-full"
                  id={`education-major-${item.key}`}
                  name={`education-major-${item.key}`}
                  defaultValue={item.value.major || ""}
                />
              </div>
              <div className="flex flex-row items-baseline gap-x-3 gap-y-3">
                <label htmlFor={`education-start_date-${item.key}`}>
                  From:
                </label>
                <Input
                  className="w-full"
                  id={`education-start_date-${item.key}`}
                  name={`education-start_date-${item.key}`}
                  type="month"
                  defaultValue={
                    item.value.start_date &&
                    item.value.start_date.toISOString().slice(0, 7)
                  }
                  required
                />
                <label htmlFor={`education-end_date-${item.key}`}>To:</label>
                <Input
                  className="w-full"
                  id={`education-end_date-${item.key}`}
                  name={`education-end_date-${item.key}`}
                  type="month"
                  defaultValue={
                    item.value.end_date &&
                    item.value.end_date.toISOString().slice(0, 7)
                  }
                />
              </div>
              <label htmlFor={`education-description-${item.key}`}>
                Description:
              </label>
              <TextArea
                className="h-32"
                id={`education-description-${item.key}`}
                name={`education-description-${item.key}`}
                defaultValue={item.value.description}
                required
              />
            </div>
            <span className="w-full h-px my-3 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
          </>
        ))}
        <Button
          type="button"
          onClick={addEducation}
          className="w-fit mx-auto text-center"
        >
          Add Education
        </Button>
      </AccordionContent>
    </Accordion>
  );
}
