/**
 * H2A Embed Demo - JavaScript
 * Funcionalidades interactivas para la demo
 */

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const configForm = document.getElementById('config-form');
    const codeOutput = document.getElementById('code-output');
    const copyBtn = document.getElementById('copy-btn');
    const toast = document.getElementById('toast');

    // Campos de configuración
    const embedIdInput = document.getElementById('embed-id');
    const positionSelect = document.getElementById('position');
    const autoOpenCheckbox = document.getElementById('auto-open');
    const hideLauncherCheckbox = document.getElementById('hide-launcher');
    const zIndexInput = document.getElementById('z-index');

    /**
     * Genera el código del script basado en la configuración actual
     * @returns {string} Código HTML del script
     */
    function generateScriptCode() {
        const embedId = embedIdInput?.value || 'TU_EMBED_ID';
        const position = positionSelect?.value || 'bottom-right';
        const autoOpen = autoOpenCheckbox?.checked ? 'true' : 'false';
        const hideLauncher = hideLauncherCheckbox?.checked ? 'true' : 'false';
        const zIndex = zIndexInput?.value || '9999';

        // Construir el código con syntax highlighting
        const code = `<span class="token-tag">&lt;script</span>
  <span class="token-attr">src</span>=<span class="token-string">"https://tu-dominio.com/embed.js"</span>
  <span class="token-attr">data-embed-id</span>=<span class="token-string">"${escapeHtml(embedId)}"</span>
  <span class="token-attr">data-position</span>=<span class="token-string">"${position}"</span>
  <span class="token-attr">data-auto-open</span>=<span class="token-string">"${autoOpen}"</span>
  <span class="token-attr">data-hide-launcher</span>=<span class="token-string">"${hideLauncher}"</span>
  <span class="token-attr">data-z-index</span>=<span class="token-string">"${zIndex}"</span>
  <span class="token-attr">async</span>
<span class="token-tag">&gt;&lt;/script&gt;</span>`;

        return code;
    }

    /**
     * Genera el código plano para copiar (sin HTML de highlighting)
     * @returns {string} Código plano del script
     */
    function generatePlainCode() {
        const embedId = embedIdInput?.value || 'TU_EMBED_ID';
        const position = positionSelect?.value || 'bottom-right';
        const autoOpen = autoOpenCheckbox?.checked ? 'true' : 'false';
        const hideLauncher = hideLauncherCheckbox?.checked ? 'true' : 'false';
        const zIndex = zIndexInput?.value || '9999';

        return `<script
  src="https://tu-dominio.com/embed.js"
  data-embed-id="${embedId}"
  data-position="${position}"
  data-auto-open="${autoOpen}"
  data-hide-launcher="${hideLauncher}"
  data-z-index="${zIndex}"
  async
></script>`;
    }

    /**
     * Escapa caracteres HTML especiales
     * @param {string} text - Texto a escapar
     * @returns {string} Texto escapado
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Actualiza la visualización del código
     */
    function updateCodeDisplay() {
        if (codeOutput) {
            codeOutput.innerHTML = generateScriptCode();
        }
    }

    /**
     * Muestra una notificación toast
     * @param {string} message - Mensaje a mostrar
     */
    function showToast(message) {
        if (!toast) return;

        const toastMessage = toast.querySelector('.toast-message');
        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /**
     * Copia el código al portapapeles
     */
    async function copyToClipboard() {
        const code = generatePlainCode();

        try {
            await navigator.clipboard.writeText(code);
            showToast('¡Código copiado al portapapeles!');

            // Feedback visual en el botón
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = `
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          ¡Copiado!
        `;
                copyBtn.classList.add('btn-success');

                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('btn-success');
                }, 2000);
            }
        } catch (err) {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = code;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                showToast('¡Código copiado al portapapeles!');
            } catch (e) {
                showToast('Error al copiar. Intenta manualmente.');
            }

            document.body.removeChild(textArea);
        }
    }

    /**
     * Valida el campo Embed ID
     * @returns {boolean} True si es válido
     */
    function validateEmbedId() {
        if (!embedIdInput) return true;

        const value = embedIdInput.value.trim();
        const isValid = value.length > 0 && /^[a-zA-Z0-9_-]+$/.test(value);

        if (!isValid && value.length > 0) {
            embedIdInput.style.borderColor = '#ff5f56';
        } else {
            embedIdInput.style.borderColor = '';
        }

        return isValid;
    }

    /**
     * Valida el campo Z-Index
     * @returns {boolean} True si es válido
     */
    function validateZIndex() {
        if (!zIndexInput) return true;

        const value = parseInt(zIndexInput.value, 10);
        const isValid = !isNaN(value) && value >= 0 && value <= 2147483647;

        if (!isValid) {
            zIndexInput.style.borderColor = '#ff5f56';
        } else {
            zIndexInput.style.borderColor = '';
        }

        return isValid;
    }

    // Event Listeners

    // Actualizar código y widget cuando cambie cualquier campo
    const inputs = [embedIdInput, positionSelect, autoOpenCheckbox, hideLauncherCheckbox, zIndexInput];
    let debounceTimer;

    function handleUpdate() {
        updateCodeDisplay();

        // Debounce para no recargar el widget en cada tecla (800ms)
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            updateWidget();
        }, 800);
    }

    inputs.forEach(input => {
        if (input) {
            const eventType = input.type === 'checkbox' ? 'change' : 'input';
            input.addEventListener(eventType, () => {
                handleUpdate();
                if (input === embedIdInput) validateEmbedId();
                if (input === zIndexInput) validateZIndex();
            });
        }
    });

    /**
     * Actualiza el widget en vivo recargando el script
     */
    function updateWidget() {
        // 1. Obtener configuración actual
        const embedId = embedIdInput?.value || '751cd2c2-bb95-47d1-9ef8-fdc7818810db';
        const position = positionSelect?.value || 'bottom-right';
        const autoOpen = autoOpenCheckbox?.checked ? 'true' : 'false';
        const hideLauncher = hideLauncherCheckbox?.checked ? 'true' : 'false';
        const zIndex = zIndexInput?.value || '9999';

        console.log('[Demo] Actualizando widget...', { embedId, position });

        // 2. Limpiar widget existente
        const existingIframe = document.getElementById('h2a-embed-iframe');
        const existingLauncher = document.getElementById('h2a-embed-launcher');

        // Buscar scripts genericos de embed y removerlos
        document.querySelectorAll('script[src*="embed.js"]').forEach(s => s.remove());

        if (existingIframe) existingIframe.remove();
        if (existingLauncher) existingLauncher.remove();

        // Limpiar global
        if (window.H2AEmbed) delete window.H2AEmbed;

        // 3. Crear nuevo script
        const script = document.createElement('script');
        script.id = 'h2a-embed-script';
        script.src = 'embed.js'; // Usar embed.js local
        script.async = true;

        // 4. Asignar atributos de datos
        script.setAttribute('data-embed-id', embedId);
        script.setAttribute('data-base-url', 'http://localhost:5173'); // Backend local
        script.setAttribute('data-position', position);
        script.setAttribute('data-auto-open', autoOpen);
        script.setAttribute('data-hide-launcher', hideLauncher);
        script.setAttribute('data-z-index', zIndex);

        // 5. Inyectar en el body
        document.body.appendChild(script);

        showToast('Widget actualizado');
    }

    // Botón de copiar
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }

    // Botón de copiar ejemplo PHP
    const copyPhpBtn = document.getElementById('copy-php-btn');
    if (copyPhpBtn) {
        copyPhpBtn.addEventListener('click', copyPhpExample);
    }

    /**
     * Copia el ejemplo PHP al portapapeles
     */
    async function copyPhpExample() {
        const phpCode = `<?php
// Obtener usuario de la sesión (ejemplo)
$user_id = $_SESSION['user_id'] ?? '';
$user_email = $_SESSION['user_email'] ?? '';
$user_name = $_SESSION['user_name'] ?? '';

// Datos para H2A Intercom
$h2a_user_data = json_encode([
    'id' => $user_id,
    'email' => $user_email,
    'name' => $user_name
]);
?>

<!-- Guardar contexto de usuario -->
<script>
  if ('<?php echo $user_id; ?>') {
    localStorage.setItem('h2a_user_context', '<?php echo $h2a_user_data; ?>');
  }
</script>

<!-- Cargar Widget H2A -->
<script
  src="https://h2aintercom.netlify.app/embed.js"
  data-embed-id="TU_EMBED_ID"
  data-storage-key="h2a_user_context"
  async
></script>`;

        try {
            await navigator.clipboard.writeText(phpCode);
            showToast('¡Ejemplo PHP copiado al portapapeles!');

            if (copyPhpBtn) {
                const originalText = copyPhpBtn.innerHTML;
                copyPhpBtn.innerHTML = `
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          ¡Copiado!
        `;

                setTimeout(() => {
                    copyPhpBtn.innerHTML = originalText;
                }, 2000);
            }
        } catch (err) {
            showToast('Error al copiar. Intenta manualmente.');
        }
    }

    // Inicializar la visualización del código
    updateCodeDisplay();

    // Animaciones de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos animables
    document.querySelectorAll('.feature-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Clase para animación
    document.head.insertAdjacentHTML('beforeend', `
    <style>
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);
});
