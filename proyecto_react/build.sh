#!/bin/bash
# Genera dist/app.js (copia ya compilada de js/ para abrir index-sin-servidor.html con doble clic).
# Solo hace falta ejecutarlo si cambias algo en js/ y quieres actualizar esa versión.
cd "$(dirname "$0")"
mkdir -p dist && : > dist/app.js
for f in js/datos.js js/api.js js/db.js js/components/{Comunes,Home,Productos,DetalleProducto,Carrito,Blogs,Paginas,Cuenta,Admin,AdminSecciones}.js js/App.js; do
  echo "// ---- $f" >> dist/app.js
  esbuild "$f" --loader:.js=jsx --target=es2018 >> dist/app.js || exit 1
done
