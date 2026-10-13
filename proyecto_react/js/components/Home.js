// ============================================================
// Home.js — página de inicio: banner, accesos a cada sección y juegos destacados.
// ============================================================

const ACCESOS = [
  { icono: "🛍️", titulo: "Tienda", texto: "Catálogo de juegos Steam y Nintendo con stock en vivo.", href: "#/productos", link: "Ver productos →" },
  { icono: "🏷️", titulo: "Ofertas", texto: "Los juegos con descuento, antes de que se agoten.", href: "#/ofertas", link: "Ver ofertas →" },
  { icono: "📰", titulo: "Blogs", texto: "Noticias, lanzamientos e información de consolas.", href: "#/blogs", link: "Leer blogs →" },
  { icono: "🛒", titulo: "Mi carrito", texto: "Revisa lo que llevas y finaliza tu compra.", href: "#/carrito", link: "Ir al carrito →" },
  { icono: "👾", titulo: "Nosotros", texto: "Conoce quiénes somos y qué nos apasiona.", href: "#/nosotros", link: "Conócenos →" },
  { icono: "💬", titulo: "Contacto", texto: "¿Dudas o consultas? Escríbenos.", href: "#/contacto", link: "Contactar →" }
];

function Home() {
  const destacados = DB.productos().filter((p) => DB.stockDe(p.id) > 0).slice(0, 4);

  return (
    <div>
      <section className="hero">
        <div className="hero-contenido">
          <span className="hero-etiqueta">🎮 Steam y Nintendo en un solo lugar</span>
          <h1>Tu tienda de <span className="grad">videojuegos</span></h1>
          <p>Encuentra el catálogo de juegos, las noticias y todo en un solo lugar.</p>
          <div className="hero-botones">
            <a href="#/productos" className="btn-comprar">Explorar catálogo</a>
            <a href="#/blogs" className="btn-secundario">Ver noticias</a>
          </div>
        </div>
      </section>

      <section className="seccion">
        <h2 className="titulo-seccion">¿A dónde quieres ir?</h2>
        <div className="accesos">
          {ACCESOS.map((a) => (
            <a key={a.href} href={a.href} className="acceso">
              <span className="acceso-icono">{a.icono}</span>
              <h3>{a.titulo}</h3>
              <p>{a.texto}</p>
              <span className="acceso-link">{a.link}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="seccion">
        <h2 className="titulo-seccion">Juegos destacados</h2>
        <div className="catalogo">
          {destacados.map((p) => <TarjetaProducto key={p.id} p={p} />)}
        </div>
      </section>

      <section className="beneficios">
        <div><span>⚡</span><strong>Stock en vivo</strong><small>Siempre verás cuántas unidades quedan</small></div>
        <div><span>🔒</span><strong>Compra simple</strong><small>Carrito claro y pago en un paso</small></div>
        <div><span>🎁</span><strong>Gran variedad</strong><small>Para PC y Nintendo, e incluso más</small></div>
      </section>
    </div>
  );
}
