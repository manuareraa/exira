// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3100,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    visualizer({
      filename: "./dist/stats.html",
      open: true,
    }),
  ],
  server: {
    port: 3100,
    host: true,
  },
  resolve: {
    alias: {
      // Polyfills for Node.js core modules
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      util: "util",
      assert: "assert",
      events: "events",
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
