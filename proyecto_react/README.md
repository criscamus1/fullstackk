# VEG – Frontend (React) conectado al backend Spring Boot

Tienda de videojuegos. Los datos vienen del backend por API REST (MySQL) y la sesión usa JWT.

## Cómo ejecutarlo (3 pasos)
1. Enciende MySQL y el backend: `mvn spring-boot:run` (queda en `http://localhost:8080`).
2. Haz **doble clic en `index.html`** (también sirve cualquier servidor estático, por ejemplo Live Server).
3. Listo. Entra con `admin@tiendavirtual.cl` / `admin123` (ADMIN) o `juan@example.com` / `1234` (CLIENTE).

Si el backend está en otra dirección, cambia `API_URL` en la primera línea de `js/api.js` y ejecuta `./build.sh`.

## Dónde está cada cosa
| Tema | Archivo |
|---|---|
| fetch, token JWT, renovación (refresh), sesión en localStorage, login/registro/perfil | `js/api.js` |
| Datos traídos de la API + carrito local | `js/db.js` |
| Restaurar sesión al recargar, rutas, guardia por rol (`guardia`), sesión expirada | `js/App.js` |
| Login, registro, "Mis compras", pantalla 403 | `js/components/Cuenta.js` |
| Panel administrador (CRUD vía API) | `js/components/Admin.js`, `AdminSecciones.js` |

## Archivos
- `index.html`: página principal (usa `dist/app.js`, ya compilado).
- `index-dev.html`: igual, pero carga `js/` directo con Babel; sirve para editar y ver cambios al instante (necesita Live Server).
- `build.sh`: después de editar `js/`, regenera `dist/app.js` (necesita esbuild: `npm i -g esbuild`).

## Seguridad
- El token se guarda en `localStorage` (clave `veg_sesion`) para que la sesión sobreviva a recargas. Un ataque XSS podría leerlo; en producción conviene una cookie HttpOnly.
- Ocultar enlaces y bloquear pantallas por rol es solo experiencia de usuario: la seguridad real la aplica el backend (401/403).
