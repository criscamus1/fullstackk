// ============================================================
// DetalleProducto.js — ficha de un juego estilo Steam: tráiler + 4 fotos, precio y compra.
// Props: id (viene de la URL: #/productos/5) y onCambio (avisa a App que el carrito cambió).
// Estados: n (foto o tráiler elegido), reproduciendo (¿ya se apretó ▶?) y mensaje (aviso al comprar).
// ============================================================

function DetalleProducto({ id, onCambio }) {
  const p = DB.producto(id);
  const [n, setN] = React.useState(0);
  const [reproduciendo, setReproduciendo] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(null);

  if (!p) {
    return (
      <div className="contenedor">
        <p>No se encontró el producto solicitado.</p>
        <a href="#/productos">← Volver al catálogo</a>
      </div>
    );
  }

  // Fotos: las 4 de "galeria". Si el juego no tiene (por ejemplo uno nuevo), se usan 4 vistas ampliadas de la portada.
  const conGaleria = p.galeria && p.galeria.length > 0;
  const fotos = (conGaleria ? p.galeria : [p.imagen, p.imagen, p.imagen, p.imagen]).map((src, i) => ({ src: src, clase: conGaleria ? "real" : "v" + i }));
  // El tráiler va primero, como en Steam
  const items = p.video ? [{ video: p.video, src: p.imagen, clase: "" }].concat(fotos) : fotos;
  const item = items[n];
  const stock = DB.stockDe(p.id);

  function ver(i) {
    setN((i + items.length) % items.length);   // el resto (%) hace que la última foto siga con la primera
    setReproduciendo(false);
  }
  function agregar() {
    const ok = DB.cambiarCarrito(p.id, 1);   // descuenta 1 de stock
    setMensaje({ texto: ok ? p.nombre + " se agregó al carrito." : "No hay stock suficiente.", ok: ok });
    onCambio();
  }
  function comprarAhora() {
    if (DB.cambiarCarrito(p.id, 1)) { onCambio(); irA("#/carrito"); }
  }

  return (
    <div className="contenedor">
      <h2>{p.nombre}</h2>
      <div className="detalle-sub">
        <span className="etiqueta-plataforma">{p.plataforma}</span> <span className="estrellas">{p.estrellas}</span>
      </div>

      <div className="detalle-grid">
        <div>
          <div className="galeria-principal">
            <div className="visor">
              {item.video ? (
                reproduciendo ? (
                  <iframe src={"https://www.youtube-nocookie.com/embed/" + item.video + "?autoplay=1"} title={"Tráiler de " + p.nombre} allow="autoplay; fullscreen" allowFullScreen></iframe>
                ) : (
                  <div className="portada-video">
                    <img src={item.src} alt="" />
                    <button className="play-grande" onClick={() => setReproduciendo(true)}>▶</button>
                    <span className="texto-trailer">Ver tráiler de {p.nombre}</span>
                  </div>
                )
              ) : (
                <img src={item.src} className={item.clase} alt={p.nombre} />
              )}
            </div>
            <button className="flecha izq" onClick={() => ver(n - 1)} aria-label="Anterior">‹</button>
            <button className="flecha der" onClick={() => ver(n + 1)} aria-label="Siguiente">›</button>
          </div>

          <div className="miniaturas">
            {items.map((f, i) => (
              <button key={i} className={"miniatura" + (i === n ? " activa" : "")} onClick={() => ver(i)}>
                <img src={f.src} className={f.clase} alt="" />
                {f.video && <span className="play">▶</span>}
              </button>
            ))}
          </div>
          <a className="link-trailer" target="_blank" rel="noreferrer"
             href={p.video ? "https://www.youtube.com/watch?v=" + p.video : "https://www.youtube.com/results?search_query=" + encodeURIComponent(p.nombre + " trailer")}>
            ▶ {p.video ? "Abrir tráiler en YouTube" : "Buscar tráiler en YouTube"}
          </a>
        </div>

        <div>
          <p className="detalle-descripcion">{p.descripcion}</p>
          <div className="generos">
            {(p.generos || []).map((g) => <span key={g} className="genero">{g}</span>)}
          </div>
          <div className="caja-compra">
            <p className="precio-detalle"><Precio p={p} /></p>
            {p.descuento > 0 && <p className="ok">¡Oferta! {p.descuento}% de descuento</p>}
            <p><EtiquetaStock n={stock} /></p>
            <button className="btn-comprar" onClick={agregar} disabled={stock <= 0}>Añadir al carrito</button>
            <button className="btn-secundario" onClick={comprarAhora} disabled={stock <= 0}>Comprar ahora</button>
            {mensaje && <p className={mensaje.ok ? "ok" : "error"}>{mensaje.texto}</p>}
          </div>
        </div>
      </div>

      <p><a className="volver" href="#/productos">← Volver al catálogo</a></p>
    </div>
  );
}
