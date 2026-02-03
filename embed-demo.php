<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Demo interactiva del widget H2A. Configura y prueba el embed en tiempo real.">
    <title>Demo Interactiva - H2A Embed</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="container">
            <a href="index.php" class="logo">
                <span class="logo-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </span>
                H2A
            </a>
            <ul class="nav-links">
                <li><a href="index.php">Inicio</a></li>
                <li><a href="index.php#features">Características</a></li>
                <li><a href="#">Documentación</a></li>
            </ul>
        </div>
    </nav>

    <!-- Demo Page Content -->
    <main class="demo-page">
        <div class="container">
            <header class="demo-header">
                <h1>Demo Interactiva</h1>
                <p>Configura tu widget y copia el código de integración al instante</p>
            </header>

            <div class="demo-grid">
                <!-- Panel de Configuración -->
                <section class="config-panel">
                    <h2>⚙️ Configuración del Widget</h2>
                    <form id="config-form">
                        <div class="form-group">
                            <label for="embed-id">Embed ID</label>
                            <input type="text" id="embed-id" name="embed-id"
                                value="99a7aa52-a5aa-4f4f-ac61-d737b7990483" placeholder="TU_EMBED_ID">
                            <span class="form-hint">Identificador único de tu embed</span>
                        </div>
                        <div class="form-group">
                            <label for="position">Posición del Widget</label>
                            <select id="position" name="position">
                                <option value="bottom-right">Abajo Derecha</option>
                                <option value="bottom-left">Abajo Izquierda</option>
                                <option value="top-right">Arriba Derecha</option>
                                <option value="top-left">Arriba Izquierda</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="checkbox-group">
                                <input type="checkbox" id="auto-open" name="auto-open">
                                <label for="auto-open">Abrir automáticamente</label>
                            </div>
                            <span class="form-hint">El widget se abre al cargar la página</span>
                        </div>
                        <div class="form-group">
                            <div class="checkbox-group">
                                <input type="checkbox" id="hide-launcher" name="hide-launcher">
                                <label for="hide-launcher">Ocultar botón launcher</label>
                            </div>
                            <span class="form-hint">Control del widget solo vía API</span>
                        </div>
                        <div class="form-group">
                            <label for="z-index">Z-Index</label>
                            <input type="number" id="z-index" name="z-index" value="9999" min="1" max="2147483647">
                            <span class="form-hint">Capa de superposición del widget</span>
                        </div>
                    </form>
                </section>

                <!-- Panel de Código -->
                <section class="code-panel">
                    <div class="code-header">
                        <h3>📋 Código de Integración</h3>
                        <button type="button" id="copy-btn" class="btn btn-primary">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copiar Código
                        </button>
                    </div>
                    <div class="code-content">
                        <pre><code id="code-output"></code></pre>
                    </div>

                    <!-- API disponible -->
                    <div class="api-panel">
                        <h3>🔌 API JavaScript Disponible</h3>
                        <div class="api-methods">
                            <code class="api-method">H2AEmbed.open()</code>
                            <code class="api-method">H2AEmbed.close()</code>
                            <code class="api-method">H2AEmbed.toggle()</code>
                            <code class="api-method">H2AEmbed.isOpen()</code>
                            <code class="api-method">H2AEmbed.identify(user)</code>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Preview Section -->
            <section class="preview-section">
                <h2>👁️ Vista Previa</h2>
                <div class="preview-container">
                    <div class="preview-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <p>El widget aparecerá aquí cuando integres el script en tu sitio.</p>
                        <p>Copia el código y pégalo antes del cierre de &lt;/body&gt;</p>
                    </div>
                </div>
            </section>

            <!-- Ejemplo de Integración PHP -->
            <section class="php-example-section">
                <h2>🐘 Ejemplo de Integración PHP con Contexto de Usuario</h2>
                <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-lg);">
                    Pasa información del usuario logueado al widget para personalizar la experiencia
                </p>
                <div class="code-panel">
                    <div class="code-header">
                        <h3>📄 Integración PHP Completa</h3>
                        <button type="button" id="copy-php-btn" class="btn btn-primary">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copiar Ejemplo
                        </button>
                    </div>
                    <div class="code-content">
                        <pre><code id="php-code-output"><span class="token-tag">&lt;?php</span>
<span class="token-comment">// Obtener usuario de la sesión (ejemplo)</span>
<span class="token-attr">$user_id</span> = <span class="token-attr">$_SESSION</span>[<span class="token-string">'user_id'</span>] ?? <span class="token-string">''</span>;
<span class="token-attr">$user_email</span> = <span class="token-attr">$_SESSION</span>[<span class="token-string">'user_email'</span>] ?? <span class="token-string">''</span>;
<span class="token-attr">$user_name</span> = <span class="token-attr">$_SESSION</span>[<span class="token-string">'user_name'</span>] ?? <span class="token-string">''</span>;

<span class="token-comment">// Datos para H2A Intercom</span>
<span class="token-attr">$h2a_user_data</span> = <span class="token-attr">json_encode</span>([
    <span class="token-string">'id'</span> => <span class="token-attr">$user_id</span>,
    <span class="token-string">'email'</span> => <span class="token-attr">$user_email</span>,
    <span class="token-string">'name'</span> => <span class="token-attr">$user_name</span>
]);
<span class="token-tag">?&gt;</span>

<span class="token-comment">&lt;!-- Guardar contexto de usuario --&gt;</span>
<span class="token-tag">&lt;script&gt;</span>
  <span class="token-attr">if</span> (<span class="token-string">'&lt;?php echo $user_id; ?&gt;'</span>) {
    <span class="token-attr">localStorage</span>.<span class="token-attr">setItem</span>(<span class="token-string">'h2a_user_context'</span>, <span class="token-string">'&lt;?php echo $h2a_user_data; ?&gt;'</span>);
  }
<span class="token-tag">&lt;/script&gt;</span>

<span class="token-comment">&lt;!-- Cargar Widget H2A --&gt;</span>
<span class="token-tag">&lt;script</span>
  <span class="token-attr">src</span>=<span class="token-string">"https://h2aintercom.netlify.app/embed.js"</span>
  <span class="token-attr">data-embed-id</span>=<span class="token-string">"TU_EMBED_ID"</span>
  <span class="token-attr">data-storage-key</span>=<span class="token-string">"h2a_user_context"</span>
  <span class="token-attr">async</span>
<span class="token-tag">&gt;&lt;/script&gt;</span></code></pre>
                    </div>
                </div>

                <div class="php-notes" style="margin-top: var(--spacing-xl);">
                    <h3 style="font-size: 1rem; margin-bottom: var(--spacing-md);">📝 Notas importantes:</h3>
                    <ul
                        style="color: var(--color-text-secondary); list-style: disc; padding-left: var(--spacing-xl); display: flex; flex-direction: column; gap: var(--spacing-sm);">
                        <li><strong>data-storage-key</strong>: Indica la clave de localStorage donde se guarda el
                            contexto del usuario</li>
                        <li><strong>data-embed-id</strong>: El ID único de tu embed (obtenlo desde el dashboard)</li>
                        <li>El widget leerá automáticamente los datos del usuario y personalizará la experiencia</li>
                        <li>Los datos se pasan de forma segura sin exponer información sensible</li>
                    </ul>
                </div>
            </section>
        </div>
    </main>

    <!-- Toast Notification -->
    <div id="toast" class="toast" role="alert" aria-live="polite">
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="toast-message">¡Código copiado!</span>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p class="footer-copyright">©
                <?= date('Y') ?> H2A. Todos los derechos reservados.
            </p>
            <ul class="footer-links">
                <li><a href="index.php">Inicio</a></li>
                <li><a href="#">Documentación</a></li>
                <li><a href="#">Soporte</a></li>
            </ul>
        </div>
    </footer>

    <script src="assets/js/demo.js" defer></script>

    <?php
    // H2A SDK - Integración PHP Profesional
    require_once 'includes/h2a-sdk.php';

    $h2a = new H2A_SDK('99a7aa52-a5aa-4f4f-ac61-d737b7990483');

    // Opcional: Identificar usuario si está logueado (recomendado)
    if (isset($_SESSION['user_id'])) {
        $h2a->identify([
            'user_id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'] ?? '',
            'email' => $_SESSION['user_email'] ?? ''
        ]);
    }

    // Renderizar el widget (antes del cierre de </body>)
    echo $h2a->render();
    ?>
</body>

</html>