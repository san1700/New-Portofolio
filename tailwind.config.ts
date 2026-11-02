import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
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
          900: '#050506',
          850: '#0A0A0C',
          800: '#12141A',
          700: '#1A1D26',
        },
        brand: {
          blue: '#5E6AD2',
          cyan: '#00F0FF',
          accent: '#6872D9',
          muted: '#8A8F98',
          text: '#EDEDEF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config

