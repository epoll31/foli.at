"use client";

import { initializeTheme } from "@/utils/theme";
import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <></>;
}
