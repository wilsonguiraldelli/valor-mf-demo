import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { withZephyr, type ModuleFederationOptions } from "vite-plugin-zephyr";
import { fileURLToPath, URL } from "node:url";

const mfConfig: ModuleFederationOptions = {
  name: "follow-button",
  filename: "remoteEntry.js",
  dts: false,
  exposes: {
    ".": "./src/components/follow-button.tsx",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
};

export default defineConfig({
  plugins: [
    react(),
    withZephyr({
      mfConfig,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  experimental: {
    renderBuiltUrl() {
      return { relative: true };
    },
  },
  build: {
    target: "chrome89",
  },
  server: {
    port: 5002,
  },
  preview: {
    port: 5002,
  },
});
