import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors =
    theme === "dark"
      ? {
          background: "#1a1a1a",
          surface: "#2d2d2d",
          cardBackground: "#3a3a3a",
          text: "#ffffff",
          textSecondary: "#b0b0b0",
          border: "#404040",
          success: "#4ade80",
          warning: "#fbbf24",
          error: "#f87171",
          info: "#60a5fa",
          primary: "#3b82f6",
          shadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        }
      : {
          background: "#f8f9fa",
          surface: "#ffffff",
          cardBackground: "#ffffff",
          text: "#212529",
          textSecondary: "#6c757d",
          border: "#dee2e6",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
          primary: "#3b82f6",
          shadow: "0 2px 4px rgba(0,0,0,0.1)",
        };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
