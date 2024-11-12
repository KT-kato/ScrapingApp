import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      PROJECT_URL: JSON.stringify(env.PROJECT_URL),
      ANON_KEY: JSON.stringify(env.ANON_KEY),
    },
  };
});
