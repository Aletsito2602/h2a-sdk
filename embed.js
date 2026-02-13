/**
 * H2A Intercom Embed Snippet - Improved Version 2.0
 *
 * Este script permite integrar el widget H2A Intercom en cualquier sitio web.
 *
 * Uso:
 * <script
 *   src="embed.js"
 *   data-embed-id="tu-embed-id"
 *   async
 * ></script>
 */

(function () {
  'use strict';

  // ============================================================
  // IDEMPOTENCY GUARD - Prevent double initialization
  // ============================================================

  // Guard 1: Global flag (prevents re-execution if script loads twice)
  if (window.__H2A_EMBED_LOADED__) {
    console.log('[H2A Embed] Ya inicializado. Saltando segunda ejecución.');
    return;
  }

  // Guard 2: DOM check (prevents if elements already exist)
  if (document.getElementById('h2a-embed-iframe') || document.getElementById('h2a-embed-launcher')) {
    console.log('[H2A Embed] Elementos ya existen en DOM. Saltando.');
    return;
  }

  // Set global flag
  window.__H2A_EMBED_LOADED__ = true;

  // ============================================================
  // CONFIGURACIÓN
  // ============================================================

  const script = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  if (!script) {
    console.error('[H2A Embed] No se pudo encontrar el tag script');
    return;
  }

  // Método 1: Atributos data-* (método recomendado)
  let embedId = script.getAttribute('data-embed-id');

  // Método 2: Variables globales window.H2A_* (método legacy/PHP)
  if (!embedId && typeof window.H2A_EMBED_ID !== 'undefined') {
    embedId = window.H2A_EMBED_ID;
    console.log('[H2A Embed] Usando window.H2A_EMBED_ID:', embedId);
  }

  if (!embedId) {
    console.error('[H2A Embed] Falta el atributo data-embed-id o window.H2A_EMBED_ID');
    return;
  }

  // Configuración opcional con valores por defecto
  const config = {
    position: script.getAttribute('data-position') || 'bottom-right',
    autoOpen: script.getAttribute('data-auto-open') === 'true',
    hideLauncher: script.getAttribute('data-hide-launcher') === 'true',
    zIndex: parseInt(script.getAttribute('data-z-index') || '9999', 10),
    baseUrl: script.getAttribute('data-base-url') ||
      (typeof window.H2A_EMBED_URL !== 'undefined' ? window.H2A_EMBED_URL :
        'https://h2aintercom.netlify.app'),
  };

  if (typeof window.H2A_EMBED_URL !== 'undefined') {
    console.log('[H2A Embed] Usando window.H2A_EMBED_URL:', window.H2A_EMBED_URL);
  }

  // Add ?embedded=true so the widget can reliably detect embed mode
  // Also append H2A_USER_DATA as query params so the widget can read them directly
  let widgetUrl = `${config.baseUrl}/embed/${embedId}?embedded=true`;

  if (window.H2A_USER_DATA && typeof window.H2A_USER_DATA === 'object') {
    const userData = window.H2A_USER_DATA;
    const params = new URLSearchParams();
    if (userData.idu_w) params.set('idu_w', userData.idu_w);
    if (userData.email) params.set('email', userData.email);
    if (userData.is_logged) params.set('is_logged', userData.is_logged);
    if (userData.user_token) params.set('user_token', userData.user_token);
    const userParams = params.toString();
    if (userParams) {
      widgetUrl += '&' + userParams;
    }
    console.log('[H2A Embed] User data añadido a URL del iframe');
  }

  console.log('[H2A Embed] ========================================');
  console.log('[H2A Embed] Inicializando widget...');
  console.log('[H2A Embed] Embed ID:', embedId);
  console.log('[H2A Embed] Widget URL:', widgetUrl);
  console.log('[H2A Embed] Config:', config);
  console.log('[H2A Embed] ========================================');

  // ============================================================
  // VARIABLES DE ESTADO
  // ============================================================

  let isOpen = false;
  let iframe = null;
  let launcher = null;

  // ============================================================
  // CREAR IFRAME
  // ============================================================

  function createWidgetIframe() {
    const iframe = document.createElement('iframe');
    iframe.src = widgetUrl;
    iframe.id = 'h2a-embed-iframe';
    iframe.allow = 'microphone; camera; autoplay; clipboard-write';

    // Posición base
    const positionStyles = {
      'bottom-right': { bottom: '16px', right: '16px' },
      'bottom-left': { bottom: '16px', left: '16px' },
      'top-right': { top: '16px', right: '16px' },
      'top-left': { top: '16px', left: '16px' },
    };
    const pos = positionStyles[config.position] || positionStyles['bottom-right'];

    // Estilos base
    const baseStyles = {
      border: 'none',
      position: 'fixed',
      zIndex: config.zIndex.toString(),
      background: 'transparent',
      transition: '0.3s',
      width: '400px',
      height: '700px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderRadius: '12px',
      // Empezar oculto
      display: 'none',
      opacity: '0',
      pointerEvents: 'none',
      ...pos,
    };

    // Aplicar estilos
    const styleString = Object.entries(baseStyles)
      .map(([key, value]) => `${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${value}`)
      .join('; ');

    iframe.style.cssText = styleString;
    iframe.setAttribute('allowtransparency', 'true');

    console.log('[H2A Embed] Iframe creado con estilos:', iframe.style.cssText);

    return iframe;
  }

  // ============================================================
  // CREAR BOTÓN LAUNCHER
  // ============================================================

  function createLauncherButton(onClick) {
    const button = document.createElement('button');
    button.id = 'h2a-embed-launcher';
    button.setAttribute('aria-label', 'Abrir chat');
    button.setAttribute('type', 'button');

    // Posición
    const positionStyles = {
      'bottom-right': { bottom: '16px', right: '16px' },
      'bottom-left': { bottom: '16px', left: '16px' },
      'top-right': { top: '16px', right: '16px' },
      'top-left': { top: '16px', left: '16px' },
    };
    const pos = positionStyles[config.position] || positionStyles['bottom-right'];

    // Estilos del botón
    Object.assign(button.style, {
      position: 'fixed',
      zIndex: (config.zIndex + 1).toString(),
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      background: '#3b82f6',
      color: '#ffffff',
      transition: 'transform 0.2s, box-shadow 0.2s',
      ...pos,
    });

    // Icono SVG
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;

    // Hover effect
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });

    button.addEventListener('click', onClick);

    console.log('[H2A Embed] Botón launcher creado');

    return button;
  }

  // ============================================================
  // TOGGLE WIDGET
  // ============================================================

  function toggleWidget() {
    isOpen = !isOpen;
    console.log('[H2A Embed] Toggle widget:', isOpen ? 'abrir' : 'cerrar');

    if (isOpen) {
      // Mostrar iframe
      iframe.style.display = 'block';
      setTimeout(() => {
        iframe.style.opacity = '1';
        iframe.style.pointerEvents = 'auto';
        console.log('[H2A Embed] Widget visible');
      }, 10);

      // Ocultar launcher
      if (!config.hideLauncher) {
        launcher.style.display = 'none';
        console.log('[H2A Embed] Launcher oculto');
      }
    } else {
      // Ocultar iframe
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      setTimeout(() => {
        iframe.style.display = 'none';
        console.log('[H2A Embed] Widget oculto');
      }, 300);

      // Mostrar launcher
      if (!config.hideLauncher) {
        launcher.style.display = 'flex';
        console.log('[H2A Embed] Launcher visible');
      }
    }

    // Enviar mensaje al iframe
    sendMessageToIframe({
      type: 'h2a:widget:toggle',
      isOpen: isOpen,
    });
  }

  // ============================================================
  // COMUNICACIÓN CON IFRAME
  // ============================================================

  function sendMessageToIframe(message) {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, '*');
      console.log('[H2A Embed] Mensaje enviado al iframe:', message);
    }
  }

  // Escuchar mensajes del iframe
  window.addEventListener('message', (event) => {
    if (!event.data || typeof event.data !== 'object') return;

    const { type, ...payload } = event.data;

    switch (type) {
      case 'h2a:widget:close':
        if (isOpen) {
          toggleWidget();
        }
        break;
      case 'h2a:widget:ready':
        console.log('[H2A Embed] Widget listo');
        // Re-enviar datos de usuario cuando el widget confirma que está listo
        if (window.H2A_USER_DATA && typeof window.H2A_USER_DATA === 'object') {
          sendMessageToIframe({
            type: 'h2a:user:data',
            userData: window.H2A_USER_DATA,
          });
          console.log('[H2A Embed] Datos de usuario re-enviados (widget ready):', window.H2A_USER_DATA);
        }
        break;
      case 'h2a:widget:resize':
        if (payload.height) {
          iframe.style.height = `${payload.height}px`;
        }
        break;
      default:
        break;
    }
  });

  console.log('[H2A Embed] Listener de mensajes del iframe configurado');

  // ============================================================
  // INICIALIZACIÓN
  // ============================================================

  function init() {
    console.log('[H2A Embed] Iniciando...');

    // Crear iframe
    iframe = createWidgetIframe();
    document.body.appendChild(iframe);
    console.log('[H2A Embed] Iframe añadido al DOM');

    // Escuchar load del iframe
    iframe.addEventListener('load', () => {
      console.log('[H2A Embed] Iframe cargado exitosamente');
      console.log('[H2A Embed] URL:', iframe.src);

      // Enviar configuración inicial
      sendMessageToIframe({
        type: 'h2a:widget:init',
        config: {
          embedId,
          ...config,
        },
      });

      // Enviar datos del usuario si existen (window.H2A_USER_DATA)
      if (window.H2A_USER_DATA && typeof window.H2A_USER_DATA === 'object') {
        sendMessageToIframe({
          type: 'h2a:user:data',
          userData: window.H2A_USER_DATA,
        });
        console.log('[H2A Embed] Datos de usuario enviados al iframe:', window.H2A_USER_DATA);
      } else {
        console.log('[H2A Embed] No se encontró window.H2A_USER_DATA');
      }
    });

    iframe.addEventListener('error', (e) => {
      console.error('[H2A Embed] Error cargando iframe:', e);
    });

    // Crear launcher (si no está oculto)
    if (!config.hideLauncher) {
      launcher = createLauncherButton(toggleWidget);
      document.body.appendChild(launcher);
      console.log('[H2A Embed] Launcher añadido al DOM');
    }

    // Auto-abrir si está configurado
    if (config.autoOpen) {
      setTimeout(() => {
        toggleWidget();
      }, 1000);
    }

    // Exponer API global
    window.H2AEmbed = {
      open: () => { if (!isOpen) toggleWidget(); },
      close: () => { if (isOpen) toggleWidget(); },
      toggle: toggleWidget,
      isOpen: () => isOpen,
      sendMessage: sendMessageToIframe,
      identify: (userData) => {
        window.H2A_USER_DATA = userData;
        sendMessageToIframe({
          type: 'h2a:user:data',
          userData: userData,
        });
        console.log('[H2A Embed] Datos de usuario actualizados:', userData);
      },
      destroy: () => {
        if (iframe) iframe.remove();
        if (launcher) launcher.remove();
        window.__H2A_EMBED_LOADED__ = false;
      },
    };

    console.log('[H2A Embed] API H2AEmbed disponible:', Object.keys(window.H2AEmbed));
    console.log('[H2A Embed] ========================================');
    console.log('[H2A Embed] Widget inicializado correctamente');
    console.log('[H2A Embed] Usa window.H2AEmbed.open() para abrir manualmente');
    console.log('[H2A Embed] ========================================');
  }

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    console.log('[H2A Embed] DOM no está listo, esperando DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', init);
  } else {
    console.log('[H2A Embed] DOM ya está listo, inicializando...');
    init();
  }
})();
