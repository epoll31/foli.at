"user client";

import useKeyedItems from "@/utils/hooks/useKeyedItems";
import { WorkHistory } from "@/lib/types";
import Input from "@/components/ui/Input";
import TrashButton from "@/components/TrashButtons";
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
import { useFormContext } from "react-hook-form";
import { formatDateToMonthYear } from "@/utils/formatDate";
import { FormSchema } from "@/lib/zod/portfolioSchema";
import ErrorWrapper from "@/components/forms/ErrorWrapper";

type PartialWorkHistory = Omit<
  WorkHistory,
  "id" | "startDate" | "endDate" | "portfolioId"
> & {
  startDate: Date | undefined;
  endDate: Date | undefined;
};
export default function WorkSection({
  workHistories,
}: {
  workHistories: WorkHistory[];
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormSchema>();
  const [open, setOpen] = useState(false);

  const {
    items: workKeys,
    addItem: addWork,
    removeItem: removeWork,
  } = useKeyedItems<PartialWorkHistory>(
    workHistories.map((item) => ({
      title: item.title,
      company: item.company,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate ?? undefined,
    })),
    {
      title: "",
      company: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
    }
  );

  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn(
          "relative text-center py-3 border-t border-zinc-600 transition-all",
          open && "border-b"
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
      <AccordionContent>
        <div className="flex flex-col justify-center py-4">
          {workKeys.map((item) => (
            <div className="flex flex-col justify-center" key={item.key}>
              <div className="flex flex-col relative px-6 gap-3">
                <div className="w-full grid grid-cols-[min-content_1fr] items-baseline gap-x-3 gap-y-3">
                  <label htmlFor={`workHistories.${item.key}.title}`}>
                    Title:
                  </label>
                  <div className="grid grid-cols-[1fr_min-content] gap-4">
                    <ErrorWrapper
                      error={errors?.workHistories?.[item.key]?.title?.message}
                    >
                      <Input
                        className="w-full"
                        id={`workHistories.${item.key}.title`}
                        {...register(`workHistories.${item.key}.title`)}
                        defaultValue={item.value.title}
                        required
                        tabIndex={open ? 0 : -1}
                        glowColor={
                          errors?.workHistories?.[item.key]?.title
                            ? "#fb3b53"
                            : "#60a5fa"
                        }
                      />
                    </ErrorWrapper>
                    <TrashButton
                      onClick={() => removeWork(item.key)}
                      tabIndex={open ? 0 : -1}
                    />
                  </div>
                  <label htmlFor={`workHistories.${item.key}.company`}>
                    Company:
                  </label>
                  <ErrorWrapper
                    error={errors?.workHistories?.[item.key]?.company?.message}
                  >
                    <Input
                      className="w-full"
                      id={`workHistories.${item.key}.company}`}
                      {...register(`workHistories.${item.key}.company`)}
                      defaultValue={item.value.company}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.workHistories?.[item.key]?.company
                          ? "#fb3b53"
                          : "#60a5fa"
                      }
                    />
                  </ErrorWrapper>
                </div>
                <div className="grid grid-cols-[min-content_1fr] md:flex flex-row items-baseline gap-x-3 gap-y-3">
                  <label htmlFor={`workHistories.${item.key}.startDate`}>
                    From:
                  </label>
                  <ErrorWrapper
                    error={
                      errors?.workHistories?.[item.key]?.startDate?.message
                    }
                  >
                    <Input
                      className="w-full"
                      id={`workHistories.${item.key}.startDate`}
                      onChange={(e) => {
                        setValue(
                          `workHistories.${item.key}.startDate`,
                          new Date(e.target.value)
                        );
                      }}
                      type="month"
                      defaultValue={formatDateToMonthYear(item.value.startDate)}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.workHistories?.[item.key]?.startDate
                          ? "#fb3b53"
                          : "#60a5fa"
                      }
                    />
                  </ErrorWrapper>
                  <label htmlFor={`workHistories.${item.key}.endDate`}>
                    To:
                  </label>
                  <ErrorWrapper
                    error={errors?.workHistories?.[item.key]?.endDate?.message}
                  >
                    <Input
                      className="w-full"
                      id={`workHistories.${item.key}.endDate`}
                      onChange={(e) => {
                        setValue(
                          `workHistories.${item.key}.endDate`,
                          new Date(e.target.value)
                        );
                      }}
                      type="month"
                      defaultValue={formatDateToMonthYear(item.value.endDate)}
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.workHistories?.[item.key]?.endDate
                          ? "#fb3b53"
                          : "#60a5fa"
                      }
                    />
                  </ErrorWrapper>
                </div>
                <label htmlFor={`workHistories.${item.key}.description`}>
                  Description:
                </label>
                <ErrorWrapper
                  error={
                    errors?.workHistories?.[item.key]?.description?.message
                  }
                >
                  <TextArea
                    className="h-32"
                    id={`workHistories.${item.key}.description`}
                    {...register(`workHistories.${item.key}.description`)}
                    defaultValue={item.value.description}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.workHistories?.[item.key]?.description
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
            onClick={addWork}
            className="mx-auto w-fit text-center"
            tabIndex={open ? 0 : -1}
          >
            Add Work
          </Button>
        </div>
      </AccordionContent>
    </Accordion>
  );
}
