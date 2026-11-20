// Script común de la web. Se carga con "defer", así que el HTML ya está listo.
(function () {
  // Aviso de cookies: Google Analytics (vía GTM) solo se carga si el usuario acepta.
  // El cargador está en js/consent.js, en el <head> de cada página (window.cargarAnalitica).
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
      '<div class="mx-auto max-w-3xl rounded-xl border border-line bg-white p-5 text-body shadow-lg md:flex md:items-center md:gap-6">' +
        '<p class="text-sm leading-relaxed">Usamos cookies de análisis de Google Analytics para saber cuántas personas visitan la web y mejorarla. ' +
        'Solo se activan si las aceptas. <a href="/politica-cookies/" class="link-text">Más información sobre las cookies</a></p>' +
        '<div class="mt-4 md:mt-0 flex gap-3 shrink-0">' +
          '<button type="button" data-consent="rechazadas" class="btn-secondary flex-1 md:flex-none">Rechazar</button>' +
          '<button type="button" data-consent="aceptadas" class="btn-primary flex-1 md:flex-none">Aceptar</button>' +
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

  // Menú móvil: botón que abre y cierra la navegación
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('menu-principal');
  if (menuBtn && menu) {
    function setMenu(abierto) {
      menuBtn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      menu.classList.toggle('hidden', !abierto);
      menuBtn.querySelector('[data-menu-icon="abrir"]').classList.toggle('hidden', abierto);
      menuBtn.querySelector('[data-menu-icon="cerrar"]').classList.toggle('hidden', !abierto);
    }
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    // Al elegir un enlace (p. ej. "Pedir presupuesto") se cierra el menú
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a') && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
    });
  }

  // Formulario de presupuesto: valida, pasa el filtro antispam y abre WhatsApp con el
  // mensaje ya escrito. No se envía nada a ningún servidor: el cliente pulsa "Enviar"
  // en su propio WhatsApp, así que un robot no puede hacernos llegar mensajes.
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.noValidate = true; // sin JS se usa la validación del navegador
    var estado = form.querySelector('[data-form-estado]');
    var campos = form.querySelectorAll('input[required], textarea[required]');
    var inicio = Date.now();
    var tecleado = false;
    form.addEventListener('input', function () { tecleado = true; });

    function mensaje(campo) {
      var v = campo.validity;
      if (v.valueMissing) return campo.type === 'checkbox' ? 'Debes aceptar la política de privacidad.' : 'Este campo es obligatorio.';
      if (v.tooLong) return 'El texto es demasiado largo.';
      return '';
    }

    function marcar(campo, texto) {
      var error = document.getElementById(campo.id + '-error');
      if (texto === undefined) texto = campo.checkValidity() ? '' : mensaje(campo);
      campo.setAttribute('aria-invalid', texto ? 'true' : 'false');
      if (error) {
        error.textContent = texto;
        error.classList.toggle('hidden', !texto);
        if (texto) campo.setAttribute('aria-describedby', error.id); else campo.removeAttribute('aria-describedby');
      }
      return !texto;
    }

    // Una vez marcado un error, se corrige en cuanto el usuario escribe
    campos.forEach(function (campo) {
      campo.addEventListener(campo.type === 'checkbox' ? 'change' : 'input', function () {
        if (campo.getAttribute('aria-invalid') === 'true') marcar(campo);
      });
    });

    function mostrarEstado(ok, html) {
      estado.className = 'rounded-lg p-4 text-base ' + (ok ? 'bg-green-50 text-green-900 border border-green-200' : 'bg-red-50 text-red-900 border border-red-200');
      estado.setAttribute('role', ok ? 'status' : 'alert');
      estado.innerHTML = html;
      estado.focus();
    }

    // Filtro antispam. Devuelve un motivo si el envío parece de un robot o es basura.
    var ENLACE = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|ru|xyz|top|info|biz|io|site|online|shop)\b)/i;
    var ETIQUETA_HTML = /<[^>]+>|\[url|\[link/i;
    var PALABRAS = /\b(viagra|casino|crypto|bitcoin|forex|loan|seo services|backlinks?|porn|escort|betting)\b/i;
    function filtrar(nombre, detalles) {
      if (form.querySelector('[data-trampa]').value) return 'robot';
      if (!tecleado || Date.now() - inicio < 4000) return 'robot';
      var texto = nombre + ' ' + detalles;
      if (ENLACE.test(texto) || ETIQUETA_HTML.test(texto) || PALABRAS.test(texto)) return 'contenido';
      if (!/\p{L}.*\p{L}/u.test(nombre)) return 'nombre';
      if (detalles.replace(/\s/g, '').length < 10) return 'corto';
      if (/(.)\1{7,}/.test(texto)) return 'contenido';
      // Como mucho 3 mensajes cada 10 minutos desde el mismo navegador
      try {
        var ahora = Date.now();
        var envios = JSON.parse(localStorage.getItem('wa-envios') || '[]').filter(function (t) { return ahora - t < 600000; });
        if (envios.length >= 3) return 'limite';
        envios.push(ahora);
        localStorage.setItem('wa-envios', JSON.stringify(envios));
      } catch (err) { /* sin almacenamiento: no se limita */ }
      return '';
    }

    function componer() {
      var lineas = ['Hola, quiero pedir presupuesto desde la web.', '', '*Servicio:* ' + form.getAttribute('data-wa-asunto')];
      form.querySelectorAll('[data-wa]').forEach(function (campo) {
        var valor = campo.value.trim();
        if (valor) lineas.push('*' + campo.getAttribute('data-wa') + ':* ' + valor);
      });
      return lineas.join('\n');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var primero = null;
      campos.forEach(function (campo) {
        if (!marcar(campo) && !primero) primero = campo;
      });
      if (primero) { primero.focus(); return; }

      var nombre = form.querySelector('[name="name"]');
      var detalles = form.querySelector('[name="message"]');
      var motivo = filtrar(nombre.value.trim(), detalles.value.trim());
      if (motivo === 'robot') {
        // A un robot no se le dice que ha sido detectado
        mostrarEstado(true, '<strong>Gracias.</strong> Hemos recibido tu solicitud.');
        return;
      }
      if (motivo === 'nombre') { marcar(nombre, 'Escribe tu nombre.'); nombre.focus(); return; }
      if (motivo === 'corto') { marcar(detalles, 'Cuéntanos un poco más: qué hay que mover y desde dónde.'); detalles.focus(); return; }
      if (motivo === 'contenido') { marcar(detalles, 'El mensaje no puede llevar enlaces ni direcciones web.'); detalles.focus(); return; }
      if (motivo === 'limite') {
        mostrarEstado(false, 'Ya has enviado varias solicitudes. Si necesitas algo más, llámanos al <a class="underline" href="tel:+34622115760">622 115 760</a>.');
        return;
      }

      var url = form.getAttribute('data-wa-numero') + '?text=' + encodeURIComponent(componer());
      var ventana = window.open(url, '_blank');
      if (ventana) ventana.opener = null; else window.location.href = url;
      mostrarEstado(true, '<strong>Hemos abierto WhatsApp con tu mensaje.</strong> Pulsa «Enviar» en WhatsApp para que nos llegue. ' +
        'Si no se ha abierto, <a class="font-semibold underline" href="' + url.replace(/"/g, '&quot;') + '" target="_blank" rel="noopener">pulsa aquí</a> o llámanos al <a class="underline" href="tel:+34622115760">622 115 760</a>.');
      if (window.dataLayer) window.dataLayer.push({ event: 'generate_lead', formulario: form.getAttribute('data-wa-asunto'), canal: 'whatsapp' });
    });
  });
})();
