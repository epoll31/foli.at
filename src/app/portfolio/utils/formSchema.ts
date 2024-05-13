import { LinkTypes } from "@/lib/types";
import { z } from "zod";

const portfolioSchema = z.object({
  tag: z
    .string()
    .min(3, "Tag must be at least 3 characters")
    .max(20, "Tag must be at most 20 characters"),
  full_name: z
    .string()
    .min(1, "Full name must not be empty")
    .max(50, "Full name must be at most 50 characters"),
  bio: z
    .string()
    .min(1, "Bio must not be empty")
    .max(500, "Bio must be at most 500 characters"),
  title: z
    .string()
    .min(1, "Title must not be empty")
    .max(50, "Title must be at most 50 characters"),
});

const linkSchema = z.object({
  href: z.string().url("Link must be a valid URL"),
  type: z.nativeEnum({
    ...Object.fromEntries(LinkTypes.map((type) => [type, type])),
  }),
});

const educationEntrySchema = z.object({
  school: z
    .string()
    .min(1, "School must not be empty")
    .max(50, "School must be at most 50 characters"),
  degree: z
    .string()
    .min(1, "Degree must not be empty")
    .max(50, "Degree must be at most 50 characters"),
  major: z.string().max(50, "Major must be at most 50 characters").nullable(),
  description: z
    .string()
    .min(1, "Description must not be empty")
    .max(500, "Description must be at most 500 characters"),
  start_date: z.date(),
  end_date: z.date().nullable(),
});

const workEntrySchema = z.object({
  title: z
    .string()
    .min(1, "Title must not be empty")
    .max(50, "Title must be at most 50 characters"),
  company: z
    .string()
    .min(1, "Company must not be empty")
    .max(50, "Company must be at most 50 characters"),
  description: z
    .string()
    .min(1, "Description must not be empty")
    .max(500, "Description must be at most 500 characters"),
  start_date: z.date(),
  end_date: z.date().nullable(),
});

export const formSchema = z.object({
  portfolio: portfolioSchema,
  links: z.array(linkSchema),
  educationEntries: z.array(educationEntrySchema),
  workEntries: z.array(workEntrySchema),
});

export type FormSchema = z.infer<typeof formSchema>;
