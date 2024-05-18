import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";

    const storedTheme = localStorage.getItem("lightTheme");
    console.log("Initial stored theme:", storedTheme);
    return storedTheme === "true" ? "light" : "dark";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("lightTheme");
      console.log("Storage changed. New theme:", newTheme);
      setTheme(newTheme === "true" ? "light" : "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return theme;
};

export default useTheme;
