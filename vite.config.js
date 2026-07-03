import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { HeartIcon } from "@heroicons/react/20/solid";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), HeartIcon],
});
