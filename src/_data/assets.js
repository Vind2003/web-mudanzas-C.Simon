// Huella de los archivos CSS y JS para añadirla a su URL (?v=...).
// Así el navegador puede guardarlos en caché mucho tiempo y aun así
// descarga la versión nueva en cuanto cambian.
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function huella(archivo) {
  try {
    const contenido = fs.readFileSync(path.join(__dirname, '..', '..', archivo));
    return crypto.createHash('md5').update(contenido).digest('hex').slice(0, 10);
  } catch (e) {
    return 'dev';
  }
}

module.exports = {
  css: huella('css/styles.css'),
  site: huella('js/site.js'),
  consent: huella('js/consent.js'),
};
