import { useTheme } from "./ThemeContext";

export function ChangeTheme() {
  const { theme, toggleTheme } = useTheme();
  const buttonStyle = {
    backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  };

  return (
    <button style={buttonStyle} onClick={toggleTheme}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
