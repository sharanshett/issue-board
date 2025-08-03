import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "8px",
        padding: "8px 12px",
        cursor: "pointer",
        color: colors.text,
        fontSize: "14px",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
