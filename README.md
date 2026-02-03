# H2A PHP SDK

SDK de PHP para integrar el widget de chat H2A en sitios web.

## 🚀 Instalación Rápida

### 1. Copiar el SDK

Copia el archivo `includes/h2a-sdk.php` a tu proyecto.

### 2. Integrar en tu sitio

Agrega este código **antes del cierre `</body>`** en tu página:

```php
<?php
require_once 'includes/h2a-sdk.php';

$h2a = new H2A_SDK('TU_EMBED_ID');
echo $h2a->render();
?>
```

¡Eso es todo! El widget aparecerá en tu sitio.

---

## 📖 Uso Completo

### Integración Básica

```php
<?php
require_once 'includes/h2a-sdk.php';

$h2a = new H2A_SDK('tu-embed-id-aqui');
echo $h2a->render();
?>
```

### Con Usuario Identificado (Recomendado)

Cuando el usuario está logueado, identifícalo para personalizar la experiencia:

```php
<?php
require_once 'includes/h2a-sdk.php';

$h2a = new H2A_SDK('tu-embed-id');

// Identificar usuario logueado
if (isset($_SESSION['user_id'])) {
    $h2a->identify([
        'user_id' => $_SESSION['user_id'],
        'name'    => $_SESSION['user_name'] ?? '',
        'email'   => $_SESSION['user_email'] ?? '',
        'phone'   => $_SESSION['user_phone'] ?? '',
        'company' => $_SESSION['company'] ?? ''
    ]);
}

echo $h2a->render();
?>
```

### Con Configuración Personalizada

```php
<?php
require_once 'includes/h2a-sdk.php';

$h2a = new H2A_SDK('tu-embed-id');

// Configurar widget
$h2a->configure([
    'position'      => 'bottom-left',  // bottom-right, bottom-left, top-right, top-left
    'hide_launcher' => false,          // true = oculta el botón flotante
    'z_index'       => 9999,           // capa de superposición
    'debug'         => false           // true = modo debug en consola
]);

echo $h2a->render();
?>
```

---

## 🔧 Opciones de Configuración

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `position` | string | `bottom-right` | Posición del widget |
| `hide_launcher` | bool | `false` | Ocultar botón flotante |
| `z_index` | int | `9999` | Z-index del widget |
| `debug` | bool | `false` | Activar logs en consola |

### Valores de `position`
- `bottom-right` - Abajo derecha (default)
- `bottom-left` - Abajo izquierda
- `top-right` - Arriba derecha
- `top-left` - Arriba izquierda

---

## 👤 Datos del Usuario

Campos soportados en `identify()`:

| Campo | Descripción |
|-------|-------------|
| `user_id` | ID único del usuario (requerido para identificación) |
| `name` | Nombre del usuario |
| `email` | Email del usuario |
| `phone` | Teléfono |
| `company` | Nombre de la empresa |
| `[custom]` | Cualquier campo adicional que necesites |

---

## 🌐 API JavaScript (Cliente)

Una vez cargado el widget, puedes controlarlo desde JavaScript:

```html
<!-- Abrir el chat -->
<button onclick="H2A('show')">Abrir Chat</button>

<!-- Cerrar el chat -->
<button onclick="H2A('hide')">Cerrar Chat</button>

<!-- Alternar (abrir/cerrar) -->
<button onclick="H2A('toggle')">Toggle Chat</button>

<!-- Abrir con mensaje pre-escrito -->
<button onclick="H2A('showNewMessage', 'Hola, tengo una pregunta')">
  Contactar
</button>
```

---

## 📁 Estructura del Proyecto

```
tu-sitio/
├── includes/
│   └── h2a-sdk.php      ← SDK (copiar este archivo)
├── index.php            ← Tu página principal
└── ...
```

---

## 🔐 Seguridad (Opcional)

Para verificación de identidad con HMAC:

```php
$h2a = new H2A_SDK(
    'tu-embed-id',
    'https://h2aintercom.netlify.app',  // URL base
    'tu-secret-key'                      // Clave secreta
);

$h2a->identify([
    'user_id' => $user_id  // Se genera user_hash automáticamente
]);
```

---

## ⚡ Funciones Helper

El SDK incluye funciones helper para uso rápido:

```php
// Función rápida (una línea)
echo h2a_widget('embed-id', ['name' => 'Juan'], ['position' => 'bottom-left']);

// Crear instancia con helper
$h2a = h2a('embed-id');
$h2a->identify(['name' => 'Juan']);
echo $h2a->render();
```

---

## 🛠️ Cómo Funciona

1. **Inicialización**: El SDK genera la configuración como JSON
2. **Inyección**: Se inyecta un `<script>` con `window.h2aSettings`
3. **Carga**: Se carga `sdk.js` desde el servidor H2A
4. **Renderizado**: El widget aparece según la configuración

### Output generado:

```html
<script>window.h2aSettings={"embed_id":"xxx","base_url":"https://h2aintercom.netlify.app"};</script>
<script src="https://h2aintercom.netlify.app/sdk.js" async></script>
```

---

## 📝 Ejemplo Completo

```php
<?php
session_start();
require_once 'includes/h2a-sdk.php';

// Crear instancia
$h2a = new H2A_SDK('99a7aa52-a5aa-4f4f-ac61-d737b7990483');

// Configurar posición
$h2a->configure([
    'position' => 'bottom-right'
]);

// Identificar usuario si está logueado
if (isset($_SESSION['user_id'])) {
    $h2a->identify([
        'user_id' => $_SESSION['user_id'],
        'name'    => $_SESSION['user_name'],
        'email'   => $_SESSION['user_email']
    ]);
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Mi Sitio</title>
</head>
<body>
    <h1>Bienvenido</h1>
    
    <!-- Widget H2A (al final del body) -->
    <?php echo $h2a->render(); ?>
</body>
</html>
```

---

## ❓ Troubleshooting

### El widget no aparece
1. Verifica que el Embed ID sea correcto
2. Revisa la consola del navegador (F12) por errores
3. Asegúrate de que el script esté antes de `</body>`

### Error de CORS
- El SDK carga desde `h2aintercom.netlify.app`, asegúrate de tener conexión

### El usuario no se identifica
- Verifica que `$_SESSION` esté iniciada con `session_start()`
- Confirma que los datos del usuario existan en la sesión

---

## 📄 Licencia

MIT © H2A
