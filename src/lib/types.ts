import { Prisma } from "@prisma/client";

export type Portfolio = Prisma.PortfolioGetPayload<{
  include: {
    links: true;
    educationHistories: true;
    workHistories: true;
  };
}>;

export type Link = Prisma.LinkGetPayload<{}>;
export type WorkHistory = Prisma.WorkHistoryGetPayload<{}>;
export type EducationHistory = Prisma.EducationHistoryGetPayload<{}>;

export { LinkType } from "@prisma/client";

export const EmptyPortfolio: Portfolio = {
  id: "",
  userId: "",
  tag: "",
  fullName: "",
  title: "",
  description: "",
  links: [],
  educationHistories: [],
  workHistories: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
