<?php
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

<!-- Cargar Widget (Importante: Hostear embed.js localmente) -->
<script
  src="embed.js"
  data-embed-id="751cd2c2-bb95-47d1-9ef8-fdc7818810db"
  data-base-url="http://localhost:5173"
  data-storage-key="h2a_user_context"
  async
></script>