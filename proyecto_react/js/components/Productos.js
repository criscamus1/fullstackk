// ============================================================
// Productos.js — el catálogo (con buscador y filtro por categoría) y la página de ofertas.
// El texto del buscador y la categoría elegida son "estado" (useState): cada vez que
// cambian, React vuelve a dibujar la lista filtrada.
// ============================================================

function Productos() {
  const [buscar, setBuscar] = React.useState("");
  const [categoria, setCategoria] = React.useState("");

  const lista = DB.productos().filter((p) =>
    p.nombre.toLowerCase().includes(buscar.toLowerCase()) && (categoria === "" || p.categoria === categoria)
  );

  return (
    <div className="contenedor">
      <h2>Catálogo de juegos</h2>
      <div className="filtros">
        <input placeholder="Buscar un juego…" value={buscar} onChange={(e) => setBuscar(e.target.value)} />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {DB.categorias().map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
        </select>
      </div>
      {lista.length === 0 ? (
        <p>No hay juegos que coincidan con tu búsqueda.</p>
      ) : (
        <div className="catalogo">
          {lista.map((p) => <TarjetaProducto key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}

function Ofertas() {
  const lista = DB.productos().filter((p) => p.descuento > 0);
  return (
    <div className="contenedor">
      <h2>Ofertas</h2>
      {lista.length === 0 ? (
        <p>No hay ofertas disponibles por ahora.</p>
      ) : (
        <div className="catalogo">
          {lista.map((p) => <TarjetaProducto key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
