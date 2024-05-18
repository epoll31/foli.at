export function initializeTheme() {
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
  window.dispatchEvent(new Event("storage"));
}

export function toggleTheme() {
  const lightTheme = document.documentElement.classList.toggle("light-theme");

  if (typeof window === "undefined") return;

  localStorage.setItem("lightTheme", lightTheme ? "true" : "false");

  window.dispatchEvent(new Event("storage"));
}

export function getLocalStorageTheme(fallback: "light" | "dark" = "dark") {
  if (typeof window === "undefined") return fallback;

  const storedTheme = localStorage.getItem("lightTheme");
  return storedTheme === "true" ? "light" : "dark";
}
