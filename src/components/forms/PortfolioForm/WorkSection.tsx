"user client";

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
import { useFieldArray, useFormContext } from "react-hook-form";
import { formatDateToMonthYear } from "@/utils/formatDate";
import { FormSchema } from "@/lib/zod/portfolioSchema";
import ErrorWrapper from "@/components/forms/ErrorWrapper";
import Hr from "@/components/ui/Hr";

export default function WorkSection() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormSchema>();
  const [open, setOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workHistories",
  });

  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn(
          "relative text-center py-3 border-t border-theme-white/10 transition-all text-theme-gray",
          open && "border-b"
        )}
      >
        Work Experience
        {
          <ChevronUp
            className={cn(
              `absolute top-0 h-full end-3 -rotate-180 transition-transform text-theme-gray`,
              open && "rotate-0"
            )}
          />
        }
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col justify-center py-4">
          {fields.map((item, index) => (
            <div className="flex flex-col justify-center" key={item.id}>
              <div className="flex flex-col relative px-6 gap-3">
                <div className="w-full grid grid-cols-[min-content_1fr] items-baseline gap-x-3 gap-y-3">
                  <label htmlFor={`workHistories.${index}.title}`}>
                    Title:
                  </label>
                  <div className="grid grid-cols-[1fr_min-content] gap-4">
                    <ErrorWrapper
                      error={errors?.workHistories?.[index]?.title?.message}
                    >
                      <Input
                        className="w-full"
                        id={`workHistories.${index}.title`}
                        {...register(`workHistories.${index}.title`)}
                        defaultValue={item.title}
                        required
                        tabIndex={open ? 0 : -1}
                        glowColor={
                          errors?.workHistories?.[index]?.title
                            ? "var(--theme-red)"
                            : "var(--theme-blue)"
                        }
                      />
                    </ErrorWrapper>
                    <TrashButton
                      onClick={() => remove(index)}
                      tabIndex={open ? 0 : -1}
                    />
                  </div>
                  <label htmlFor={`workHistories.${index}.company`}>
                    Company:
                  </label>
                  <ErrorWrapper
                    error={errors?.workHistories?.[index]?.company?.message}
                  >
                    <Input
                      className="w-full"
                      id={`workHistories.${index}.company}`}
                      {...register(`workHistories.${index}.company`)}
                      defaultValue={item.company}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.workHistories?.[index]?.company
                          ? "var(--theme-red)"
                          : "var(--theme-blue)"
                      }
                    />
                  </ErrorWrapper>
                </div>
                <div className="grid grid-cols-[min-content_1fr] md:grid-cols-[min-content_1fr_min-content_1fr] items-baseline gap-x-3 gap-y-3">
                  <label htmlFor={`workHistories.${index}.startDate`}>
                    From:
                  </label>
                  <ErrorWrapper
                    error={errors?.workHistories?.[index]?.startDate?.message}
                  >
                    <Input
                      className="w-full"
                      id={`workHistories.${index}.startDate`}
                      onChange={(e) => {
                        setValue(
                          `workHistories.${index}.startDate`,
                          new Date(e.target.value)
                        );
                      }}
                      type="month"
                      defaultValue={formatDateToMonthYear(item.startDate)}
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.workHistories?.[index]?.startDate
                          ? "var(--theme-red)"
                          : "var(--theme-blue)"
                      }
                    />
                  </ErrorWrapper>
                  <label htmlFor={`workHistories.${index}.endDate`}>To:</label>
                  {/* <ErrorWrapper
                    error={errors?.workHistories?.[index]?.endDate?.message}
                  > */}
                  <Input
                    className="w-full"
                    id={`workHistories.${index}.endDate`}
                    onChange={(e) => {
                      setValue(
                        `workHistories.${index}.endDate`,
                        e.target.value ? new Date(e.target.value) : null
                      );
                    }}
                    type="month"
                    defaultValue={formatDateToMonthYear(item.endDate)}
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.workHistories?.[index]?.endDate
                        ? "var(--theme-red)"
                        : "var(--theme-blue)"
                    }
                  />
                  {/* </ErrorWrapper> */}
                </div>
                <label htmlFor={`workHistories.${index}.description`}>
                  Description:
                </label>
                <ErrorWrapper
                  error={errors?.workHistories?.[index]?.description?.message}
                >
                  <TextArea
                    className="h-32"
                    id={`workHistories.${index}.description`}
                    {...register(`workHistories.${index}.description`)}
                    defaultValue={item.description}
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.workHistories?.[index]?.description
                        ? "var(--theme-red)"
                        : "var(--theme-blue)"
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
                  title: "",
                  company: "",
                  startDate: {} as Date,
                  endDate: null,
                  description: "",
                });
              }}
              className="text-center"
              tabIndex={open ? 0 : -1}
            >
              Add Work
            </Button>
          </span>
        </div>
      </AccordionContent>
    </Accordion>
  );
}
