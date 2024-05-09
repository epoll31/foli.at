"use server";

import { Portfolio, PortfolioGroup } from "@/lib/types";
import { updatePortfolio } from "@/utils/supabase/actions/updatePortfolio";

export async function updatePortfolioFromFormData(
  group: PortfolioGroup,
  data: FormData
) {
  const portfolio: Portfolio = {
    ...group.portfolio,
    display_name: data.get("display_name") as string,
    title: data.get("title") as string,
    bio: data.get("bio") as string,
  };

  const newGroup: PortfolioGroup = {
    ...group,
    portfolio,
  };

  return await updatePortfolio(newGroup);
}
