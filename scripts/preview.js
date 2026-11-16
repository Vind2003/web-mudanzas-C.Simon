// Sirve _site/ en local con las mismas cabeceras y redirecciones de vercel.json.
// Uso:  npm run build && npm run preview   →   http://localhost:8090
const http = require('http');
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..', '_site');
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'vercel.json'), 'utf8'));
const globales = cfg.headers.find((h) => h.source === '/(.*)').headers;
const tipos = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain',
};
const puerto = process.env.PORT || 8090;

http.createServer((req, res) => {
  const ruta = decodeURIComponent(req.url.split('?')[0]);
  const redireccion = cfg.redirects.find((r) => r.source === ruta);
  if (redireccion) { res.writeHead(308, { Location: redireccion.destination }); return res.end(); }

  let archivo = path.join(raiz, ruta);
  if (fs.existsSync(archivo) && fs.statSync(archivo).isDirectory()) {
    if (!ruta.endsWith('/')) { res.writeHead(308, { Location: ruta + '/' }); return res.end(); }
    archivo = path.join(archivo, 'index.html');
  }
  globales.forEach((h) => res.setHeader(h.key, h.value));
  if (!fs.existsSync(archivo)) {
    res.writeHead(404, { 'Content-Type': tipos['.html'] });
    return res.end(fs.readFileSync(path.join(raiz, '404.html')));
  }
  res.writeHead(200, { 'Content-Type': tipos[path.extname(archivo)] || 'application/octet-stream' });
  res.end(fs.readFileSync(archivo));
}).listen(puerto, () => console.log(`http://localhost:${puerto}`));
