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
        <label htmlFor="tag">Tag:</label>
        <ErrorWrapper error={errors?.portfolio?.tag?.message}>
          <Input
            className="w-full"
            id="tag"
            {...register("portfolio.tag", { required: true })}
            defaultValue={portfolio.tag}
            required
            glowColor={errors?.portfolio?.tag ? "#fb3b53" : "#60a5fa"}
          />
        </ErrorWrapper>
        <label htmlFor="full_name" className="text-nowrap">
          Full Name:
        </label>
        <ErrorWrapper error={errors?.portfolio?.full_name?.message}>
          <Input
            className="w-full"
            id="full_name"
            {...register("portfolio.full_name", { required: true })}
            defaultValue={portfolio.full_name}
            required
            glowColor={errors?.portfolio?.full_name ? "#fb3b53" : "#60a5fa"}
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
        <label htmlFor="bio">About Me:</label>
        <ErrorWrapper error={errors?.portfolio?.bio?.message}>
          <TextArea
            className="h-32"
            id="bio"
            {...register("portfolio.bio", { required: true })}
            defaultValue={portfolio.bio}
            required
            glowColor={errors?.portfolio?.bio ? "#fb3b53" : "#60a5fa"}
          />
        </ErrorWrapper>
      </div>
    </div>
  );
}
