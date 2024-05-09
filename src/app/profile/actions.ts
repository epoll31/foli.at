"use server";

import { Link, LinkType, Portfolio, PortfolioGroup } from "@/lib/types";
import { getUsernameFromUserId } from "@/utils/supabase/actions/getUsernameFromUserId";
import { updatePortfolio } from "@/utils/supabase/actions/updatePortfolio";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type LinkNoId = Omit<Link, "id">;
function parseLinksFromFormData(formData: FormData): LinkNoId[] {
  const links: LinkNoId[] = [];
  const linkMap: Map<number, Partial<LinkNoId>> = new Map();

  // Process each key-value pair in the form data
  formData.forEach((value, key) => {
    const match = key.match(/^link-(type|href)-(\d+)$/);
    if (match) {
      const [_, dataType, indexStr] = match;
      const index = parseInt(indexStr, 10);

      // Initialize the object in the map if it doesn't already exist
      if (!linkMap.has(index)) {
        linkMap.set(index, {});
      }

      // Set the type or link based on the key
      if (dataType === "type") {
        linkMap.get(index)!.type = value as LinkType;
      } else if (dataType === "href") {
        linkMap.get(index)!.href = value as string;
      }
    }
  });

  // Convert the map to the final array format
  linkMap.forEach((value, key) => {
    if (value.type && value.href) {
      links.push({
        type: value.type!,
        href: value.href!,
      });
    }
  });

  return links;
}

export async function updatePortfolioFromFormData(
  group: PortfolioGroup,
  data: FormData
) {
  // console.log("form data", data);

  const portfolio: Portfolio = {
    ...group.portfolio,
    display_name: data.get("display_name") as string,
    title: data.get("title") as string,
    bio: data.get("bio") as string,
  };

  const links = parseLinksFromFormData(data);

  // console.log("links", links);

  const result = await updatePortfolio(portfolio, links, [], []);

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

    const username = await getUsernameFromUserId(user!.id);
    if (!username) {
      console.error("Error getting username from user ID");
      return;
    }

    redirect(`${username}`);
  } else {
    console.error("Error updating portfolio");
  }
}
