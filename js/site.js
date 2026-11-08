// Script común de la web. Se carga con "defer", así que el HTML ya está listo.
(function () {
  // Aviso de cookies: Google Analytics (vía GTM) solo se carga si el usuario acepta.
  // El cargador está en el <head> de cada página (window.cargarAnalitica).
  var CLAVE = 'cookies-consentimiento';
  var DOCE_MESES = 365 * 24 * 60 * 60 * 1000;

  function leerDecision() {
    try {
      var fecha = +localStorage.getItem(CLAVE + '-fecha') || 0;
      if (Date.now() - fecha >= DOCE_MESES) return null;
      return localStorage.getItem(CLAVE);
    } catch (e) { return null; }
  }

  function guardarDecision(valor) {
    try {
      localStorage.setItem(CLAVE, valor);
      localStorage.setItem(CLAVE + '-fecha', String(Date.now()));
    } catch (e) {}
  }

  function borrarCookiesAnalitica() {
    var dominio = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var nombre = c.split('=')[0].trim();
      if (/^_ga/.test(nombre)) {
        ['', '; domain=' + location.hostname, '; domain=.' + dominio].forEach(function (d) {
          document.cookie = nombre + '=; Max-Age=0; path=/' + d;
        });
      }
    });
  }

  var banner = null;

  function cerrarBanner() {
    if (banner) { banner.remove(); banner = null; }
  }

  function decidir(valor) {
    guardarDecision(valor);
    if (valor === 'aceptadas') {
      if (window.cargarAnalitica) window.cargarAnalitica();
    } else {
      if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
      borrarCookiesAnalitica();
    }
    cerrarBanner();
  }

  function mostrarBanner() {
    if (banner) return;
    banner = document.createElement('div');
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.className = 'fixed inset-x-0 bottom-0 z-[1000] p-4';
    banner.innerHTML =
      '<div class="max-w-3xl mx-auto bg-white text-body rounded-xl shadow-md border border-line p-5 md:flex md:items-center md:gap-6">' +
        '<p class="text-sm leading-relaxed">Usamos cookies de análisis de Google Analytics para saber cuántas personas visitan la web y mejorarla. ' +
        'Solo se activan si las aceptas. <a href="PoliticaCookies.html" class="underline text-primary hover:text-primary-dark">Más información</a></p>' +
        '<div class="mt-4 md:mt-0 flex gap-3 shrink-0">' +
          '<button type="button" data-consent="rechazadas" class="btn-secondary flex-1 md:flex-none px-5 py-2.5">Rechazar</button>' +
          '<button type="button" data-consent="aceptadas" class="btn-primary flex-1 md:flex-none px-5 py-2.5">Aceptar</button>' +
        '</div>' +
      '</div>';
    banner.querySelectorAll('[data-consent]').forEach(function (btn) {
      btn.addEventListener('click', function () { decidir(btn.getAttribute('data-consent')); });
    });
    document.body.appendChild(banner);
  }

  if (!leerDecision()) mostrarBanner();

  // "Configurar cookies" en el pie: vuelve a mostrar el aviso
  document.querySelectorAll('[data-cookie-settings]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      mostrarBanner();
      var primero = banner && banner.querySelector('button');
      if (primero) primero.focus();
    });
  });

  // Aparición suave de las imágenes al hacer scroll
  var reveal = document.querySelectorAll('.reveal-fade');
  if (reveal.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveal.forEach(function (el) { observer.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('reveal-visible'); });
  }

  // Mapa de Google: solo se carga cuando el usuario lo pide (ahorra ~1 MB)
  document.querySelectorAll('[data-map-src]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = btn.getAttribute('data-map-src');
      iframe.title = btn.getAttribute('data-map-title') || 'Mapa';
      iframe.className = 'absolute inset-0 w-full h-full';
      iframe.style.border = '0';
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      btn.replaceWith(iframe);
    });
  });

  // Carrusel de testimonios (solo en la portada)
  var slides = document.querySelectorAll('.slide');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  if (slides.length && prevBtn && nextBtn) {
    var dots = document.querySelectorAll('.dot');
    var carousel = document.getElementById('testimonios');
    var current = 0;
    var intervalId;
    var total = slides.length;
    var paused = false;
    // Sin avance automático si el usuario pide menos movimiento
    var autoplay = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    function showSlide(index) {
      slides.forEach(function (s, i) {
        var active = i === index;
        s.style.opacity = active ? '1' : '0';
        s.style.zIndex = active ? '10' : '0';
        s.style.pointerEvents = active ? 'auto' : 'none';
        s.style.transform = active ? 'translateX(0)' : (i > index ? 'translateX(20px)' : 'translateX(-20px)');
        // Las opiniones ocultas no se leen ni reciben foco
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
        if (active) { s.removeAttribute('inert'); } else { s.setAttribute('inert', ''); }
      });
      dots.forEach(function (d, i) {
        var active = i === index;
        d.classList.toggle('bg-slate-300', !active);
        d.classList.toggle('bg-primary', active);
        d.classList.toggle('scale-125', active);
        if (active) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); }
      });
      current = index;
    }

    function nextSlide() { showSlide((current + 1) % total); }
    function prevSlide() { showSlide((current - 1 + total) % total); }
    function resetInterval() {
      clearInterval(intervalId);
      if (autoplay && !paused) { intervalId = setInterval(nextSlide, 6000); }
    }
    function setPaused(value) { paused = value; resetInterval(); }

    nextBtn.addEventListener('click', function () { nextSlide(); resetInterval(); });
    prevBtn.addEventListener('click', function () { prevSlide(); resetInterval(); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { showSlide(i); resetInterval(); });
    });

    // Pausa mientras el ratón o el foco del teclado están en el carrusel
    if (carousel) {
      carousel.addEventListener('mouseenter', function () { setPaused(true); });
      carousel.addEventListener('mouseleave', function () { setPaused(false); });
      carousel.addEventListener('focusin', function () { setPaused(true); });
      carousel.addEventListener('focusout', function (e) {
        if (!carousel.contains(e.relatedTarget)) { setPaused(false); }
      });
    }

    showSlide(0);
    resetInterval();
  }
})();
