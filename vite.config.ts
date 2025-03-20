import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
  server: {
    // https: true, // 이제 true 값을 설정할 수 있음
    allowedHosts: [
      "localhost",
      "8674-1-220-74-162.ngrok-free.app",
      "e158-1-220-74-162.ngrok-free.app",
      "e1b0-1-220-74-162.ngrok-free.app",
    ],
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  build: {
    target: "esnext",
  },
});
