import { Portfolio } from "@/lib/types";
import { FormSchema } from "@/lib/zod/portfolioSchema";

export default async function setPortfolio(
  portfolio: FormSchema,
  email?: string,
  userId?: string
) {
  const {
    portfolio: { tag, fullName, description, title },
    links,
    educationHistories,
    workHistories,
  } = portfolio;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio`,
      {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          userId,
          tag,
          fullName,
          description,
          title,
          links,
          educationHistories,
          workHistories,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.portfolio;
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    return null;
  }
}
