// ============================================================
// Comunes.js — piezas que se usan en varias páginas:
// funciones de ayuda, la barra de navegación, el pie de página y la tarjeta de producto.
// Cada componente es una función que recibe "props" (sus datos de entrada) y devuelve JSX.
// ============================================================

function pesos(n) {
  return "$" + n.toLocaleString("es-CL");
}

function irA(ruta) {   // cambia de página: App escucha el cambio del hash (#)
  window.location.hash = ruta;
}

// Muestra el stock con color: verde, amarillo (queda poco) o rojo (agotado)
function EtiquetaStock({ n }) {
  if (n <= 0) return <span className="stock-agotado">Agotado</span>;
  if (n <= 5) return <span className="stock-bajo">{n === 1 ? "¡Última unidad!" : "¡Quedan " + n + "!"}</span>;
  return <span className="stock-ok">Stock: {n}</span>;
}

// Precio con descuento: si el producto está en oferta, muestra el precio anterior tachado
function Precio({ p }) {
  if (!(p.descuento > 0)) return <span>{pesos(p.precio)}</span>;
  return (
    <span>
      <span className="precio-antes">{pesos(p.precio)}</span>
      {pesos(DB.precioFinal(p))}
    </span>
  );
}

function TarjetaProducto({ p }) {
  return (
    <a href={"#/productos/" + p.id} className="tarjeta">
      {p.descuento > 0 && <span className="etiqueta-oferta">-{p.descuento}%</span>}
      <img src={p.imagen} alt={p.nombre} />
      <span className="etiqueta-plataforma">{p.plataforma}</span>
      <h3>{p.nombre}</h3>
      <p className="estrellas">{p.estrellas}</p>
      <p className="precio"><Precio p={p} /></p>
      <p className="stock-tag-wrap"><EtiquetaStock n={DB.stockDe(p.id)} /></p>
    </a>
  );
}

// Barra de arriba. Props: ruta (para marcar el link activo), cantidadCarrito, usuario (o null) y onSalir
function Navbar({ ruta, cantidadCarrito, usuario, onSalir }) {
  const [abierto, setAbierto] = React.useState(false);   // menú desplegado en celular

  // Ayuda para dibujar un link del menú (marca como "activo" el de la página actual)
  function enlace(href, contenido) {
    const activo = ruta === href || (href !== "#/" && ruta.indexOf(href) === 0);
    return <a href={href} className={activo ? "activo" : ""} onClick={() => setAbierto(false)}>{contenido}</a>;
  }

  return (
    <header className="barra">
      <div className="barra-interior">
        <a href="#/" className="marca"><img src="img/shoopingcart.jpg" alt="" />Tienda virtual</a>
        <button className="menu-boton" onClick={() => setAbierto(!abierto)} aria-label="Menú">☰</button>
        <nav className={"menu" + (abierto ? " abierto" : "")}>
          {enlace("#/", "Home")}
          {enlace("#/productos", "Productos")}
          {enlace("#/ofertas", "Ofertas")}
          {enlace("#/blogs", "Blogs")}
          {enlace("#/nosotros", "Nosotros")}
          {enlace("#/contacto", "Contacto")}
          {enlace("#/carrito", <>🛒 Carrito <span className="badge-carrito">{cantidadCarrito}</span></>)}
          <span className="espacio"></span>
          {usuario ? (
            <>
              <span className="saludo">Hola, {usuario.nombre.split(" ")[0]}</span>
              {usuario.rol === "admin" && <a href="#/admin">Administrador</a>}
              <button className="salir" onClick={onSalir}>Cerrar sesión</button>
            </>
          ) : (
            <>
              {enlace("#/login", "Iniciar sesión")}
              {enlace("#/registro", "Registrarse")}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="pie">© 2026 Tienda Virtual — Consolas, juegos y accesorios para todos los gamers.</footer>;
}
