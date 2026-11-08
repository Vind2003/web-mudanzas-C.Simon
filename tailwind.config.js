/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Paleta del rediseño (azul y naranja del logo)
        ink: '#0F1B2D',          // títulos y fondos oscuros
        body: '#334155',         // texto principal
        muted: '#64748B',        // texto secundario
        surface: '#F6F8FB',      // fondo alterno
        line: '#E3E8EF',         // bordes
        primary: {
          DEFAULT: '#0B4A9E',    // botones y enlaces (8,4:1 con blanco)
          dark: '#083A7D',       // hover
        },
        accent: {
          DEFAULT: '#F28C28',    // detalles y fondos oscuros
          text: '#C2410C',       // texto naranja sobre blanco (5,2:1)
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '65ch',
      },
    }
  }
};
