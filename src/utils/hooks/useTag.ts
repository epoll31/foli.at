import { useEffect, useState } from "react";

export function useTag(email?: string) {
  const [tag, setTag] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!email) {
      return;
    }

    const getTag = async () => {
      const response = await fetch("/api/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tag");
      }

      const data = await response.json();
      setTag(data.tag);
    };
    getTag();
  });

  return tag;
}
