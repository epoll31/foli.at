"use client";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { Portfolio } from "@/lib/types";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "@/lib/zod/portfolioSchema";
import ErrorWrapper from "@/components/forms/ErrorWrapper";

export default function PortfolioInfoSection({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();

  return (
    <div className="p-6 flex flex-col gap-3">
      <div className="w-full grid grid-cols-[min-content_1fr] items-baseline gap-x-3 gap-y-3">
        <label htmlFor="portfolio.tag">Tag:</label>
        <ErrorWrapper error={errors?.portfolio?.tag?.message}>
          <Input
            className="w-full"
            id="portfolio.tag"
            {...register("portfolio.tag", { required: true })}
            defaultValue={portfolio.tag}
            required
            glowColor={errors?.portfolio?.tag ? "#fb3b53" : "#60a5fa"}
          />
        </ErrorWrapper>
        <label htmlFor="portfolio.fullName" className="text-nowrap">
          Full Name:
        </label>
        <ErrorWrapper error={errors?.portfolio?.fullName?.message}>
          <Input
            className="w-full"
            id="portfolio.fullName"
            {...register("portfolio.fullName", { required: true })}
            defaultValue={portfolio.fullName}
            required
            glowColor={errors?.portfolio?.fullName ? "#fb3b53" : "#60a5fa"}
          />
        </ErrorWrapper>
        <label htmlFor="title">Title:</label>
        <ErrorWrapper error={errors?.portfolio?.title?.message}>
          <Input
            className="w-full"
            id="title"
            {...register("portfolio.title", { required: true })}
            defaultValue={portfolio.title}
            required
            glowColor={errors?.portfolio?.title ? "#fb3b53" : "#60a5fa"}
          />
        </ErrorWrapper>
      </div>
      <div className="flex flex-col">
        <label htmlFor="portfolio.description">About Me:</label>
        <ErrorWrapper error={errors?.portfolio?.description?.message}>
          <TextArea
            className="h-32"
            id="portfolio.description"
            {...register("portfolio.description", { required: true })}
            defaultValue={portfolio.description}
            required
            glowColor={errors?.portfolio?.description ? "#fb3b53" : "#60a5fa"}
          />
        </ErrorWrapper>
      </div>
    </div>
  );
}
