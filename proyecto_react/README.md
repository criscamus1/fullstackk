# Tienda Virtual — versión React (DSY1104, Evaluación Parcial 2)

Tienda + panel de administrador hechos con **React 18 desde CDN** (sin instalar nada, sin npm).
Los datos se guardan en el navegador (localStorage); no hay servidor ni base de datos.

## Cómo abrirla
1. **Más fácil:** doble clic en `index-sin-servidor.html` (usa `dist/app.js`, ya compilado).
2. **Para editar el código:** abre la carpeta en VS Code → clic derecho en `index.html` → *Open with Live Server*.
   (Con doble clic `index.html` no funciona: Babel necesita un servidor para leer los componentes.)
   También se puede subir tal cual a Netlify / GitHub Pages.

## Cuentas de prueba
- Administrador: `admin@tiendavirtual.cl` / `admin123` → entra a `#/admin`
- Cliente: `juan@example.com` / `1234`
- Tarjeta de pago "rechazada" en el checkout → muestra la vista de error de compra.

## Estructura
- `js/datos.js` datos de ejemplo (productos, categorías, usuarios, órdenes, mensajes, regiones/comunas)
- `js/db.js` lectura/escritura en localStorage (`DB.productos()`, `DB.crearOrden()`, ...)
- `js/App.js` rutas con hash (`#/productos/5`) y estado global (usuario, carrito)
- `js/components/` componentes: Comunes, Home, Productos, DetalleProducto, Carrito (checkout + éxito/error), Blogs, Paginas (Ofertas, Nosotros, Contacto), Cuenta (login/registro), Admin + AdminSecciones (Dashboard, Órdenes, Productos, Categorías, Usuarios, Reportes, Perfil)
- `dist/app.js` copia compilada de `js/` (si cambias algo en `js/`, la versión sin servidor no se actualiza)
- `assets/` estilos · `img/`, `steam/`, `nintendo/` imágenes

## Datos guardados (localStorage)
productos, stock, carrito, categorias, usuarios, ordenes, mensajes, sesion.
Botón "Restaurar datos de ejemplo" en el Dashboard los borra.
