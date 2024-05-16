"user client";

import useKeyedItems from "@/utils/hooks/useKeyedItems";
import { NoId, WorkEntry } from "@/lib/types";
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

type PartialWorkEntry = Omit<NoId<WorkEntry>, "start_date" | "end_date"> & {
  start_date: Date | undefined;
  end_date: Date | undefined;
};
export default function WorkSection({
  workEntries,
}: {
  workEntries: WorkEntry[];
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

  //TODO: should we use key or index as array index?
  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn(
          "relative text-center bg-neutral-100 py-3 border-t border-neutral-200 transition-all",
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
      <AccordionContent className="flex flex-col justify-center">
        {workKeys.map((item) => (
          <div className="flex flex-col justify-center" key={item.key}>
            <div className="flex flex-col relative px-6 gap-3">
              <div className="w-full grid grid-cols-[min-content_1fr] items-baseline gap-x-3 gap-y-3">
                <label htmlFor={`work-title-${item.key}`}>Title:</label>
                <div className="grid grid-cols-[1fr_min-content] gap-4">
                  <ErrorWrapper
                    error={errors?.workEntries?.[item.key]?.title?.message}
                  >
                    <Input
                      className="w-full"
                      id={`work-title-${item.key}`}
                      {...register(`workEntries.${item.key}.title`)}
                      defaultValue={item.value.title}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.workEntries?.[item.key]?.title
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
                <label htmlFor={`work-company-${item.key}`}>Company:</label>
                <ErrorWrapper
                  error={errors?.workEntries?.[item.key]?.company?.message}
                >
                  <Input
                    className="w-full"
                    id={`work-company-${item.key}`}
                    {...register(`workEntries.${item.key}.company`)}
                    defaultValue={item.value.company}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.workEntries?.[item.key]?.company
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
              </div>
              <div className="grid grid-cols-[min-content_1fr] md:flex flex-row items-baseline gap-x-3 gap-y-3">
                <label htmlFor={`work-start_date-${item.key}`}>From:</label>
                <ErrorWrapper
                  error={errors?.workEntries?.[item.key]?.start_date?.message}
                >
                  <Input
                    className="w-full"
                    id={`work-start_date-${item.key}`}
                    onChange={(e) => {
                      setValue(
                        `workEntries.${item.key}.start_date`,
                        new Date(e.target.value)
                      );
                    }}
                    type="month"
                    defaultValue={formatDateToMonthYear(item.value.start_date)}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.workEntries?.[item.key]?.start_date
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
                <label htmlFor={`work-end_date-${item.key}`}>To:</label>
                <ErrorWrapper
                  error={errors?.workEntries?.[item.key]?.end_date?.message}
                >
                  <Input
                    className="w-full"
                    id={`work-end_date-${item.key}`}
                    onChange={(e) => {
                      setValue(
                        `workEntries.${item.key}.end_date`,
                        new Date(e.target.value)
                      );
                    }}
                    type="month"
                    defaultValue={formatDateToMonthYear(item.value.end_date)}
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.workEntries?.[item.key]?.end_date
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
              </div>
              <label htmlFor={`work-description-${item.key}`}>
                Description:
              </label>
              <ErrorWrapper
                error={errors?.workEntries?.[item.key]?.description?.message}
              >
                <TextArea
                  className="h-32"
                  id={`work-description-${item.key}`}
                  {...register(`workEntries.${item.key}.description`)}
                  defaultValue={item.value.description}
                  required
                  tabIndex={open ? 0 : -1}
                  glowColor={
                    errors?.workEntries?.[item.key]?.description
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
      </AccordionContent>
    </Accordion>
  );
}
