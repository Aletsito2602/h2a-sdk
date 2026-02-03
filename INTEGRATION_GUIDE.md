# 🚀 PROMPT PARA INTEGRAR H2A EMBED - VERSIÓN CORREGIDA

## Instrucciones para Copiar a tu Repositorio de Landing

Este documento contiene todo el código necesario para integrar correctamente el widget H2A Embed en tu landing page PHP/HTML, sin problemas de doble FAB o fondo blanco.

---

## 📁 ARCHIVOS NECESARIOS

### 1. `embed.js` (OBLIGATORIO - Copiar este archivo)

El archivo `embed.js` ya está en la raíz del proyecto. Este es el "loader" que crea el iframe y el botón FAB.

---

### 2. Snippet de Integración HTML/PHP

Añade este código al final de tu `<body>` (o donde quieras cargar el widget):

#### Opción A: HTML Simple
```html
<!-- H2A Embed Widget -->
<script>
  // Configuración (cambiar este ID por el tuyo)
  window.H2A_EMBED_ID = "TU-EMBED-ID-AQUI";
  // URL del widget (producción)
  window.H2A_EMBED_URL = "https://h2aintercom.netlify.app";
</script>
<script src="embed.js" async></script>
```

#### Opción B: PHP Dinámico
```php
<?php
// Configuración del widget
$embedId = "TU-EMBED-ID-AQUI"; // Cambiar por tu ID real
$widgetUrl = "https://h2aintercom.netlify.app"; // URL de producción
?>

<!-- H2A Embed Widget -->
<script>
  window.H2A_EMBED_ID = "<?php echo $embedId; ?>";
  window.H2A_EMBED_URL = "<?php echo $widgetUrl; ?>";
</script>
<script src="embed.js" async></script>
```

---

## 🧪 PARA TESTING LOCAL

Si quieres probar con tu servidor de desarrollo local:

```php
<?php
$embedId = "TU-EMBED-ID-AQUI";
// Testing local (cambiar a producción para deploy)
$widgetUrl = "http://localhost:5173"; 
?>

<script>
  window.H2A_EMBED_ID = "<?php echo $embedId; ?>";
  window.H2A_EMBED_URL = "<?php echo $widgetUrl; ?>";
</script>
<script src="embed.js" async></script>
```

**Requisito:** Tener `npm run dev` corriendo en el proyecto h2a-intercom.

---

## 📋 CHECKLIST DE INTEGRACIÓN

- [ ] Copiar `embed.js` a la raíz del proyecto
- [ ] Añadir snippet HTML/PHP antes de `</body>`
- [ ] Cambiar `TU-EMBED-ID-AQUI` por el ID real del embed
- [ ] Verificar que solo hay UN botón de chat (FAB) visible
- [ ] Verificar que el widget se abre sin fondo blanco
- [ ] Probar en mobile

---

## 🐛 TROUBLESHOOTING

### "Doble FAB" (dos botones de chat)
- Verificar que el `embed.js` sea la versión actualizada con el guard `__H2A_EMBED_LOADED__`
- Verificar que el script no se carga dos veces en el HTML

### "Fondo Blanco"
- El widget debe usar `?embedded=true` en la URL del iframe
- Verificar que `window.H2A_EMBED_URL` apunta a la versión correcta (producción deployada con fixes)

### "Widget no carga"
- Verificar el ID del embed en la consola
- Verificar que el embed tiene fuentes de datos configuradas en el dashboard

### "Error de CORS"
- Usar el `embed.js` local (no cargar desde otro dominio)
- La URL del widget debe ser HTTPS en producción

---

## 📞 SOPORTE

Si sigues teniendo problemas:
1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Busca logs que empiecen con `[H2A Embed]`
4. Comparte esos logs para diagnóstico
