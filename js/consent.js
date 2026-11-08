// Se carga en el <head> de todas las páginas, antes que nada.
// 1) Marca que hay JavaScript (para las animaciones de aparición).
// 2) Consentimiento de cookies: Google Tag Manager (Analytics) solo se carga si el usuario acepta.
document.documentElement.classList.add('js');

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('consent', 'default', {
  analytics_storage: 'denied', ad_storage: 'denied',
  ad_user_data: 'denied', ad_personalization: 'denied'
});

window.cargarAnalitica = function () {
  if (window.gtmCargado) return;
  window.gtmCargado = true;
  gtag('consent', 'update', { analytics_storage: 'granted' });
  (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-PJR7H96Z');
};

try {
  var fecha = +localStorage.getItem('cookies-consentimiento-fecha') || 0;
  var vigente = Date.now() - fecha < 365 * 24 * 60 * 60 * 1000; // se vuelve a preguntar cada 12 meses
  if (vigente && localStorage.getItem('cookies-consentimiento') === 'aceptadas') window.cargarAnalitica();
} catch (e) {}
