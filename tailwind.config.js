// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // scans all JS/JSX/TS/TSX files in src/
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // sets Inter as the default sans-serif font
      },
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // indigo-600
        },
        secondary: {
          DEFAULT: '#374151', // gray-700
        },
        accent: {
          DEFAULT: '#10B981', // emerald-500
        },
      },
    },
  },
  plugins: [],
};