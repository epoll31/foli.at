import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";

    const storedTheme = localStorage.getItem("lightTheme");
    return storedTheme === "true" ? "light" : "dark";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("lightTheme");
      setTheme(newTheme === "true" ? "light" : "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return theme;
}
