// ============================================================
// db.js — todo lo que lee y guarda en localStorage (JavaScript normal, sin JSX).
// No hay servidor: el "backend" es el navegador. Los componentes React llaman a
// estas funciones (DB.algo) y después actualizan su estado para volver a dibujarse.
// ============================================================

const DB = {
  // ---------- Básicas ----------
  leer(clave, porDefecto) {
    try {
      const valor = JSON.parse(localStorage.getItem(clave));
      return valor === null ? porDefecto : valor;
    } catch (e) {
      return porDefecto;
    }
  },
  guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  },
  siguienteId(lista) {
    return Math.max(0, ...lista.map((x) => x.id)) + 1;
  },
  restaurar() {   // vuelve a los datos de ejemplo (borra lo guardado en el navegador)
    ["productos", "stock", "carrito", "categorias", "usuarios", "ordenes", "mensajes", "sesion"].forEach((c) => localStorage.removeItem(c));
  },

  // ---------- Productos y stock ----------
  productos() { return DB.leer("productos", productosData); },
  guardarProductos(lista) { DB.guardar("productos", lista); },
  producto(id) { return DB.productos().find((p) => p.id == id); },
  stockDe(id) {
    const p = DB.producto(id);
    return DB.leer("stock", {})[id] ?? (p ? p.stock : 0);
  },
  guardarStock(id, unidades) {
    const stocks = DB.leer("stock", {});
    stocks[id] = unidades;
    DB.guardar("stock", stocks);
  },
  precioFinal(p) {   // precio con el descuento de la oferta
    return Math.round((p.precio * (100 - (p.descuento || 0))) / 100);
  },

  // ---------- Carrito: [{ id, cantidad }] ----------
  carrito() { return DB.leer("carrito", []); },
  // delta = +1 agrega (descuenta stock), -1 quita (devuelve stock). Devuelve false si no hay stock.
  cambiarCarrito(id, delta) {
    id = Number(id);
    if (delta > DB.stockDe(id)) return false;
    const carrito = DB.carrito();
    let item = carrito.find((i) => i.id === id);
    if (!item) { item = { id: id, cantidad: 0 }; carrito.push(item); }
    delta = Math.max(delta, -item.cantidad);
    item.cantidad += delta;
    DB.guardarStock(id, DB.stockDe(id) - delta);
    DB.guardar("carrito", carrito.filter((i) => i.cantidad > 0));
    return true;
  },
  vaciarCarrito() {
    DB.carrito().forEach((i) => DB.cambiarCarrito(i.id, -i.cantidad));
  },
  totalCarrito() {
    return DB.carrito().reduce((s, i) => s + DB.precioFinal(DB.producto(i.id)) * i.cantidad, 0);
  },
  cantidadCarrito() {
    return DB.carrito().reduce((s, i) => s + i.cantidad, 0);
  },

  // ---------- Órdenes ----------
  ordenes() { return DB.leer("ordenes", ordenesData); },
  guardarOrdenes(lista) { DB.guardar("ordenes", lista); },
  totalOrden(o) { return o.items.reduce((s, i) => s + i.precio * i.cantidad, 0); },
  // Convierte el carrito en una orden y lo vacía (el stock ya estaba descontado)
  crearOrden(cliente) {
    const items = DB.carrito().map((i) => {
      const p = DB.producto(i.id);
      return { id: p.id, nombre: p.nombre, precio: DB.precioFinal(p), cantidad: i.cantidad };
    });
    const orden = {
      id: "TV-" + Math.floor(100000 + Math.random() * 900000),
      fecha: new Date().toISOString().slice(0, 10),
      cliente: cliente,
      estado: "Pendiente",
      items: items
    };
    DB.guardarOrdenes(DB.ordenes().concat(orden));
    DB.guardar("carrito", []);
    return orden;
  },

  // ---------- Categorías, mensajes ----------
  categorias() { return DB.leer("categorias", categoriasData); },
  guardarCategorias(lista) { DB.guardar("categorias", lista); },
  mensajes() { return DB.leer("mensajes", mensajesData); },
  guardarMensajes(lista) { DB.guardar("mensajes", lista); },

  // ---------- Usuarios y sesión ----------
  usuarios() { return DB.leer("usuarios", usuariosData); },
  guardarUsuarios(lista) { DB.guardar("usuarios", lista); },
  emailValido(email) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email); },
  // Devuelve el texto del error, o "" si los datos están bien (idActual = el usuario que se edita, 0 si es nuevo)
  validarUsuario(nombre, email, idActual) {
    if (nombre.trim().length < 3) return "El nombre debe tener al menos 3 letras.";
    if (!DB.emailValido(email.trim())) return "El correo no es válido.";
    const repetido = DB.usuarios().some((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.id != idActual);
    return repetido ? "Ese correo ya lo usa otro usuario." : "";
  },
  usuarioActual() {
    const id = DB.leer("sesion", null);
    return id === null ? null : DB.usuarios().find((u) => u.id === id) || null;
  },
  iniciarSesion(email, clave) {
    const u = DB.usuarios().find((x) => x.email.toLowerCase() === email.trim().toLowerCase() && x.clave === clave);
    if (u) DB.guardar("sesion", u.id);
    return u || null;
  },
  cerrarSesion() { localStorage.removeItem("sesion"); },

  // ---------- Regiones y comunas ----------
  regiones() { return Object.keys(REGIONES); },
  comunas(region) { return REGIONES[region] || []; }
};
