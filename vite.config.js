import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
  plugins: [
    laravel({
      input: ["bootstrap", "home", "search"]
        .map((file) => [`resources/css/${file}.css`, `resources/js/${file}.js`])
        .flat(),
      refresh: true,
    }),
  ],
});
