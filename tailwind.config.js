/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#f97316',
          darkOrange: '#ea580c',
          blue: '#1e3a8a',
          lightBlue: '#eff6ff',
          bgBlue: '#f0f4f8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    }
  }
};
