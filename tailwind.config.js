/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/js/**/*.js",
    "./storage/app/mock.json",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant }) => {
      addVariant("aria-selected", '[aria-selected="true"] &');
    }),
  ],
};
