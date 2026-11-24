
const DB = {
  cache: { productos: [], categorias: [], ordenes: [], usuarios: [], mensajes: [], misOrdenes: [] },

  // ---------- Carga desde el backend ----------
  async cargarTienda() {
    const [productos, categorias] = await Promise.all([api("GET", "/api/productos", undefined, true), api("GET", "/api/categorias", undefined, true)]);
    DB.cache.productos = productos;
    DB.cache.categorias = categorias;
  },
  async cargarAdmin() {
    const [ordenes, usuarios, mensajes] = await Promise.all([api("GET", "/api/ordenes"), api("GET", "/api/usuarios"), api("GET", "/api/mensajes")]);
    DB.cache.ordenes = ordenes.map(DB.normalizarOrden);
    DB.cache.usuarios = usuarios;
    DB.cache.mensajes = mensajes;
  },
  async cargarMisOrdenes() {
    DB.cache.misOrdenes = (await api("GET", "/api/ordenes/mis")).map(DB.normalizarOrden);
  },
  // El backend manda "PENDIENTE" y productoId; la interfaz usa "Pendiente" e id.
  normalizarOrden(o) {
    return { ...o, estado: o.estado.charAt(0) + o.estado.slice(1).toLowerCase(), items: o.items.map((i) => ({ ...i, id: i.productoId })) };
  },

  // ---------- Lecturas (desde la copia en memoria) ----------
  productos() { return DB.cache.productos; },
  producto(id) { return DB.cache.productos.find((p) => p.id == id); },
  categorias() { return DB.cache.categorias; },
  ordenes() { return DB.cache.ordenes; },
  misOrdenes() { return DB.cache.misOrdenes; },
  usuarios() { return DB.cache.usuarios; },
  mensajes() { return DB.cache.mensajes; },
  usuarioActual() { return Auth.usuario; },

  emailValido(email) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email); },
  precioFinal(p) {   // precio con el descuento de la oferta
    return Math.round((p.precio * (100 - (p.descuento || 0))) / 100);
  },
  totalOrden(o) { return o.items.reduce((s, i) => s + i.precio * i.cantidad, 0); },

  // ---------- Stock ----------
  stockReal(id) { const p = DB.producto(id); return p ? p.stock : 0; },   // el que hay en la base de datos
  stockDe(id) {                                                            // lo que todavía se puede agregar al carrito
    const item = DB.carrito().find((i) => i.id == id);
    return DB.stockReal(id) - (item ? item.cantidad : 0);
  },

  // ---------- Carrito: [{ id, cantidad }] en localStorage ----------
  carrito() {
    try { return JSON.parse(localStorage.getItem("carrito")) || []; } catch (e) { return []; }
  },
  guardarCarrito(lista) { localStorage.setItem("carrito", JSON.stringify(lista)); },
  // delta = +1 agrega, -1 quita. Devuelve false si no queda stock disponible.
  cambiarCarrito(id, delta) {
    id = Number(id);
    if (delta > DB.stockDe(id)) return false;
    const carrito = DB.carrito();
    let item = carrito.find((i) => i.id === id);
    if (!item) { item = { id: id, cantidad: 0 }; carrito.push(item); }
    item.cantidad = Math.max(0, item.cantidad + delta);
    DB.guardarCarrito(carrito.filter((i) => i.cantidad > 0));
    return true;
  },
  vaciarCarrito() { DB.guardarCarrito([]); },
  // Saca del carrito lo que ya no existe o supera el stock real (por si cambió desde la última visita)
  limpiarCarrito() {
    DB.guardarCarrito(DB.carrito().filter((i) => DB.producto(i.id)).map((i) => ({ ...i, cantidad: Math.min(i.cantidad, DB.stockReal(i.id)) })).filter((i) => i.cantidad > 0));
  },
  totalCarrito() { return DB.carrito().reduce((s, i) => s + DB.precioFinal(DB.producto(i.id)) * i.cantidad, 0); },
  cantidadCarrito() { return DB.carrito().reduce((s, i) => s + i.cantidad, 0); },
  // El backend valida el stock, lo descuenta y calcula los precios. Si el pago es "rechazada" responde 402.
  async crearOrden(f) {
    const orden = await api("POST", "/api/ordenes", {
      items: DB.carrito().map((i) => ({ productoId: i.id, cantidad: i.cantidad })),
      nombre: f.nombre.trim(), apellidos: f.apellidos.trim(), correo: f.correo.trim(),
      calle: f.calle.trim(), region: f.region, comuna: f.comuna, metodoPago: f.pago
    });
    DB.vaciarCarrito();
    await DB.cargarTienda();   // el stock cambió
    return DB.normalizarOrden(orden);
  },

  // ---------- Regiones y comunas (datos fijos de datos.js) ----------
  regiones() { return Object.keys(REGIONES); },
  comunas(region) { return REGIONES[region] || []; }
};
