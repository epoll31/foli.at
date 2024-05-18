"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storage = localStorage.getItem("lightTheme");

    if (storage === null) {
      const pref = window
        .matchMedia("(prefers-color-scheme: light)")
        .matches.toString();

      localStorage.setItem("lightTheme", pref);
      document.documentElement.classList.toggle("light-theme", pref === "true");
    } else {
      document.documentElement.classList.toggle(
        "light-theme",
        storage === "true"
      );
    }
  }, []);

  console.log("ThemeInitializer rendered");
  window.dispatchEvent(new Event("storage"));

  return <></>;
}
