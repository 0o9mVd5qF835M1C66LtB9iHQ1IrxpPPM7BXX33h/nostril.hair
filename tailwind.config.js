/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      dark: '#111111'
    }),
    extend: {
      colors: {
        cultured: '#F9FAFB',
        quicksilver: '#A8A29E',
        carolinablue: '#1DA1F2',
        tallships: '#0B7BC1',
        lapislazuli: '#175982',
        richblack: '#111111',
        nero: '#222222'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
