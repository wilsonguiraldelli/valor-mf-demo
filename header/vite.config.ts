import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { withZephyr, type ModuleFederationOptions } from "vite-plugin-zephyr";

const mfConfig: ModuleFederationOptions = {
  name: "header",
  filename: "remoteEntry.js",
  dts: false,
  exposes: {
    ".": "./src/components/header.tsx",
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
    port: 5001,
  },
  preview: {
    port: 5001,
  },
});
