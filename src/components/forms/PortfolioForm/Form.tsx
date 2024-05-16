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
import { RedirectType, redirect } from "next/navigation";

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
  const onSubmit = methods.handleSubmit(async (data) => {
    const validatedData = formSchema.parse(data);

    const updatedPortfolio = await setPortfolio(
      validatedData,
      email,
      undefined
    );

    console.log("Updated portfolio:", updatedPortfolio);
    document.location.reload();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col w-full">
        <PortfolioInfoSection portfolio={portfolio} />
        <LinksSection links={portfolio.links} />
        <WorkSection workHistories={portfolio.workHistories} />
        <EducationSection educationHistories={portfolio.educationHistories} />

        <Button
          className="m-3"
          type="submit"
          glowColor={methods.formState?.isValid ? "#34d399" : "#fb3b53"}
        >
          <span className="m-1 inline-block text-lg ">Save</span>
        </Button>
      </form>
    </FormProvider>
  );
}
