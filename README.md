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
| `npm run preview` | Sirve `_site/` en <http://localhost:8090> con las cabeceras y redirecciones de Vercel |
| `npm run build:css` | Solo compila el CSS (`src/styles.css` → `css/styles.css`) |
| `npm run build:img` | Regenera las fotos optimizadas, favicons e imágenes para compartir |
| `npx html-validate "_site/**/*.html"` | Valida el HTML generado |

## Estructura

```
src/                       Páginas y plantillas (aquí se edita el contenido)
├── _data/
│   ├── site.js            Teléfono, email, redes, menú, servicios y municipios
│   ├── alts.json          Texto alternativo de cada foto
│   ├── fotos.json         Tamaños de las fotos (lo genera build:img, no se edita a mano)
│   └── eleventyComputed.js  Datos estructurados para Google (empresa, servicio, preguntas)
├── _includes/
│   ├── layouts/base.njk     Estructura común: <head>, cabecera, primer bloque, preguntas, pie
│   ├── layouts/servicio.njk Plantilla de las páginas de servicio y de zona
│   ├── macros.njk           Piezas reutilizables: foto, flecha, galería, filas
│   └── partials/            Cabecera, pie, formulario, tarjetas de servicios, pasos…
├── index.njk              Portada
├── hogar-oficina.njk, embalaje-premium.njk, guardamuebles.njk, punto-limpio.njk
├── mudanzas-marbella.njk, mudanzas-malaga.njk    Páginas de zona
├── aviso-legal.njk, politica-privacidad.njk, politica-cookies.njk, 404.njk
├── sitemap.njk            Genera sitemap.xml automáticamente
└── styles.css             Tipografía, componentes (btn-primary, card, frame…) y movimiento
js/consent.js              Aviso de cookies: carga Google Analytics solo si se acepta
js/site.js                 Menú móvil, barra de contacto, formulario y aviso de cookies
fotos/originales/          Fotos originales (no se publican)
fotos/web/, fotos/og/      Fotos optimizadas que usa la web (las genera build:img)
fonts/                     Fuente Hanken Grotesk (licencia OFL)
public/                    Se copia tal cual a la raíz: favicons, robots.txt…
scripts/                   optimizar-imagenes.py y preview.js
tailwind.config.js         Paleta de colores y tipografía
eleventy.config.js         Configuración de Eleventy
vercel.json                Compilación, redirecciones, cabeceras de seguridad y caché
```

## Cómo es una página

Las páginas de servicio y de zona solo contienen datos, en la cabecera entre `---`:

```yaml
layout: "layouts/servicio.njk"
permalink: "/guardamuebles/"
title: "Guardamuebles en Estepona y Costa del Sol | C.Simon"   # título para Google
description: "…"                                               # descripción para Google
nav: "guardamuebles"            # marca la página actual en el menú
esquema: { tipo: "servicio", nombre: "Guardamuebles", miga: "Guardamuebles" }
hero:                           # primer bloque: titular, texto y foto
  titulo: "Guardamuebles en la Costa del Sol"
  texto: "…"
  foto: "colchon-guardamueble"
  nota: "Pagas solo por el tiempo que lo necesites."
incluye:                        # bloque con lista (filas) o con grupos (listas) y foto
  titulo: "Instalaciones del guardamuebles"
  foto: "baules-guardamuebles"
  filas: [{ t: "Seguridad 24 h", d: "Alarma y videovigilancia." }]
proceso:                        # pasos + tira de 4 fotos
  titulo: "Cómo funciona el guardamuebles"
  fotos: ["cajas-guardamueble", "cabecero-guardamuebles", "fragil-guardamuebles", "camion-ordenado"]
pasos: [{ t: "…", d: "…" }]     # opcional; si falta se usan los tres pasos generales
faq: [{ p: "¿Pregunta?", r: "Respuesta." }]   # se muestran en la página y se envían a Google
contacto: { … }                 # formulario (ver abajo)
```

## Tareas habituales

**Cambiar el teléfono, el email, el menú o los municipios:** edita `src/_data/site.js`.

**Editar un texto:** abre el archivo de la página en `src/` y cambia el dato en su cabecera.

**Añadir una pregunta frecuente:** añade una línea a `faq` en la página. Aparece en la web y en
los datos estructurados sin tocar nada más.

**Añadir una página de zona** (por ejemplo Fuengirola): copia `src/mudanzas-marbella.njk`, cambia
`permalink`, textos, barrios y fotos, y añádela a `zonas` en `src/_data/site.js` para que salga en
el pie y en la portada. Escribe contenido propio de esa zona: Google penaliza las páginas de
ciudad que son copias unas de otras.

**Configurar el formulario de una página** (variable `contacto`):

```yaml
contacto:
  titulo: "Pide presupuesto de guardamuebles"
  textos: ["Cuéntanos qué necesitas guardar."]
  asunto: "Guardamuebles"          # aparece en el asunto del correo recibido
  vivienda: false                  # true muestra el desplegable "Tipo de inmueble"
  foto: "embalaje-mueble-1"        # foto junto a los datos de contacto
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

**Añadir fotos:** copia la original en `fotos/originales/`, ejecuta `npm run build:img` (crea las
versiones de 640, 960 y 1200 px y actualiza `fotos.json`), añade su descripción en
`src/_data/alts.json` y úsala por su nombre en minúsculas, por ejemplo `foto: "camion-lateral"`.

**Cambiar colores o tipografía:** `tailwind.config.js` (colores `primary`, `accent`, `ink`…) y
`src/styles.css` (tamaños de titulares y componentes).

## Criterios de diseño

- Una sola familia tipográfica (Hanken Grotesk); los titulares van en peso normal.
- Las fotos reales del trabajo llevan cada sección; sin pies de foto ni iconos dibujados.
- Un único color de acción (azul) para botones y enlaces; el naranja queda para detalles.
- Texto a la izquierda y foto a la derecha en todos los bloques partidos.
- Movimiento discreto: el primer bloque entra una vez al cargar; tarjetas, fotos y botones
  responden al ratón. Todo se desactiva si el sistema pide menos animación.

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
3. Revisa la accesibilidad de todas las páginas con pa11y y axe (`.pa11yci.js`).
4. Pasa Lighthouse a la portada, un servicio y una zona (`lighthouserc.json`): falla si la
   accesibilidad o el SEO bajan de 95/100 y avisa si el rendimiento o las buenas prácticas bajan.

Los resultados se ven en la pestaña **Actions** del repositorio en GitHub.

Para pasar la prueba de accesibilidad en local:

```bash
npm run build && npm run preview        # en una terminal (puerto 8090)
npx pa11y-ci@5 --config .pa11yci.js     # en otra
```
