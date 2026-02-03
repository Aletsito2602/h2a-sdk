<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description"
    content="Integra chat inteligente con IA en tu sitio web en minutos. Widget tipo Intercom, personalizable.">
  <title>H2A - Integra Chat Inteligente en tu Sitio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
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
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <span class="hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          Integración en 2 minutos
        </span>
        <h1>Chat Inteligente para tu Sitio</h1>
        <p class="hero-subtitle">
          Añade soporte IA y chat tipo Intercom en minutos.
          Sin configurar servidores, sin complicaciones.
        </p>
      </div>
      <div class="hero-visual">
        <div class="hero-mockup">
          <div class="mockup-header">
            <span class="mockup-dot"></span>
            <span class="mockup-dot"></span>
            <span class="mockup-dot"></span>
          </div>
          <div class="mockup-content">
            <div class="mockup-message bot">👋 ¡Hola! ¿En qué puedo ayudarte?</div>
            <div class="mockup-message user">¿Cómo integro el chat?</div>
            <div class="mockup-message bot">Solo copia un script y listo.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p class="footer-copyright">© <?= date('Y') ?> H2A. Todos los derechos reservados.</p>
    </div>
  </footer>

  <?php
  // H2A SDK - Integración PHP
  require_once 'includes/h2a-sdk.php';

  $h2a = new H2A_SDK('99a7aa52-a5aa-4f4f-ac61-d737b7990483');

  // Opcional: Identificar usuario si está logueado
  if (isset($_SESSION['user_id'])) {
    $h2a->identify([
      'user_id' => $_SESSION['user_id'],
      'name' => $_SESSION['user_name'] ?? '',
      'email' => $_SESSION['user_email'] ?? ''
    ]);
  }

  echo $h2a->render();
  ?>
</body>

</html>