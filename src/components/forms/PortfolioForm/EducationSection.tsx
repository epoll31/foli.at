"user client";

import useKeyedItems from "@/utils/hooks/useKeyedItems";
import Input from "@/components/ui/Input";
import TrashButton from "@/components/TrashButtons";
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
import ErrorWrapper from "@/components/forms/ErrorWrapper";
import { FormSchema } from "@/lib/zod/portfolioSchema";
import { EducationHistory } from "@/lib/types";

type PartialEducationHistory = Omit<
  EducationHistory,
  "id" | "startDate" | "endDate" | "portfolioId"
> & {
  startDate: Date | undefined;
  endDate: Date | undefined;
};
export default function EducationSection({
  educationHistories,
}: {
  educationHistories: EducationHistory[];
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
  } = useKeyedItems<PartialEducationHistory>(
    educationHistories.map((item) => ({
      school: item.school,
      degree: item.degree,
      major: item.major,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate ?? undefined,
    })),
    {
      school: "",
      degree: "",
      major: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
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
                <label htmlFor={`ducationHistories.${index}.school`}>
                  School:
                </label>
                <div className="grid grid-cols-[1fr_min-content] gap-3">
                  <ErrorWrapper
                    error={
                      errors?.educationHistories &&
                      errors.educationHistories[index]?.school?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`ducationHistories.${index}.school`}
                      {...register(`educationHistories.${index}.school`)}
                      defaultValue={item.value.school}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[index]?.school
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
                <label htmlFor={`edueducationHistories.${index}.degree`}>
                  Degree:
                </label>
                <ErrorWrapper
                  error={
                    errors?.educationHistories &&
                    errors.educationHistories[index]?.degree?.message
                  }
                >
                  <Input
                    className="w-full"
                    id={`educationHistories.${index}.degree`}
                    {...register(`educationHistories.${index}.degree`)}
                    defaultValue={item.value.degree}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationHistories &&
                      errors.educationHistories[index]?.degree
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
                <label htmlFor={`educationHistories.${index}.major`}>
                  Major:
                </label>
                <ErrorWrapper
                  error={
                    errors?.educationHistories &&
                    errors.educationHistories[index]?.major?.message
                  }
                >
                  <Input
                    className="w-full"
                    id={`educationHistories.${index}.major`}
                    {...register(`educationHistories.${index}.major`)}
                    defaultValue={item.value.major || ""}
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationHistories &&
                      errors.educationHistories[index]?.major
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
              </div>
              <div className="grid grid-cols-[min-content_1fr] md:flex flex-row items-baseline gap-x-3 gap-y-3">
                <label htmlFor={`education-startDate-${item.key}`}>From:</label>
                <ErrorWrapper
                  error={
                    errors?.educationHistories &&
                    errors.educationHistories[index]?.startDate?.message
                  }
                >
                  <Input
                    className="w-full"
                    id={`education-startDate-${item.key}`}
                    onChange={(e) => {
                      setValue(
                        `educationHistories.${index}.startDate`,
                        new Date(e.target.value)
                      );
                    }}
                    type="month"
                    defaultValue={formatDateToMonthYear(item.value.startDate)}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationHistories &&
                      errors.educationHistories[index]?.startDate
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
                <label htmlFor={`education-endDate-${item.key}`}>To:</label>
                <ErrorWrapper
                  error={
                    errors?.educationHistories &&
                    errors.educationHistories[index]?.endDate?.message
                  }
                >
                  <Input
                    className="w-full"
                    id={`education-endDate-${item.key}`}
                    onChange={(e) => {
                      setValue(
                        `educationHistories.${index}.endDate`,
                        new Date(e.target.value)
                      );
                    }}
                    type="month"
                    defaultValue={formatDateToMonthYear(item.value.endDate)}
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationHistories &&
                      errors.educationHistories[index]?.endDate
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
              </div>
              <label htmlFor={`educationHistories.${index}.description`}>
                Description:
              </label>
              <ErrorWrapper
                error={
                  errors?.educationHistories &&
                  errors.educationHistories[index]?.description?.message
                }
              >
                <TextArea
                  className="h-32"
                  id={`educationHistories.${index}.description`}
                  {...register(`educationHistories.${index}.description`)}
                  defaultValue={item.value.description}
                  required
                  tabIndex={open ? 0 : -1}
                  glowColor={
                    errors?.educationHistories &&
                    errors.educationHistories[index]?.description
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
