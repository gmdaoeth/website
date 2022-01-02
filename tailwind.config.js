module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textShadow: {
        hero: "3px 3px 6px rgba(0, 0, 0, .6), 0 0 5px rgba(0, 0, 0, .4)",
      },
      dropShadow: {
        hero: "3px 3px 6px rgba(0, 0, 0, .6), 0 0 5px rgba(0, 0, 0, .4)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-textshadow")],
};
