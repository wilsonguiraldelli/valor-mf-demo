import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { federation } from "@module-federation/vite"
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "main",
      dts: false,
      remotes: {
        header: {
          type: "module",
          name: "header",
          entry: "http://localhost:5001/remoteEntry.js",
        },
        followButton: {
          type: "module",
          name: "followButton",
          entry: "http://localhost:5002/remoteEntry.js",
        },
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5000,
  },
  preview: {
    port: 5000,
  },
})
