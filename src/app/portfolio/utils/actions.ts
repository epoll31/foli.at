"use server";

import { Link, Portfolio, PortfolioGroup } from "@/lib/types";
import { getTagFromUserId } from "@/utils/supabase/actions/getTagFromUserId";
import { updatePortfolio } from "@/utils/supabase/actions/updatePortfolio";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { parseLinks } from "./parseLinks";
import { parseWorkEntries } from "./parseWorkEntries";
import { parseEducationEntries } from "./parseEducationEntries";

export async function updatePortfolioFromFormData(
  group: PortfolioGroup,
  data: FormData
) {
  console.log("form data", data);

  const portfolio: Portfolio = {
    ...group.portfolio,
    tag: data.get("tag") as string,
    full_name: data.get("full_name") as string,
    title: data.get("title") as string,
    bio: data.get("bio") as string,
  };

  const links = parseLinks(data);
  const workEntries = parseWorkEntries(data);
  const educationEntries = parseEducationEntries(data);

  const result = await updatePortfolio(
    portfolio,
    links,
    workEntries,
    educationEntries
  );

  if (result) {
    const supabase = createClient();
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user:", error);
      return;
    }

    const tag = await getTagFromUserId(user!.id);
    if (!tag) {
      console.error("Error getting username from user ID");
      return;
    }

    redirect(`${tag}`);
  } else {
    console.error("Error updating portfolio");
  }
}
