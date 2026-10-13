// ---- js/datos.js
const categoriasData = [
  { id: 1, nombre: "RPG" },
  { id: 2, nombre: "Deportes" },
  { id: 3, nombre: "Survival" },
  { id: 4, nombre: "Aventura" },
  { id: 5, nombre: "Plataformas" },
  { id: 6, nombre: "Simulaci\xF3n" },
  { id: 7, nombre: "Terror" }
];
const productosData = [
  { id: 1, nombre: "Crimson Desert", categoria: "RPG", plataforma: "PC/Consola", precio: 34990, descuento: 0, stock: 12, estrellas: "\u2605\u2605\u2605\u2605\u2BE8", video: "KMVtDrwrdqo", galeria: ["img/crimson/crimson1.jpg", "img/crimson/crimson2.jpg", "img/crimson/crimson3.jpg", "img/crimson/crimson4.jpg"], imagen: "steam/crimson.jpg", generos: ["RPG", "Mundo abierto", "Acci\xF3n"], descripcion: "RPG de mundo abierto ambientado en un continente en guerra." },
  { id: 2, nombre: "EA Sports FC 27", categoria: "Deportes", plataforma: "PC/Consola", precio: 48990, descuento: 0, stock: 20, estrellas: "\u2605\u2605\u2605\u2605\u2606", video: "wRa2sZSpg9w", galeria: ["img/fifa/fifa1.jpg", "img/fifa/fifa2.jpg", "img/fifa/fifa3.jpg", "img/fifa/fifa4.jpg"], imagen: "steam/fifa.jpg", generos: ["Deportes", "F\xFAtbol", "Multijugador"], descripcion: "El simulador de f\xFAtbol m\xE1s popular, con clubes y ligas oficiales." },
  { id: 3, nombre: "Project Zomboid", categoria: "Survival", plataforma: "PC", precio: 9990, descuento: 20, stock: 15, estrellas: "\u2605\u2605\u2605\u2605\u2BE8", video: "eFu2XTpopP8", galeria: ["img/project/project1.jpg", "img/project/project2.jpg", "img/project/project3.jpg", "img/project/project4.jpg"], imagen: "steam/project.jpg", generos: ["Survival", "Zombies", "Cooperativo"], descripcion: "Survival de zombies exigente, ideal para jugar en cooperativo." },
  { id: 4, nombre: "Raft: The Final Chapter", categoria: "Survival", plataforma: "PC/Consola", precio: 12990, descuento: 15, stock: 18, estrellas: "\u2605\u2605\u2605\u2605\u2BE8", video: "f240Gq2zLxU", galeria: ["img/raft/raft1.jpg", "img/raft/raft2.jpg", "img/raft/raft3.jpg", "img/raft/raft4.jpg"], imagen: "steam/raft.jpg", generos: ["Supervivencia", "Construcci\xF3n", "Cooperativo"], descripcion: "Sobrevive a la deriva construyendo tu balsa en altamar." },
  { id: 5, nombre: "Terraria", categoria: "Aventura", plataforma: "PC/Consola", precio: 9990, descuento: 25, stock: 25, estrellas: "\u2605\u2605\u2605\u2605\u2605", video: "_Q6NZSJtq8U", galeria: ["img/terraria/terraria1.jpg", "img/terraria/terraria2.jpg", "img/terraria/terraria3.jpg", "img/terraria/terraria4.jpg"], imagen: "steam/terraria.jpg", generos: ["Aventura", "Sandbox", "2D"], descripcion: "Aventura y construcci\xF3n en un mundo 2D generado aleatoriamente." },
  { id: 6, nombre: "Lies of P: Complete Edition", categoria: "RPG", plataforma: "PC/Consola", precio: 39990, descuento: 0, stock: 10, estrellas: "\u2605\u2605\u2605\u2605\u2BE8", video: "PX0s7HYYFEA", galeria: ["img/lies/lies1.jpg", "img/lies/lies2.jpg", "img/lies/lies3.jpg", "img/lies/lies4.jpg"], imagen: "nintendo/lies.jpg", generos: ["Souls-like", "Acci\xF3n", "Fantas\xEDa oscura"], descripcion: "Souls-like oscuro inspirado en la historia de Pinocho." },
  { id: 7, nombre: "Final Fantasy X | X-2 HD Remaster", categoria: "RPG", plataforma: "Nintendo/Consola", precio: 39990, descuento: 0, stock: 3, estrellas: "\u2605\u2605\u2605\u2605\u2606", video: "GDRH7fdoMAo", galeria: ["img/final/final1.jpg", "img/final/final2.jpg", "img/final/final3.jpg", "img/final/final4.jpg"], imagen: "nintendo/final.jpg", generos: ["JRPG", "Remaster", "Historia"], descripcion: "Dos cl\xE1sicos JRPG remasterizados en alta definici\xF3n." },
  { id: 8, nombre: "Super Mario Bros. Wonder", categoria: "Plataformas", plataforma: "Consola", precio: 54990, descuento: 0, stock: 14, estrellas: "\u2605\u2605\u2605\u2605\u2605", video: "RjYZEE8G114", galeria: ["img/mario/mario1.jpg", "img/mario/mario2.jpg", "img/mario/mario3.jpg", "img/mario/mario4.jpg"], imagen: "nintendo/mario.jpg", generos: ["Plataformas", "Aventura", "Familiar"], descripcion: "Plataformas 2D con las sorprendentes flores maravilla." },
  { id: 9, nombre: "Pok\xE9mon Pokopia", categoria: "Simulaci\xF3n", plataforma: "Nintendo", precio: 49990, descuento: 10, stock: 9, estrellas: "\u2605\u2605\u2605\u2605\u2606", video: "4uBeQbL0VJA", galeria: ["img/pokemon/pokemon1.jpg", "img/pokemon/pokemon2.jpg", "img/pokemon/pokemon3.jpg", "img/pokemon/pokemon4.jpg"], imagen: "nintendo/pokopia.jpg", generos: ["Simulaci\xF3n", "Aventura", "Familiar"], descripcion: "Cultiva y convive con tus Pok\xE9mon en tu propio pueblo." },
  { id: 10, nombre: "Yoshi and the Mysterious Book", categoria: "Plataformas", plataforma: "Nintendo", precio: 54990, descuento: 0, stock: 11, estrellas: "\u2605\u2605\u2605\u2605\u2BE8", video: "3935UAivxGc", galeria: ["img/yoshi/yoshi1.jpg", "img/yoshi/yoshi2.jpg", "img/yoshi/yoshi3.jpg", "img/yoshi/yoshi4.jpg"], imagen: "nintendo/yoshi.jpg", generos: ["Plataformas", "Aventura", "Familiar"], descripcion: "Plataformero tierno con un precioso estilo hecho a mano." },
  { id: 11, nombre: "ELDEN RING Tarnished Edition", categoria: "RPG", plataforma: "PC/Consola", precio: 34990, descuento: 0, stock: 16, estrellas: "\u2605\u2605\u2605\u2605\u2BE8", video: "QgYrhNb6wIw", galeria: ["img/elden/elden1.jpg", "img/elden/elden2.jpg", "img/elden/elden3.jpg", "img/elden/elden4.jpg"], imagen: "nintendo/elden.jpg", generos: ["RPG", "Mundo abierto", "Fantas\xEDa oscura"], descripcion: "Un vasto mundo de fantas\xEDa oscura creado junto a George R. R. Martin." },
  { id: 12, nombre: "Resident Evil Requiem", categoria: "Terror", plataforma: "PC/Consola", precio: 44990, descuento: 0, stock: 7, estrellas: "\u2605\u2605\u2605\u2605\u2BE8", video: "yClDiMKcPl8", galeria: ["img/resident/resident1.jpg", "img/resident/resident2.jpg", "img/resident/resident3.jpg", "img/resident/resident4.jpg"], imagen: "nintendo/re9.jpg", generos: ["Terror", "Survival horror", "Acci\xF3n"], descripcion: "La nueva entrega de terror y survival horror de Capcom." }
];
const usuariosData = [
  { id: 1, nombre: "Juan P\xE9rez", email: "juan@example.com", clave: "1234", rol: "cliente" },
  { id: 2, nombre: "Mar\xEDa L\xF3pez", email: "maria@example.com", clave: "1234", rol: "cliente" },
  { id: 4, nombre: "Carlos D\xEDaz", email: "carlos@example.com", clave: "1234", rol: "cliente" },
  { id: 5, nombre: "Juan G\xF3mez", email: "juan.gomez@example.com", clave: "1234", rol: "cliente" },
  { id: 6, nombre: "Fernanda Sanhueza", email: "fernanda@example.com", clave: "1234", rol: "cliente" },
  { id: 7, nombre: "Administrador", email: "admin@tiendavirtual.cl", clave: "admin123", rol: "admin" }
];
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
const ordenesData = [
  { id: "TV-418230", fecha: "2026-09-28", cliente: "Juan P\xE9rez", estado: "Entregada", items: [
    { id: 5, nombre: "Terraria", precio: 9990, cantidad: 2 },
    { id: 3, nombre: "Project Zomboid", precio: 9990, cantidad: 1 }
  ] },
  { id: "TV-552071", fecha: "2026-10-01", cliente: "Mar\xEDa L\xF3pez", estado: "Entregada", items: [
    { id: 11, nombre: "ELDEN RING Tarnished Edition", precio: 34990, cantidad: 1 },
    { id: 6, nombre: "Lies of P: Complete Edition", precio: 39990, cantidad: 1 }
  ] },
  { id: "TV-637914", fecha: "2026-10-03", cliente: "Carlos D\xEDaz", estado: "Enviada", items: [
    { id: 8, nombre: "Super Mario Bros. Wonder", precio: 54990, cantidad: 1 },
    { id: 10, nombre: "Yoshi and the Mysterious Book", precio: 54990, cantidad: 1 }
  ] },
  { id: "TV-701285", fecha: "2026-10-05", cliente: "Fernanda Sanhueza", estado: "Pendiente", items: [
    { id: 12, nombre: "Resident Evil Requiem", precio: 44990, cantidad: 1 }
  ] },
  { id: "TV-819346", fecha: "2026-10-07", cliente: "Juan G\xF3mez", estado: "Cancelada", items: [
    { id: 2, nombre: "EA Sports FC 27", precio: 48990, cantidad: 1 }
  ] },
  { id: "TV-926450", fecha: "2026-10-09", cliente: "Mar\xEDa L\xF3pez", estado: "Pendiente", items: [
    { id: 9, nombre: "Pok\xE9mon Pokopia", precio: 49990, cantidad: 1 },
    { id: 4, nombre: "Raft: The Final Chapter", precio: 12990, cantidad: 2 },
    { id: 5, nombre: "Terraria", precio: 9990, cantidad: 1 }
  ] },
  { id: "TV-934118", fecha: "2026-10-10", cliente: "Juan P\xE9rez", estado: "Enviada", items: [
    { id: 1, nombre: "Crimson Desert", precio: 34990, cantidad: 1 },
    { id: 3, nombre: "Project Zomboid", precio: 9990, cantidad: 2 }
  ] }
];
const mensajesData = [
  { id: 1, fecha: "2026-10-06", nombre: "Camila Rojas", email: "camila@example.com", texto: "Hola, \xBFcu\xE1ndo vuelve a haber stock de Final Fantasy X?", leido: true },
  { id: 2, fecha: "2026-10-09", nombre: "Pedro Soto", email: "pedro@example.com", texto: "Mi pedido TV-926450 a\xFAn aparece pendiente, \xBFpueden revisarlo?", leido: false },
  { id: 3, fecha: "2026-10-11", nombre: "Valentina Mu\xF1oz", email: "vale@example.com", texto: "Me encanta la tienda. \xBFPiensan agregar m\xE1s juegos de Nintendo?", leido: false }
];
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
// ---- js/db.js
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
  restaurar() {
    ["productos", "stock", "carrito", "categorias", "usuarios", "ordenes", "mensajes", "sesion"].forEach((c) => localStorage.removeItem(c));
  },
  // ---------- Productos y stock ----------
  productos() {
    return DB.leer("productos", productosData);
  },
  guardarProductos(lista) {
    DB.guardar("productos", lista);
  },
  producto(id) {
    return DB.productos().find((p) => p.id == id);
  },
  stockDe(id) {
    var _a;
    const p = DB.producto(id);
    return (_a = DB.leer("stock", {})[id]) != null ? _a : p ? p.stock : 0;
  },
  guardarStock(id, unidades) {
    const stocks = DB.leer("stock", {});
    stocks[id] = unidades;
    DB.guardar("stock", stocks);
  },
  precioFinal(p) {
    return Math.round(p.precio * (100 - (p.descuento || 0)) / 100);
  },
  // ---------- Carrito: [{ id, cantidad }] ----------
  carrito() {
    return DB.leer("carrito", []);
  },
  // delta = +1 agrega (descuenta stock), -1 quita (devuelve stock). Devuelve false si no hay stock.
  cambiarCarrito(id, delta) {
    id = Number(id);
    if (delta > DB.stockDe(id)) return false;
    const carrito = DB.carrito();
    let item = carrito.find((i) => i.id === id);
    if (!item) {
      item = { id, cantidad: 0 };
      carrito.push(item);
    }
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
  ordenes() {
    return DB.leer("ordenes", ordenesData);
  },
  guardarOrdenes(lista) {
    DB.guardar("ordenes", lista);
  },
  totalOrden(o) {
    return o.items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  },
  // Convierte el carrito en una orden y lo vacía (el stock ya estaba descontado)
  crearOrden(cliente) {
    const items = DB.carrito().map((i) => {
      const p = DB.producto(i.id);
      return { id: p.id, nombre: p.nombre, precio: DB.precioFinal(p), cantidad: i.cantidad };
    });
    const orden = {
      id: "TV-" + Math.floor(1e5 + Math.random() * 9e5),
      fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      cliente,
      estado: "Pendiente",
      items
    };
    DB.guardarOrdenes(DB.ordenes().concat(orden));
    DB.guardar("carrito", []);
    return orden;
  },
  // ---------- Categorías, mensajes ----------
  categorias() {
    return DB.leer("categorias", categoriasData);
  },
  guardarCategorias(lista) {
    DB.guardar("categorias", lista);
  },
  mensajes() {
    return DB.leer("mensajes", mensajesData);
  },
  guardarMensajes(lista) {
    DB.guardar("mensajes", lista);
  },
  // ---------- Usuarios y sesión ----------
  usuarios() {
    return DB.leer("usuarios", usuariosData);
  },
  guardarUsuarios(lista) {
    DB.guardar("usuarios", lista);
  },
  emailValido(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  },
  // Devuelve el texto del error, o "" si los datos están bien (idActual = el usuario que se edita, 0 si es nuevo)
  validarUsuario(nombre, email, idActual) {
    if (nombre.trim().length < 3) return "El nombre debe tener al menos 3 letras.";
    if (!DB.emailValido(email.trim())) return "El correo no es v\xE1lido.";
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
  cerrarSesion() {
    localStorage.removeItem("sesion");
  },
  // ---------- Regiones y comunas ----------
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
  return /* @__PURE__ */ React.createElement("header", { className: "barra" }, /* @__PURE__ */ React.createElement("div", { className: "barra-interior" }, /* @__PURE__ */ React.createElement("a", { href: "#/", className: "marca" }, /* @__PURE__ */ React.createElement("img", { src: "img/shoopingcart.jpg", alt: "" }), "Tienda virtual"), /* @__PURE__ */ React.createElement("button", { className: "menu-boton", onClick: () => setAbierto(!abierto), "aria-label": "Men\xFA" }, "\u2630"), /* @__PURE__ */ React.createElement("nav", { className: "menu" + (abierto ? " abierto" : "") }, enlace("#/", "Home"), enlace("#/productos", "Productos"), enlace("#/ofertas", "Ofertas"), enlace("#/blogs", "Blogs"), enlace("#/nosotros", "Nosotros"), enlace("#/contacto", "Contacto"), enlace("#/carrito", /* @__PURE__ */ React.createElement(React.Fragment, null, "\u{1F6D2} Carrito ", /* @__PURE__ */ React.createElement("span", { className: "badge-carrito" }, cantidadCarrito))), /* @__PURE__ */ React.createElement("span", { className: "espacio" }), usuario ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "saludo" }, "Hola, ", usuario.nombre.split(" ")[0]), usuario.rol === "admin" && /* @__PURE__ */ React.createElement("a", { href: "#/admin" }, "Administrador"), /* @__PURE__ */ React.createElement("button", { className: "salir", onClick: onSalir }, "Cerrar sesi\xF3n")) : /* @__PURE__ */ React.createElement(React.Fragment, null, enlace("#/login", "Iniciar sesi\xF3n"), enlace("#/registro", "Registrarse")))));
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
  function cambiar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }
  function cambiarRegion(region) {
    setForm({ ...form, region, comuna: "" });
  }
  if (carrito.length === 0) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("div", { className: "carrito-vacio" }, /* @__PURE__ */ React.createElement("p", null, "No hay nada que pagar: tu carrito est\xE1 vac\xEDo."), /* @__PURE__ */ React.createElement("a", { href: "#/productos", className: "btn-comprar" }, "Ver productos")));
  }
  function pagar(e) {
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
    if (form.pago === "rechazada") {
      onResultado({ exito: false, total, direccion });
      return;
    }
    const orden = DB.crearOrden(form.nombre.trim() + " " + form.apellidos.trim());
    onResultado({ exito: true, orden, total, direccion, correo: form.correo.trim() });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Checkout"), /* @__PURE__ */ React.createElement("p", { className: "centro" }, "Total a pagar: ", /* @__PURE__ */ React.createElement("strong", null, pesos(DB.totalCarrito()))), /* @__PURE__ */ React.createElement("form", { className: "form-caja ancha", onSubmit: pagar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "fila-2" }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Nombre*"), /* @__PURE__ */ React.createElement("input", { value: form.nombre, onChange: (e) => cambiar("nombre", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Apellidos*"), /* @__PURE__ */ React.createElement("input", { value: form.apellidos, onChange: (e) => cambiar("apellidos", e.target.value) }))), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Correo*"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.correo, onChange: (e) => cambiar("correo", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Calle y n\xFAmero*"), /* @__PURE__ */ React.createElement("input", { value: form.calle, onChange: (e) => cambiar("calle", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "fila-2" }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Regi\xF3n*"), /* @__PURE__ */ React.createElement("select", { value: form.region, onChange: (e) => cambiarRegion(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Selecciona una regi\xF3n"), DB.regiones().map((r) => /* @__PURE__ */ React.createElement("option", { key: r, value: r }, r)))), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Comuna*"), /* @__PURE__ */ React.createElement("select", { value: form.comuna, onChange: (e) => cambiar("comuna", e.target.value), disabled: !form.region }, /* @__PURE__ */ React.createElement("option", { value: "" }, form.region ? "Selecciona una comuna" : "Primero elige una regi\xF3n"), DB.comunas(form.region).map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))))), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "M\xE9todo de pago (simulado)"), /* @__PURE__ */ React.createElement("select", { value: form.pago, onChange: (e) => cambiar("pago", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "aprobada" }, "Tarjeta de prueba \u2014 aprobada"), /* @__PURE__ */ React.createElement("option", { value: "rechazada" }, "Tarjeta de prueba \u2014 rechazada"))), /* @__PURE__ */ React.createElement("p", { className: "error mensaje-form" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-comprar", style: { width: "100%" } }, "Pagar ", pesos(DB.totalCarrito()))));
}
function ResultadoCompra({ resultado, exito }) {
  if (!resultado || resultado.exito !== exito) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("p", null, "No hay ninguna compra para mostrar. ", /* @__PURE__ */ React.createElement("a", { href: "#/productos" }, "Ir a comprar")));
  }
  if (!exito) {
    return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("div", { className: "resultado fallo" }, /* @__PURE__ */ React.createElement("h2", null, "\u2717 No se pudo realizar el pago"), /* @__PURE__ */ React.createElement("p", null, "Tu tarjeta fue rechazada. No se te cobr\xF3 nada y tu carrito sigue igual."), /* @__PURE__ */ React.createElement("div", { className: "botones" }, /* @__PURE__ */ React.createElement("a", { href: "#/checkout", className: "btn-comprar" }, "Volver a intentar el pago"), /* @__PURE__ */ React.createElement("a", { href: "#/carrito", className: "btn-secundario" }, "Volver al carrito"))));
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
  function enviar(e) {
    e.preventDefault();
    let error = "";
    if (form.nombre.trim().length < 3) error = "El nombre debe tener al menos 3 letras.";
    else if (!DB.emailValido(form.correo.trim())) error = "El correo no es v\xE1lido.";
    else if (form.texto.trim().length < 10) error = "El mensaje debe tener al menos 10 caracteres.";
    if (error) {
      setAviso({ texto: error, ok: false });
      return;
    }
    const mensajes = DB.mensajes();
    mensajes.push({ id: DB.siguienteId(mensajes), fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), nombre: form.nombre.trim(), email: form.correo.trim(), texto: form.texto.trim(), leido: false });
    DB.guardarMensajes(mensajes);
    setForm({ ...form, texto: "" });
    setAviso({ texto: "\xA1Mensaje enviado! Te responderemos pronto.", ok: true });
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Cont\xE1ctanos"), /* @__PURE__ */ React.createElement("form", { className: "form-caja", onSubmit: enviar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Nombre completo"), /* @__PURE__ */ React.createElement("input", { value: form.nombre, onChange: (e) => setForm({ ...form, nombre: e.target.value }), placeholder: "Registra tu nombre completo" })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Correo"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.correo, onChange: (e) => setForm({ ...form, correo: e.target.value }), placeholder: "Registra tu correo" })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Mensaje"), /* @__PURE__ */ React.createElement("textarea", { rows: "4", value: form.texto, onChange: (e) => setForm({ ...form, texto: e.target.value }), placeholder: "Escribe tu mensaje para la tienda" })), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-comprar" }, "Enviar mensaje"), aviso && /* @__PURE__ */ React.createElement("p", { className: "mensaje-form " + (aviso.ok ? "ok" : "error") }, aviso.texto)));
}
// ---- js/components/Cuenta.js
function Login({ onLogin }) {
  const [form, setForm] = React.useState({ correo: "", clave: "" });
  const [error, setError] = React.useState("");
  function entrar(e) {
    e.preventDefault();
    const usuario = DB.iniciarSesion(form.correo, form.clave);
    if (!usuario) {
      setError("Correo o contrase\xF1a incorrectos.");
      return;
    }
    onLogin(usuario);
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Bienvenido a VEG"), /* @__PURE__ */ React.createElement("form", { className: "form-caja", onSubmit: entrar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Correo electr\xF3nico"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.correo, onChange: (e) => setForm({ ...form, correo: e.target.value }) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Contrase\xF1a"), /* @__PURE__ */ React.createElement("input", { type: "password", value: form.clave, onChange: (e) => setForm({ ...form, clave: e.target.value }) })), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-comprar" }, "Iniciar sesi\xF3n"), /* @__PURE__ */ React.createElement("p", { className: "error mensaje-form" }, error), /* @__PURE__ */ React.createElement("p", null, "\xBFNo tienes cuenta? ", /* @__PURE__ */ React.createElement("a", { href: "#/registro" }, "Reg\xEDstrate aqu\xED")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: ".85rem", color: "var(--text-muted)" } }, "Para probar \u2014 administrador: admin@tiendavirtual.cl / admin123 \xB7 cliente: juan@example.com / 1234")));
}
function Registro({ onLogin }) {
  const [form, setForm] = React.useState({ nombre: "", correo: "", confcorreo: "", clave: "", confclave: "", telefono: "", region: "", comuna: "" });
  const [error, setError] = React.useState("");
  function cambiar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }
  function registrar(e) {
    e.preventDefault();
    let msg = DB.validarUsuario(form.nombre, form.correo, 0);
    if (!msg && form.correo.trim() !== form.confcorreo.trim()) msg = "Los correos no coinciden.";
    if (!msg && form.clave.length < 4) msg = "La contrase\xF1a debe tener al menos 4 caracteres.";
    if (!msg && form.clave !== form.confclave) msg = "Las contrase\xF1as no coinciden.";
    if (!msg && (!form.region || !form.comuna)) msg = "Elige tu regi\xF3n y tu comuna.";
    if (msg) {
      setError(msg);
      return;
    }
    const usuarios = DB.usuarios();
    usuarios.push({ id: DB.siguienteId(usuarios), nombre: form.nombre.trim(), email: form.correo.trim(), clave: form.clave, telefono: form.telefono.trim(), region: form.region, comuna: form.comuna, rol: "cliente" });
    DB.guardarUsuarios(usuarios);
    onLogin(DB.iniciarSesion(form.correo, form.clave));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("h2", { className: "centro" }, "Registrar en VEG"), /* @__PURE__ */ React.createElement("form", { className: "form-caja", onSubmit: registrar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Nombre completo"), /* @__PURE__ */ React.createElement("input", { value: form.nombre, onChange: (e) => cambiar("nombre", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Correo electr\xF3nico"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.correo, onChange: (e) => cambiar("correo", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Confirmar correo"), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.confcorreo, onChange: (e) => cambiar("confcorreo", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Contrase\xF1a"), /* @__PURE__ */ React.createElement("input", { type: "password", value: form.clave, onChange: (e) => cambiar("clave", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Confirmar contrase\xF1a"), /* @__PURE__ */ React.createElement("input", { type: "password", value: form.confclave, onChange: (e) => cambiar("confclave", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Tel\xE9fono (opcional)"), /* @__PURE__ */ React.createElement("input", { value: form.telefono, onChange: (e) => cambiar("telefono", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "fila-2" }, /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Regi\xF3n"), /* @__PURE__ */ React.createElement("select", { value: form.region, onChange: (e) => setForm({ ...form, region: e.target.value, comuna: "" }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Regi\xF3n"), DB.regiones().map((r) => /* @__PURE__ */ React.createElement("option", { key: r, value: r }, r)))), /* @__PURE__ */ React.createElement("div", { className: "grupo" }, /* @__PURE__ */ React.createElement("label", null, "Comuna"), /* @__PURE__ */ React.createElement("select", { value: form.comuna, onChange: (e) => cambiar("comuna", e.target.value), disabled: !form.region }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Comuna"), DB.comunas(form.region).map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))))), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-comprar" }, "Registrarme"), /* @__PURE__ */ React.createElement("p", { className: "error mensaje-form" }, error), /* @__PURE__ */ React.createElement("p", null, "\xBFYa tienes un usuario? ", /* @__PURE__ */ React.createElement("a", { href: "#/login" }, "Inicia sesi\xF3n"))));
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
  let contenido;
  if (seccion === "ordenes") contenido = /* @__PURE__ */ React.createElement(AdminOrdenes, null);
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
  function enviar(e) {
    e.preventDefault();
    const msg = guardar(form, !!form._nuevo);
    if (msg) {
      setError(msg);
      return;
    }
    setForm(null);
    setAviso({ texto: "Guardado correctamente." });
    alCambiar();
  }
  function eliminar(item) {
    if (!window.confirm("\xBFSeguro que quieres eliminarlo?")) return;
    setAviso(borrar(item));
    alCambiar();
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Aviso, { aviso }), form && /* @__PURE__ */ React.createElement("form", { className: "caja", onSubmit: enviar, noValidate: true }, /* @__PURE__ */ React.createElement("h2", null, form._nuevo ? "Agregar " + nombre : "Editar " + nombre + " #" + form.id), /* @__PURE__ */ React.createElement("div", { className: "campos" }, campos(form, cambiar)), /* @__PURE__ */ React.createElement("p", { className: "error-form" }, error), /* @__PURE__ */ React.createElement("div", { className: "fila-botones" }, /* @__PURE__ */ React.createElement("button", { type: "submit" }, "Guardar"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "sec", onClick: () => setForm(null) }, "Cancelar"))), /* @__PURE__ */ React.createElement("div", { className: "fila-botones" }, /* @__PURE__ */ React.createElement("button", { onClick: () => abrir({ ...vacio, _nuevo: true }) }, "+ Agregar ", nombre)), /* @__PURE__ */ React.createElement(Tabla, { cabeceras: cabeceras.concat("") }, lista.map((item) => /* @__PURE__ */ React.createElement("tr", { key: item.id }, fila(item), /* @__PURE__ */ React.createElement("td", { className: "acciones" }, /* @__PURE__ */ React.createElement("button", { className: "sec chico", onClick: () => abrir({ ...item }) }, "Editar"), " ", /* @__PURE__ */ React.createElement("button", { className: "peligro chico", onClick: () => eliminar(item) }, "Eliminar"))))));
}
// ---- js/components/AdminSecciones.js
const ESTADOS = ["Pendiente", "Enviada", "Entregada", "Cancelada"];
function ventasValidas() {
  return DB.ordenes().filter((o) => o.estado !== "Cancelada");
}
function AdminDashboard() {
  const [producto, setProducto] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [aviso, setAviso] = React.useState(null);
  const productos = DB.productos();
  const elegido = producto || (productos.length ? productos[0].id : "");
  const ventas = ventasValidas().reduce((s, o) => s + DB.totalOrden(o), 0);
  const nuevos = DB.mensajes().filter((m) => !m.leido).length;
  function guardarStock(e) {
    e.preventDefault();
    const n = Number(stock);
    if (elegido === "" || stock === "" || !Number.isInteger(n) || n < 0) {
      setAviso({ texto: "El stock debe ser un n\xFAmero entero (0 o m\xE1s).", malo: true });
      return;
    }
    DB.guardarStock(elegido, n);
    setStock("");
    setAviso({ texto: "Stock actualizado." });
  }
  function restaurar() {
    if (!window.confirm("Se borrar\xE1n los cambios guardados en este navegador y volver\xE1n los datos de ejemplo. \xBFContinuar?")) return;
    DB.restaurar();
    window.location.hash = "#/";
    window.location.reload();
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "kpis" }, /* @__PURE__ */ React.createElement(Kpi, { titulo: "Ventas totales", valor: pesos(ventas) }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "\xD3rdenes", valor: DB.ordenes().length }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "Productos", valor: productos.length }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "Usuarios", valor: DB.usuarios().length }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "Mensajes nuevos", valor: nuevos, alerta: nuevos > 0 })), /* @__PURE__ */ React.createElement("h2", null, "Cambiar el stock de un producto"), /* @__PURE__ */ React.createElement(Aviso, { aviso }), /* @__PURE__ */ React.createElement("form", { className: "caja", onSubmit: guardarStock, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "campos" }, /* @__PURE__ */ React.createElement("label", null, "Producto", /* @__PURE__ */ React.createElement("select", { value: elegido, onChange: (e) => setProducto(e.target.value) }, productos.map((p) => /* @__PURE__ */ React.createElement("option", { key: p.id, value: p.id }, p.nombre, " (stock ", DB.stockDe(p.id), ")")))), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nuevo stock", tipo: "number", valor: stock, onCambio: setStock })), /* @__PURE__ */ React.createElement("button", { type: "submit" }, "Guardar stock")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("button", { className: "peligro chico", onClick: restaurar }, "Restaurar datos de ejemplo")));
}
function AdminOrdenes() {
  const refrescar = useRefrescar();
  const [aviso, setAviso] = React.useState(null);
  const lista = DB.ordenes().slice().sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id.localeCompare(a.id));
  function cambiarEstado(id, estado) {
    DB.guardarOrdenes(DB.ordenes().map((o) => o.id === id ? { ...o, estado } : o));
    setAviso({ texto: "Estado de la orden actualizado." });
    refrescar();
  }
  function eliminar(id) {
    if (!window.confirm("\xBFSeguro que quieres eliminarlo?")) return;
    DB.guardarOrdenes(DB.ordenes().filter((o) => o.id !== id));
    setAviso({ texto: "Orden eliminada." });
    refrescar();
  }
  if (lista.length === 0) return /* @__PURE__ */ React.createElement("p", { className: "vacio" }, "No hay \xF3rdenes.");
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Aviso, { aviso }), /* @__PURE__ */ React.createElement(Tabla, { cabeceras: ["Orden", "Fecha", "Cliente", "Productos", "Total", "Estado", ""] }, lista.map((o) => /* @__PURE__ */ React.createElement("tr", { key: o.id }, /* @__PURE__ */ React.createElement("td", null, o.id), /* @__PURE__ */ React.createElement("td", null, o.fecha), /* @__PURE__ */ React.createElement("td", null, o.cliente), /* @__PURE__ */ React.createElement("td", null, o.items.map((i) => i.nombre + " x" + i.cantidad).join(", ")), /* @__PURE__ */ React.createElement("td", null, pesos(DB.totalOrden(o))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("select", { value: o.estado, onChange: (e) => cambiarEstado(o.id, e.target.value) }, ESTADOS.map((e) => /* @__PURE__ */ React.createElement("option", { key: e }, e)))), /* @__PURE__ */ React.createElement("td", { className: "acciones" }, /* @__PURE__ */ React.createElement("button", { className: "peligro chico", onClick: () => eliminar(o.id) }, "Eliminar"))))));
}
function AdminProductos() {
  const refrescar = useRefrescar();
  const lista = DB.productos().map((p) => ({ ...p, stock: DB.stockDe(p.id) }));
  function guardar(f, esNuevo) {
    const todos = DB.productos().map((p) => ({ ...p }));
    const nombre = f.nombre.trim(), precio = Number(f.precio), stock = Number(f.stock), descuento = Number(f.descuento || 0);
    if (nombre.length < 3) return "El nombre debe tener al menos 3 letras.";
    if (todos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id !== f.id)) return "Ya existe un producto con ese nombre.";
    if (!f.categoria) return "Elige una categor\xEDa.";
    if (!Number.isInteger(precio) || precio <= 0) return "El precio debe ser un n\xFAmero entero mayor a 0.";
    if (!Number.isInteger(descuento) || descuento < 0 || descuento > 90) return "El descuento debe ser un n\xFAmero entero entre 0 y 90.";
    if (f.stock === "" || !Number.isInteger(stock) || stock < 0) return "El stock debe ser un n\xFAmero entero (0 o m\xE1s).";
    if (!String(f.imagen || "").trim()) return "Falta la ruta de la imagen (ej: steam/terraria.jpg).";
    const datos = { nombre, categoria: f.categoria, precio, descuento, stock, imagen: f.imagen.trim() };
    let id = f.id;
    if (esNuevo) {
      id = DB.siguienteId(todos);
      todos.push({ id, plataforma: "PC", estrellas: "\u2605\u2605\u2605\u2605\u2606", video: "", generos: [f.categoria], descripcion: "Sin descripci\xF3n.", ...datos });
    } else {
      const i = todos.findIndex((p) => p.id === id);
      todos[i] = { ...todos[i], ...datos };
    }
    DB.guardarProductos(todos);
    DB.guardarStock(id, stock);
    return "";
  }
  function borrar(p) {
    DB.guardarProductos(DB.productos().filter((x) => x.id !== p.id));
    DB.guardar("carrito", DB.carrito().filter((i) => i.id !== p.id));
    return { texto: "Producto eliminado." };
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
  function guardar(f, esNuevo) {
    const nombre = f.nombre.trim(), todas = DB.categorias();
    if (nombre.length < 3) return "El nombre debe tener al menos 3 letras.";
    if (todas.some((c) => c.nombre.toLowerCase() === nombre.toLowerCase() && c.id !== f.id)) return "Esa categor\xEDa ya existe.";
    if (esNuevo) {
      DB.guardarCategorias(todas.concat({ id: DB.siguienteId(todas), nombre }));
    } else {
      const vieja = todas.find((c) => c.id === f.id).nombre;
      DB.guardarProductos(DB.productos().map((p) => p.categoria === vieja ? { ...p, categoria: nombre } : p));
      DB.guardarCategorias(todas.map((c) => c.id === f.id ? { ...c, nombre } : c));
    }
    return "";
  }
  function borrar(c) {
    if (c.usados > 0) return { texto: 'No se puede eliminar "' + c.nombre + '": la usan ' + c.usados + " producto(s).", malo: true };
    DB.guardarCategorias(DB.categorias().filter((x) => x.id !== c.id));
    return { texto: "Categor\xEDa eliminada." };
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
  function guardar(f, esNuevo) {
    const msg = DB.validarUsuario(f.nombre, f.email, esNuevo ? 0 : f.id);
    if (msg) return msg;
    if (esNuevo && f.clave.length < 4) return "La contrase\xF1a debe tener al menos 4 caracteres.";
    if (!esNuevo && f.clave !== "" && f.clave.length < 4) return "La contrase\xF1a debe tener al menos 4 caracteres.";
    const todos = DB.usuarios();
    if (esNuevo) {
      todos.push({ id: DB.siguienteId(todos), nombre: f.nombre.trim(), email: f.email.trim(), clave: f.clave, telefono: "", rol: f.rol });
      DB.guardarUsuarios(todos);
    } else {
      DB.guardarUsuarios(todos.map((u) => u.id === f.id ? { ...u, nombre: f.nombre.trim(), email: f.email.trim(), rol: f.rol, clave: f.clave === "" ? u.clave : f.clave } : u));
    }
    return "";
  }
  function borrar(u) {
    if (u.id === usuario.id) return { texto: "No puedes eliminar tu propio usuario.", malo: true };
    DB.guardarUsuarios(DB.usuarios().filter((x) => x.id !== u.id));
    return { texto: "Usuario eliminado." };
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
  const bajos = DB.productos().filter((p) => DB.stockDe(p.id) <= 5);
  const mensajes = DB.mensajes().slice().sort((a, b) => b.id - a.id);
  function marcarLeido(id) {
    DB.guardarMensajes(DB.mensajes().map((m) => m.id === id ? { ...m, leido: true } : m));
    refrescar();
  }
  function eliminar(id) {
    if (!window.confirm("\xBFSeguro que quieres eliminarlo?")) return;
    DB.guardarMensajes(DB.mensajes().filter((m) => m.id !== id));
    setAviso({ texto: "Mensaje eliminado." });
    refrescar();
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "kpis" }, /* @__PURE__ */ React.createElement(Kpi, { titulo: "M\xE1s vendido", valor: mejor ? mejor[0] + " (" + mejor[1] + ")" : "\u2014" }), /* @__PURE__ */ React.createElement(Kpi, { titulo: "Stock bajo", valor: bajos.length ? bajos.map((p) => p.nombre + ": " + DB.stockDe(p.id)).join(" \xB7 ") : "Todo bien", alerta: bajos.length > 0 })), /* @__PURE__ */ React.createElement("h2", null, "Mensajes de clientes (", mensajes.length, ")"), /* @__PURE__ */ React.createElement(Aviso, { aviso }), mensajes.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "vacio" }, "Nadie ha dejado mensajes todav\xEDa."), mensajes.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.id, className: "caja mensaje" }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, m.nombre), " \xB7 ", m.email, " \xB7 ", m.fecha, " ", !m.leido && /* @__PURE__ */ React.createElement("span", { className: "chip estado-Pendiente" }, "Nuevo")), /* @__PURE__ */ React.createElement("p", null, m.texto), /* @__PURE__ */ React.createElement("div", { className: "fila-botones" }, !m.leido && /* @__PURE__ */ React.createElement("button", { className: "sec chico", onClick: () => marcarLeido(m.id) }, "Marcar como le\xEDdo"), /* @__PURE__ */ React.createElement("button", { className: "peligro chico", onClick: () => eliminar(m.id) }, "Eliminar")))));
}
function AdminPerfil({ usuario, onUsuarioCambio }) {
  const [form, setForm] = React.useState({ nombre: usuario.nombre, email: usuario.email, telefono: usuario.telefono || "", clave: "" });
  const [error, setError] = React.useState("");
  const [aviso, setAviso] = React.useState(null);
  function guardar(e) {
    e.preventDefault();
    let msg = DB.validarUsuario(form.nombre, form.email, usuario.id);
    if (!msg && form.clave !== "" && form.clave.length < 4) msg = "La contrase\xF1a debe tener al menos 4 caracteres.";
    if (msg) {
      setError(msg);
      setAviso(null);
      return;
    }
    DB.guardarUsuarios(DB.usuarios().map((u) => u.id === usuario.id ? { ...u, nombre: form.nombre.trim(), email: form.email.trim(), telefono: form.telefono.trim(), clave: form.clave === "" ? u.clave : form.clave } : u));
    setError("");
    setAviso({ texto: "Perfil actualizado." });
    onUsuarioCambio();
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Aviso, { aviso }), /* @__PURE__ */ React.createElement("form", { className: "caja", onSubmit: guardar, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "campos" }, /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nombre", valor: form.nombre, onCambio: (v) => setForm({ ...form, nombre: v }) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Correo", valor: form.email, onCambio: (v) => setForm({ ...form, email: v }) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Tel\xE9fono", valor: form.telefono, onCambio: (v) => setForm({ ...form, telefono: v }) }), /* @__PURE__ */ React.createElement(Campo, { etiqueta: "Nueva contrase\xF1a (vac\xEDa = no cambiarla)", tipo: "password", valor: form.clave, onCambio: (v) => setForm({ ...form, clave: v }) })), /* @__PURE__ */ React.createElement("p", { className: "error-form" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit" }, "Guardar cambios")));
}
// ---- js/App.js
function AccesoDenegado() {
  return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("div", { className: "resultado fallo" }, /* @__PURE__ */ React.createElement("h2", null, "Zona solo para administradores"), /* @__PURE__ */ React.createElement("p", null, "Inicia sesi\xF3n con una cuenta de administrador para entrar al panel."), /* @__PURE__ */ React.createElement("a", { href: "#/login", className: "btn-comprar" }, "Iniciar sesi\xF3n")));
}
function App() {
  const [ruta, setRuta] = React.useState(window.location.hash || "#/");
  const [carrito, setCarrito] = React.useState(() => DB.carrito());
  const [usuario, setUsuario] = React.useState(() => DB.usuarioActual());
  const [resultado, setResultado] = React.useState(null);
  React.useEffect(() => {
    function alCambiarHash() {
      setRuta(window.location.hash || "#/");
      setCarrito(DB.carrito());
      setUsuario(DB.usuarioActual());
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", alCambiarHash);
    return () => window.removeEventListener("hashchange", alCambiarHash);
  }, []);
  function actualizarCarrito() {
    setCarrito(DB.carrito());
  }
  function entrar(u) {
    setUsuario(u);
    irA(u.rol === "admin" ? "#/admin" : "#/");
  }
  function salir() {
    DB.cerrarSesion();
    setUsuario(null);
    irA("#/");
  }
  function terminarPago(r) {
    setResultado(r);
    setCarrito(DB.carrito());
    irA(r.exito ? "#/compra-exitosa" : "#/compra-error");
  }
  const partes = ruta.replace("#/", "").split("/").filter(Boolean);
  const esAdmin = usuario !== null && usuario.rol === "admin";
  if (partes[0] === "admin" && esAdmin) {
    return /* @__PURE__ */ React.createElement(Admin, { seccion: partes[1] || "dashboard", usuario, onSalir: salir, onUsuarioCambio: () => setUsuario(DB.usuarioActual()) });
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
        return /* @__PURE__ */ React.createElement(Checkout, { carrito, usuario, onResultado: terminarPago });
      case "compra-exitosa":
        return /* @__PURE__ */ React.createElement(ResultadoCompra, { resultado, exito: true });
      case "compra-error":
        return /* @__PURE__ */ React.createElement(ResultadoCompra, { resultado, exito: false });
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
      case "admin":
        return /* @__PURE__ */ React.createElement(AccesoDenegado, null);
      default:
        return /* @__PURE__ */ React.createElement("div", { className: "contenedor" }, /* @__PURE__ */ React.createElement("p", null, "P\xE1gina no encontrada. ", /* @__PURE__ */ React.createElement("a", { href: "#/" }, "Volver al inicio")));
    }
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Navbar, { ruta, cantidadCarrito: carrito.reduce((s, i) => s + i.cantidad, 0), usuario, onSalir: salir }), pagina(), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
