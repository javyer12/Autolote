import { ThemeProvider } from "./classes/ThemeContexts";
import { useTheme } from "./classes/ThemeContext";
import { AutoloteComponent } from "./AutoloteComponent";
import "./App.css";
import { ChangeTheme } from "./classes/ChangeThemes";

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sectionStyle = {
    backgroundColor: isDark ? "#111827" : "#ffffff",
    color: isDark ? "#f9fafb" : "#111827",
    // hover: isDark ? "bg-red-900" : "bg-gray-100",
    minHeight: "100vh",
    padding: "24px",
    transition: "background-color 0.2s ease, color 0.2s ease",
  };

  return (
    <section id="center" style={sectionStyle}>
      <div className="flex items-center justify-center gap-4 m-3 ">
        <h2 className="text-center text-2xl font-semibold">
          Welcome to My Vite App
        </h2>
        <ChangeTheme />
      </div>
      <AutoloteComponent />
    </section>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
