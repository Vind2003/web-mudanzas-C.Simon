// Datos comunes de toda la web (se usan en las plantillas como {{ site.xxx }})
module.exports = {
  url: 'https://www.mudanzascsimon.es',
  nombre: 'Mudanzas C.Simon',
  telefono: '+34622115760',
  telefonoTexto: '622 115 760', // espacios que no parten el número
  email: 'Mudanzas.c.simon@gmail.com',
  whatsapp: 'https://wa.me/34622115760',
  formspree: 'https://formspree.io/f/xldqdlqn',
  facebook: 'https://www.facebook.com/mudanzas.c.simon',
  instagram: 'https://www.instagram.com/mudanzascsimon/',
  year: new Date().getFullYear(),
  // Menú principal: "clave" se compara con la variable "nav" de cada página
  nav: [
    { clave: 'hogar', texto: 'Hogar y oficina', url: '/hogar-oficina/' },
    { clave: 'embalaje', texto: 'Embalaje', url: '/embalaje-premium/' },
    { clave: 'guardamuebles', texto: 'Guardamuebles', url: '/guardamuebles/' },
    { clave: 'punto', texto: 'Punto limpio', url: '/punto-limpio/' },
  ],
};
