import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

import { withZephyr, type ModuleFederationOptions } from "vite-plugin-zephyr";

const mfConfig: ModuleFederationOptions = {
  name: "main",
  filename: "remoteEntry.js",
  dts: false,
  remotes: {
    header: {
      name: "header",
      entry: "http://localhost:5001/remoteEntry.js",
      type: "module",
    },
    "follow-button": {
      name: "follow-button",
      entry: "http://localhost:5002/remoteEntry.js",
      type: "module",
    },
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
  build: {
    target: "chrome89",
  },
  server: {
    port: 5000,
  },
  preview: {
    port: 5000,
  },
});
