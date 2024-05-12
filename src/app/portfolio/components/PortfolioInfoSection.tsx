"use client";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { Portfolio } from "@/lib/types";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../utils/formSchema";

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
        <Input
          className="w-full"
          id="tag"
          {...register("portfolio.tag", { required: true })}
          defaultValue={portfolio.tag}
          required
        />
        <label htmlFor="full_name">Full Name:</label>
        <Input
          className="w-full"
          id="full_name"
          {...register("portfolio.full_name", { required: true })}
          defaultValue={portfolio.full_name}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="title">Title:</label>
        <Input
          className="w-full"
          id="title"
          {...register("portfolio.title", { required: true })}
          defaultValue={portfolio.title}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bio">Bio:</label>
        <TextArea
          className="h-32"
          id="bio"
          {...register("portfolio.bio", { required: true })}
          defaultValue={portfolio.bio}
          required
        />
      </div>
    </div>
  );
}
