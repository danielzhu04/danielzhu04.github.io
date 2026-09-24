/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1A17',
        muted: '#5E5850',
        line: '#E2DACB',
        page: '#F6F1E9',
        panel: '#EBE4D7',
        surface: '#FFFDF8',
        primary: {
          DEFAULT: '#0F6E6E',
          hover: '#0B5858',
          tint: '#CFE3DF',
        },
        secondary: '#A94B2A',
        accent: '#8A6414',
        success: '#2B7348',
        error: '#B42318',
        warning: '#9A5B00',
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
