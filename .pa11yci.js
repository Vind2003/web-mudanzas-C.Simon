// Configuración de pa11y-ci (accesibilidad). Se usa en GitHub Actions y en local:
//   npm run build && npm run preview   (en otra terminal; sirve la web en el puerto 8090)
//   npx pa11y-ci@5 --config .pa11yci.js
//
// Si existe la variable CHROME_PATH se usa ese Chrome (en GitHub, el que ya trae la máquina)
// en lugar de descargar otro navegador.
const base = process.env.PA11Y_BASE || 'http://localhost:8090';

const chrome = { args: ['--no-sandbox', '--disable-dev-shm-usage'] };
if (process.env.CHROME_PATH) chrome.executablePath = process.env.CHROME_PATH;

module.exports = {
  defaults: {
    standard: 'WCAG2AA',
    runners: ['axe'],
    timeout: 60000,
    // Espera a que termine la animación de entrada antes de medir contrastes
    wait: 1500,
    // Lo que axe no puede decidir solo (p. ej. el aviso de cookies flotando sobre otro
    // contenido) cuenta como aviso, no como error. Las infracciones confirmadas sí fallan.
    levelCapWhenNeedsReview: 'warning',
    chromeLaunchConfig: chrome,
  },
  urls: [
    '/',
    '/hogar-oficina/',
    '/embalaje-premium/',
    '/guardamuebles/',
    '/punto-limpio/',
    '/mudanzas-marbella/',
    '/mudanzas-malaga/',
    '/aviso-legal/',
    '/politica-privacidad/',
    '/politica-cookies/',
    '/404.html',
  ].map((ruta) => base + ruta),
};
