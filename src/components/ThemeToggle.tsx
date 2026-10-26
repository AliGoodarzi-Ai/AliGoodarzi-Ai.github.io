import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      className="px-3 py-1.5 rounded-md text-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
    >
      {next === "light" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
