import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-svg-loader";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
