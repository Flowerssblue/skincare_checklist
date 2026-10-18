# Ritual — contexto para Claude Code

App personal de Florencia para seguir su rutina de skincare de mañana y de noche. Es de uso personal (una sola usuaria), en español de Chile, pensada para el celular (Motorola Edge 30 Neo, Chrome).

## Qué es técnicamente

- **Un solo archivo**: `index.html` con HTML, CSS y JS inline. Sin framework, sin build, sin dependencias npm. Mantenerlo así salvo que Florencia pida lo contrario.
- **PWA** instalable: `manifest.webmanifest` + íconos PNG + `sw.js` (service worker).
- **Hosting previsto**: GitHub Pages en `https://flowerssblue.github.io/skincare_checklist/` (repo público `Flowerssblue/skincare_checklist`, rama `main`, raíz `/`).
- **Datos**: todo en `localStorage` del navegador, clave `ritual-skincare-v3`. No hay backend ni cuentas. Las fotos se guardan como data URL JPEG reducidas a ~200 px.

## Archivos

| Archivo | Qué hace |
|---|---|
| `index.html` | La app completa |
| `sw.js` | Cachea la app para uso sin internet y gestiona las actualizaciones |
| `manifest.webmanifest` | Nombre, colores e íconos para instalarla en la pantalla de inicio |
| `icon-192.png`, `icon-512.png`, `icon-maskable.png`, `apple-touch-icon.png` | Íconos (sol naranjo + luna morada) |
| `README.md` | Instrucciones cortas para publicar una actualización |

## Funciones actuales (v1.0.0)

- **Extras** (tercera pestaña): tratamientos de uso ocasional en `S.tx` (`kind`: `semanal` con días, o `focalizado`). No cuentan para racha ni progreso; muestran "último uso" a partir de `S.log[fecha].tx`.
- **Respaldo**: la sección Respaldo muestra la fecha del último (`S.lastBackup`); se guarda también `S.createdAt`. Pide `navigator.storage.persist()`.
- **Tono por pestaña**: `html.pm` y `html.tx` cambian fondo y acento. Si la app queda abierta pasada la medianoche, `rollover()` empieza el día nuevo.
- Al agregar un producto se puede asignar a un paso vacío (`fSlot`) o crear uno nuevo.
- Pestañas **Mañana** y **Noche**; abre en Noche desde las 15:00.
- Checklist diario por paso, barra de avance, racha de días seguidos y vista de los últimos 7 días (punto naranjo = AM completa, morado = PM completa).
- Rutina base precargada según la guía de Dermotienda:
  - AM: Limpiador → Sérum de vitamina C → Hidratante → Protector solar FPS 50+
  - PM: Aceite limpiador → Limpiador en gel → Retinol / ácidos (solo Lu·Mi·Vi) → Hidratante / reparador
- **Días por paso** (`days: [0-6]`, 0 = domingo; vacío = todos los días). Los pasos que no tocan hoy salen del checklist y no cuentan para la racha.
- Agregar, editar, reordenar (↑ ↓) y eliminar pasos. Botón **Guardar y agregar otro**.
- **Foto del producto con lectura de etiqueta (OCR)**: usa Tesseract.js cargado desde `cdn.jsdelivr.net` (español + inglés) solo cuando se elige una foto. Sugiere el nombre (las líneas de letra más grande), muestra los textos detectados como chips y adivina el paso con expresiones regulares (`STEP_HINTS`). Necesita internet la primera vez.
- Recordatorio por hora (solo avisa con la página abierta; para alarmas reales se usa el reloj del celular).
- **Respaldo**: descargar/cargar todo como JSON.
- Modo oscuro automático.

## Cómo funcionan las actualizaciones (estilo OTA)

1. El número de versión vive en **dos lugares** y deben coincidir:
   - `sw.js` → `const VERSION = '1.0.0';`
   - `index.html` → `const APP_VERSION='1.0.0';`
2. Al subir la versión y hacer push, el service worker nuevo se instala en segundo plano y **espera**. La app muestra el aviso "✨ Hay una versión nueva de Ritual"; al tocar **Actualizar** se envía `skipWaiting`, se activa y la página se recarga.
3. La app busca actualizaciones cada vez que vuelve a primer plano, y con el enlace "buscar actualización" al pie.
4. Las actualizaciones no tocan `localStorage`. **Si un cambio altera la forma de los datos, hay que migrar los datos guardados al cargar** (no cambiar la clave sin migrar, o Florencia pierde su rutina e historial).
5. Si se agrega un archivo nuevo que la app necesite sin internet, sumarlo a `SHELL` en `sw.js`.

Esto ya se probó localmente: publicar 1.0.0 → cambiar a 1.0.1 → apareció el aviso → al actualizar quedó en 1.0.1 y se conservaron los pasos marcados.

## Pendiente

Ya hecho: repo `Flowerssblue/skincare_checklist` (antes `ritual`), Pages activado desde `main` / raíz.

4. En el celular: abrir el link en Chrome → menú ⋮ → **Agregar a la pantalla de inicio**.
5. **Pasar los datos**: si ya usó la versión de archivo suelto (`skincare-ritual.html`), allí tocar **Descargar respaldo** y en la versión publicada **Cargar respaldo**. Los datos del navegador están atados a la dirección de la página y no se mueven solos.

## Ideas que se conversaron pero no están hechas

- Tratamiento semanal y tratamiento focalizado (uso ocasional) como secciones aparte de AM/PM; existían en una versión anterior de la app que se perdió.
- Alarmas reales con el celular bloqueado (una página web no puede hacerlo de forma confiable; lo práctico es la alarma del reloj).

## Cómo trabajar con Florencia

- Escribe en español de Chile, explica con claridad y en tono colaborativo.
- Es psicóloga y desarrolladora independiente; conoce git, React, Supabase y Capacitor por su otro proyecto (AniTrack), así que se puede hablar técnico.
- Antes de cambiar cómo se guardan los datos, avisarle y explicar la migración.
- Probar en tamaño celular (390×844) antes de dar algo por terminado.
