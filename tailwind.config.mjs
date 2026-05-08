/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['var(--font-rajdhani)', 'Rajdhani', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        orange: '#ff9a42',
        'orange-dark': '#b5641f',
        red: '#f84949',
        green: '#79e69c',
        indigo: '#4b0082',
        'indigo-deep': '#2a0049',
        graphite: '#2d2d2a',
        'graphite-dark': '#1b1b19',
        cream: '#fdf9f3',
        'cream-dim': '#e8e2d6',
        line: 'rgba(253,249,243,0.12)',
      },
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': '#e8e2d6',
              '--tw-prose-headings': '#fdf9f3',
              '--tw-prose-links': '#ff9a42',
              '--tw-prose-bold': '#fdf9f3',
              fontSize: '22px',
              lineHeight: '1.4',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
