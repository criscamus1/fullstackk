// ============================================================
// App.js — el componente principal (la "raíz" de la aplicación).
// 1) Guarda el estado que comparten todas las páginas: carrito, usuario y resultado de la última compra.
// 2) Hace de "router": mira la URL (la parte después del #) y decide qué página mostrar.
//    No usamos librerías de rutas porque eso necesitaría instalar paquetes con npm.
//    Ejemplo: "#/productos/5" -> partes = ["productos", "5"] -> <DetalleProducto id="5" />
// ============================================================

function AccesoDenegado() {
  return (
    <div className="contenedor">
      <div className="resultado fallo">
        <h2>Zona solo para administradores</h2>
        <p>Inicia sesión con una cuenta de administrador para entrar al panel.</p>
        <a href="#/login" className="btn-comprar">Iniciar sesión</a>
      </div>
    </div>
  );
}

function App() {
  const [ruta, setRuta] = React.useState(window.location.hash || "#/");
  const [carrito, setCarrito] = React.useState(() => DB.carrito());
  const [usuario, setUsuario] = React.useState(() => DB.usuarioActual());
  const [resultado, setResultado] = React.useState(null);   // resultado del último pago (éxito o error)

  // Cuando el usuario toca un link href="#/algo", el navegador cambia el hash SIN recargar la página
  // y dispara "hashchange". Lo escuchamos para volver a dibujar la página correcta.
  React.useEffect(() => {
    function alCambiarHash() {
      setRuta(window.location.hash || "#/");
      setCarrito(DB.carrito());          // vuelve a leer por si el administrador cambió algo
      setUsuario(DB.usuarioActual());
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", alCambiarHash);
    return () => window.removeEventListener("hashchange", alCambiarHash);
  }, []);

  function actualizarCarrito() { setCarrito(DB.carrito()); }
  function entrar(u) { setUsuario(u); irA(u.rol === "admin" ? "#/admin" : "#/"); }
  function salir() { DB.cerrarSesion(); setUsuario(null); irA("#/"); }
  function terminarPago(r) {
    setResultado(r);
    setCarrito(DB.carrito());
    irA(r.exito ? "#/compra-exitosa" : "#/compra-error");
  }

  // "#/productos/5" -> ["productos", "5"]
  const partes = ruta.replace("#/", "").split("/").filter(Boolean);
  const esAdmin = usuario !== null && usuario.rol === "admin";

  // El panel de administrador tiene su propio diseño (sin la barra de la tienda)
  if (partes[0] === "admin" && esAdmin) {
    return <Admin seccion={partes[1] || "dashboard"} usuario={usuario} onSalir={salir} onUsuarioCambio={() => setUsuario(DB.usuarioActual())} />;
  }

  function pagina() {
    if (partes.length === 0) return <Home />;
    switch (partes[0]) {
      case "productos": return partes[1] ? <DetalleProducto key={partes[1]} id={partes[1]} onCambio={actualizarCarrito} /> : <Productos />;
      case "ofertas": return <Ofertas />;
      case "carrito": return <Carrito carrito={carrito} onCambio={actualizarCarrito} />;
      case "checkout": return <Checkout carrito={carrito} usuario={usuario} onResultado={terminarPago} />;
      case "compra-exitosa": return <ResultadoCompra resultado={resultado} exito={true} />;
      case "compra-error": return <ResultadoCompra resultado={resultado} exito={false} />;
      case "blogs": return partes[1] ? <DetalleBlog id={partes[1]} /> : <Blogs />;
      case "nosotros": return <Nosotros />;
      case "contacto": return <Contacto usuario={usuario} />;
      case "login": return <Login onLogin={entrar} />;
      case "registro": return <Registro onLogin={entrar} />;
      case "admin": return <AccesoDenegado />;
      default: return <div className="contenedor"><p>Página no encontrada. <a href="#/">Volver al inicio</a></p></div>;
    }
  }

  return (
    <div>
      <Navbar ruta={ruta} cantidadCarrito={carrito.reduce((s, i) => s + i.cantidad, 0)} usuario={usuario} onSalir={salir} />
      {pagina()}
      <Footer />
    </div>
  );
}

// Dibuja <App /> dentro del <div id="root"> del index.html
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
