# Mudanzas C.Simon — web

Web de [mudanzascsimon.es](https://www.mudanzascsimon.es): página estática generada con
[Eleventy](https://www.11ty.dev/) y estilos con [Tailwind CSS](https://tailwindcss.com/).
Se publica en Vercel automáticamente con cada cambio en la rama `main`.

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior
- Python 3 con [Pillow](https://pillow.readthedocs.io/) (solo para regenerar imágenes)

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala las dependencias (la primera vez) |
| `npm run dev` | Servidor local en <http://localhost:8080> que se recarga al guardar |
| `npm run build` | Genera la web completa en `_site/` (es lo que ejecuta Vercel) |
| `npm run build:css` | Solo compila el CSS (`src/styles.css` → `css/styles.css`) |
| `npm run build:img` | Regenera las fotos optimizadas, favicons e imágenes para compartir |
| `npx html-validate "_site/**/*.html"` | Valida el HTML generado |

## Estructura

```
src/                     Páginas y plantillas (aquí se edita el contenido)
├── _data/site.js        Teléfono, email, redes, menú… (datos comunes)
├── _includes/
│   ├── layouts/base.njk Estructura de todas las páginas (<head>, cabecera, pie)
│   └── partials/        Cabecera, pie, formulario de contacto y botones de WhatsApp
├── index.njk            Portada
├── hogar-oficina.njk, embalaje-premium.njk, guardamuebles.njk, punto-limpio.njk
├── aviso-legal.njk, politica-privacidad.njk, politica-cookies.njk, 404.njk
├── sitemap.njk          Genera sitemap.xml automáticamente
└── styles.css           Estilos propios y componentes (btn-primary, card, field…)
js/consent.js            Aviso de cookies: carga Google Analytics solo si se acepta
js/site.js               Menú móvil, carrusel, mapa, formulario y aviso de cookies
fotos/originales/        Fotos originales (no se publican)
fotos/web/, fotos/og/    Fotos optimizadas que usa la web (las genera build:img)
fonts/                   Fuentes Inter y Plus Jakarta Sans (licencia OFL)
public/                  Se copia tal cual a la raíz: favicons, robots.txt…
tailwind.config.js       Paleta de colores y tipografías
eleventy.config.js       Configuración de Eleventy
vercel.json              Compilación, redirecciones, cabeceras de seguridad y caché
```

## Tareas habituales

**Cambiar el teléfono, el email o el menú:** edita `src/_data/site.js`. Se actualiza en todas las páginas.

**Editar el texto de una página:** abre su archivo en `src/` (por ejemplo `src/guardamuebles.njk`).
La parte de arriba entre `---` contiene el título, la descripción para Google y la configuración
del formulario de esa página; debajo está el contenido.

**Configurar el formulario de una página** (variable `contacto` en la cabecera del archivo):

```yaml
contacto:
  titulo: "Pide presupuesto de almacenaje"
  textos: ["Servicio en Málaga y alrededores."]
  asunto: "Guardamuebles"          # aparece en el asunto del correo recibido
  vivienda: false                  # true muestra el desplegable "Tipo de inmueble"
  extra:                           # campo opcional propio de la página
    id: "tiempo"
    nombre: "duration"
    etiqueta: "Tiempo estimado"
    placeholder: "Ej.: 3 meses"
  mensaje:
    etiqueta: "¿Qué necesitas guardar?"
    placeholder: "Ej.: muebles de un piso de 2 habitaciones…"
```

Los envíos llegan por correo a través de [Formspree](https://formspree.io/). El campo oculto
`_gotcha` frena el spam de robots.

**Añadir fotos:** copia la foto original en `fotos/originales/`, ejecuta `npm run build:img` y
úsala en la página con las rutas `/fotos/web/<nombre>-640.webp` y `-1200.webp`.

**Cambiar colores o tipografías:** `tailwind.config.js` (colores `primary`, `accent`, `ink`…).

## Publicación (Vercel)

Vercel ejecuta `npm run build` y publica la carpeta `_site/`. Además, `vercel.json`:

- Redirige las direcciones antiguas (`/Guardamuebles.html`…) a las nuevas (`/guardamuebles/`).
- Envía cabeceras de seguridad (Content-Security-Policy, nosniff, Referrer-Policy…).
  Si se añade un servicio externo nuevo (un chat, otro mapa…), hay que permitir su dominio en
  la `Content-Security-Policy`, o el navegador lo bloqueará.
- Guarda en caché fuentes, fotos, CSS y JS. El CSS y el JS llevan una huella (`?v=…`) que
  cambia con su contenido, así que los visitantes reciben siempre la versión nueva.

## Comprobaciones automáticas

En cada cambio subido a GitHub, `.github/workflows/calidad.yml`:

1. Genera la web.
2. Valida el HTML (`.htmlvalidate.json`).
3. Revisa la accesibilidad de todas las páginas con pa11y y axe (`.pa11yci.json`).
4. Pasa Lighthouse a la portada y a dos servicios (`lighthouserc.json`): falla si la
   accesibilidad o el SEO bajan de 95/100 y avisa si el rendimiento o las buenas prácticas bajan.

Los resultados se ven en la pestaña **Actions** del repositorio en GitHub.
