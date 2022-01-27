module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: ['min-h-[100vh]', 'flex-grow', 'hidden', 'lg:block', 'bg-purple-300', 'dark:bg-purple-600'],
  theme: {
    extend: {
      colors: {
        "success-green": {
          50: "#f1f8e9",
          100: "#dcedc8",
          200: "#c5e1a5",
          300: "#aed581",
          400: "#9ccc65",
          500: "#8bc34a",
          600: "#7cb342",
          700: "#689f38",
          800: "#558b2f",
          900: "#33691e"
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
}
