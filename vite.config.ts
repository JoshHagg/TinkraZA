import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

export default defineConfig({
  plugins: [react(), sites()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
