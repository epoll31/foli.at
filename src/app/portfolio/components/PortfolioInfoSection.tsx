"use client";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { Portfolio } from "@/lib/types";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../utils/formSchema";
import { AnimatePresence, motion } from "framer-motion";
import ErrorWrapper from "./ErrorWrapper";

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
    <div className="p-6">
      <div className="flex flex-col">
        <label htmlFor="tag">Tag:</label>
        <ErrorWrapper error={errors?.portfolio?.tag?.message}>
          <Input
            className="w-full"
            id="tag"
            {...register("portfolio.tag", { required: true })}
            defaultValue={portfolio.tag}
            required
          />
        </ErrorWrapper>
        <label htmlFor="full_name">Full Name:</label>
        <ErrorWrapper error={errors?.portfolio?.full_name?.message}>
          <Input
            className="w-full"
            id="full_name"
            {...register("portfolio.full_name", { required: true })}
            defaultValue={portfolio.full_name}
            required
          />
        </ErrorWrapper>
      </div>
      <div className="flex flex-col">
        <label htmlFor="title">Title:</label>
        <ErrorWrapper error={errors?.portfolio?.title?.message}>
          <Input
            className="w-full"
            id="title"
            {...register("portfolio.title", { required: true })}
            defaultValue={portfolio.title}
            required
          />
        </ErrorWrapper>
      </div>
      <div className="flex flex-col">
        <label htmlFor="bio">Bio:</label>
        <ErrorWrapper error={errors?.portfolio?.bio?.message}>
          <TextArea
            className="h-32"
            id="bio"
            {...register("portfolio.bio", { required: true })}
            defaultValue={portfolio.bio}
            required
          />
        </ErrorWrapper>
      </div>
    </div>
  );
}
