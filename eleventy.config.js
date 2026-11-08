// Configuración de Eleventy: genera la web estática en _site/ a partir de src/
module.exports = function (eleventyConfig) {
  // Archivos que se copian tal cual a la web publicada
  eleventyConfig.addPassthroughCopy({ public: '/' });   // favicons, robots.txt, verificación de Google
  eleventyConfig.addPassthroughCopy('fotos/web');
  eleventyConfig.addPassthroughCopy('fotos/og');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('css');

  // Fecha en formato AAAA-MM-DD para el sitemap
  eleventyConfig.addFilter('dateToIso', (fecha) => new Date(fecha).toISOString().slice(0, 10));

  // Recarga del navegador al cambiar el CSS compilado o el JS
  eleventyConfig.addWatchTarget('css/');
  eleventyConfig.addWatchTarget('js/');

  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    templateFormats: ['njk'],
    htmlTemplateEngine: 'njk',
  };
};
