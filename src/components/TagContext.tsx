"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const TagContext = createContext<{
  tag?: string;
  fetchTag: (email: string) => void;
}>({
  tag: undefined,
  fetchTag: (email: string) => {},
});

export default function TagProvider({
  children,
  startEmail,
}: {
  children: React.ReactNode;
  startEmail?: string;
}) {
  const fetchTag = (email: string) => {
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
      console.log("fetched: ", data);
      setTag(data.tag);
    };
    getTag();
  };

  const [tag, setTag] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (startEmail) {
      fetchTag(startEmail);
    }
  }, []);

  return (
    <TagContext.Provider value={{ tag, fetchTag }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTag() {
  const { tag, fetchTag } = useContext(TagContext);
  return { tag, fetchTag };
}
