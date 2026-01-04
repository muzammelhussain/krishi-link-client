// tailwind.config.js

// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   plugins: [require("daisyui")],

//   daisyui: {
//     darkTheme: "krishilinkDark",

//     themes: [
//       {
//         krishilinkLight: {
//           primary: "#16a34a",
//           secondary: "#f59e0b",
//           accent: "#2563eb",
//           neutral: "#1f2937",
//           "base-100": "#ffffff",
//         },
//       },
//       {
//         krishilinkDark: {
//           primary: "#22c55e",
//           secondary: "#fbbf24",
//           accent: "#3b82f6",
//           neutral: "#d1d5db",
//           "base-100": "#0f172a",
//         },
//       },
//     ],
//   },
// };
// tailwind.config.js
// tailwind.config.js - Unified Configuration

module.exports = {
  content: [
    // Ensure this lists all your source files (e.g., './src/**/*.{js,jsx,ts,tsx}')
  ],
  theme: {
    // All custom utilities are merged with defaults inside 'extend'
    extend: {
      // 1. Custom Colors
      colors: {
        primary: '#10B981', 
        secondary: {
          100: '#E0F2F1',
          900: '#042F2D',
          DEFAULT: '#0D9488', // Use this for simple 'bg-secondary'
        },
        'dark-neutral': '#18181B', // Use as 'bg-dark-neutral'
      },
      
      // 2. Custom Fonts
      fontFamily: {
        display: ['Oswald', 'sans-serif'], // Use as 'font-display'
        body: ['Roboto', 'sans-serif'],     // Use as 'font-body'
      },
    },
  },
  plugins: [],
}