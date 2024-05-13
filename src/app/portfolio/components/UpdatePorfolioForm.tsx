"use client";

import { PortfolioGroup } from "@/lib/types";
import PortfolioInfoSection from "./PortfolioInfoSection";
import LinksSection from "./LinksSection";
import WorkSection from "./WorkSection";
import EducationSection from "./EducationSection";
import Button from "@/components/ui/Button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormSchema } from "../utils/formSchema";
import { updatePortfolio } from "@/utils/supabase/actions/updatePortfolio";

export default function UpdatePorfolioForm({
  portfolioGroup,
}: {
  portfolioGroup: PortfolioGroup;
}) {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: portfolioGroup,
    mode: "onBlur",
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    const validatedData = formSchema.parse(data);
    await updatePortfolio(validatedData);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex flex-col w-full">
        <PortfolioInfoSection portfolio={portfolioGroup.portfolio} />
        <LinksSection links={portfolioGroup.links} />
        <WorkSection workEntries={portfolioGroup.workEntries} />
        <EducationSection educationEntries={portfolioGroup.educationEntries} />

        <Button className=" m-3" type="submit">
          <span className="m-1 inline-block text-lg ">Save</span>
        </Button>
      </form>
    </FormProvider>
  );
}
