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
  mapa: 'https://www.google.com/maps/search/?api=1&query=Mudanzas+C.Simon+Estepona',
  // Ficha de Google (Place ID): nota y opiniones reales. Actualizad el número cuando cambie.
  resenas: 'https://search.google.com/local/reviews?placeid=ChIJ1fE9i4L1nWIRuOe4CMVSFXw',
  escribirResena: 'https://search.google.com/local/writereview?placeid=ChIJ1fE9i4L1nWIRuOe4CMVSFXw',
  googleNota: '5,0',
  googleOpiniones: 24,
  year: new Date().getFullYear(),

  // Menú principal: "clave" se compara con la variable "nav" de cada página
  nav: [
    { clave: 'hogar', texto: 'Mudanzas', url: '/hogar-oficina/' },
    { clave: 'embalaje', texto: 'Embalaje', url: '/embalaje-premium/' },
    { clave: 'guardamuebles', texto: 'Guardamuebles', url: '/guardamuebles/' },
    { clave: 'punto', texto: 'Punto limpio', url: '/punto-limpio/' },
    { clave: 'zonas', texto: 'Zonas', url: '/#zonas' },
  ],

  // Los cuatro servicios: tarjetas de la portada, enlaces relacionados y pie
  servicios: [
    { clave: 'hogar', titulo: 'Mudanzas de hogar y oficina', texto: 'Desmontaje, transporte y montaje de pisos, casas y oficinas.', url: '/hogar-oficina/', foto: 'trabajador-montando-cama' },
    { clave: 'embalaje', titulo: 'Embalaje', texto: 'Cajas reforzadas, mantas y burbuja para muebles y objetos frágiles.', url: '/embalaje-premium/', foto: 'embalaje' },
    { clave: 'guardamuebles', titulo: 'Guardamuebles', texto: 'Almacenaje vigilado por días, meses o años, con inventario.', url: '/guardamuebles/', foto: 'cajas-guardamueble' },
    { clave: 'punto', titulo: 'Punto limpio y vaciados', texto: 'Retirada de muebles viejos y vaciado de pisos, locales y trasteros.', url: '/punto-limpio/', foto: 'sillas-puntolimpio' },
  ],

  // Zonas con página propia y resto de municipios donde se trabaja
  zonas: [
    { clave: 'marbella', corto: 'Marbella', texto: 'Marbella y San Pedro Alcántara', url: '/mudanzas-marbella/' },
    { clave: 'malaga', corto: 'Málaga', texto: 'Málaga capital y provincia', url: '/mudanzas-malaga/' },
  ],
  municipios: {
    cercanos: ['Estepona', 'Cancelada', 'Manilva', 'Sabinillas', 'Casares', 'Benahavís'],
    costa: ['Marbella', 'San Pedro Alcántara', 'Ojén', 'Mijas', 'Fuengirola', 'Benalmádena', 'Torremolinos', 'Málaga'],
  },
};
