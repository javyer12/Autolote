import { useTheme } from "./ThemeContext";

export function ContentTheme() {
  const { theme } = useTheme();
  const contentStyle = {
    backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    padding: "20px",
    borderRadius: "5px",
    marginTop: "20px",
  };
  return (
    <div style={contentStyle}>
      <h2>{theme.toUpperCase()}</h2>
    </div>
  );
}
