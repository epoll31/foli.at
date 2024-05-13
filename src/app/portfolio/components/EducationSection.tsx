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
import { useFormContext } from "react-hook-form";
import { formatDateToMonthYear } from "@/utils/formatDate";
import ErrorWrapper from "./ErrorWrapper";
import { FormSchema } from "../utils/formSchema";

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
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormSchema>();
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
          <div key={item.key} className="flex flex-col justify-center">
            <div key={item.key} className="flex flex-col relative px-6 gap-3">
              <div className="grid grid-cols-[min-content_1fr] items-baseline gap-3">
                <label htmlFor={`education-school-${item.key}`}>School:</label>
                <div className="grid grid-cols-[1fr_min-content] gap-3">
                  <ErrorWrapper
                    error={
                      errors?.educationEntries &&
                      errors.educationEntries[index]?.school?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`education-school-${item.key}`}
                      {...register(`educationEntries.${index}.school`)}
                      defaultValue={item.value.school}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationEntries &&
                        errors.educationEntries[index]?.school
                          ? "#fb3b53"
                          : "#60a5fa"
                      }
                    />
                  </ErrorWrapper>
                  <TrashButton
                    onClick={() => removeEducation(item.key)}
                    tabIndex={open ? 0 : -1}
                  />
                </div>
                <label htmlFor={`education-degree-${item.key}`}>Degree:</label>
                <ErrorWrapper
                  error={
                    errors?.educationEntries &&
                    errors.educationEntries[index]?.degree?.message
                  }
                >
                  <Input
                    className="w-full"
                    id={`education-degree-${item.key}`}
                    {...register(`educationEntries.${index}.degree`)}
                    defaultValue={item.value.degree}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationEntries &&
                      errors.educationEntries[index]?.degree
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
                <label htmlFor={`education-major-${item.key}`}>Major:</label>
                <ErrorWrapper
                  error={
                    errors?.educationEntries &&
                    errors.educationEntries[index]?.major?.message
                  }
                >
                  <Input
                    className="w-full"
                    id={`education-major-${item.key}`}
                    {...register(`educationEntries.${index}.major`)}
                    defaultValue={item.value.major || ""}
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationEntries &&
                      errors.educationEntries[index]?.major
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
              </div>
              <div className="flex flex-row items-baseline gap-x-3 gap-y-3">
                <label htmlFor={`education-start_date-${item.key}`}>
                  From:
                </label>
                <ErrorWrapper
                  error={
                    errors?.educationEntries &&
                    errors.educationEntries[index]?.start_date?.message
                  }
                >
                  <Input
                    className="w-full"
                    id={`education-start_date-${item.key}`}
                    onChange={(e) => {
                      setValue(
                        `educationEntries.${index}.start_date`,
                        new Date(e.target.value)
                      );
                    }}
                    type="month"
                    defaultValue={formatDateToMonthYear(item.value.start_date)}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationEntries &&
                      errors.educationEntries[index]?.start_date
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
                <label htmlFor={`education-end_date-${item.key}`}>To:</label>
                <ErrorWrapper
                  error={
                    errors?.educationEntries &&
                    errors.educationEntries[index]?.end_date?.message
                  }
                >
                  <Input
                    className="w-full"
                    id={`education-end_date-${item.key}`}
                    onChange={(e) => {
                      setValue(
                        `educationEntries.${index}.end_date`,
                        new Date(e.target.value)
                      );
                    }}
                    type="month"
                    defaultValue={formatDateToMonthYear(item.value.end_date)}
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationEntries &&
                      errors.educationEntries[index]?.end_date
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
              </div>
              <label htmlFor={`education-description-${item.key}`}>
                Description:
              </label>
              <ErrorWrapper
                error={
                  errors?.educationEntries &&
                  errors.educationEntries[index]?.description?.message
                }
              >
                <TextArea
                  className="h-32"
                  id={`education-description-${item.key}`}
                  {...register(`educationEntries.${index}.description`)}
                  defaultValue={item.value.description}
                  required
                  tabIndex={open ? 0 : -1}
                  glowColor={
                    errors?.educationEntries &&
                    errors.educationEntries[index]?.description
                      ? "#fb3b53"
                      : "#60a5fa"
                  }
                />
              </ErrorWrapper>
            </div>
            <span className="w-full h-px my-3 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
          </div>
        ))}
        <Button
          type="button"
          onClick={addEducation}
          className="w-fit mx-auto text-center"
          tabIndex={open ? 0 : -1}
        >
          Add Education
        </Button>
      </AccordionContent>
    </Accordion>
  );
}
