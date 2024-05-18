"use client";

import DropDown from "@/components/ui/DropDown";
import { LinkType } from "@/lib/types";
import Input from "@/components/ui/Input";
import TrashButton from "@/components/TrashButtons";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import ChevronUp from "@/components/icons/chevron-up";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorWrapper from "@/components/forms/ErrorWrapper";
import { FormSchema } from "@/lib/zod/portfolioSchema";
import Hr from "@/components/ui/Hr";

export default function LinksSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();
  const [open, setOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn(
          "relative text-center py-3 border-t border-theme-border-primary transition-all text-theme-text-primary",
          open && "border-b"
        )}
      >
        Links
        {
          <ChevronUp
            className={cn(
              `absolute top-0 h-full end-3 -rotate-180 transition-transform  text-theme-text-primary`,
              open && "rotate-0"
            )}
          />
        }
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col justify-center py-4">
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col ps-6 ">
              <div className="flex flex-row">
                <div className="w-full grid grid-cols-[min-content_1fr] items-baseline gap-x-3 gap-y-3">
                  <label htmlFor={`links.${index}.type`}>Type:</label>
                  <ErrorWrapper
                    error={errors?.links && errors.links[index]?.message}
                  >
                    <DropDown
                      className="w-full"
                      options={[
                        { value: LinkType.GITHUB, label: "Github" },
                        { value: LinkType.LINKEDIN, label: "LinkedIn" },
                        { value: LinkType.TWITTER, label: "Twitter" },
                        { value: LinkType.PORTFOLIO, label: "Portfolio" },
                        { value: LinkType.OTHER, label: "Other" },
                      ]}
                      {...register(`links.${index}.type`, {
                        required: true,
                      })} // Using register for DropDown
                      id={`links.${index}.type`}
                      required
                      defaultValue={item.type}
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.links && errors.links[index]?.type
                          ? "var(--theme-error)"
                          : "var(--theme-info)"
                      }
                    />
                  </ErrorWrapper>
                  <label htmlFor={`links.${index}.href`}>Link:</label>
                  <ErrorWrapper
                    error={errors?.links && errors.links[index]?.href?.message}
                  >
                    <Input
                      className="w-full"
                      id={`links.${index}.href`}
                      {...register(`links.${index}.href`)} // Using register for Input
                      defaultValue={item.href}
                      type="url"
                      required
                      tabIndex={open ? 0 : -1}
                      glowColor={
                        errors?.links && errors.links[index]?.href
                          ? "var(--theme-error)"
                          : "var(--theme-info)"
                      }
                    />
                  </ErrorWrapper>
                </div>
                <TrashButton
                  className="mx-4"
                  onClick={() => remove(index)}
                  tabIndex={open ? 0 : -1}
                />
              </div>
              <Hr className=" my-3" />
            </div>
          ))}

          <span className="mx-auto w-fit">
            <Button
              type="button"
              onClick={() => {
                append({ type: LinkType.OTHER, href: "" });
              }}
              className="text-center"
              tabIndex={open ? 0 : -1}
            >
              Add Link
            </Button>
          </span>
        </div>
      </AccordionContent>
    </Accordion>
  );
}
