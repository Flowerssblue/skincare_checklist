# Ritual

App personal para seguir la rutina de skincare de mañana y de noche. Se instala en el celular desde el navegador y funciona sin internet.

## Publicar una actualización

1. Hacer los cambios en `index.html`.
2. Subir la versión en **dos lugares**, con el mismo número:
   - `sw.js` → `const VERSION = '1.0.1';`
   - `index.html` → `const APP_VERSION='1.0.1';`
3. `git commit` y `git push`.

GitHub Pages publica en uno o dos minutos. Al abrir la app en el celular aparece el aviso **"Hay una versión nueva"**; al tocar **Actualizar** se recarga con la versión nueva. Los datos (productos, fotos, historial) no se tocan.

## Datos

Todo se guarda en el navegador del celular (`localStorage`). Para cambiar de celular o pasar desde otra versión: **Descargar respaldo** → **Cargar respaldo**.
