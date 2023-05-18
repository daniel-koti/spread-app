/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-barlow)',
        alt: 'var(--font-heebo)',
      },
      colors: {
        primary: {
          500: '#F25D27',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
