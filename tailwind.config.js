/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        muted: '#5c5c5c',
        line: '#e8e8e8',
        page: '#EDD4B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Consolas', '"Courier New"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1120px',
      },
      borderRadius: {
        card: '28px',
      },
    },
  },
  plugins: [],
}
