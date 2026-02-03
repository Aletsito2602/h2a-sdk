/**
 * H2A Intercom Embed Snippet
 *
 * Este script permite integrar el widget H2A Intercom en cualquier sitio web.
 *
 * Uso:
 * <script
 *   src="https://your-domain.com/embed.js"
 *   data-embed-id="tu-embed-id"
 *   data-position="bottom-right"
 *   async
 * ></script>
 */

(function() {
  'use strict';

  // ============================================================
  // CONFIGURACIÓN
  // ============================================================

  const script = document.currentScript || (function() {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  if (!script) {
    console.error('[H2A Embed] No se pudo encontrar el tag script');
    return;
  }

  const embedId = script.getAttribute('data-embed-id');
  if (!embedId) {
    console.error('[H2A Embed] Falta el atributo data-embed-id');
    return;
  }

  // Configuración opcional
  const position = script.getAttribute('data-position') || 'bottom-right';
  const autoOpen = script.getAttribute('data-auto-open') === 'true';
  const hideLauncher = script.getAttribute('data-hide-launcher') === 'true';
  const zIndex = parseInt(script.getAttribute('data-z-index') || '9999', 10);

  // Determinar la URL del widget (usar el dominio actual)
  const widgetBaseUrl = script.getAttribute('data-base-url') ||
    (window.location.hostname === 'localhost' ?
      'http://localhost:5173' :
      window.location.origin);

  const widgetUrl = `${widgetBaseUrl}/embed/${embedId}`;

  // ============================================================
  // CREAR IFRAME
  // ============================================================

  function createWidgetIframe() {
    const iframe = document.createElement('iframe');
    iframe.src = widgetUrl;
    iframe.id = 'h2a-embed-iframe';
    iframe.name = 'h2a-embed-iframe';

    // Estilos base del iframe
    const baseStyles = [
      'border: none',
      'position: fixed',
      'z-index: ' + zIndex,
      'background: transparent',
      'transition: all 0.3s ease',
    ];

    // Posición según configuración
    if (position === 'bottom-right') {
      baseStyles.push('bottom: 0');
      baseStyles.push('right: 16px');
    } else if (position === 'bottom-left') {
      baseStyles.push('bottom: 0');
      baseStyles.push('left: 16px');
    } else if (position === 'top-right') {
      baseStyles.push('top: 0');
      baseStyles.push('right: 16px');
    } else if (position === 'top-left') {
      baseStyles.push('top: 0');
      baseStyles.push('left: 16px');
    }

    iframe.style.cssText = baseStyles.join(';');

    // Atributos de seguridad y performance
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('allow', 'clipboard-write; clipboard-read');

    return iframe;
  }

  // ============================================================
  // CREAR BOTÓN LAUNCHER (FAB)
  // ============================================================

  function createLauncherButton(onClick) {
    const button = document.createElement('button');
    button.id = 'h2a-embed-launcher';
    button.setAttribute('aria-label', 'Abrir chat de ayuda');

    // Estilos del botón
    button.style.cssText = [
      'position: fixed',
      'bottom: 16px',
      'right: 16px',
      'width: 56px',
      'height: 56px',
      'border-radius: 50%',
      'background: #3b82f6',
      'border: none',
      'cursor: pointer',
      'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)',
      'z-index: ' + (zIndex - 1),
      'transition: all 0.3s ease',
      'display: flex',
      'align-items: center',
      'justify-content: center',
    ].join(';');

    // Icono de chat (SVG inline)
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;

    // Hover effect
    button.addEventListener('mouseenter', function() {
      button.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseleave', function() {
      button.style.transform = 'scale(1)';
    });

    button.addEventListener('click', onClick);

    return button;
  }

  // ============================================================
  // ESTADO DEL WIDGET
  // ============================================================

  let isOpen = false;
  let iframe = null;
  let launcher = null;

  function toggleWidget() {
    isOpen = !isOpen;

    if (isOpen) {
      // Abrir widget
      if (iframe) {
        iframe.style.display = 'block';
        iframe.style.opacity = '1';
        iframe.style.pointerEvents = 'auto';
      }
      if (launcher) {
        launcher.style.transform = 'scale(0)';
        launcher.style.opacity = '0';
      }
    } else {
      // Cerrar widget
      if (iframe) {
        iframe.style.opacity = '0';
        iframe.style.pointerEvents = 'none';
        setTimeout(() => {
          if (!isOpen) iframe.style.display = 'none';
        }, 300);
      }
      if (launcher) {
        launcher.style.transform = 'scale(1)';
        launcher.style.opacity = '1';
      }
    }

    // Enviar mensaje al iframe
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'h2a:widget:toggle',
        open: isOpen
      }, '*');
    }
  }

  // ============================================================
  // ESCUCHAR MENSAJES DEL IFRAME
  // ============================================================

  window.addEventListener('message', function(event) {
    // Verificar origen (en producción, validar event.origin)
    if (event.data && event.data.type === 'h2a:widget:close') {
      isOpen = false;
      toggleWidget();
    }
  });

  // ============================================================
  // INICIALIZAR
  // ============================================================

  function init() {
    // Crear iframe
    iframe = createWidgetIframe();

    // Inicialmente oculto
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    iframe.style.display = 'none';

    document.body.appendChild(iframe);

    // Crear launcher si no se ocultó
    if (!hideLauncher) {
      launcher = createLauncherButton(toggleWidget);
      document.body.appendChild(launcher);

      // Auto-abrir si está configurado
      if (autoOpen) {
        setTimeout(function() {
          toggleWidget();
        }, 1000);
      }
    } else {
      // Si no hay launcher, abrir automáticamente
      iframe.style.display = 'block';
      iframe.style.opacity = '1';
      iframe.style.pointerEvents = 'auto';
      isOpen = true;
    }

    // API global para controlar el widget
    window.H2AEmbed = {
      open: function() {
        if (!isOpen) toggleWidget();
      },
      close: function() {
        if (isOpen) toggleWidget();
      },
      toggle: toggleWidget,
      isOpen: function() {
        return isOpen;
      }
    };

    console.log('[H2A Embed] Widget inicializado correctamente', {
      embedId: embedId,
      widgetUrl: widgetUrl
    });
  }

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
