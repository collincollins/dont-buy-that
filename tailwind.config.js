// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Press Start 2P"', 'mono'], // pixelated font
      },
      colors: {
        primary: {
          DEFAULT: '#34528F', // dark pastel blue
        },
        secondary: {
          DEFAULT: '#374151', // gray-700
        },
        accent: {
          DEFAULT: '#56AE57', // dark pastel green
        },
        primarydark: {
          DEFAULT: '#2A4375', // dark dark pastel blue
        },
        primarycomplement: {
          DEFAULT: '#D5BC8A', // complementary dark pastel blue
        },
      },
      boxShadow: {
        'pixel-xs': '1px 1px 0 #000, 1.5px .5px 0 #000, 1.5px 1.5px 0 #000',
        'pixel-sm': '1px 1px 0 #000, 2px 2px 0 #000, 2px 2px 0 #000',
        'pixel': '1px 1px 0 #000, 3px 3px 0 #000, 3px 3px 0 #000',
        'pixel-lg': '3px 3px 0 #000, 3px 3px 0 #000, 3px 3px 0 #000'
      },
    },
  },
  plugins: [],
};