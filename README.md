# Ritual

App personal para seguir la rutina de skincare de mañana y de noche. Se instala en el celular desde el navegador y funciona sin internet.

## Abrir e instalar la app

**Enlace directo: https://flowerssblue.github.io/skincare_checklist/**

No hay un archivo que descargar: es una web instalable (PWA).

- **Android (Chrome):** abre el enlace → menú ⋮ → **Agregar a la pantalla de inicio** (o **Instalar app**).
- **iPhone (Safari):** abre el enlace → botón Compartir → **Agregar a pantalla de inicio**.

Una vez instalada funciona sin internet y se actualiza sola cuando hay una versión nueva.

## Publicar una actualización

1. Hacer los cambios en `index.html`.
2. Subir la versión en **dos lugares**, con el mismo número:
   - `sw.js` → `const VERSION = '1.0.1';`
   - `index.html` → `const APP_VERSION='1.0.1';`
3. `git commit` y `git push`.

GitHub Pages publica en uno o dos minutos. Al abrir la app en el celular aparece el aviso **"Hay una versión nueva"**; al tocar **Actualizar** se recarga con la versión nueva. Los datos (productos, fotos, historial) no se tocan.

## Datos

Todo se guarda en el navegador del celular (`localStorage`). Para cambiar de celular o pasar desde otra versión: **Descargar respaldo** → **Cargar respaldo**.
