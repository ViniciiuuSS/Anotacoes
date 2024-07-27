/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: ["./src/**/*.{html,js}", 'node_modules/flowbite-react/lib/esm/**/*.js', "./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),flowbite.plugin()
  ]
}

