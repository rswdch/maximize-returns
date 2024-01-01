/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"], // include jsx and tsx for React
  daisyui: {
    themes: ["dark"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

