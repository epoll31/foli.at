"use client";

import DropDown from "@/components/ui/DropDown";
import useKeyedItems from "../utils/useKeyedItems";
import { Link } from "@/lib/types";
import Input from "@/components/ui/Input";
import TrashButton from "./TrashButtons";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import ChevronUp from "@/components/icons/chevron-up";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ErrorWrapper from "../../../components/forms/ErrorWrapper";
import { FormSchema } from "../utils/formSchema";

export default function LinksSection({ links: startLinks }: { links: Link[] }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();
  const [open, setOpen] = useState(false);
  const {
    items: links,
    addItem: addLink,
    removeItem: removeLink,
  } = useKeyedItems<{ type: string; href: string }>(startLinks, {
    type: "other",
    href: "",
  });

  return (
    <Accordion className="flex flex-col" onOpenChange={setOpen}>
      <AccordionTrigger
        className={cn(
          "relative text-center bg-neutral-100 py-3 border-t border-neutral-200 transition-all",
          open && "border-b"
        )}
      >
        Links
        {
          <ChevronUp
            className={cn(
              `absolute top-0 h-full end-3 -rotate-180 transition-transform  text-neutral-400`,
              open && "rotate-0"
            )}
          />
        }
      </AccordionTrigger>
      <AccordionContent className="flex flex-col justify-center-4">
        {links.map((link, index) => (
          <div key={link.key} className="flex flex-col ps-6 ">
            <div className="flex flex-row">
              <div className="w-full grid grid-cols-[min-content_1fr] items-baseline gap-x-3 gap-y-3">
                <label htmlFor={`link-type-${link.key}`}>Type:</label>
                <ErrorWrapper
                  error={errors?.links && errors.links[index]?.message}
                >
                  <DropDown
                    className="w-full"
                    options={[
                      { value: "github", label: "Github" },
                      { value: "linkedin", label: "LinkedIn" },
                      { value: "twitter", label: "Twitter" },
                      { value: "portfolio", label: "Portfolio" },
                      { value: "other", label: "Other" },
                    ]}
                    // {...register(`links[${index}].type`)} // Using register for DropDown
                    {...register(`links.${index}.type`, { required: true })} // Using register for DropDown
                    id={`link-type-${link.key}`}
                    required
                    defaultValue={link.value.type}
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.links && errors.links[index]?.type
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
                <label htmlFor={`link-href-${link.key}`}>Link:</label>
                <ErrorWrapper
                  error={errors?.links && errors.links[index]?.href?.message}
                >
                  <Input
                    className="w-full"
                    id={`link-href-${link.key}`}
                    {...register(`links.${index}.href`)} // Using register for Input
                    defaultValue={link.value.href}
                    type="url"
                    required
                    tabIndex={open ? 0 : -1}
                    glowColor={
                      errors?.links && errors.links[index]?.href
                        ? "#fb3b53"
                        : "#60a5fa"
                    }
                  />
                </ErrorWrapper>
              </div>
              <TrashButton
                className="m-4"
                onClick={() => removeLink(link.key)}
                tabIndex={open ? 0 : -1}
              />
            </div>
            <span className="w-full h-px my-3 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
          </div>
        ))}
        <Button
          type="button"
          onClick={addLink}
          className=" mx-auto w-fit text-center"
          tabIndex={open ? 0 : -1}
        >
          Add Link
        </Button>
      </AccordionContent>
    </Accordion>
  );
}
