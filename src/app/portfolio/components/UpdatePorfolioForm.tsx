"use client";

import { updatePortfolioFromFormData } from "../utils/actions";
import { PortfolioGroup } from "@/lib/types";
import PortfolioInfoSection from "./PortfolioInfoSection";
import LinksSection from "./LinksSection";
import WorkSection from "./WorkSection";
import EducationSection from "./EducationSection";

export default function UpdatePorfolioForm({
  portfolioGroup,
}: {
  portfolioGroup: PortfolioGroup;
}) {
  function handleSubmit(formData: FormData) {
    updatePortfolioFromFormData(portfolioGroup, formData);
  }

  return (
    <form className="flex flex-col w-full ">
      <PortfolioInfoSection portfolio={portfolioGroup.portfolio} />
      <LinksSection links={portfolioGroup.links} />
      <WorkSection workEntries={portfolioGroup.workEntries} />
      <EducationSection educationEntries={portfolioGroup.educationEntries} />

      <button formAction={handleSubmit}>Save</button>
    </form>
  );
}
