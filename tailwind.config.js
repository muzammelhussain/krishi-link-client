// tailwind.config.js

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],

  daisyui: {
    darkTheme: "krishilinkDark",

    themes: [
      {
        krishilinkLight: {
          primary: "#16a34a",
          secondary: "#f59e0b",
          accent: "#2563eb",
          neutral: "#1f2937",
          "base-100": "#ffffff",
        },
      },
      {
        krishilinkDark: {
          primary: "#22c55e",
          secondary: "#fbbf24",
          accent: "#3b82f6",
          neutral: "#d1d5db",
          "base-100": "#0f172a",
        },
      },
    ],
  },
};
