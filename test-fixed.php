<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page PHP Arreglada - H2A</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: sans-serif;
            background: #0f172a;
            color: white;
        }

        .glass {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 20px;
        }
    </style>
</head>

<body class="p-10">

    <div class="max-w-4xl mx-auto space-y-8">
        <div class="text-center">
            <h1
                class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                Landing Page PHP "Fixed"</h1>
            <p class="text-gray-400">Esta página demuestra la integración correcta que evita los errores de CORS y
                Pantalla Blanca.</p>
        </div>

        <!-- Instructions -->
        <div class="glass">
            <h2 class="text-xl font-bold mb-4 text-green-400">✅ Estado: Integración Correcta</h2>
            <p class="mb-4">Si ves el icono del chat abajo a la derecha, significa que ha funcionado.</p>
            <p class="text-sm text-gray-300">
                El truco es:
                <br>1. Definir <code>window.H2A_EMBED_URL</code> apuntando a Producción.
                <br>2. Cargar el script <code>embed.js</code> desde TU servidor (localmente).
            </p>
        </div>

        <!-- The Code Used -->
        <div class="glass">
            <h3 class="font-bold mb-2 text-gray-400">Código usado en esta página:</h3>
            <pre class="bg-gray-900 p-4 rounded text-xs overflow-auto text-green-300">
&lt;!-- Configuración del Widget (Apunta a Producción) --&gt;
&lt;script&gt;
  window.H2A_EMBED_ID = "751cd2c2-bb95-47d1-9ef8-fdc7818810db"; // Tu ID
  window.H2A_EMBED_URL = "https://h2aintercom.netlify.app";   // Tu Widget URL
&lt;/script&gt;

&lt;!-- Simulamos datos de usuario PHP --&gt;
&lt;?php
  // Ejemplo de datos de usuario
  $user_context = json_encode([
    'id' => 'user_123',
    'name' => 'Usuario Demo PHP',
    'email' => 'demo@php.com'
  ]);
?&gt;

&lt;!-- Guardar contexto (antes del embed) --&gt;
&lt;script&gt;
  localStorage.setItem('h2a_user_context', '&lt;?php echo $user_context; ?&gt;');
&lt;/script&gt;

&lt;!-- Cargar Script LOCAL (embed.js en tu servidor) --&gt;
&lt;script 
  src="embed.js" 
  data-storage-key="h2a_user_context"
  async
&gt;&lt;/script&gt;
      </pre>
        </div>

    </div>

    <!-- REAL INTEGRATION CODE BELOW -->

    <!-- 1. Configurar URL de Producción -->
    <script>
        window.H2A_EMBED_ID = "751cd2c2-bb95-47d1-9ef8-fdc7818810db";
        window.H2A_EMBED_URL = "https://h2aintercom.netlify.app";
    </script>

    <!-- 2. Simular PHP User Context -->
    <?php
    $h2a_user_data = json_encode([
        'id' => 'user_' . rand(1000, 9999),
        'email' => 'test@example.com',
        'name' => 'Test User'
    ]);
    ?>
    <script>
        localStorage.setItem('h2a_user_context', '<?php echo $h2a_user_data; ?>');
    </script>

    <!-- 3. Load Script Local -->
    <script src="embed.js" data-storage-key="h2a_user_context" async></script>

</body>

</html>