// Datos estructurados (JSON-LD) de cada página, generados a partir de su cabecera:
//   esquema.tipo: "inicio" (empresa) o "servicio" (servicio + ruta de navegación)
//   faq: lista de preguntas y respuestas (añade FAQPage)
const AREAS = [
  ['City', 'Estepona'], ['City', 'Marbella'], ['City', 'San Pedro Alcántara'], ['City', 'Manilva'],
  ['City', 'Casares'], ['City', 'Benahavís'], ['City', 'Mijas'], ['City', 'Fuengirola'],
  ['City', 'Benalmádena'], ['City', 'Torremolinos'], ['City', 'Málaga'],
  ['AdministrativeArea', 'Costa del Sol'], ['AdministrativeArea', 'Provincia de Málaga'], ['Country', 'España'],
].map(([tipo, nombre]) => ({ '@type': tipo, name: nombre }));

module.exports = {
  jsonld: (data) => {
    if (!data.esquema || data.noindex || !data.site || !data.page || !data.page.url) return '';
    const site = data.site;
    const url = site.url + data.page.url;
    const empresaId = `${site.url}/#empresa`;
    const grafo = [];

    if (data.esquema.tipo === 'inicio') {
      grafo.push({
        '@type': 'MovingCompany',
        '@id': empresaId,
        name: site.nombre,
        url: `${site.url}/`,
        logo: `${site.url}/fotos/web/logo-168.png`,
        image: `${site.url}/fotos/og/${data.ogImagen}`,
        description: data.description,
        telephone: site.telefono,
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Extremadura 12',
          addressLocality: 'Estepona',
          addressRegion: 'Málaga',
          addressCountry: 'ES',
        },
        // Horario: la web no lo publica. Cuando lo tengáis, añadid aquí
        // openingHoursSpecification (días y horas) para que Google lo muestre.
        hasMap: site.mapa,
        areaServed: AREAS,
        priceRange: '€€',
        sameAs: [site.facebook, site.instagram],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de mudanza',
          itemListElement: site.servicios.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.titulo, url: site.url + s.url },
          })),
        },
      });
      grafo.push({
        '@type': 'WebSite',
        '@id': `${site.url}/#web`,
        url: `${site.url}/`,
        name: site.nombre,
        inLanguage: 'es',
        publisher: { '@id': empresaId },
      });
    } else {
      grafo.push({
        '@type': 'Service',
        '@id': `${url}#servicio`,
        name: data.esquema.nombre,
        serviceType: data.esquema.nombre,
        description: data.description,
        url,
        image: `${site.url}/fotos/og/${data.ogImagen}`,
        provider: {
          '@type': 'MovingCompany',
          '@id': empresaId,
          name: site.nombre,
          url: `${site.url}/`,
          telephone: site.telefono,
        },
        areaServed: data.esquema.zona
          ? data.esquema.zona.map((n) => ({ '@type': 'City', name: n }))
          : AREAS,
      });
      grafo.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: data.esquema.miga || data.esquema.nombre, item: url },
        ],
      });
    }

    if (data.faq && data.faq.length) {
      grafo.push({
        '@type': 'FAQPage',
        '@id': `${url}#preguntas`,
        mainEntity: data.faq.map((f) => ({
          '@type': 'Question',
          name: f.p,
          acceptedAnswer: { '@type': 'Answer', text: f.r },
        })),
      });
    }

    return JSON.stringify({ '@context': 'https://schema.org', '@graph': grafo }, null, 2);
  },
};
