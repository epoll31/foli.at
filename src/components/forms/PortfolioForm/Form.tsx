"use client";

import { Portfolio } from "@/lib/types";
import PortfolioInfoSection from "./PortfolioInfoSection";
import LinksSection from "./LinksSection";
import WorkSection from "./WorkSection";
import EducationSection from "./EducationSection";
import Button from "@/components/ui/Button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormSchema } from "@/lib/zod/portfolioSchema";
import setPortfolio from "@/utils/actions/setPortfolio";
import useUnloadConfirmation from "@/utils/hooks/useUnloadConfirmation";
import { useEffect } from "react";

export default function PorfolioForm({
  portfolio,
  email,
}: {
  portfolio: Portfolio;
  email: string;
}) {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolio: {
        tag: portfolio.tag,
        fullName: portfolio.fullName,
        title: portfolio.title,
        description: portfolio.description,
      },
      links: portfolio.links,
      workHistories: portfolio.workHistories,
      educationHistories: portfolio.educationHistories,
    },
    mode: "onChange",
  });
  useUnloadConfirmation(
    methods.formState.isDirty && !methods.formState.isSubmitting
  );

  const onSubmit = methods.handleSubmit(async (data) => {
    const validatedData = formSchema.parse(data);
    await setPortfolio({ email }, validatedData);
  });

  useEffect(() => {});

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col w-full">
        <PortfolioInfoSection portfolio={portfolio} />
        <LinksSection />
        <WorkSection />
        <EducationSection />

        <span className="m-3">
          <Button
            className="w-full"
            type="submit"
            glowColor={
              methods.formState?.isValid
                ? "var(--theme-success)"
                : "var(--theme-error)"
            }
          >
            <span className="m-1 inline-block text-lg ">Save</span>
          </Button>
        </span>
      </form>
    </FormProvider>
  );
}
