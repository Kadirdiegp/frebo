import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#1A1A1A",
        "secondary-light": "#2A2A2A",
        text: "#FFFFFF",
        accent: {
          DEFAULT: '#89cff0',
          light: '#a5d9f3',
          dark: '#6dc5ed'
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config
