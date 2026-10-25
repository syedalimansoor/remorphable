// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Roboto Serif",
      cssVariable: "--font-roboto-serif",
      weights: ["600"],
    },
    {
      provider: fontProviders.google(),
      name: "Fira Sans",
      cssVariable: "--font-fira-sans",
      weights: ["400", "700"],
    },
  ],

  integrations: [react()],
});
