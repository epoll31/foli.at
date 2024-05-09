"use server";

import { Link, LinkType, Portfolio, PortfolioGroup } from "@/lib/types";
import { updatePortfolio } from "@/utils/supabase/actions/updatePortfolio";

function parseLinksFromFormData(
  formData: FormData
): Omit<Link, "id" | "portfolio_id" | "created_at">[] {
  const links: Omit<Link, "id" | "portfolio_id" | "created_at">[] = [];
  const linkMap: Map<number, { type?: string; href?: string }> = new Map();

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
        linkMap.get(index)!.type = value as string;
      } else if (dataType === "href") {
        linkMap.get(index)!.href = value as string;
      }
    }
  });

  // Convert the map to the final array format
  linkMap.forEach((value, key) => {
    if (value.type && value.href) {
      links.push({
        type: value.type as LinkType,
        href: value.href as string,
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

  return await updatePortfolio(portfolio, links, [], []);
}
