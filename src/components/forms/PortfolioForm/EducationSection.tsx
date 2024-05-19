"user client";

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
import { useFieldArray, useFormContext } from "react-hook-form";
import { formatDateToMonthYear } from "@/utils/formatDate";
import ErrorWrapper from "@/components/forms/ErrorWrapper";
import { FormSchema } from "@/lib/zod/portfolioSchema";
import Hr from "@/components/ui/Hr";

export default function EducationSection() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormSchema>();
  const [open, setOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationHistories",
  });

  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn(
          "relative text-center py-3 border-y border-theme-border-primary  text-theme-text-primary transition-light-dark"
        )}
      >
        Education History
        {
          <ChevronUp
            className={cn(
              `absolute top-0 h-full end-3 -rotate-180 transition-all text-theme-text-primary`,
              open && "rotate-0"
            )}
          />
        }
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col justify-center pt-4 pb-1">
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col justify-center">
              <div className="flex flex-col relative px-6 gap-3">
                <div className="grid grid-cols-[min-content_1fr] items-baseline gap-3">
                  <label htmlFor={`educationHistories.${index}.school`}>
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
                        id={`educationHistories.${index}.school`}
                        {...register(`educationHistories.${index}.school`)}
                        defaultValue={item.school}
                        required
                        tabIndex={open ? 0 : -1}
                        glowColor={
                          errors?.educationHistories &&
                          errors.educationHistories[index]?.school
                            ? "var(--theme-error)"
                            : "var(--theme-info)"
                        }
                      />
                    </ErrorWrapper>
                    <TrashButton
                      onClick={() => remove(index)}
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
                      defaultValue={item.degree}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[index]?.degree
                          ? "var(--theme-error)"
                          : "var(--theme-info)"
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
                      defaultValue={item.major || ""}
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[index]?.major
                          ? "var(--theme-error)"
                          : "var(--theme-info)"
                      }
                    />
                  </ErrorWrapper>
                </div>
                <div className="grid grid-cols-[min-content_1fr] md:grid-cols-[min-content_1fr_min-content_1fr] items-baseline gap-x-3 gap-y-3">
                  <label htmlFor={`education-startDate-${index}`}>From:</label>
                  <ErrorWrapper
                    error={
                      errors?.educationHistories &&
                      errors.educationHistories[index]?.startDate?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`education-startDate-${index}`}
                      onChange={(e) => {
                        setValue(
                          `educationHistories.${index}.startDate`,
                          new Date(e.target.value)
                        );
                      }}
                      type="month"
                      defaultValue={formatDateToMonthYear(item.startDate)}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[index]?.startDate
                          ? "var(--theme-error)"
                          : "var(--theme-info)"
                      }
                    />
                  </ErrorWrapper>
                  <label htmlFor={`education-endDate-${index}`}>To:</label>
                  <ErrorWrapper
                    error={
                      errors?.educationHistories &&
                      errors.educationHistories[index]?.endDate?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`education-endDate-${index}`}
                      onChange={(e) => {
                        setValue(
                          `educationHistories.${index}.endDate`,
                          e.target.value ? new Date(e.target.value) : null
                        );
                      }}
                      type="month"
                      defaultValue={formatDateToMonthYear(item.endDate)}
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[index]?.endDate
                          ? "var(--theme-error)"
                          : "var(--theme-info)"
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
                    defaultValue={item.description}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationHistories &&
                      errors.educationHistories[index]?.description
                        ? "var(--theme-error)"
                        : "var(--theme-info)"
                    }
                  />
                </ErrorWrapper>
              </div>
              <Hr className=" my-3" />
            </div>
          ))}
          <span className="mx-auto w-fit">
            <Button
              type="button"
              onClick={() => {
                append({
                  school: "",
                  degree: "",
                  major: "",
                  startDate: {} as Date,
                  endDate: null,
                  description: "",
                });
              }}
              className="text-center"
              tabIndex={open ? 0 : -1}
            >
              Add Education
            </Button>
          </span>
        </div>
      </AccordionContent>
    </Accordion>
  );
}
