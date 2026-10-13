// ============================================================
// datos.js — los datos de ejemplo de la tienda (JavaScript normal, sin JSX).
// db.js los copia a localStorage la primera vez y desde ahí se pueden modificar
// desde el panel de administrador.
// ============================================================

// ---------- Categorías ----------
const categoriasData = [
  { id: 1, nombre: "RPG" }, { id: 2, nombre: "Deportes" }, { id: 3, nombre: "Survival" }, { id: 4, nombre: "Aventura" },
  { id: 5, nombre: "Plataformas" }, { id: 6, nombre: "Simulación" }, { id: 7, nombre: "Terror" }
];

// ---------- Productos ----------
// descuento: porcentaje de oferta (0 = sin oferta). galeria: 4 fotos; video: ID del tráiler en YouTube.
const productosData = [
  { id: 1, nombre: "Crimson Desert", categoria: "RPG", plataforma: "PC/Consola", precio: 34990, descuento: 0, stock: 12, estrellas: "★★★★⯨", video: "KMVtDrwrdqo", galeria: ["img/crimson/crimson1.jpg","img/crimson/crimson2.jpg","img/crimson/crimson3.jpg","img/crimson/crimson4.jpg"], imagen: "steam/crimson.jpg", generos: ["RPG","Mundo abierto","Acción"], descripcion: "RPG de mundo abierto ambientado en un continente en guerra." },
  { id: 2, nombre: "EA Sports FC 27", categoria: "Deportes", plataforma: "PC/Consola", precio: 48990, descuento: 0, stock: 20, estrellas: "★★★★☆", video: "wRa2sZSpg9w", galeria: ["img/fifa/fifa1.jpg","img/fifa/fifa2.jpg","img/fifa/fifa3.jpg","img/fifa/fifa4.jpg"], imagen: "steam/fifa.jpg", generos: ["Deportes","Fútbol","Multijugador"], descripcion: "El simulador de fútbol más popular, con clubes y ligas oficiales." },
  { id: 3, nombre: "Project Zomboid", categoria: "Survival", plataforma: "PC", precio: 9990, descuento: 20, stock: 15, estrellas: "★★★★⯨", video: "eFu2XTpopP8", galeria: ["img/project/project1.jpg","img/project/project2.jpg","img/project/project3.jpg","img/project/project4.jpg"], imagen: "steam/project.jpg", generos: ["Survival","Zombies","Cooperativo"], descripcion: "Survival de zombies exigente, ideal para jugar en cooperativo." },
  { id: 4, nombre: "Raft: The Final Chapter", categoria: "Survival", plataforma: "PC/Consola", precio: 12990, descuento: 15, stock: 18, estrellas: "★★★★⯨", video: "f240Gq2zLxU", galeria: ["img/raft/raft1.jpg","img/raft/raft2.jpg","img/raft/raft3.jpg","img/raft/raft4.jpg"], imagen: "steam/raft.jpg", generos: ["Supervivencia","Construcción","Cooperativo"], descripcion: "Sobrevive a la deriva construyendo tu balsa en altamar." },
  { id: 5, nombre: "Terraria", categoria: "Aventura", plataforma: "PC/Consola", precio: 9990, descuento: 25, stock: 25, estrellas: "★★★★★", video: "_Q6NZSJtq8U", galeria: ["img/terraria/terraria1.jpg","img/terraria/terraria2.jpg","img/terraria/terraria3.jpg","img/terraria/terraria4.jpg"], imagen: "steam/terraria.jpg", generos: ["Aventura","Sandbox","2D"], descripcion: "Aventura y construcción en un mundo 2D generado aleatoriamente." },
  { id: 6, nombre: "Lies of P: Complete Edition", categoria: "RPG", plataforma: "PC/Consola", precio: 39990, descuento: 0, stock: 10, estrellas: "★★★★⯨", video: "PX0s7HYYFEA", galeria: ["img/lies/lies1.jpg","img/lies/lies2.jpg","img/lies/lies3.jpg","img/lies/lies4.jpg"], imagen: "nintendo/lies.jpg", generos: ["Souls-like","Acción","Fantasía oscura"], descripcion: "Souls-like oscuro inspirado en la historia de Pinocho." },
  { id: 7, nombre: "Final Fantasy X | X-2 HD Remaster", categoria: "RPG", plataforma: "Nintendo/Consola", precio: 39990, descuento: 0, stock: 3, estrellas: "★★★★☆", video: "GDRH7fdoMAo", galeria: ["img/final/final1.jpg","img/final/final2.jpg","img/final/final3.jpg","img/final/final4.jpg"], imagen: "nintendo/final.jpg", generos: ["JRPG","Remaster","Historia"], descripcion: "Dos clásicos JRPG remasterizados en alta definición." },
  { id: 8, nombre: "Super Mario Bros. Wonder", categoria: "Plataformas", plataforma: "Consola", precio: 54990, descuento: 0, stock: 14, estrellas: "★★★★★", video: "RjYZEE8G114", galeria: ["img/mario/mario1.jpg","img/mario/mario2.jpg","img/mario/mario3.jpg","img/mario/mario4.jpg"], imagen: "nintendo/mario.jpg", generos: ["Plataformas","Aventura","Familiar"], descripcion: "Plataformas 2D con las sorprendentes flores maravilla." },
  { id: 9, nombre: "Pokémon Pokopia", categoria: "Simulación", plataforma: "Nintendo", precio: 49990, descuento: 10, stock: 9, estrellas: "★★★★☆", video: "4uBeQbL0VJA", galeria: ["img/pokemon/pokemon1.jpg","img/pokemon/pokemon2.jpg","img/pokemon/pokemon3.jpg","img/pokemon/pokemon4.jpg"], imagen: "nintendo/pokopia.jpg", generos: ["Simulación","Aventura","Familiar"], descripcion: "Cultiva y convive con tus Pokémon en tu propio pueblo." },
  { id: 10, nombre: "Yoshi and the Mysterious Book", categoria: "Plataformas", plataforma: "Nintendo", precio: 54990, descuento: 0, stock: 11, estrellas: "★★★★⯨", video: "3935UAivxGc", galeria: ["img/yoshi/yoshi1.jpg","img/yoshi/yoshi2.jpg","img/yoshi/yoshi3.jpg","img/yoshi/yoshi4.jpg"], imagen: "nintendo/yoshi.jpg", generos: ["Plataformas","Aventura","Familiar"], descripcion: "Plataformero tierno con un precioso estilo hecho a mano." },
  { id: 11, nombre: "ELDEN RING Tarnished Edition", categoria: "RPG", plataforma: "PC/Consola", precio: 34990, descuento: 0, stock: 16, estrellas: "★★★★⯨", video: "QgYrhNb6wIw", galeria: ["img/elden/elden1.jpg","img/elden/elden2.jpg","img/elden/elden3.jpg","img/elden/elden4.jpg"], imagen: "nintendo/elden.jpg", generos: ["RPG","Mundo abierto","Fantasía oscura"], descripcion: "Un vasto mundo de fantasía oscura creado junto a George R. R. Martin." },
  { id: 12, nombre: "Resident Evil Requiem", categoria: "Terror", plataforma: "PC/Consola", precio: 44990, descuento: 0, stock: 7, estrellas: "★★★★⯨", video: "yClDiMKcPl8", galeria: ["img/resident/resident1.jpg","img/resident/resident2.jpg","img/resident/resident3.jpg","img/resident/resident4.jpg"], imagen: "nintendo/re9.jpg", generos: ["Terror","Survival horror","Acción"], descripcion: "La nueva entrega de terror y survival horror de Capcom." }
];

// ---------- Usuarios ----------
// rol "admin" puede entrar al panel de administrador. Las claves son de ejemplo (todo se guarda en el navegador).
const usuariosData = [
  { id: 1, nombre: "Juan Pérez", email: "juan@example.com", clave: "1234", rol: "cliente" },
  { id: 2, nombre: "María López", email: "maria@example.com", clave: "1234", rol: "cliente" },
  { id: 4, nombre: "Carlos Díaz", email: "carlos@example.com", clave: "1234", rol: "cliente" },
  { id: 5, nombre: "Juan Gómez", email: "juan.gomez@example.com", clave: "1234", rol: "cliente" },
  { id: 6, nombre: "Fernanda Sanhueza", email: "fernanda@example.com", clave: "1234", rol: "cliente" },
  { id: 7, nombre: "Administrador", email: "admin@tiendavirtual.cl", clave: "admin123", rol: "admin" }
];

// ---------- Regiones y comunas (para el checkout y el registro) ----------
const REGIONES = {
  "Región Metropolitana": ["Santiago", "Maipú", "La Florida", "Puente Alto", "Las Condes"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
  "Araucanía": ["Temuco", "Villarrica", "Angol"],
  "Ñuble": ["Chillán", "San Carlos"],
  "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
  "Los Ríos": ["Valdivia", "La Unión"],
  "Antofagasta": ["Antofagasta", "Calama"],
  "Arica y Parinacota": ["Arica", "Putre"]
};

// ---------- Órdenes y mensajes de ejemplo ----------
const ordenesData = [
  { id: "TV-418230", fecha: "2026-09-28", cliente: "Juan Pérez", estado: "Entregada", items: [
    { id: 5, nombre: "Terraria", precio: 9990, cantidad: 2 },
    { id: 3, nombre: "Project Zomboid", precio: 9990, cantidad: 1 } ] },
  { id: "TV-552071", fecha: "2026-10-01", cliente: "María López", estado: "Entregada", items: [
    { id: 11, nombre: "ELDEN RING Tarnished Edition", precio: 34990, cantidad: 1 },
    { id: 6, nombre: "Lies of P: Complete Edition", precio: 39990, cantidad: 1 } ] },
  { id: "TV-637914", fecha: "2026-10-03", cliente: "Carlos Díaz", estado: "Enviada", items: [
    { id: 8, nombre: "Super Mario Bros. Wonder", precio: 54990, cantidad: 1 },
    { id: 10, nombre: "Yoshi and the Mysterious Book", precio: 54990, cantidad: 1 } ] },
  { id: "TV-701285", fecha: "2026-10-05", cliente: "Fernanda Sanhueza", estado: "Pendiente", items: [
    { id: 12, nombre: "Resident Evil Requiem", precio: 44990, cantidad: 1 } ] },
  { id: "TV-819346", fecha: "2026-10-07", cliente: "Juan Gómez", estado: "Cancelada", items: [
    { id: 2, nombre: "EA Sports FC 27", precio: 48990, cantidad: 1 } ] },
  { id: "TV-926450", fecha: "2026-10-09", cliente: "María López", estado: "Pendiente", items: [
    { id: 9, nombre: "Pokémon Pokopia", precio: 49990, cantidad: 1 },
    { id: 4, nombre: "Raft: The Final Chapter", precio: 12990, cantidad: 2 },
    { id: 5, nombre: "Terraria", precio: 9990, cantidad: 1 } ] },
  { id: "TV-934118", fecha: "2026-10-10", cliente: "Juan Pérez", estado: "Enviada", items: [
    { id: 1, nombre: "Crimson Desert", precio: 34990, cantidad: 1 },
    { id: 3, nombre: "Project Zomboid", precio: 9990, cantidad: 2 } ] }
];

// Mensajes de ejemplo de "Contáctanos" (se ven en Reportes). leido: false = aparece como "Nuevo"
const mensajesData = [
  { id: 1, fecha: "2026-10-06", nombre: "Camila Rojas", email: "camila@example.com", texto: "Hola, ¿cuándo vuelve a haber stock de Final Fantasy X?", leido: true },
  { id: 2, fecha: "2026-10-09", nombre: "Pedro Soto", email: "pedro@example.com", texto: "Mi pedido TV-926450 aún aparece pendiente, ¿pueden revisarlo?", leido: false },
  { id: 3, fecha: "2026-10-11", nombre: "Valentina Muñoz", email: "vale@example.com", texto: "Me encanta la tienda. ¿Piensan agregar más juegos de Nintendo?", leido: false }
];

// ---------- Noticias del blog ----------
const blogsData = [
  {
    id: 1,
    titulo: "GTA 6: todo lo que sabemos sobre su fecha de salida",
    resumen: "Rockstar confirmó la llegada primero a PS5 y Xbox Series X|S.",
    imagen: "steam/gta6.jpg",
    fecha: "01 de septiembre del 2026",
    parrafos: [
      "Rockstar Games confirmó que Grand Theft Auto VI llegará primero a PlayStation 5 y Xbox Series X|S, con el esperado mundo abierto ambientado en Vice City y alrededores. El juego promete el mapa más grande y detallado de la saga hasta la fecha.",
      "Aún no hay confirmación oficial sobre el lanzamiento en PC, aunque se espera que llegue algunos meses después del estreno en consolas, siguiendo la costumbre de Rockstar con entregas anteriores.",
      "Mientras se acerca la fecha, la comunidad sigue analizando cada tráiler en busca de pistas sobre personajes, misiones y easter eggs escondidos en el mapa."
    ]
  },
  {
    id: 2,
    titulo: "Nintendo Switch: cuidados básicos para tu consola",
    resumen: "Consejos prácticos para alargar la vida útil de tu equipo.",
    imagen: "nintendo/nintendo.jpg",
    fecha: "02 de septiembre del 2026",
    parrafos: [
      "La pantalla, los Joy-Con y la batería son los puntos más sensibles de la consola. Usar una funda protectora y evitar la exposición directa al sol ayuda a que dure mucho más.",
      "Limpiar los rieles de los Joy-Con periódicamente también evita el famoso 'joy-con drift' que afecta a muchos usuarios.",
      "Por último, evita dejar la consola cargando en exceso una vez que llega al 100%, ya que las baterías de litio se degradan más rápido con cargas constantes y prolongadas."
    ]
  },
  {
    id: 3,
    titulo: "Juego indie que no te puedes perder este año",
    resumen: "Una recomencion de un juego que deberias jugar.",
    imagen: "nintendo/indie.jpg",
    fecha: "03 de septiembre del 2026",
    parrafos: [
      "Este año los estudios independientes siguen sorprendiendo con propuestas narrativas y jugables muy originales. Desde aventuras pixel-art hasta experiencias narrativas en primera persona, la escena indie demuestra que no se necesita un gran presupuesto para crear experiencias memorables.",
      "En esta nota se hace la recomendacion del juego indie  MOUSE: P.I. For Hire es ideal para quienes buscan algo distinto a los grandes lanzamientos ."
    ]
  }
];
