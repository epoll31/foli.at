import { useState, useEffect } from "react";
import { getLocalStorageTheme } from "../theme";
import { get } from "http";

export default function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    getLocalStorageTheme("dark")
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = () => {
      setTheme(getLocalStorageTheme("dark"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return theme;
}
