/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'system-ui', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['Space Grotesk', 'ui-monospace', 'monospace'],
        display: ['ui-serif', '"New York"', '"Iowan Old Style"', 'Georgia', 'serif'],
      },
      colors: {
        // Theme tokens, defined in index.css. Only the home and 404 pages use them.
        canvas: token('canvas'),
        surface: token('surface'),
        raised: token('raised'),
        device: token('device'),
        line: token('line'),
        'line-strong': token('line-strong'),
        danger: token('danger'),
        ink: {
          DEFAULT: token('ink'),
          2: token('ink-2'),
          3: token('ink-3'),
        },
        tint: token('tint'),
        fill: token('fill'),
        'on-fill': token('on-fill'),
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
