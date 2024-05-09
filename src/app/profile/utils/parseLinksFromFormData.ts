"use server";
import { Link, LinkType, NoId } from "@/lib/types";

export function parseLinksFromFormData(formData: FormData): NoId<Link>[] {
  const links: NoId<Link>[] = [];
  const linkMap: Map<number, Partial<NoId<Link>>> = new Map();

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