/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          topbar: 'var(--color-topbar-bg)',
          radioBg: 'var(--color-radio-bg)',
          headerBg: 'var(--color-header-bg)',
          navBg: 'var(--color-nav-bg)',
          primary: 'var(--color-primary)',
          primaryHover: 'var(--color-primary-hover)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          accentBg: 'var(--color-accent-bg)',
          accentBorder: 'var(--color-accent-border)',
          accentText: 'var(--color-accent-text)',
          alert: 'var(--color-alert)',
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          surfaceSoft: 'var(--color-surface-soft)',
          border: 'var(--color-border)',
          textMain: 'var(--color-text-main)',
          textMuted: 'var(--color-text-muted)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
