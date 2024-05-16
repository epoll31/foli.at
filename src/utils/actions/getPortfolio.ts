import { Portfolio } from "@/lib/types";

function fixDates(portfolio: Portfolio) {
  const workHistories = portfolio.workHistories.map((workHistory) => {
    return {
      ...workHistory,
      startDate: new Date(workHistory.startDate),
      endDate: workHistory.endDate ? new Date(workHistory.endDate) : null,
    };
  });

  const educationHistories = portfolio.educationHistories.map(
    (educationHistory) => {
      return {
        ...educationHistory,
        startDate: new Date(educationHistory.startDate),
        endDate: educationHistory.endDate
          ? new Date(educationHistory.endDate)
          : null,
      };
    }
  );

  return {
    ...portfolio,
    workHistories,
    educationHistories,
  } as Portfolio;
}

export default async function getPortfolio(where: {
  email?: string;
  userId?: string;
  tag?: string;
}) {
  console.log(where);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(where),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return fixDates(data.portfolio);
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    return null;
  }
}
