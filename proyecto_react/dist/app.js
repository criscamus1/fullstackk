// ---- js/datos.js
const REGIONES = {
  "Regi\xF3n Metropolitana": ["Santiago", "Maip\xFA", "La Florida", "Puente Alto", "Las Condes"],
  "Valpara\xEDso": ["Valpara\xEDso", "Vi\xF1a del Mar", "Quilpu\xE9"],
  "Biob\xEDo": ["Concepci\xF3n", "Talcahuano", "Los \xC1ngeles"],
  "Araucan\xEDa": ["Temuco", "Villarrica", "Angol"],
  "\xD1uble": ["Chill\xE1n", "San Carlos"],
  "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
  "Los R\xEDos": ["Valdivia", "La Uni\xF3n"],
  "Antofagasta": ["Antofagasta", "Calama"],
  "Arica y Parinacota": ["Arica", "Putre"]
};
const blogsData = [
  {
    id: 1,
    titulo: "GTA 6: todo lo que sabemos sobre su fecha de salida",
    resumen: "Rockstar confirm\xF3 la llegada primero a PS5 y Xbox Series X|S.",
    imagen: "steam/gta6.jpg",
    fecha: "01 de septiembre del 2026",
    parrafos: [
      "Rockstar Games confirm\xF3 que Grand Theft Auto VI llegar\xE1 primero a PlayStation 5 y Xbox Series X|S, con el esperado mundo abierto ambientado en Vice City y alrededores. El juego promete el mapa m\xE1s grande y detallado de la saga hasta la fecha.",
      "A\xFAn no hay confirmaci\xF3n oficial sobre el lanzamiento en PC, aunque se espera que llegue algunos meses despu\xE9s del estreno en consolas, siguiendo la costumbre de Rockstar con entregas anteriores.",
      "Mientras se acerca la fecha, la comunidad sigue analizando cada tr\xE1iler en busca de pistas sobre personajes, misiones y easter eggs escondidos en el mapa."
    ]
  },
  {
    id: 2,
    titulo: "Nintendo Switch: cuidados b\xE1sicos para tu consola",
    resumen: "Consejos pr\xE1cticos para alargar la vida \xFAtil de tu equipo.",
    imagen: "nintendo/nintendo.jpg",
    fecha: "02 de septiembre del 2026",
    parrafos: [
      "La pantalla, los Joy-Con y la bater\xEDa son los puntos m\xE1s sensibles de la consola. Usar una funda protectora y evitar la exposici\xF3n directa al sol ayuda a que dure mucho m\xE1s.",
      "Limpiar los rieles de los Joy-Con peri\xF3dicamente tambi\xE9n evita el famoso 'joy-con drift' que afecta a muchos usuarios.",
      "Por \xFAltimo, evita dejar la consola cargando en exceso una vez que llega al 100%, ya que las bater\xEDas de litio se degradan m\xE1s r\xE1pido con cargas constantes y prolongadas."
    ]
  },
  {
    id: 3,
    titulo: "Juego indie que no te puedes perder este a\xF1o",
    resumen: "Una recomencion de un juego que deberias jugar.",
    imagen: "nintendo/indie.jpg",
    fecha: "03 de septiembre del 2026",
    parrafos: [
      "Este a\xF1o los estudios independientes siguen sorprendiendo con propuestas narrativas y jugables muy originales. Desde aventuras pixel-art hasta experiencias narrativas en primera persona, la escena indie demuestra que no se necesita un gran presupuesto para crear experiencias memorables.",
      "En esta nota se hace la recomendacion del juego indie  MOUSE: P.I. For Hire es ideal para quienes buscan algo distinto a los grandes lanzamientos ."
    ]
  }
];
// ---- js/api.js
const API_URL = "http://localhost:8080";
class ApiError extends Error {
  constructor(estado, mensaje) {
    super(mensaje);
    this.estado = estado;
  }
}
const Sesion = {
  leer() {
    try {
      return JSON.parse(localStorage.getItem("veg_sesion"));
    } catch (e) {
      return null;
    }
  },
  guardar(respuesta) {
    localStorage.setItem("veg_sesion", JSON.stringify({ accessToken: respuesta.accessToken, refreshToken: respuesta.refreshToken }));
  },
  access() {
    const s = Sesion.leer();
    return s ? s.accessToken : null;
  },
  refresh() {
    const s = Sesion.leer();
    return s ? s.refreshToken : null;
  },
  borrar() {
    localStorage.removeItem("veg_sesion");
  }
};
async function pedir(metodo, ruta, cuerpo, token) {
  const cabeceras = { "Content-Type": "application/json" };
  if (token) cabeceras["Authorization"] = "Bearer " + token;
  try {
    return await fetch(API_URL + ruta, { method: metodo, headers: cabeceras, body: cuerpo === void 0 ? void 0 : JSON.stringify(cuerpo) });
  } catch (e) {
    throw new ApiError(0, "No se pudo conectar con el servidor. \xBFEst\xE1 encendido el backend (" + API_URL + ")?");
  }
}
async function procesar(respuesta) {
  if (respuesta.status === 204) return null;
  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new ApiError(respuesta.status, datos && datos.mensaje || "Error " + respuesta.status);
  }
  return datos;
}
async function renovarToken() {
  try {
    const r = await pedir("POST", "/api/auth/refresh", { refreshToken: Sesion.refresh() });
    if (!r.ok) throw new Error("refresh rechazado");
    Sesion.guardar(await r.json());
    return true;
  } catch (e) {
    Sesion.borrar();
    window.dispatchEvent(new Event("veg-sesion-expirada"));
    return false;
  }
}
async function api(metodo, ruta, cuerpo, publico) {
  let respuesta = await pedir(metodo, ruta, cuerpo, publico ? null : Sesion.access());
  if (respuesta.status === 401 && !publico && Sesion.refresh()) {
    if (await renovarToken()) respuesta = await pedir(metodo, ruta, cuerpo, Sesion.access());
  }
  return procesar(respuesta);
}
const Auth = {
  usuario: null,
  // { id, nombre, email, rol: "admin" | "cliente", ... } o null
  // Se llama al abrir la página: si hay tokens guardados, pregunta al backend quién es el usuario.
  async restaurar() {
    if (!Sesion.leer()) return null;
    try {
      Auth.usuario = await api("GET", "/api/auth/me");
    } catch (e) {
      if (e.estado !== 0) Sesion.borrar();
      Auth.usuario = null;
      if (e.estado === 0) throw e;
    }
    return Auth.usuario;
  },
  async login(email, clave) {
    const r = await api("POST", "/api/auth/login", { email: email.trim(), clave }, true);
    Sesion.guardar(r);
    Auth.usuario = r.usuario;
    return r.usuario;
  },
  async registro(datos) {
    const r = await api("POST", "/api/auth/registro", datos, true);
    Sesion.guardar(r);
    Auth.usuario = r.usuario;
    return r.usuario;
  },
  async actualizarPerfil(datos) {
    const r = await api("PUT", "/api/auth/perfil", datos);
    Sesion.guardar(r);
    Auth.usuario = r.usuario;
    return r.usuario;
  },
  salir() {
    Sesion.borrar();
    Auth.usuario = null;
  },
  esAdmin() {
    return Auth.usuario !== null && Auth.usuario.rol === "admin";
  }
};
// ---- js/db.js
const DB = {
  cache: { productos: [], categorias: [], ordenes: [], usuarios: [], mensajes: [], misOrdenes: [] },
  // ---------- Carga desde el backend ----------
  async cargarTienda() {
    const [productos, categorias] = await Promise.all([api("GET", "/api/productos", void 0, true), api("GET", "/api/categorias", void 0, true)]);
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
  productos() {
    return DB.cache.productos;
  },
  producto(id) {
    return DB.cache.productos.find((p) => p.id == id);
  },
  categorias() {
    return DB.cache.categorias;
  },
  ordenes() {
    return DB.cache.ordenes;
  },
  misOrdenes() {
    return DB.cache.misOrdenes;
  },
  usuarios() {
    return DB.cache.usuarios;
  },
  mensajes() {
    return DB.cache.mensajes;
  },
  usuarioActual() {
    return Auth.usuario;
  },
  emailValido(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  },
  precioFinal(p) {
    return Math.round(p.precio * (100 - (p.descuento || 0)) / 100);
  },
  totalOrden(o) {
    return o.items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  },
  // ---------- Stock ----------
  stockReal(id) {
    const p = DB.producto(id);
    return p ? p.stock : 0;
  },
  // el que hay en la base de datos
  stockDe(id) {
    const item = DB.carrito().find((i) => i.id == id);
    return DB.stockReal(id) - (item ? item.cantidad : 0);
  },
  // ---------- Carrito: [{ id, cantidad }] en localStorage ----------
  carrito() {
    try {
      return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (e) {
      return [];
    }
  },
  guardarCarrito(lista) {
    localStorage.setItem("carrito", JSON.stringify(lista));
  },
  // delta = +1 agrega, -1 quita. Devuelve false si no queda stock disponible.
  cambiarCarrito(id, delta) {
    id = Number(id);
    if (delta > DB.stockDe(id)) return false;
    const carrito = DB.carrito();
    let item = carrito.find((i) => i.id === id);
    if (!item) {
      item = { id, cantidad: 0 };
      carrito.push(item);
    }
    item.cantidad = Math.max(0, item.cantidad + delta);
    DB.guardarCarrito(carrito.filter((i) => i.cantidad > 0));
    return true;
  },
  vaciarCarrito() {
    DB.guardarCarrito([]);
  },
  // Saca del carrito lo que ya no existe o supera el stock real (por si cambió desde la última visita)
  limpiarCarrito() {
    DB.guardarCarrito(DB.carrito().filter((i) => DB.producto(i.id)).map((i) => ({ ...i, cantidad: Math.min(i.cantidad, DB.stockReal(i.id)) })).filter((i) => i.cantidad > 0));
  },
  totalCarrito() {
    return DB.carrito().reduce((s, i) => s + DB.precioFinal(DB.producto(i.id)) * i.cantidad, 0);
  },
  cantidadCarrito() {
    return DB.carrito().reduce((s, i) => s + i.cantidad, 0);
  },
  // ---------- Checkout: crea la orden en el backend ----------
  // El backend valida el stock, lo descuenta y calcula los precios. Si el pago es "rechazada" responde 402.
  async crearOrden(f) {
    const orden = await api("POST", "/api/ordenes", {
      items: DB.carrito().map((i) => ({ productoId: i.id, cantidad: i.cantidad })),
      nombre: f.nombre.trim(),
      apellidos: f.apellidos.trim(),
      correo: f.correo.trim(),
      calle: f.calle.trim(),
      region: f.region,
      comuna: f.comuna,
      metodoPago: f.pago
    });
    DB.vaciarCarrito();
    await DB.cargarTienda();
    return DB.normalizarOrden(orden);
  },
  // ---------- Regiones y comunas (datos fijos de datos.js) ----------
  regiones() {
    return Object.keys(REGIONES);
  },
  comunas(region) {
    return REGIONES[region] || [];
  }
};
// ---- js/components/Comunes.js
function pesos(n) {
  return "$" + n.toLocaleString("es-CL");
}
function irA(ruta) {
  window.location.hash = ruta;
}
function EtiquetaStock({ n }) {
  if (n <= 0) return /* @__PURE__ */ React.createElement("span", { className: "stock-agotado" }, "Agotado");
  if (n <= 5) return /* @__PURE__ */ React.createElement("span", { className: "stock-bajo" }, n === 1 ? "\xA1\xDAltima unidad!" : "\xA1Quedan " + n + "!");
  return /* @__PURE__ */ React.createElement("span", { className: "stock-ok" }, "Stock: ", n);
}
function Precio({ p }) {
  if (!(p.descuento > 0)) return /* @__PURE__ */ React.createElement("span", null, pesos(p.precio));
  return /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "precio-antes" }, pesos(p.precio)), pesos(DB.precioFinal(p)));
}
function TarjetaProducto({ p }) {
  return /* @__PURE__ */ React.createElement("a", { href: "#/productos/" + p.id, className: "tarjeta" }, p.descuento > 0 && /* @__PURE__ */ React.createElement("span", { className: "etiqueta-oferta" }, "-", p.descuento, "%"), /* @__PURE__ */ React.createElement("img", { src: p.imagen, alt: p.nombre }), /* @__PURE__ */ React.createElement("span", { className: "etiqueta-plataforma" }, p.plataforma), /* @__PURE__ */ React.createElement("h3", null, p.nombre), /* @__PURE__ */ React.createElement("p", { className: "estrellas" }, p.estrellas), /* @__PURE__ */ React.createElement("p", { className: "precio" }, /* @__PURE__ */ React.createElement(Precio, { p })), /* @__PURE__ */ React.createElement("p", { className: "stock-tag-wrap" }, /* @__PURE__ */ React.createElement(EtiquetaStock, { n: DB.stockDe(p.id) })));
}
function Navbar({ ruta, cantidadCarrito, usuario, onSalir }) {
  const [abierto, setAbierto] = React.useState(false);
  function enlace(href, contenido) {
    const activo = ruta === href || href !== "#/" && ruta.indexOf(href) === 0;
    return /* @__PURE__ */ React.createElement("a", { href, className: activo ? "activo" : "", onClick: () => setAbierto(false) }, contenido);
  }
  return /* @__PURE__ */ React.createElement("header", { className: "barra" }, /* @__PURE__ */ React.createElement("div", { className: "barra-interior" }, /* @__PURE__ */ React.createElement("a", { href: "#/", className: "marca" }, /* @__PURE__ */ React.createElement("img", { src: "img/shoopingcart.jpg", alt: "" }), "Tienda virtual"), /* @__PURE__ */ React.createElement("button", { className: "menu-boton", onClick: () => setAbierto(!abierto), "aria-label": "Men\xFA" }, "\u2630"), /* @__PURE__ */ React.createElement("nav", { className: "menu" + (abierto ? " abierto" : "") }, enlace("#/", "Home"), enlace("#/productos", "Productos"), enlace("#/ofertas", "Ofertas"), enlace("#/blogs", "Blogs"), enlace("#/nosotros", "Nosotros"), enlace("#/contacto", "Contacto"), enlace("#/carrito", /* @__PURE__ */ React.createElement(React.Fragment, null, "\u{1F6D2} Carrito ", /* @__PURE__ */ React.createElement("span", { className: "badge-carrito" }, cantidadCarrito))), /* @__PURE__ */ React.createElement("span", { className: "espacio" }), usuario && usuario.rol === "admin" && enlace("#/admin", "Administrador"), usuario ? /* @__PURE__ */ React.createElement(React.Fragment, null, enlace("#/mis-compras", "Mis compras"), /* @__PURE__ */ React.createElement("span", { className: "saludo" }, "Hola, ", usuario.nombre.split(" ")[0], usuario.rol === "admin" ? " (admin)" : ""), /* @__PURE__ */ React.createElement("button", { className: "salir", onClick: onSalir }, "Cerrar sesi\xF3n")) : /* @__PURE__ */ React.createElement(React.Fragment, null, enlace("#/login", "Iniciar sesi\xF3n"), enlace("#/registro", "Registrarse")))));
}
function Footer() {
  return /* @__PURE__ */ React.createElement("footer", { className: "pie" }, "\xA9 2026 Tienda Virtual \u2014 Consolas, juegos y accesorios para todos los gamers.");
}
// ---- js/components/Home.js
const ACCESOS = [
  { icono: "\u{1F6CD}\uFE0F", titulo: "Tienda", texto: "Cat\xE1logo de juegos Steam y Nintendo con stock en vivo.", href: "#/productos", link: "Ver productos \u2192" },
  { icono: "\u{1F3F7}\uFE0F", titulo: "Ofertas", texto: "Los juegos con descuento, antes de que se agoten.", href: "#/ofertas", link: "Ver ofertas \u2192" },
  { icono: "\u{1F4F0}", titulo: "Blogs", texto: "Noticias, lanzamientos e informaci\xF3n de consolas.", href: "#/blogs", link: "Leer blogs \u2192" },
  { icono: "\u{1F6D2}", titulo: "Mi carrito", texto: "Revisa lo que llevas y finaliza tu compra.", href: "#/carrito", link: "Ir al carrito \u2192" },
  { icono: "\u{1F47E}", titulo: "Nosotros", texto: "Conoce qui\xE9nes somos y qu\xE9 nos apasiona.", href: "#/nosotros", link: "Con\xF3cenos \u2192" },
  { icono: "\u{1F4AC}", titulo: "Contacto", texto: "\xBFDudas o consultas? Escr\xEDbenos.", href: "#/contacto", link: "Contactar \u2192" }
];
function Home() {
  const destacados = DB.productos().filter((p) => DB.stockDe(p.id) > 0).slice(0, 4);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("div", { className: "hero-contenido" }, /* @__PURE__ */ React.createElement("span", { className: "hero-etiqueta" }, "\u{1F3AE} Steam y Nintendo en un solo lugar"), /* @__PURE__ */ React.createElement("h1", null, "Tu tienda de ", /* @__PURE__ */ React.createElement("span", { className: "grad" }, "videojuegos")), /* @__PURE__ */ React.createElement("p", null, "Encuentra el cat\xE1logo de juegos, las noticias y todo en un solo lugar."), /* @__PURE__ */ React.createElement("div", { className: "hero-botones" }, /* @__PURE__ */ React.createElement("a", { href: "#/productos", className: "btn-comprar" }, "Explorar cat\xE1logo"), /* @__PURE__ */ React.createElement("a", { href: "#/blogs", className: "btn-secundario" }, "Ver noticias")))), /* @__PURE__ */ React.createElement("section", { className: "seccion" }, /* @__PURE__ */ React.createElement("h2", { className: "titulo-seccion" }, "\xBFA d\xF3nde quieres ir?"), /* @__PURE__ */ React.createElement("div", { className: "accesos" }, ACCESOS.map((a) => /* @__PURE__ */ React.createElement("a", { key: a.href, href: a.href, className: "acceso" }, /* @__PURE__ */ React.createElement("span", { className: "acceso-icono" }, a.icono), /* @__PURE__ */ React.createElement("h3", null, a.titulo), /* @__PURE__ */ React.createElement("p", null, a.texto), /* @__PURE__ */ React.createElement("span", { className: "acceso-link" }, a.link))))), /* @__PURE__ */ React.createElement("section", { className: "seccion" }, /* @__PURE__ */ React.createElement("h2", { className: "titulo-seccion" }, "Juegos destacados"), /* @__PURE__ */ React.createElement("div", { className: "catalogo" }, destacados.map((p) => /* @__PURE__ */ React.createElement(TarjetaProducto, { key: p.id, p })))), /* @__PURE__ */ React.createElement("section", { className: "beneficios" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u26A1"), /* @__PURE__ */ React.createElement("strong", null, "Stock en vivo"), /* @__PURE__ */ React.createElement("small", null, "Siempre ver\xE1s cu\xE1ntas unidades quedan")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u{1F512}"), /* @__PURE__ */ React.createElement("strong", null, "Compra simple"), /* @__PURE__ */ React.createElement("small", null, "Carrito claro y pago en un paso")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u{1F381}"), /* @__PURE__ */ React.createElement("strong", null, "Gran variedad"), /* @__PURE__ */ React.createElement("small", null, "Para PC y Nintendo, e incluso m\xE1s"))));
}
// ---- js/components/Productos.js
function Productos() {
  const [buscar, setBuscar] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const lista = DB.productos().filter(
    (p) => p.nombre.toLowerCase().includes(buscar.toLowerCase()) && (categoria === "" || p.categoria === categoria)
  );
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", null, "Cat\xE1logo de juegos"), /* @__PURE__ */ React.createElement("div", { className: "filtros" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Buscar un juego\u2026", value: buscar, onChange: (e) => setBuscar(e.target.value) }), /* @__PURE__ */ React.createElement("select", { value: categoria, onChange: (e) => setCategoria(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Todas las categor\xEDas"), DB.categorias().map((c) => /* @__PURE__ */ React.createElement("option", { key: c.id, value: c.nombre }, c.nombre)))), lista.length === 0 ? /* @__PURE__ */ React.createElement("p", null, "No hay juegos que coincidan con tu b\xFAsqueda.") : /* @__PURE__ */ React.createElement("div", { className: "catalogo" }, lista.map((p) => /* @__PURE__ */ React.createElement(TarjetaProducto, { key: p.id, p }))));
}
function Ofertas() {
  const lista = DB.productos().filter((p) => p.descuento > 0);
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", null, "Ofertas"), lista.length === 0 ? /* @__PURE__ */ React.createElement("p", null, "No hay ofertas disponibles por ahora.") : /* @__PURE__ */ React.createElement("div", { className: "catalogo" }, lista.map((p) => /* @__PURE__ */ React.createElement(TarjetaProducto, { key: p.id, p }))));
}
// ---- js/components/DetalleProducto.js
function DetalleProducto({ id, onCambio }) {
  const p = DB.producto(id);
  const [n, setN] = React.useState(0);
  const [reproduciendo, setReproduciendo] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(null);
  if (!p) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("p", null, "No se encontr\xF3 el producto solicitado."), /* @__PURE__ */ React.createElement("a", { href: "#/productos" }, "\u2190 Volver al cat\xE1logo"));
  }
  const conGaleria = p.galeria && p.galeria.length > 0;
  const fotos = (conGaleria ? p.galeria : [p.imagen, p.imagen, p.imagen, p.imagen]).map((src, i) => ({ src, clase: conGaleria ? "real" : "v" + i }));
  const items = p.video ? [{ video: p.video, src: p.imagen, clase: "" }].concat(fotos) : fotos;
  const item = items[n];
  const stock = DB.stockDe(p.id);
  function ver(i) {
    setN((i + items.length) % items.length);
    setReproduciendo(false);
  }
  function agregar() {
    const ok = DB.cambiarCarrito(p.id, 1);
    setMensaje({ texto: ok ? p.nombre + " se agreg\xF3 al carrito." : "No hay stock suficiente.", ok });
    onCambio();
  }
  function comprarAhora() {
    if (DB.cambiarCarrito(p.id, 1)) {
      onCambio();
      irA("#/carrito");
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", null, p.nombre), /* @__PURE__ */ React.createElement("div", { className: "detalle-sub" }, /* @__PURE__ */ React.createElement("span", { className: "etiqueta-plataforma" }, p.plataforma), " ", /* @__PURE__ */ React.createElement("span", { className: "estrellas" }, p.estrellas)), /* @__PURE__ */ React.createElement("div", { className: "detalle-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "galeria-principal" }, /* @__PURE__ */ React.createElement("div", { className: "visor" }, item.video ? reproduciendo ? /* @__PURE__ */ React.createElement("iframe", { src: "https://www.youtube-nocookie.com/embed/" + item.video + "?autoplay=1", title: "Tr\xE1iler de " + p.nombre, allow: "autoplay; fullscreen", allowFullScreen: true }) : /* @__PURE__ */ React.createElement("div", { className: "portada-video" }, /* @__PURE__ */ React.createElement("img", { src: item.src, alt: "" }), /* @__PURE__ */ React.createElement("button", { className: "play-grande", onClick: () => setReproduciendo(true) }, "\u25B6"), /* @__PURE__ */ React.createElement("span", { className: "texto-trailer" }, "Ver tr\xE1iler de ", p.nombre)) : /* @__PURE__ */ React.createElement("img", { src: item.src, className: item.clase, alt: p.nombre })), /* @__PURE__ */ React.createElement("button", { className: "flecha izq", onClick: () => ver(n - 1), "aria-label": "Anterior" }, "\u2039"), /* @__PURE__ */ React.createElement("button", { className: "flecha der", onClick: () => ver(n + 1), "aria-label": "Siguiente" }, "\u203A")), /* @__PURE__ */ React.createElement("div", { className: "miniaturas" }, items.map((f, i) => /* @__PURE__ */ React.createElement("button", { key: i, className: "miniatura" + (i === n ? " activa" : ""), onClick: () => ver(i) }, /* @__PURE__ */ React.createElement("img", { src: f.src, className: f.clase, alt: "" }), f.video && /* @__PURE__ */ React.createElement("span", { className: "play" }, "\u25B6")))), /* @__PURE__ */ React.createElement(
    "a",
    {
      className: "link-trailer",
      target: "_blank",
      rel: "noreferrer",
      href: p.video ? "https://www.youtube.com/watch?v=" + p.video : "https://www.youtube.com/results?search_query=" + encodeURIComponent(p.nombre + " trailer")
    },
    "\u25B6 ",
    p.video ? "Abrir tr\xE1iler en YouTube" : "Buscar tr\xE1iler en YouTube"
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "detalle-descripcion" }, p.descripcion), /* @__PURE__ */ React.createElement("div", { className: "generos" }, (p.generos || []).map((g) => /* @__PURE__ */ React.createElement("span", { key: g, className: "genero" }, g))), /* @__PURE__ */ React.createElement("div", { className: "caja-compra" }, /* @__PURE__ */ React.createElement("p", { className: "precio-detalle" }, /* @__PURE__ */ React.createElement(Precio, { p })), p.descuento > 0 && /* @__PURE__ */ React.createElement("p", { className: "ok" }, "\xA1Oferta! ", p.descuento, "% de descuento"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement(EtiquetaStock, { n: stock })), /* @__PURE__ */ React.createElement("button", { className: "btn-comprar", onClick: agregar, disabled: stock <= 0 }, "A\xF1adir al carrito"), /* @__PURE__ */ React.createElement("button", { className: "btn-secundario", onClick: comprarAhora, disabled: stock <= 0 }, "Comprar ahora"), mensaje && /* @__PURE__ */ React.createElement("p", { className: mensaje.ok ? "ok" : "error" }, mensaje.texto)))), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", { className: "volver", href: "#/productos" }, "\u2190 Volver al cat\xE1logo")));
}
// ---- js/components/Carrito.js
function Carrito({ carrito, onCambio }) {
  if (carrito.length === 0) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", null, "Mi carrito"), /* @__PURE__ */ React.createElement("div", { className: "carrito-vacio" }, /* @__PURE__ */ React.createElement("p", null, "Tu carrito est\xE1 vac\xEDo."), /* @__PURE__ */ React.createElement("a", { href: "#/productos", className: "btn-comprar" }, "Ver productos")));
  }
  function cambiar(id, delta) {
    DB.cambiarCarrito(id, delta);
    onCambio();
  }
  function vaciar() {
    DB.vaciarCarrito();
    onCambio();
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", null, "Mi carrito"), /* @__PURE__ */ React.createElement("div", { className: "carrito-layout" }, /* @__PURE__ */ React.createElement("div", { className: "tabla-carrito" }, /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null), /* @__PURE__ */ React.createElement("th", null, "Producto"), /* @__PURE__ */ React.createElement("th", null, "Precio"), /* @__PURE__ */ React.createElement("th", null, "Cantidad"), /* @__PURE__ */ React.createElement("th", null, "Subtotal"), /* @__PURE__ */ React.createElement("th", null))), /* @__PURE__ */ React.createElement("tbody", null, carrito.map((i) => {
    const p = DB.producto(i.id);
    if (!p) return null;
    return /* @__PURE__ */ React.createElement("tr", { key: i.id }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("img", { src: p.imagen, alt: p.nombre, className: "mini-carrito" })), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("a", { href: "#/productos/" + p.id }, p.nombre)), /* @__PURE__ */ React.createElement("td", null, pesos(DB.precioFinal(p))), /* @__PURE__ */ React.createElement("td", { className: "cantidad" }, /* @__PURE__ */ React.createElement("button", { className: "btn-cant", onClick: () => cambiar(p.id, -1) }, "\u2212"), /* @__PURE__ */ React.createElement("span", null, i.cantidad), /* @__PURE__ */ React.createElement("button", { className: "btn-cant", onClick: () => cambiar(p.id, 1), disabled: DB.stockDe(p.id) <= 0 }, "+")), /* @__PURE__ */ React.createElement("td", null, pesos(DB.precioFinal(p) * i.cantidad)), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", { className: "btn-quitar", onClick: () => cambiar(p.id, -i.cantidad) }, "\u2715")));
  })))), /* @__PURE__ */ React.createElement("aside", { className: "resumen-carrito" }, /* @__PURE__ */ React.createElement("h4", null, "Resumen"), /* @__PURE__ */ React.createElement("p", null, "Productos: ", /* @__PURE__ */ React.createElement("strong", null, DB.cantidadCarrito())), /* @__PURE__ */ React.createElement("p", { className: "total" }, "Total: ", pesos(DB.totalCarrito())), /* @__PURE__ */ React.createElement("a", { href: "#/checkout", className: "btn-comprar" }, "Ir a pagar"), /* @__PURE__ */ React.createElement("button", { className: "btn-secundario", onClick: vaciar }, "Vaciar carrito"))));
}
function Checkout({ carrito, usuario, onResultado }) {
  const [form, setForm] = React.useState({
    nombre: usuario ? usuario.nombre : "",
    apellidos: "",
    correo: usuario ? usuario.email : "",
    calle: "",
    region: usuario && usuario.region ? usuario.region : "",
    comuna: usuario && usuario.comuna ? usuario.comuna : "",
    pago: "aprobada"
  });
  const [error, setError] = React.useState("");
  const [enviando, setEnviando] = React.useState(false);
  function cambiar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }
  function cambiarRegion(region) {
    setForm({ ...form, region, comuna: "" });
  }
  if (carrito.length === 0) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("div", { className: "carrito-vacio" }, /* @__PURE__ */ React.createElement("p", null, "No hay nada que pagar: tu carrito est\xE1 vac\xEDo."), /* @__PURE__ */ React.createElement("a", { href: "#/productos", className: "btn-comprar" }, "Ver productos")));
  }
  async function pagar(e) {
    e.preventDefault();
    if (!form.nombre.trim() || !form.apellidos.trim() || !form.calle.trim() || !form.region || !form.comuna) {
      setError("Completa todos los campos obligatorios (*).");
      return;
    }
    if (!DB.emailValido(form.correo.trim())) {
      setError("El correo no es v\xE1lido.");
      return;
    }
    const direccion = form.calle + ", " + form.comuna + ", " + form.region;
    const total = DB.totalCarrito();
    setError("");
    setEnviando(true);
    try {
      const orden = await DB.crearOrden(form);
      onResultado({ exito: true, orden, total, direccion, correo: form.correo.trim() });
    } catch (err) {
      if (err.estado === 402) {
        onResultado({ exito: false, total, direccion, mensaje: err.message });
      } else {
        setError(err.message);
        await DB.cargarTienda().catch(() => {
        });
        DB.limpiarCarrito();
        setEnviando(false);
      }
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Checkout"), /* @__PURE__ */ React.createElement("p", { className: "centro" }, "Total a pagar: ", /* @__PURE__ */ React.createElement("strong", null, pesos(DB.totalCarrito()))), /* @__PURE__ */ React.createElement("form", { className: "form-caja ancha", onSubmit: pagar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "fila-2" }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Nombre*"), /* @__PURE__ */ React.createElement("input", { value: form.nombre, onChange: (e) => cambiar("nombre", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Apellidos*"), /* @__PURE__ */ React.createElement("input", { value: form.apellidos, onChange: (e) => cambiar("apellidos", e.target.value) }))), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Correo*"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.correo, onChange: (e) => cambiar("correo", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Calle y n\xFAmero*"), /* @__PURE__ */ React.createElement("input", { value: form.calle, onChange: (e) => cambiar("calle", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "fila-2" }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Regi\xF3n*"), /* @__PURE__ */ React.createElement("select", { value: form.region, onChange: (e) => cambiarRegion(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecciona una regi\xF3n"), DB.regiones().map((r) => /* @__PURE__ */ React.createElement("option", { key: r, value: r }, r)))), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Comuna*"), /* @__PURE__ */ React.createElement("select", { value: form.comuna, onChange: (e) => cambiar("comuna", e.target.value), disabled: !form.region }, /* @__PURE__ */ React.createElement("option", { value: "" }, form.region ? "Selecciona una comuna" : "Primero elige una regi\xF3n"), DB.comunas(form.region).map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))))), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "M\xE9todo de pago (simulado)"), /* @__PURE__ */ React.createElement("select", { value: form.pago, onChange: (e) => cambiar("pago", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "aprobada" }, "Tarjeta de prueba \u2014 aprobada"), /* @__PURE__ */ React.createElement("option", { value: "rechazada" }, "Tarjeta de prueba \u2014 rechazada"))), /* @__PURE__ */ React.createElement("p", { className: "error mensaje-form" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-comprar", style: { width: "100%" }, disabled: enviando }, enviando ? "Procesando\u2026" : "Pagar " + pesos(DB.totalCarrito()))));
}
function ResultadoCompra({ resultado, exito }) {
  if (!resultado || resultado.exito !== exito) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("p", null, "No hay ninguna compra para mostrar. ", /* @__PURE__ */ React.createElement("a", { href: "#/productos" }, "Ir a comprar")));
  }
  if (!exito) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("div", { className: "resultado fallo" }, /* @__PURE__ */ React.createElement("h2", null, "\u2717 No se pudo realizar el pago"), /* @__PURE__ */ React.createElement("p", null, resultado.mensaje || "Tu tarjeta fue rechazada.", " No se te cobr\xF3 nada y tu carrito sigue igual."), /* @__PURE__ */ React.createElement("div", { className: "botones" }, /* @__PURE__ */ React.createElement("a", { href: "#/checkout", className: "btn-comprar" }, "Volver a intentar el pago"), /* @__PURE__ */ React.createElement("a", { href: "#/carrito", className: "btn-secundario" }, "Volver al carrito"))));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("div", { className: "resultado exito" }, /* @__PURE__ */ React.createElement("h2", null, "\u2713 Se ha realizado la compra"), /* @__PURE__ */ React.createElement("p", null, "N\xFAmero de orden: ", /* @__PURE__ */ React.createElement("strong", null, resultado.orden.id)), /* @__PURE__ */ React.createElement("ul", null, resultado.orden.items.map((i) => /* @__PURE__ */ React.createElement("li", { key: i.id }, i.nombre, " x", i.cantidad, " \u2014 ", pesos(i.precio * i.cantidad)))), /* @__PURE__ */ React.createElement("p", { className: "total" }, "Total pagado: ", pesos(resultado.total)), /* @__PURE__ */ React.createElement("p", null, "Entrega en: ", resultado.direccion), /* @__PURE__ */ React.createElement("div", { className: "botones" }, /* @__PURE__ */ React.createElement("a", { href: "#/", className: "btn-comprar" }, "Volver al inicio"), /* @__PURE__ */ React.createElement("a", { href: "#/productos", className: "btn-secundario" }, "Seguir comprando"))));
}
// ---- js/components/Blogs.js
function Blogs() {
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", null, "Noticias y novedades"), /* @__PURE__ */ React.createElement("div", { className: "blogs-grid" }, blogsData.map((blog) => /* @__PURE__ */ React.createElement("a", { key: blog.id, href: "#/blogs/" + blog.id, className: "blog-link" }, /* @__PURE__ */ React.createElement("div", { className: "card-blogs" }, /* @__PURE__ */ React.createElement("img", { src: blog.imagen, alt: blog.titulo }), /* @__PURE__ */ React.createElement("div", { className: "contenido-blog" }, /* @__PURE__ */ React.createElement("p", { className: "fecha-blog" }, blog.fecha), /* @__PURE__ */ React.createElement("h3", null, blog.titulo), /* @__PURE__ */ React.createElement("p", null, blog.resumen), /* @__PURE__ */ React.createElement("span", { className: "leer-blog" }, "Leer noticia \u2192")))))));
}
function DetalleBlog({ id }) {
  const blog = blogsData.find((b) => b.id === Number(id));
  if (!blog) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor articulo" }, /* @__PURE__ */ React.createElement("h2", null, "Noticia no encontrada"), /* @__PURE__ */ React.createElement("a", { href: "#/blogs", className: "btn-comprar" }, "\u2190 Volver a las noticias"));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor articulo" }, /* @__PURE__ */ React.createElement("h2", null, blog.titulo), /* @__PURE__ */ React.createElement("p", { className: "fecha-blog" }, blog.fecha), /* @__PURE__ */ React.createElement("img", { src: blog.imagen, alt: blog.titulo, className: "imagen-detalle" }), /* @__PURE__ */ React.createElement("p", { className: "resumen-detalle" }, blog.resumen), blog.parrafos.map((texto, i) => /* @__PURE__ */ React.createElement("p", { key: i }, texto)), /* @__PURE__ */ React.createElement("a", { href: "#/blogs", className: "btn-comprar" }, "\u2190 Volver a las noticias"));
}
// ---- js/components/Paginas.js
function Nosotros() {
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Sobre Nosotros"), /* @__PURE__ */ React.createElement("p", null, "Somos VEG, una tienda en l\xEDnea dedicada 100% al mundo gamer. El prop\xF3sito de la tienda es reunir en un solo lugar los mejores videojuegos y consolas, tanto de plataformas como Steam como de Nintendo, para que cualquier jugador encuentre lo que busca sin recorrer mil sitios distintos."), /* @__PURE__ */ React.createElement("p", null, "Nuestro cat\xE1logo incluye desde los \xFAltimos lanzamientos hasta joyas indie, pasando por consolas y accesorios gamer. Adem\xE1s, en nuestra secci\xF3n de ", /* @__PURE__ */ React.createElement("a", { href: "#/blogs" }, "Blogs"), " compartimos noticias, novedades y consejos sobre el mundo de los videojuegos, para que est\xE9s siempre al d\xEDa."), /* @__PURE__ */ React.createElement("div", { className: "tres-col" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", null, "Nuestra misi\xF3n"), /* @__PURE__ */ React.createElement("p", null, "Acercar el mundo de los videojuegos a todos los jugadores de Chile, con un cat\xE1logo variado, precios claros y accesibles junto a una experiencia de compra simple.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", null, "Nuestra visi\xF3n"), /* @__PURE__ */ React.createElement("p", null, "Ser la tienda online de videojuegos de referencia para la comunidad gamer, reconocida por su variedad de productos y buen servicio.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", null, "Nuestros valores"), /* @__PURE__ */ React.createElement("p", null, "Pasi\xF3n por los videojuegos, cercan\xEDa con nuestros clientes y compromiso con la calidad de cada producto que ofrecemos."))));
}
function Contacto({ usuario }) {
  const [form, setForm] = React.useState({ nombre: usuario ? usuario.nombre : "", correo: usuario ? usuario.email : "", texto: "" });
  const [aviso, setAviso] = React.useState(null);
  async function enviar(e) {
    e.preventDefault();
    let error = "";
    if (form.nombre.trim().length < 3) error = "El nombre debe tener al menos 3 letras.";
    else if (!DB.emailValido(form.correo.trim())) error = "El correo no es v\xE1lido.";
    else if (form.texto.trim().length < 10) error = "El mensaje debe tener al menos 10 caracteres.";
    if (error) {
      setAviso({ texto: error, ok: false });
      return;
    }
    try {
      await api("POST", "/api/mensajes", { nombre: form.nombre.trim(), email: form.correo.trim(), texto: form.texto.trim() }, true);
      setForm({ ...form, texto: "" });
      setAviso({ texto: "\xA1Mensaje enviado! Te responderemos pronto.", ok: true });
    } catch (err) {
      setAviso({ texto: err.message, ok: false });
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Cont\xE1ctanos"), /* @__PURE__ */ React.createElement("form", { className: "form-caja", onSubmit: enviar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Nombre completo"), /* @__PURE__ */ React.createElement("input", { value: form.nombre, onChange: (e) => setForm({ ...form, nombre: e.target.value }), placeholder: "Registra tu nombre completo" })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Correo"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.correo, onChange: (e) => setForm({ ...form, correo: e.target.value }), placeholder: "Registra tu correo" })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Mensaje"), /* @__PURE__ */ React.createElement("textarea", { rows: "4", value: form.texto, onChange: (e) => setForm({ ...form, texto: e.target.value }), placeholder: "Escribe tu mensaje para la tienda" })), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-comprar" }, "Enviar mensaje"), aviso && /* @__PURE__ */ React.createElement("p", { className: "mensaje-form " + (aviso.ok ? "ok" : "error") }, aviso.texto)));
}
// ---- js/components/Cuenta.js
function Login({ onLogin }) {
  const [form, setForm] = React.useState({ correo: "", clave: "" });
  const [error, setError] = React.useState(() => {
    const aviso = sessionStorage.getItem("veg_aviso") || "";
    sessionStorage.removeItem("veg_aviso");
    return aviso;
  });
  const [enviando, setEnviando] = React.useState(false);
  async function entrar(e) {
    e.preventDefault();
    if (!form.correo.trim() || !form.clave) {
      setError("Escribe tu correo y tu contrase\xF1a.");
      return;
    }
    setEnviando(true);
    try {
      onLogin(await Auth.login(form.correo, form.clave));
    } catch (err) {
      setError(err.message);
      setEnviando(false);
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Bienvenido a VEG"), /* @__PURE__ */ React.createElement("form", { className: "form-caja", onSubmit: entrar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Correo electr\xF3nico"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.correo, onChange: (e) => setForm({ ...form, correo: e.target.value }) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Contrase\xF1a"), /* @__PURE__ */ React.createElement("input", { type: "password", value: form.clave, onChange: (e) => setForm({ ...form, clave: e.target.value }) })), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-comprar", disabled: enviando }, enviando ? "Entrando\u2026" : "Iniciar sesi\xF3n"), /* @__PURE__ */ React.createElement("p", { className: "error mensaje-form" }, error), /* @__PURE__ */ React.createElement("p", null, "\xBFNo tienes cuenta? ", /* @__PURE__ */ React.createElement("a", { href: "#/registro" }, "Reg\xEDstrate aqu\xED")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: ".85rem", color: "var(--text-muted)" } }, "Para probar \u2014 cliente: juan@example.com / 1234 \xB7 administrador: admin@tiendavirtual.cl / admin123")));
}
function Registro({ onLogin }) {
  const [form, setForm] = React.useState({ nombre: "", correo: "", confcorreo: "", clave: "", confclave: "", telefono: "", region: "", comuna: "" });
  const [error, setError] = React.useState("");
  function cambiar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }
  const [enviando, setEnviando] = React.useState(false);
  async function registrar(e) {
    e.preventDefault();
    let msg = "";
    if (form.nombre.trim().length < 3) msg = "El nombre debe tener al menos 3 letras.";
    if (!msg && !DB.emailValido(form.correo.trim())) msg = "El correo no es v\xE1lido.";
    if (!msg && form.correo.trim() !== form.confcorreo.trim()) msg = "Los correos no coinciden.";
    if (!msg && form.clave.length < 4) msg = "La contrase\xF1a debe tener al menos 4 caracteres.";
    if (!msg && form.clave !== form.confclave) msg = "Las contrase\xF1as no coinciden.";
    if (!msg && (!form.region || !form.comuna)) msg = "Elige tu regi\xF3n y tu comuna.";
    if (msg) {
      setError(msg);
      return;
    }
    setEnviando(true);
    try {
      onLogin(await Auth.registro({ nombre: form.nombre.trim(), email: form.correo.trim(), clave: form.clave, telefono: form.telefono.trim(), region: form.region, comuna: form.comuna }));
    } catch (err) {
      setError(err.message);
      setEnviando(false);
    }
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Registrar en VEG"), /* @__PURE__ */ React.createElement("form", { className: "form-caja", onSubmit: registrar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Nombre completo"), /* @__PURE__ */ React.createElement("input", { value: form.nombre, onChange: (e) => cambiar("nombre", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Correo electr\xF3nico"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.correo, onChange: (e) => cambiar("correo", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Confirmar correo"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.confcorreo, onChange: (e) => cambiar("confcorreo", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Contrase\xF1a"), /* @__PURE__ */ React.createElement("input", { type: "password", value: form.clave, onChange: (e) => cambiar("clave", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Confirmar contrase\xF1a"), /* @__PURE__ */ React.createElement("input", { type: "password", value: form.confclave, onChange: (e) => cambiar("confclave", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Tel\xE9fono (opcional)"), /* @__PURE__ */ React.createElement("input", { value: form.telefono, onChange: (e) => cambiar("telefono", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "fila-2" }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Regi\xF3n"), /* @__PURE__ */ React.createElement("select", { value: form.region, onChange: (e) => setForm({ ...form, region: e.target.value, comuna: "" }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Regi\xF3n"), DB.regiones().map((r) => /* @__PURE__ */ React.createElement("option", { key: r, value: r }, r)))), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Comuna"), /* @__PURE__ */ React.createElement("select", { value: form.comuna, onChange: (e) => cambiar("comuna", e.target.value), disabled: !form.region }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Comuna"), DB.comunas(form.region).map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))))), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-comprar", disabled: enviando }, enviando ? "Creando cuenta\u2026" : "Registrarme"), /* @__PURE__ */ React.createElement("p", { className: "error mensaje-form" }, error), /* @__PURE__ */ React.createElement("p", null, "\xBFYa tienes un usuario? ", /* @__PURE__ */ React.createElement("a", { href: "#/login" }, "Inicia sesi\xF3n"))));
}
function MisCompras() {
  const [estado, setEstado] = React.useState({ cargando: true, error: "" });
  React.useEffect(() => {
    DB.cargarMisOrdenes().then(() => setEstado({ cargando: false, error: "" })).catch((err) => setEstado({ cargando: false, error: err.message }));
  }, []);
  if (estado.cargando) return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("p", null, "Cargando tus compras\u2026"));
  if (estado.error) return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("p", { className: "error" }, estado.error));
  const lista = DB.misOrdenes();
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", null, "Mis compras"), lista.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "vacio" }, "Todav\xEDa no has comprado nada. ", /* @__PURE__ */ React.createElement("a", { href: "#/productos" }, "Ir al cat\xE1logo")), lista.map((o) => /* @__PURE__ */ React.createElement("div", { key: o.id, className: "caja" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, o.id), " \xB7 ", o.fecha, " \xB7 ", /* @__PURE__ */ React.createElement("span", { className: "chip estado-" + o.estado }, o.estado)), /* @__PURE__ */ React.createElement("ul", null, o.items.map((i) => /* @__PURE__ */ React.createElement("li", { key: i.id }, i.nombre, " x", i.cantidad, " \u2014 ", pesos(i.precio * i.cantidad)))), /* @__PURE__ */ React.createElement("p", { className: "total" }, "Total: ", pesos(DB.totalOrden(o))))));
}
function AccesoRestringido({ usuario }) {
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("div", { className: "resultado fallo" }, /* @__PURE__ */ React.createElement("h2", null, "\u26D4 Acceso restringido (403)"), /* @__PURE__ */ React.createElement("p", null, usuario ? "Tu cuenta (" + usuario.email + ') tiene rol "' + usuario.rol + '" y no tiene permisos para ver esta secci\xF3n.' : "No tienes permisos para ver esta secci\xF3n."), /* @__PURE__ */ React.createElement("div", { className: "botones" }, /* @__PURE__ */ React.createElement("a", { href: "#/", className: "btn-comprar" }, "Volver al inicio"))));
}
// ---- js/components/Admin.js
const SECCIONES_ADMIN = [
  ["dashboard", "\u{1F4CA} Dashboard"],
  ["ordenes", "\u{1F9FE} \xD3rdenes"],
  ["productos", "\u{1F3AE} Productos"],
  ["categorias", "\u{1F3F7}\uFE0F Categor\xEDas"],
  ["usuarios", "\u{1F465} Usuarios"],
  ["reportes", "\u{1F4C8} Reportes"],
  ["perfil", "\u{1F464} Perfil"]
];
function Admin({ seccion, usuario, onSalir, onUsuarioCambio }) {
  const [carga, setCarga] = React.useState({ listo: false, error: "" });
  React.useEffect(() => {
    Promise.all([DB.cargarAdmin(), DB.cargarTienda()]).then(() => setCarga({ listo: true, error: "" })).catch((err) => setCarga({ listo: false, error: err.message }));
  }, []);
  let contenido;
  if (!carga.listo) contenido = carga.error ? /* @__PURE__ */ React.createElement("p", { className: "error-form" }, carga.error) : /* @__PURE__ */ React.createElement("p", { className: "vacio" }, "Cargando datos\u2026");
  else if (seccion === "ordenes") contenido = /* @__PURE__ */ React.createElement(AdminOrdenes, null);
  else if (seccion === "productos") contenido = /* @__PURE__ */ React.createElement(AdminProductos, null);
  else if (seccion === "categorias") contenido = /* @__PURE__ */ React.createElement(AdminCategorias, null);
  else if (seccion === "usuarios") contenido = /* @__PURE__ */ React.createElement(AdminUsuarios, { usuario });
  else if (seccion === "reportes") contenido = /* @__PURE__ */ React.createElement(AdminReportes, null);
  else if (seccion === "perfil") contenido = /* @__PURE__ */ React.createElement(AdminPerfil, { usuario, onUsuarioCambio });
  else contenido = /* @__PURE__ */ React.createElement(AdminDashboard, null);
  const actual = SECCIONES_ADMIN.find((s) => s[0] === seccion) || SECCIONES_ADMIN[0];
  return /* @__PURE__ */ React.createElement("div", { className: "admin-layout" }, /* @__PURE__ */ React.createElement("aside", { className: "lateral" }, /* @__PURE__ */ React.createElement("div", { className: "adm-marca" }, /* @__PURE__ */ React.createElement("img", { src: "img/shoopingcart.jpg", alt: "" }), /* @__PURE__ */ React.createElement("span", null, "Tienda virtual", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("small", null, "Administrador"))), /* @__PURE__ */ React.createElement("nav", null, SECCIONES_ADMIN.map((s) => /* @__PURE__ */ React.createElement("a", { key: s[0], href: "#/admin/" + s[0], className: s[0] === actual[0] ? "activo" : "" }, s[1]))), /* @__PURE__ */ React.createElement("a", { className: "salir", href: "#/" }, "\u2190 Volver a la tienda")), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("div", { className: "barra-arriba" }, "\xA1Hola, ", /* @__PURE__ */ React.createElement("strong", null, usuario.nombre), "! ", /* @__PURE__ */ React.createElement("button", { className: "sec chico", onClick: onSalir }, "Cerrar sesi\xF3n")), /* @__PURE__ */ React.createElement("h1", null, actual[1].slice(3)), contenido));
}
function useRefrescar() {
  const [, setN] = React.useState(0);
  return function() {
    setN((n) => n + 1);
  };
}
function Kpi({ titulo, valor, alerta }) {
  return /* @__PURE__ */ React.createElement("div", { className: "kpi" + (alerta ? " alerta" : "") }, /* @__PURE__ */ React.createElement("span", null, titulo), /* @__PURE__ */ React.createElement("strong", null, valor));
}
function Aviso({ aviso }) {
  if (!aviso) return null;
  return /* @__PURE__ */ React.createElement("p", { className: "aviso " + (aviso.malo ? "mal" : "bien") }, aviso.texto);
}
function Tabla({ cabeceras, children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "tabla" }, /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, cabeceras.map((c, i) => /* @__PURE__ */ React.createElement("th", { key: i }, c)))), /* @__PURE__ */ React.createElement("tbody", null, children)));
}
function Campo({ etiqueta, valor, onCambio, tipo, placeholder }) {
  return /* @__PURE__ */ React.createElement("label", null, etiqueta, /* @__PURE__ */ React.createElement("input", { type: tipo || "text", value: valor === void 0 || valor === null ? "" : valor, placeholder, onChange: (e) => onCambio(e.target.value) }));
}
function ListaCrud({ nombre, cabeceras, lista, fila, vacio, campos, guardar, borrar, alCambiar }) {
  const [form, setForm] = React.useState(null);
  const [error, setError] = React.useState("");
  const [aviso, setAviso] = React.useState(null);
  function abrir(datos) {
    setForm(datos);
    setError("");
    setAviso(null);
  }
  function cambiar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }
  async function enviar(e) {
    e.preventDefault();
    const msg = await guardar(form, !!form._nuevo);
    if (msg) {
      setError(msg);
      return;
    }
    setForm(null);
    setAviso({ texto: "Guardado correctamente." });
    alCambiar();
  }
  async function eliminar(item) {
    if (!window.confirm("\xBFSeguro que quieres eliminarlo?")) return;
    setAviso(await borrar(item));
    alCambiar();
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Aviso, { aviso }), form && /* @__PURE__ */ React.createElement("form", { className: "caja", onSubmit: enviar, noValidate: true }, /* @__PURE__ */ React.createElement("h2", null, form._nuevo ? "Agregar " + nombre : "Editar " + nombre + " #" + form.id), /* @__PURE__ */ React.createElement("div", { className: "campos" }, campos(form, cambiar)), /* @__PURE__ */ React.createElement("p", { className: "error-form" }, error), /* @__PURE__ */ React.createElement("div", { className: "fila-botones" }, /* @__PURE__ */ React.createElement("button", { type: "submit" }, "Guardar"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "sec", onClick: () => setForm(null) }, "Cancelar"))), /* @__PURE__ */ React.createElement("div", { className: "fila-botones" }, /* @__PURE__ */ React.createElement("button", { onClick: () => abrir({ ...vacio, _nuevo: true }) }, "+ Agregar ", nombre)), /* @__PURE__ */ React.createElement(Tabla, { cabeceras: cabeceras.concat("") }, lista.map((item) => /* @__PURE__ */ React.createElement("tr", { key: item.id }, fila(item), /* @__PURE__ */ React.createElement("td", { className: "acciones" }, /* @__PURE__ */ React.createElement("button", { className: "sec chico", onClick: () => abrir({ ...item }) }, "Editar"), " ", /* @__PURE__ */ React.createElement("button", { className: "peligro chico", onClick: () => eliminar(item) }, "Eliminar"))))));
}
// ---- js/components/AdminSecciones.js
const ESTADOS = ["Pendiente", "Enviada", "Entregada", "Cancelada"];
function ventasValidas() {
  return DB.ordenes().filter((o) => o.estado !== "Cancelada");
}
function textoError(err) {
  return err && err.message ? err.message : "Ocurri\xF3 un error.";
}
function cuerpoProducto(p, cambios) {
  return {
    nombre: p.nombre,
    categoria: p.categoria,
    plataforma: p.plataforma,
    precio: p.precio,
    descuento: p.descuento || 0,
    stock: p.stock,
    estrellas: p.estrellas,
    video: p.video,
    imagen: p.imagen,
    galeria: p.galeria || [],
    generos: p.generos || [],
    descripcion: p.descripcion,
    ...cambios
  };
}
function validarUsuario(nombre, email, idActual) {
  if (nombre.trim().length < 3) return "El nombre debe tener al menos 3 letras.";
  if (!DB.emailValido(email.trim())) return "El correo no es v\xE1lido.";
  const repetido = DB.usuarios().some((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.id != idActual);
  return repetido ? "Ese correo ya lo usa otro usuario." : "";
}
function AdminDashboard() {
  const refrescar = useRefrescar();
  const [producto, setProducto] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [aviso, setAviso] = React.useState(null);
  const [resumen, setResumen] = React.useState(null);
  function cargarResumen() {
    api("GET", "/api/reportes/resumen").then(setResumen).catch((err) => setAviso({ texto: textoError(err), malo: true }));
  }
  React.useEffect(cargarResumen, []);
  const productos = DB.productos();
  const elegido = producto || (productos.length ? productos[0].id : "");
  async function guardarStock(e) {
    e.preventDefault();
    const n = Number(stock);
    if (elegido === "" || stock === "" || !Number.isInteger(n) || n < 0) {
      setAviso({ texto: "El stock debe ser un n\xFAmero entero (0 o m\xE1s).", malo: true });
      return;
    }
    try {
      const p = DB.producto(elegido);
      await api("PUT", "/api/productos/" + p.id, cuerpoProducto(p, { stock: n }));
      await DB.cargarTienda();
      setStock("");
      setAviso({ texto: "Stock actualizado." });
      cargarResumen();
      refrescar();
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "kpis" }, /* @__PURE__ */ React.createElement(Kpi, { titulo: "Ventas totales", valor: resumen ? pesos(resumen.ventasTotales) : "\u2026" }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "\xD3rdenes", valor: resumen ? resumen.ordenes : "\u2026" }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "Productos", valor: resumen ? resumen.productos : "\u2026" }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "Usuarios", valor: resumen ? resumen.usuarios : "\u2026" }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "Mensajes nuevos", valor: resumen ? resumen.mensajesNuevos : "\u2026", alerta: resumen && resumen.mensajesNuevos > 0 })), /* @__PURE__ */ React.createElement("h2", null, "Cambiar el stock de un producto"), /* @__PURE__ */ React.createElement(Aviso, { aviso }), /* @__PURE__ */ React.createElement("form", { className: "caja", onSubmit: guardarStock, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "campos" }, /* @__PURE__ */ React.createElement("label", null, "Producto", /* @__PURE__ */ React.createElement("select", { value: elegido, onChange: (e) => setProducto(e.target.value) }, productos.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.nombre, " (stock ", p.stock, ")")))), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nuevo stock", tipo: "number", valor: stock, onCambio: setStock })), /* @__PURE__ */ React.createElement("button", { type: "submit" }, "Guardar stock")));
}
function AdminOrdenes() {
  const refrescar = useRefrescar();
  const [aviso, setAviso] = React.useState(null);
  const lista = DB.ordenes().slice().sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id.localeCompare(a.id));
  async function cambiarEstado(id, estado) {
    try {
      await api("PUT", "/api/ordenes/" + id + "/estado", { estado: estado.toUpperCase() });
      await Promise.all([DB.cargarAdmin(), DB.cargarTienda()]);
      setAviso({ texto: "Estado de la orden actualizado." });
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
    refrescar();
  }
  async function eliminar(id) {
    if (!window.confirm("\xBFSeguro que quieres eliminarlo?")) return;
    try {
      await api("DELETE", "/api/ordenes/" + id);
      await DB.cargarAdmin();
      setAviso({ texto: "Orden eliminada." });
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
    refrescar();
  }
  if (lista.length === 0) return /* @__PURE__ */ React.createElement("p", { className: "vacio" }, "No hay \xF3rdenes.");
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Aviso, { aviso }), /* @__PURE__ */ React.createElement(Tabla, { cabeceras: ["Orden", "Fecha", "Cliente", "Productos", "Total", "Estado", ""] }, lista.map((o) => /* @__PURE__ */ React.createElement("tr", { key: o.id }, /* @__PURE__ */ React.createElement("td", null, o.id), /* @__PURE__ */ React.createElement("td", null, o.fecha), /* @__PURE__ */ React.createElement("td", null, o.cliente), /* @__PURE__ */ React.createElement("td", null, o.items.map((i) => i.nombre + " x" + i.cantidad).join(", ")), /* @__PURE__ */ React.createElement("td", null, pesos(DB.totalOrden(o))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("select", { value: o.estado, onChange: (e) => cambiarEstado(o.id, e.target.value) }, ESTADOS.map((e) => /* @__PURE__ */ React.createElement("option", { key: e }, e)))), /* @__PURE__ */ React.createElement("td", { className: "acciones" }, /* @__PURE__ */ React.createElement("button", { className: "peligro chico", onClick: () => eliminar(o.id) }, "Eliminar"))))));
}
function AdminProductos() {
  const refrescar = useRefrescar();
  const lista = DB.productos().map((p) => ({ ...p }));
  async function guardar(f, esNuevo) {
    const todos = DB.productos();
    const nombre = f.nombre.trim(), precio = Number(f.precio), stock = Number(f.stock), descuento = Number(f.descuento || 0);
    if (nombre.length < 3) return "El nombre debe tener al menos 3 letras.";
    if (todos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id !== f.id)) return "Ya existe un producto con ese nombre.";
    if (!f.categoria) return "Elige una categor\xEDa.";
    if (!Number.isInteger(precio) || precio <= 0) return "El precio debe ser un n\xFAmero entero mayor a 0.";
    if (!Number.isInteger(descuento) || descuento < 0 || descuento > 90) return "El descuento debe ser un n\xFAmero entero entre 0 y 90.";
    if (f.stock === "" || !Number.isInteger(stock) || stock < 0) return "El stock debe ser un n\xFAmero entero (0 o m\xE1s).";
    if (!String(f.imagen || "").trim()) return "Falta la ruta de la imagen (ej: steam/terraria.jpg).";
    const datos = { nombre, categoria: f.categoria, precio, descuento, stock, imagen: f.imagen.trim() };
    try {
      if (esNuevo) {
        await api("POST", "/api/productos", { plataforma: "PC", estrellas: "\u2605\u2605\u2605\u2605\u2606", video: "", generos: [f.categoria], descripcion: "Sin descripci\xF3n.", galeria: [], ...datos });
      } else {
        await api("PUT", "/api/productos/" + f.id, cuerpoProducto(DB.producto(f.id), datos));
      }
      await DB.cargarTienda();
      return "";
    } catch (err) {
      return textoError(err);
    }
  }
  async function borrar(p) {
    try {
      await api("DELETE", "/api/productos/" + p.id);
      DB.guardarCarrito(DB.carrito().filter((i) => i.id !== p.id));
      await DB.cargarTienda();
      return { texto: "Producto eliminado." };
    } catch (err) {
      return { texto: textoError(err), malo: true };
    }
  }
  return /* @__PURE__ */ React.createElement(
    ListaCrud,
    {
      nombre: "producto",
      cabeceras: ["ID", "", "Nombre", "Categor\xEDa", "Precio", "Stock"],
      lista,
      vacio: { nombre: "", categoria: "", precio: "", descuento: 0, stock: "", imagen: "" },
      fila: (p) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", null, p.id), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("img", { src: p.imagen, alt: "" })), /* @__PURE__ */ React.createElement("td", null, p.nombre), /* @__PURE__ */ React.createElement("td", null, p.categoria || "\u2014"), /* @__PURE__ */ React.createElement("td", null, pesos(p.precio), p.descuento > 0 ? " (-" + p.descuento + "%)" : ""), /* @__PURE__ */ React.createElement("td", { className: p.stock <= 5 ? "bajo" : "" }, p.stock)),
      campos: (f, cambiar) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nombre", valor: f.nombre, onCambio: (v) => cambiar("nombre", v) }), /* @__PURE__ */ React.createElement("label", null, "Categor\xEDa", /* @__PURE__ */ React.createElement("select", { value: f.categoria, onChange: (e) => cambiar("categoria", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Elige una\u2026"), DB.categorias().map((c) => /* @__PURE__ */ React.createElement("option", { key: c.id }, c.nombre)))), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Precio (CLP)", tipo: "number", valor: f.precio, onCambio: (v) => cambiar("precio", v) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Descuento (%) \u2014 0 = sin oferta", tipo: "number", valor: f.descuento, onCambio: (v) => cambiar("descuento", v) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Stock", tipo: "number", valor: f.stock, onCambio: (v) => cambiar("stock", v) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Imagen (ruta, ej: steam/terraria.jpg)", valor: f.imagen, onCambio: (v) => cambiar("imagen", v) })),
      guardar,
      borrar,
      alCambiar: refrescar
    }
  );
}
function AdminCategorias() {
  const refrescar = useRefrescar();
  const lista = DB.categorias().map((c) => ({ ...c, usados: DB.productos().filter((p) => p.categoria === c.nombre).length }));
  async function guardar(f, esNuevo) {
    const nombre = f.nombre.trim(), todas = DB.categorias();
    if (nombre.length < 3) return "El nombre debe tener al menos 3 letras.";
    if (todas.some((c) => c.nombre.toLowerCase() === nombre.toLowerCase() && c.id !== f.id)) return "Esa categor\xEDa ya existe.";
    try {
      if (esNuevo) await api("POST", "/api/categorias", { nombre });
      else await api("PUT", "/api/categorias/" + f.id, { nombre });
      await DB.cargarTienda();
      return "";
    } catch (err) {
      return textoError(err);
    }
  }
  async function borrar(c) {
    if (c.usados > 0) return { texto: 'No se puede eliminar "' + c.nombre + '": la usan ' + c.usados + " producto(s).", malo: true };
    try {
      await api("DELETE", "/api/categorias/" + c.id);
      await DB.cargarTienda();
      return { texto: "Categor\xEDa eliminada." };
    } catch (err) {
      return { texto: textoError(err), malo: true };
    }
  }
  return /* @__PURE__ */ React.createElement(
    ListaCrud,
    {
      nombre: "categor\xEDa",
      cabeceras: ["ID", "Nombre", "Productos"],
      lista,
      vacio: { nombre: "" },
      fila: (c) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", null, c.id), /* @__PURE__ */ React.createElement("td", null, c.nombre), /* @__PURE__ */ React.createElement("td", null, c.usados)),
      campos: (f, cambiar) => /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nombre", valor: f.nombre, onCambio: (v) => cambiar("nombre", v) }),
      guardar,
      borrar,
      alCambiar: refrescar
    }
  );
}
function AdminUsuarios({ usuario }) {
  const refrescar = useRefrescar();
  const lista = DB.usuarios().map((u) => ({ ...u, clave: "" }));
  async function guardar(f, esNuevo) {
    const msg = validarUsuario(f.nombre, f.email, esNuevo ? 0 : f.id);
    if (msg) return msg;
    if (esNuevo && f.clave.length < 4) return "La contrase\xF1a debe tener al menos 4 caracteres.";
    if (!esNuevo && f.clave !== "" && f.clave.length < 4) return "La contrase\xF1a debe tener al menos 4 caracteres.";
    const cuerpo = { nombre: f.nombre.trim(), email: f.email.trim(), rol: f.rol, clave: f.clave, telefono: f.telefono || "", region: f.region || "", comuna: f.comuna || "" };
    try {
      if (esNuevo) await api("POST", "/api/usuarios", cuerpo);
      else await api("PUT", "/api/usuarios/" + f.id, cuerpo);
      await DB.cargarAdmin();
      return "";
    } catch (err) {
      return textoError(err);
    }
  }
  async function borrar(u) {
    if (u.id === usuario.id) return { texto: "No puedes eliminar tu propio usuario.", malo: true };
    try {
      await api("DELETE", "/api/usuarios/" + u.id);
      await DB.cargarAdmin();
      return { texto: "Usuario eliminado." };
    } catch (err) {
      return { texto: textoError(err), malo: true };
    }
  }
  return /* @__PURE__ */ React.createElement(
    ListaCrud,
    {
      nombre: "usuario",
      cabeceras: ["ID", "Nombre", "Correo", "Rol"],
      lista,
      vacio: { nombre: "", email: "", rol: "cliente", clave: "" },
      fila: (u) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", null, u.id), /* @__PURE__ */ React.createElement("td", null, u.nombre), /* @__PURE__ */ React.createElement("td", null, u.email), /* @__PURE__ */ React.createElement("td", null, u.rol)),
      campos: (f, cambiar) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nombre", valor: f.nombre, onCambio: (v) => cambiar("nombre", v) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Correo", valor: f.email, onCambio: (v) => cambiar("email", v) }), /* @__PURE__ */ React.createElement("label", null, "Rol", /* @__PURE__ */ React.createElement("select", { value: f.rol, onChange: (e) => cambiar("rol", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "cliente" }, "cliente"), /* @__PURE__ */ React.createElement("option", { value: "admin" }, "admin"))), /* @__PURE__ */ React.createElement(Campo, { etiqueta: f._nuevo ? "Contrase\xF1a" : "Contrase\xF1a (vac\xEDa = no cambiarla)", tipo: "password", valor: f.clave, onCambio: (v) => cambiar("clave", v) })),
      guardar,
      borrar,
      alCambiar: refrescar
    }
  );
}
function AdminReportes() {
  const refrescar = useRefrescar();
  const [aviso, setAviso] = React.useState(null);
  const vendidos = {};
  ventasValidas().forEach((o) => o.items.forEach((i) => {
    vendidos[i.nombre] = (vendidos[i.nombre] || 0) + i.cantidad;
  }));
  const mejor = Object.entries(vendidos).sort((a, b) => b[1] - a[1])[0];
  const bajos = DB.productos().filter((p) => p.stock <= 5);
  const mensajes = DB.mensajes().slice().sort((a, b) => b.id - a.id);
  async function marcarLeido(id) {
    try {
      await api("PUT", "/api/mensajes/" + id + "/leido", { leido: true });
      await DB.cargarAdmin();
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
    refrescar();
  }
  async function eliminar(id) {
    if (!window.confirm("\xBFSeguro que quieres eliminarlo?")) return;
    try {
      await api("DELETE", "/api/mensajes/" + id);
      await DB.cargarAdmin();
      setAviso({ texto: "Mensaje eliminado." });
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
    refrescar();
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "kpis" }, /* @__PURE__ */ React.createElement(Kpi, { titulo: "M\xE1s vendido", valor: mejor ? mejor[0] + " (" + mejor[1] + ")" : "\u2014" }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "Stock bajo", valor: bajos.length ? bajos.map((p) => p.nombre + ": " + p.stock).join(" \xB7 ") : "Todo bien", alerta: bajos.length > 0 })), /* @__PURE__ */ React.createElement("h2", null, "Mensajes de clientes (", mensajes.length, ")"), /* @__PURE__ */ React.createElement(Aviso, { aviso }), mensajes.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "vacio" }, "Nadie ha dejado mensajes todav\xEDa."), mensajes.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.id, className: "caja mensaje" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, m.nombre), " \xB7 ", m.email, " \xB7 ", m.fecha, " ", !m.leido && /* @__PURE__ */ React.createElement("span", { className: "chip estado-Pendiente" }, "Nuevo")), /* @__PURE__ */ React.createElement("p", null, m.texto), /* @__PURE__ */ React.createElement("div", { className: "fila-botones" }, !m.leido && /* @__PURE__ */ React.createElement("button", { className: "sec chico", onClick: () => marcarLeido(m.id) }, "Marcar como le\xEDdo"), /* @__PURE__ */ React.createElement("button", { className: "peligro chico", onClick: () => eliminar(m.id) }, "Eliminar")))));
}
function AdminPerfil({ usuario, onUsuarioCambio }) {
  const [form, setForm] = React.useState({ nombre: usuario.nombre, email: usuario.email, telefono: usuario.telefono || "", clave: "" });
  const [error, setError] = React.useState("");
  const [aviso, setAviso] = React.useState(null);
  async function guardar(e) {
    e.preventDefault();
    let msg = validarUsuario(form.nombre, form.email, usuario.id);
    if (!msg && form.clave !== "" && form.clave.length < 4) msg = "La contrase\xF1a debe tener al menos 4 caracteres.";
    if (msg) {
      setError(msg);
      setAviso(null);
      return;
    }
    try {
      const actualizado = await Auth.actualizarPerfil({ nombre: form.nombre.trim(), email: form.email.trim(), telefono: form.telefono.trim(), clave: form.clave });
      setError("");
      setForm({ ...form, clave: "" });
      setAviso({ texto: "Perfil actualizado." });
      onUsuarioCambio(actualizado);
    } catch (err) {
      setError(textoError(err));
      setAviso(null);
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Aviso, { aviso }), /* @__PURE__ */ React.createElement("form", { className: "caja", onSubmit: guardar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "campos" }, /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nombre", valor: form.nombre, onCambio: (v) => setForm({ ...form, nombre: v }) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Correo", valor: form.email, onCambio: (v) => setForm({ ...form, email: v }) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Tel\xE9fono", valor: form.telefono, onCambio: (v) => setForm({ ...form, telefono: v }) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nueva contrase\xF1a (vac\xEDa = no cambiarla)", tipo: "password", valor: form.clave, onCambio: (v) => setForm({ ...form, clave: v }) })), /* @__PURE__ */ React.createElement("p", { className: "error-form" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit" }, "Guardar cambios")));
}
// ---- js/App.js
function App() {
  const [ruta, setRuta] = React.useState(window.location.hash || "#/");
  const [carrito, setCarrito] = React.useState(() => DB.carrito());
  const [usuario, setUsuario] = React.useState(null);
  const [resultado, setResultado] = React.useState(null);
  const [carga, setCarga] = React.useState({ listo: false, error: "" });
  const [, setVersion] = React.useState(0);
  function iniciar() {
    setCarga({ listo: false, error: "" });
    Auth.restaurar().then((u) => {
      setUsuario(u);
      return DB.cargarTienda();
    }).then(() => {
      DB.limpiarCarrito();
      setCarrito(DB.carrito());
      setCarga({ listo: true, error: "" });
    }).catch((err) => setCarga({ listo: false, error: err.message }));
  }
  React.useEffect(iniciar, []);
  React.useEffect(() => {
    function alCambiarHash() {
      setRuta(window.location.hash || "#/");
      setCarrito(DB.carrito());
      window.scrollTo(0, 0);
      DB.cargarTienda().then(() => setVersion((v) => v + 1)).catch(() => {
      });
    }
    function alExpirar() {
      setUsuario(null);
      sessionStorage.setItem("veg_aviso", "Tu sesi\xF3n expir\xF3. Inicia sesi\xF3n nuevamente.");
      irA("#/login");
    }
    window.addEventListener("hashchange", alCambiarHash);
    window.addEventListener("veg-sesion-expirada", alExpirar);
    return () => {
      window.removeEventListener("hashchange", alCambiarHash);
      window.removeEventListener("veg-sesion-expirada", alExpirar);
    };
  }, []);
  function actualizarCarrito() {
    setCarrito(DB.carrito());
  }
  function entrar(u) {
    setUsuario(u);
    const volver = sessionStorage.getItem("veg_volver");
    sessionStorage.removeItem("veg_volver");
    const valido = volver && !volver.startsWith("#/compra-") && !(volver.startsWith("#/admin") && u.rol !== "admin");
    irA(valido ? volver : u.rol === "admin" ? "#/admin" : "#/");
  }
  function salir() {
    sessionStorage.removeItem("veg_volver");
    Auth.salir();
    setRuta("#/");
    setUsuario(null);
    irA("#/");
  }
  function terminarPago(r) {
    setResultado(r);
    setCarrito(DB.carrito());
    irA(r.exito ? "#/compra-exitosa" : "#/compra-error");
  }
  if (!carga.listo) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor", style: { textAlign: "center", marginTop: "4rem" } }, carga.error ? /* @__PURE__ */ React.createElement("div", { className: "resultado fallo" }, /* @__PURE__ */ React.createElement("h2", null, "No se pudo cargar la tienda"), /* @__PURE__ */ React.createElement("p", null, carga.error), /* @__PURE__ */ React.createElement("button", { className: "btn-comprar", onClick: iniciar }, "Reintentar")) : /* @__PURE__ */ React.createElement("p", null, "Conectando con el servidor\u2026"));
  }
  const partes = ruta.replace("#/", "").split("/").filter(Boolean);
  function guardia(rol, pantalla) {
    if (!usuario) {
      sessionStorage.setItem("veg_volver", ruta);
      sessionStorage.setItem("veg_aviso", "Inicia sesi\xF3n para continuar.");
      window.setTimeout(() => irA("#/login"), 0);
      return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("p", null, "Redirigiendo al inicio de sesi\xF3n\u2026"));
    }
    if (rol && usuario.rol !== rol) return /* @__PURE__ */ React.createElement(AccesoRestringido, { usuario });
    return pantalla;
  }
  if (partes[0] === "admin") {
    return guardia("admin", /* @__PURE__ */ React.createElement(Admin, { seccion: partes[1] || "dashboard", usuario, onSalir: salir, onUsuarioCambio: (u) => setUsuario(u) }));
  }
  function pagina() {
    if (partes.length === 0) return /* @__PURE__ */ React.createElement(Home, null);
    switch (partes[0]) {
      case "productos":
        return partes[1] ? /* @__PURE__ */ React.createElement(DetalleProducto, { key: partes[1], id: partes[1], onCambio: actualizarCarrito }) : /* @__PURE__ */ React.createElement(Productos, null);
      case "ofertas":
        return /* @__PURE__ */ React.createElement(Ofertas, null);
      case "carrito":
        return /* @__PURE__ */ React.createElement(Carrito, { carrito, onCambio: actualizarCarrito });
      case "checkout":
        return guardia(null, /* @__PURE__ */ React.createElement(Checkout, { carrito, usuario, onResultado: terminarPago }));
      case "compra-exitosa":
        return guardia(null, /* @__PURE__ */ React.createElement(ResultadoCompra, { resultado, exito: true }));
      case "compra-error":
        return guardia(null, /* @__PURE__ */ React.createElement(ResultadoCompra, { resultado, exito: false }));
      case "mis-compras":
        return guardia(null, /* @__PURE__ */ React.createElement(MisCompras, null));
      case "blogs":
        return partes[1] ? /* @__PURE__ */ React.createElement(DetalleBlog, { id: partes[1] }) : /* @__PURE__ */ React.createElement(Blogs, null);
      case "nosotros":
        return /* @__PURE__ */ React.createElement(Nosotros, null);
      case "contacto":
        return /* @__PURE__ */ React.createElement(Contacto, { usuario });
      case "login":
        return /* @__PURE__ */ React.createElement(Login, { onLogin: entrar });
      case "registro":
        return /* @__PURE__ */ React.createElement(Registro, { onLogin: entrar });
      default:
        return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("p", null, "P\xE1gina no encontrada. ", /* @__PURE__ */ React.createElement("a", { href: "#/" }, "Volver al inicio")));
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Navbar, { ruta, cantidadCarrito: carrito.reduce((s, i) => s + i.cantidad, 0), usuario, onSalir: salir }), pagina(), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
