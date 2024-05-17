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
import { useContext, useState } from "react";
import Button from "@/components/ui/Button";
import { useFormContext } from "react-hook-form";
import { formatDateToMonthYear } from "@/utils/formatDate";
import ErrorWrapper from "@/components/forms/ErrorWrapper";
import { FormSchema } from "@/lib/zod/portfolioSchema";
import { EducationHistory } from "@/lib/types";
import { ConfirmReloadContext } from "./Form";

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
  const { setConfirmReload } = useContext(ConfirmReloadContext);

  const {
    items: educationKeys,
    addItem: addEducation2,
    removeItem: removeEducation2,
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

  function addEducation() {
    const education = addEducation2();
    setConfirmReload(true);

    setTimeout(() => {
      document
        .getElementById(`educationHistories.${education.key}.school`)
        ?.focus();
    }, 100);

    return education;
  }
  function removeEducation(key: number) {
    removeEducation2(key);
    setConfirmReload(true);
  }

  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn("relative text-center py-3 border-y border-zinc-600")}
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
      <AccordionContent>
        <div className="flex flex-col justify-center pt-4 pb-1">
          {educationKeys.map((item) => (
            <div key={item.key} className="flex flex-col justify-center">
              <div key={item.key} className="flex flex-col relative px-6 gap-3">
                <div className="grid grid-cols-[min-content_1fr] items-baseline gap-3">
                  <label htmlFor={`educationHistories.${item.key}.school`}>
                    School:
                  </label>
                  <div className="grid grid-cols-[1fr_min-content] gap-3">
                    <ErrorWrapper
                      error={
                        errors?.educationHistories &&
                        errors.educationHistories[item.key]?.school?.message
                      }
                    >
                      <Input
                        className="w-full"
                        id={`educationHistories.${item.key}.school`}
                        {...register(`educationHistories.${item.key}.school`)}
                        defaultValue={item.value.school}
                        required
                        tabIndex={open ? 0 : -1}
                        glowColor={
                          errors?.educationHistories &&
                          errors.educationHistories[item.key]?.school
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
                  <label htmlFor={`edueducationHistories.${item.key}.degree`}>
                    Degree:
                  </label>
                  <ErrorWrapper
                    error={
                      errors?.educationHistories &&
                      errors.educationHistories[item.key]?.degree?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`educationHistories.${item.key}.degree`}
                      {...register(`educationHistories.${item.key}.degree`)}
                      defaultValue={item.value.degree}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[item.key]?.degree
                          ? "#fb3b53"
                          : "#60a5fa"
                      }
                    />
                  </ErrorWrapper>
                  <label htmlFor={`educationHistories.${item.key}.major`}>
                    Major:
                  </label>
                  <ErrorWrapper
                    error={
                      errors?.educationHistories &&
                      errors.educationHistories[item.key]?.major?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`educationHistories.${item.key}.major`}
                      {...register(`educationHistories.${item.key}.major`)}
                      defaultValue={item.value.major || ""}
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[item.key]?.major
                          ? "#fb3b53"
                          : "#60a5fa"
                      }
                    />
                  </ErrorWrapper>
                </div>
                <div className="grid grid-cols-[min-content_1fr] md:flex flex-row items-baseline gap-x-3 gap-y-3">
                  <label htmlFor={`education-startDate-${item.key}`}>
                    From:
                  </label>
                  <ErrorWrapper
                    error={
                      errors?.educationHistories &&
                      errors.educationHistories[item.key]?.startDate?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`education-startDate-${item.key}`}
                      onChange={(e) => {
                        setValue(
                          `educationHistories.${item.key}.startDate`,
                          new Date(e.target.value)
                        );
                      }}
                      type="month"
                      defaultValue={formatDateToMonthYear(item.value.startDate)}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[item.key]?.startDate
                          ? "#fb3b53"
                          : "#60a5fa"
                      }
                    />
                  </ErrorWrapper>
                  <label htmlFor={`education-endDate-${item.key}`}>To:</label>
                  <ErrorWrapper
                    error={
                      errors?.educationHistories &&
                      errors.educationHistories[item.key]?.endDate?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`education-endDate-${item.key}`}
                      onChange={(e) => {
                        setValue(
                          `educationHistories.${item.key}.endDate`,
                          new Date(e.target.value)
                        );
                      }}
                      type="month"
                      defaultValue={formatDateToMonthYear(item.value.endDate)}
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.educationHistories &&
                        errors.educationHistories[item.key]?.endDate
                          ? "#fb3b53"
                          : "#60a5fa"
                      }
                    />
                  </ErrorWrapper>
                </div>
                <label htmlFor={`educationHistories.${item.key}.description`}>
                  Description:
                </label>
                <ErrorWrapper
                  error={
                    errors?.educationHistories &&
                    errors.educationHistories[item.key]?.description?.message
                  }
                >
                  <TextArea
                    className="h-32"
                    id={`educationHistories.${item.key}.description`}
                    {...register(`educationHistories.${item.key}.description`)}
                    defaultValue={item.value.description}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.educationHistories &&
                      errors.educationHistories[item.key]?.description
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
        </div>
      </AccordionContent>
    </Accordion>
  );
}
