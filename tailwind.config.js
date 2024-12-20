/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'c-green-100': 'rgb(162, 209, 146)',
            'c-green-300': 'rgb(101, 147, 87)',
            'c-green-400': 'rgb(99, 145, 85)',
            'c-green-500': 'rgb(90, 132, 78)',
            'c-green-600': 'rgb(84, 122, 74)',
            'c-green-700': 'rgb(80, 112, 72)'
        },
        fontSize: {
            'xxs': '11px'
        },
        animation: {
            'spin-fast': 'spin 300ms linear infinite',
        }
    },
},

plugins: [require('@tailwindcss/forms')],
}

