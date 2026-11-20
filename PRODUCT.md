# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Particulares de la zona:** familias y vecinos de Estepona y la Costa del Sol que cambian de casa, guardan muebles durante una reforma o vacían un piso.
- **Residentes extranjeros:** británicos, nórdicos y otros extranjeros que viven en la costa o llegan o se van de España; necesitan atención en inglés y, a menudo, mudanza internacional.
- **Inmobiliarias y administradores:** encargan vaciados y mudanzas por herencias, ventas o cambios de inquilino.

El visitante llega desde el móvil buscando "mudanzas en Estepona/Marbella", compara dos o tres empresas y decide a quién pedir presupuesto.

## Product Purpose

Web comercial de Mudanzas C.Simon, empresa de mudanzas con base en Estepona (Málaga). Su trabajo es que el visitante pida presupuesto: por formulario, teléfono o WhatsApp. Éxito = solicitudes de presupuesto de clientes de la Costa del Sol.

## Positioning

Empresa local y familiar que lo hace todo con el mismo equipo: mudanza, embalaje, guardamuebles, punto limpio y portes, de Estepona a toda España y al extranjero. Se habla directamente con quien hace el trabajo, y el embalaje se hace pieza a pieza para que nada llegue roto.

## Operating Context

- Contacto: teléfono 622 115 760, WhatsApp al mismo número, formulario que abre WhatsApp con el mensaje ya escrito (no hay servidor ni Formspree), correo Mudanzas.c.simon@gmail.com.
- Visita a la vivienda sin coste antes de dar precio.
- Base en Estepona (Calle Extremadura). Zona habitual: Estepona, Manilva, Casares, Benahavís, Marbella, San Pedro Alcántara y resto de la Costa del Sol hasta Málaga.

## Capabilities and Constraints

- Servicios confirmados: mudanzas de hogar y oficina (locales, nacionales e internacionales), embalaje, guardamuebles vigilado 24 h con inventario, retirada de muebles y vaciados con traslado a punto limpio, portes (transportes pequeños).
- Atención en español e inglés. La web está solo en español; una versión en inglés es una decisión abierta.
- Sitio estático Eleventy + Tailwind en Vercel; Google Analytics solo tras consentimiento; cabeceras CSP estrictas (todo recurso externo nuevo debe autorizarse).
- Sin horario publicado. Sin precios publicados.

## Brand Commitments

- Nombre: Mudanzas C.Simon. Logo: carretilla con casa, naranja sobre azul (`fotos/originales/Logo.jpg`). Camiseta de los operarios: "Transportes y mudanzas · Nacional · Internacional".
- Tratamiento de tú. Tono directo, cercano, sin superlativos.
- Botón flotante redondo de WhatsApp en todas las pantallas (petición expresa).

## Evidence on Hand

- 27 fotos reales del trabajo (`fotos/originales/`): camiones de la empresa, operarios con la camiseta, embalajes, guardamuebles, punto limpio.
- **Opiniones reales en Google:** ficha de Google Maps con nota 5,0 sobre 5 y 24 opiniones (consultado el 20/11/2026). Place ID `ChIJ1fE9i4L1nWIRuOe4CMVSFXw`. La web muestra la nota, el recuento y un enlace a las reseñas; los textos de reseñas solo se publican si el negocio los aporta o aprueba.
- Las cinco opiniones que había en la web no son reales y no deben volver a publicarse. No inventar reseñas, valoraciones, cifras de clientes, años de experiencia ni premios. No marcar la nota de Google como `aggregateRating` en el Schema (Google no admite reseñas propias de la empresa en los datos estructurados).
- Existe una segunda ficha duplicada en Google Maps ("Mudanzas c simon", sin reseñas, "abierto 24 horas") que conviene eliminar o fusionar.

## Product Principles

1. Cada página empuja a pedir presupuesto por el canal que prefiera el visitante: formulario, llamada o WhatsApp.
2. Mostrar el trabajo real (fotos propias) en lugar de prometerlo.
3. Solo afirmaciones verdaderas: nada de reseñas, cifras o servicios inventados.
4. Local y cercano: Estepona y la Costa del Sol en primer plano, sin esconder que llegan a toda España y al extranjero.

## Accessibility & Inclusion

WCAG 2.2 AA: comprobado en cada cambio por pa11y (axe) y Lighthouse en GitHub Actions.
