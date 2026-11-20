---
name: Mudanzas C.Simon
description: Web comercial de una empresa de mudanzas familiar de Estepona. Canon del sector, tranquila y profesional, pensada para un público mayor.
colors:
  ink: "#0F1B2D"
  body: "#334155"
  muted: "#566579"
  surface: "#F6F8FB"
  sky: "#EAF1FA"
  line: "#E3E8EF"
  white: "#FFFFFF"
  primary: "#0B4A9E"
  primary-dark: "#083A7D"
  accent: "#F28C28"
  accent-dark: "#E07813"
  accent-text: "#C2410C"
  whatsapp: "#25D366"
  hero-overlay: "#0A1628"
typography:
  family: '"Hanken Grotesk", system-ui, sans-serif'
  h1:
    fontSize: "clamp(2.5rem, 1.4rem + 3.6vw, 4.25rem)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  h2:
    fontSize: "clamp(1.875rem, 1.35rem + 1.7vw, 2.75rem)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  h3:
    fontSize: "1.3125rem"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lead:
    fontSize: "clamp(1.1875rem, 1.05rem + 0.4vw, 1.3125rem)"
    lineHeight: 1.55
    maxWidth: "60ch"
  body:
    fontSize: "1.125rem"
    lineHeight: 1.65
  button:
    fontSize: "1.0625rem"
    fontWeight: 600
  label:
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  button: "0.5rem"
  field: "0.5rem"
  card: "1rem"
  frame: "1rem"
  pill: "9999px"
spacing:
  wrap: "min(100% - 2.5rem, 76rem) / md: min(100% - 5rem, 76rem)"
  section: "4.5rem / md: 6.5rem"
  section-head: "2.25rem / md: 3rem"
  card-padding: "1.5rem–1.75rem"
  control-min-height: "3.25rem"
  touch-target-min: "2.75rem"
components:
  btn-cta: { background: accent, color: ink, hover: accent-dark, use: "solo pedir presupuesto" }
  btn-primary: { background: primary, color: white, hover: primary-dark }
  btn-secondary: { background: white, color: primary, border: "2px primary/25" }
  btn-light: { color: white, border: "2px white/70", use: "sobre foto u oscuro" }
  card: { background: white, border: "1px line", rounded: card }
  frame: { background: surface, rounded: card, overflow: hidden }
  icono: { size: "3rem", background: sky, color: primary, rounded: pill }
  field: { minHeight: "3.25rem", border: "1px slate-300", focus: "primary + ring 4px primary/15" }
  wa-burbuja: { size: "4rem", background: whatsapp, position: "fixed bottom-right" }
---

# Sistema de diseño: Mudanzas C.Simon

Registrado a partir de la web construida (tailwind.config.js, src/styles.css, macros y plantillas Nunjucks) el 20/11/2026. Si la web y este documento discrepan, manda la web y este documento se corrige.

## 1. Visión general

**Mundo: canon del sector, profesional y tranquilo.** Es la web de una empresa de mudanzas seria y cercana, hecha como las mejores del sector pero más limpia: menos bloques, letra grande y una acción clara por sección. El público es en buena parte mayor, así que todo se decide a favor de la lectura cómoda: cuerpo a 18 px, botones de 52 px de alto, contraste AA o superior, animación mínima.

El visitante llega desde el móvil, compara dos o tres empresas y decide a quién pedir presupuesto. Cada página le lleva a eso por el canal que prefiera: formulario, llamada o WhatsApp.

Lo que rechaza: la página recargada de la competencia (carruseles, párrafos largos, logos de clientes, muchos pesos visuales iguales), las reseñas inventadas y los adornos sin función.

## 2. Color

Fondo blanco y gris muy claro; el azul del logo es el color estructural; el naranja del logo es solo para pedir presupuesto.

| Token | Valor | Uso |
|---|---|---|
| `ink` | #0F1B2D | Titulares, texto fuerte, fondo del pie (`ground-dark`), texto del botón naranja |
| `body` | #334155 | Texto de lectura |
| `muted` | #566579 | Texto secundario (subtítulos de la franja de confianza, etiquetas) |
| `surface` | #F6F8FB | Fondo alterno de sección (`ground-surface`), fondo de `frame` mientras carga la foto |
| `sky` | #EAF1FA | Banda de contacto (`ground-sky`), círculo de `icono`, botón de teléfono de la cabecera móvil |
| `line` | #E3E8EF | Bordes finos de tarjetas, cabecera, FAQ |
| `primary` | #0B4A9E | Enlaces, botón primario, banda de la nota de Google, números de paso, foco del teclado, selección (8,4:1 con blanco) |
| `primary-dark` | #083A7D | Hover de lo azul |
| `accent` | #F28C28 | Botón de presupuesto (`btn-cta`) con texto `ink` (7,3:1) y estrellas de la nota de Google |
| `accent-dark` | #E07813 | Hover del botón de presupuesto |
| `accent-text` | #C2410C | Asterisco de campo obligatorio (naranja legible sobre blanco, 5,2:1) |
| `whatsapp` | #25D366 | Solo el círculo de WhatsApp (burbuja y tarjeta de contacto) |

Velo del primer bloque: `rgb(10 22 40)` a distintas opacidades (ver Componentes, `ground-photo`).

**Reglas de color**
- **El naranja es del presupuesto.** `btn-cta` (naranja con texto marino `ink`, nunca blanco) es el único botón naranja y se usa solo para «Pedir presupuesto» / «Enviar solicitud». Las únicas otras apariciones de naranja son las cinco estrellas de la nota de Google (convención del propio Google) y el asterisco de obligatorio en `accent-text`.
- **El azul estructura.** Enlaces, botón primario, foco y la banda de la nota de Google (`bg-primary`) son azules. Ningún otro color de marca.
- **Secciones por fondo, no por líneas.** Se alternan blanco, `surface`, `sky`, `primary` (solo la nota de Google) e `ink` (solo el pie).

## 3. Tipografía

Una sola familia: **Hanken Grotesk**, variable (100–900), alojada en la propia web (`fonts/hanken-grotesk-var.woff2`, `font-display: swap`, precargada). Sin segunda familia.

| Rol | Tamaño | Peso | Interlineado | Tracking |
|---|---|---|---|---|
| h1 | clamp(2.5rem → 4.25rem) | 650 | 1.05 | -0.03em |
| h2 | clamp(1.875rem → 2.75rem) | 650 | 1.12 | -0.025em |
| h3 | 1.3125rem (21 px) | 650 | 1.3 | -0.01em |
| `.lead` | clamp(1.1875rem → 1.3125rem), máx. 60ch | 400 | 1.55 | 0 |
| cuerpo | 1.125rem (18 px) | 400 | 1.65 | 0 |
| botón | 1.0625rem (17 px) | 600 | — | 0 |
| campo / etiqueta de campo | 1.0625rem / 1rem | 400 / 600 | — | 0 |
| `.label`, texto pequeño | 0.9375rem (15 px) | 500 | 1.3 | 0 |
| pie de marca y copyright | 0.8125–0.875rem (13–14 px), solo ahí | 400 | — | 0 |

- Titulares en `ink` con `text-wrap: balance`; h3 con `pretty`. `strong` a 650.
- Números tabulares en todo el cuerpo (`tabular-nums`): teléfonos y notas se alinean.
- Sin mayúsculas sostenidas, sin tracking abierto, sin cursivas decorativas.
- Párrafos de lectura larga limitados a `max-w-prose` (65ch).

## 4. Espaciado y retícula

- **Ancho único `.wrap`**: `min(100% − 2.5rem, 76rem)`, y `min(100% − 5rem, 76rem)` desde 768 px. Mismos bordes izquierdo y derecho en toda la web.
- **`.section`**: 4.5rem arriba y abajo en móvil, 6.5rem desde 768 px. `.section-head`: máx. 46rem y 2.25rem / 3rem de separación con el contenido.
- Retícula de 12 columnas en escritorio; los bloques de texto + foto van 6/6 o 7/5 con `gap-6` y un `pr-10`/`pr-12` en el texto.
- Objetivos táctiles: botones y campos de 3.25rem (52 px); enlaces sueltos con `min-h-11`/`min-h-12`; FAQ de 4rem.
- `scroll-padding-top: 6rem` para que la cabecera fija no tape el destino de un ancla.

## 5. Forma y elevación

- Radios: 0.5rem en botones y campos; 1rem (`rounded-2xl`) en tarjetas, marcos de foto y el formulario; círculo completo en `icono`, números de paso y burbuja.
- Bordes: 1 px `line` en tarjetas; 2 px en botones de contorno.
- Sombras suaves y difusas, siempre negativas en spread: hover de tarjeta enlazada (`0 18px 40px -24px rgb(15 27 45 / .45)`), formulario (`0 24px 60px -36px …`), botón naranja (`0 6px 18px -8px` naranja) y burbuja de WhatsApp. Nada de sombras duras desplazadas.

## 6. Componentes

- **Cabecera**: blanca, fija (`sticky`), borde inferior `line`. Logo + nombre + «Estepona · Costa del Sol». Escritorio: menú, teléfono en azul y `btn-cta` «Pedir presupuesto». Móvil: botón de llamada (fondo `sky`) y botón de menú de 48 px.
- **`ground-photo` (primer bloque)**: foto real del trabajo a sangre con velo marino. Escritorio: degradado horizontal 90° (0.92 → 0.78 al 42 % → 0.25), texto a la izquierda. **Móvil (<768 px): degradado vertical que deja ver la parte de arriba de la foto** (0.15 arriba → 0.6 al 32 % → 0.9 al 58 %), texto abajo, foto encuadrada al 72 %. Contenido: ruta de navegación (solo en servicios), h1 blanco, una `lead`, `btn-cta` + `btn-light` con el teléfono.
- **Franja de confianza**: blanca bajo el primer bloque, cuatro datos reales (5,0 en Google con enlace a las reseñas, visita gratis, local-nacional-internacional, español e inglés). Escritorio: 4 columnas con `icono`. **Móvil (<640 px): rejilla 2×2 sin iconos** (`icono hidden sm:flex`).
- **Botones**: `btn-cta` (presupuesto), `btn-primary`, `btn-secondary` (contorno azul sobre blanco), `btn-light` (contorno blanco sobre foto u oscuro). Suben 1 px al pasar el ratón; la flecha (`flecha()`) avanza 3 px.
- **Enlaces**: `.link` (subrayado de 2 px que aparece al pasar el ratón; en menú, tarjetas y pie) y `.link-text` (dentro de párrafos, siempre subrayado).
- **`card`**: blanca, borde fino, radio 1rem. Si es enlace, sube 3 px y gana sombra. Tarjeta de servicio: foto 4:3 arriba, h3, una línea, «Ver el servicio →».
- **`frame`**: marco de foto con radio 1rem; la foto hace un zoom de 1.04 al pasar el ratón por su enlace. Proporciones usadas: 4/5, 5/6, 3/4, 4/3.
- **`galeria`**: tira de 4 (o 3) fotos propias 4/5, sin pies, 2 columnas en móvil.
- **Pasos**: tres tarjetas numeradas con círculo `primary` y número blanco.
- **`filas`**: lista con marca de verificación en un `icono` pequeño (36 px), h3 y una línea.
- **Nota de Google**: banda `bg-primary` con cinco estrellas naranjas, h2 blanco con la nota real, recuento real y botón blanco «Leer las opiniones en Google».
- **FAQ**: `details` plegables con borde inferior `line`, signo «+» azul que gira 45° al abrir; la primera abierta.
- **Contacto**: banda `ground-sky`; formulario blanco con sombra suave y `btn-cta` a todo el ancho; a la derecha tarjetas de contacto directo (teléfono, WhatsApp, correo) con su icono y una foto en escritorio.
- **`field`**: 52 px, borde `slate-300`, foco con borde `primary` y anillo de 4 px `primary/15`; error en rojo (`red-600` / `red-700`) con mensaje debajo.
- **`wa-burbuja`**: círculo verde de 64 px fijo abajo a la derecha en todas las pantallas; en escritorio muestra la etiqueta «¿Hablamos por WhatsApp?» al pasar el ratón o con el foco.
- **Pie (`ground-dark`)**: fondo `ink`, nota de Google, contacto, servicios, zonas, legal; reserva espacio inferior en móvil para la burbuja.

### Iconos

Iconos de línea propios (macro `icono`), 24×24, trazo 1.75, extremos redondeados, en `currentColor`. **Solo en la franja de confianza, en las tarjetas de contacto y en las listas de verificación** (`filas`, municipios, listas de servicio). Además existen pictogramas funcionales que son parte de un control, no decoración: el teléfono dentro de los botones de llamada, la flecha de avance, el «+» de la FAQ, el menú y los logotipos de WhatsApp, Facebook e Instagram. No se añaden iconos para ilustrar titulares, servicios ni ventajas.

## 7. Movimiento

- Entrada única del primer bloque al cargar: cada hijo de `[data-enter]` sube 16 px y aparece en 0.7 s, escalonado 70 ms; la foto pasa de escala 1.06 a 1 en 1.4 s; la burbuja llega a los 0.8 s. Nunca deja texto oculto.
- Transiciones de 0.18–0.25 s con `cubic-bezier(0.2, 0.7, 0.2, 1)`; zoom de foto 0.6 s.
- Sin animaciones al hacer scroll, sin carruseles, sin bucles.
- `prefers-reduced-motion: reduce` anula transiciones y animaciones.

## 8. Accesibilidad

WCAG 2.2 AA comprobado con pa11y (axe) y Lighthouse en CI. Foco de 3 px `primary` con 3 px de separación (blanco sobre foto u oscuro). Enlace «Saltar al contenido». Los enlaces que abren pestaña nueva lo dicen en texto oculto. Contrastes de la paleta indicados en la tabla de color.

## 9. Reglas

- **Una acción clara por sección.** Cada sección tiene como mucho un botón principal; el primer bloque une presupuesto y llamada, y el resto de enlaces son texto.
- **El naranja es solo para pedir presupuesto**, siempre con texto marino.
- **Sin antetítulos.** Nada de etiquetas pequeñas en mayúsculas ni «kickers» encima de los titulares; el h2 abre la sección.
- **Sin testimonios falsos.** La única prueba social es la nota real de Google (5,0 con 24 opiniones) con enlace a la ficha. No se publican textos de reseñas que el negocio no haya aportado, ni cifras de clientes, años o premios inventados, ni `aggregateRating` en el Schema.
- **Fotos propias.** Solo fotos reales del trabajo (camiones, operarios, embalajes); nada de imágenes de banco ni ilustraciones.
- **WhatsApp siempre a mano.** La burbuja aparece en todas las pantallas.
- **Iconos de línea solo donde se dice** (franja de confianza, tarjetas de contacto, listas de verificación).
- **En móvil la franja de confianza es 2×2 sin iconos**, y el degradado del primer bloque deja ver la parte de arriba de la foto.
- **Letra grande.** Cuerpo a 18 px; ningún texto de contenido por debajo de 15 px (solo la línea bajo el logo y el copyright bajan a 13–14 px).

## 10. Qué sí y qué no

**Sí**
- Bloques de texto cortos: un h2, una `lead` y como mucho tres puntos.
- Alternar fondos blanco / `surface` / `sky` para separar secciones.
- Tarjetas blancas con borde fino y fotos en marcos de esquina suave.
- Tratamiento de tú, tono directo, sin superlativos.

**No**
- Botones naranjas para otra cosa que el presupuesto, o naranja con texto blanco.
- Antetítulos, carruseles, logos de clientes, contadores, reseñas inventadas.
- Iconos decorativos fuera de los tres usos permitidos; emojis.
- Una segunda familia tipográfica o fuentes del sistema para titulares.
- Sombras duras, degradados de color de marca, líneas para separar secciones.
