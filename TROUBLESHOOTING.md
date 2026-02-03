# Guía de Solución: Pantalla Blanca y Embed Cortado

**Diagnóstico del Error:**
En tus logs aparece: `[EmbedWidget] No hay source_ids en el embed`.
Esto causa que el widget se bloquee (pantalla blanca) y no pueda redimensionarse (embed cortado) porque no tiene "cerebro" (fuentes de datos) para funcionar.

---

### PASO A PASO PARA SOLUCIONARLO

**1. Identificar el Embed Correcto**
*   El código de tu landing usa el ID: `751cd2c2-bb95-47d1-9ef8-fdc7818810db`.
*   Ve a tu Dashboard (lista de embeds) y asegúrate de estar editando **ese mismo embed**.

**2. Asignar Fuentes de Datos**
*   Entra a editar el embed.
*   Ve a la sección de **Contenido** (Sources).
*   **Selecciona al menos una fuente** (un archivo, una web, etc.). La lista de "Fuentes seleccionadas" NO debe estar vacía.
*   *Si no tienes fuentes, ve a "Fuentes" en el menú principal, crea una, y vuelve aquí para asignarla.*

**3. Guardar y Verificar**
*   Pulsa **Guardar Cambios** en el editor del embed.
*   Vuelve a tu landing page y **recarga con caché limpia** (Shift + F5 o Cmd + Shift + R).

**4. Confirmación en Consola**
*   Abre la consola (F12).
*   Si tuviste éxito, el mensaje de error habrá desaparecido y verás algo como: `[EmbedWidget] source_ids parseados: ["..."]` (con datos).

---

### ¿Por qué veo "Doble FAB" o "Embed Cortado"?
Estos son **síntomas** del error anterior, no problemas separados.
*   **Embed Cortado:** El widget intenta cargar, falla por falta de datos, y se queda "congelado" en un tamaño pequeño o incorrecto porque el código que dice "¡Hey, expándeme!" nunca llega a ejecutarse.
*   **Doble FAB:** El widget carga un botón azul genérico mientras busca tus colores personalizados. Como falla al buscar la configuración (por el error de datos), a veces se queda "a medio camino" o hace cosas raras visualmente.

**Al arreglar las fuentes (Paso 2), todo esto desaparecerá automáticamente.**
