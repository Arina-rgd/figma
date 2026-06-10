import { useEffect, useState } from "react";

const THEME_KEY = "site-theme";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem(THEME_KEY) === "enabled");

  useEffect(() => {
    document.body.classList.toggle("darkTheme", isDark);
    localStorage.setItem(THEME_KEY, isDark ? "enabled" : "disabled");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
