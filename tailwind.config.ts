import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#020203',
          900: '#050506', // canvas base
          850: '#0A0A0C', // elevated dark
          800: '#12141A',
          700: '#1A1D26',
        },
        brand: {
          blue: '#2563EB',
          cyan: '#00F0FF',
          accent: '#3B82F6',
          muted: '#8A8F98',
          text: '#EDEDEF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        modal: '20px',
      },
      boxShadow: {
        glow: '0 0 30px -5px rgba(37, 99, 235, 0.35)',
        'cyan-glow': '0 0 30px -5px rgba(0, 240, 255, 0.35)',
      },
      backdropBlur: {
        glass: '16px',
      }
    },
  },
  plugins: [],
} satisfies Config

