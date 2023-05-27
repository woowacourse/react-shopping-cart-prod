import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-shopping-cart/",
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "src/common"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@recoil": path.resolve(__dirname, "src/recoil"),
      "@router": path.resolve(__dirname, "src/router"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@views": path.resolve(__dirname, "src/views"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@type": path.resolve(__dirname, "src/types"),
    },
  },
});
