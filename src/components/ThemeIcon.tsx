"use client";

import useHasMounted from "@/utils/hooks/useHasMounted";
import useTheme from "@/utils/hooks/useTheme";
import Sun from "./icons/sun";
import Moon from "./icons/moon";

export default function ThemeIcon() {
  const theme = useTheme();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    // Optionally render a placeholder or nothing while mounting
    return <Moon />;
  }

  return theme === "light" ? <Sun /> : <Moon />;
}
