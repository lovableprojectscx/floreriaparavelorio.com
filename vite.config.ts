import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: false,
    // Eliminar console.log en producción (console.error se mantiene para errores reales)
    minify: "esbuild",
    terserOptions: undefined,
  },
  esbuild: {
    drop: ["debugger"],
    pure: ["console.log"],
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
  },
});
