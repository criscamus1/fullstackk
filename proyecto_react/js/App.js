
function App() {
  const [ruta, setRuta] = React.useState(window.location.hash || "#/");
  const [carrito, setCarrito] = React.useState(() => DB.carrito());
  const [usuario, setUsuario] = React.useState(null);
  const [resultado, setResultado] = React.useState(null);   
  const [carga, setCarga] = React.useState({ listo: false, error: "" });
  const [, setVersion] = React.useState(0);                  

  function iniciar() {
    setCarga({ listo: false, error: "" });
    Auth.restaurar()
      .then((u) => { setUsuario(u); return DB.cargarTienda(); })
      .then(() => { DB.limpiarCarrito(); setCarrito(DB.carrito()); setCarga({ listo: true, error: "" }); })
      .catch((err) => setCarga({ listo: false, error: err.message }));
  }
  React.useEffect(iniciar, []);

  React.useEffect(() => {
    function alCambiarHash() {
      setRuta(window.location.hash || "#/");
      setCarrito(DB.carrito());
      window.scrollTo(0, 0);
      DB.cargarTienda().then(() => setVersion((v) => v + 1)).catch(() => {});   // datos al día (stock, precios)
    }
    // Si el refresh token venció, el backend ya no reconoce la sesión: se cierra y se pide iniciar sesión de nuevo
    function alExpirar() {
      setUsuario(null);
      sessionStorage.setItem("veg_aviso", "Tu sesión expiró. Inicia sesión nuevamente.");
      irA("#/login");
    }
    window.addEventListener("hashchange", alCambiarHash);
    window.addEventListener("veg-sesion-expirada", alExpirar);
    return () => {
      window.removeEventListener("hashchange", alCambiarHash);
      window.removeEventListener("veg-sesion-expirada", alExpirar);
    };
  }, []);

  function actualizarCarrito() { setCarrito(DB.carrito()); }
  function entrar(u) {
    setUsuario(u);
    const volver = sessionStorage.getItem("veg_volver");   // si lo mandaron a iniciar sesión, vuelve a donde iba
    sessionStorage.removeItem("veg_volver");
    const valido = volver && !volver.startsWith("#/compra-") && !(volver.startsWith("#/admin") && u.rol !== "admin");   // no volver a pantallas de resultado ni a rutas que su rol no puede ver
    irA(valido ? volver : (u.rol === "admin" ? "#/admin" : "#/"));
  }
  function salir() { sessionStorage.removeItem("veg_volver"); Auth.salir(); setRuta("#/"); setUsuario(null); irA("#/"); }   // setRuta en el mismo render: si no, la guardia vería "sin sesión" en /admin y mandaría al login
  function terminarPago(r) {
    setResultado(r);
    setCarrito(DB.carrito());
    irA(r.exito ? "#/compra-exitosa" : "#/compra-error");
  }

  // ---- Pantallas de espera / error de conexión ----
  if (!carga.listo) {
    return (
      <div className="contenedor" style={{ textAlign: "center", marginTop: "4rem" }}>
        {carga.error ? (
          <div className="resultado fallo">
            <h2>No se pudo cargar la tienda</h2>
            <p>{carga.error}</p>
            <button className="btn-comprar" onClick={iniciar}>Reintentar</button>
          </div>
        ) : <p>Conectando con el servidor…</p>}
      </div>
    );
  }

  const partes = ruta.replace("#/", "").split("/").filter(Boolean);

  function guardia(rol, pantalla) {
    if (!usuario) {
      sessionStorage.setItem("veg_volver", ruta);
      sessionStorage.setItem("veg_aviso", "Inicia sesión para continuar.");
      window.setTimeout(() => irA("#/login"), 0);
      return <div className="contenedor"><p>Redirigiendo al inicio de sesión…</p></div>;
    }
    if (rol && usuario.rol !== rol) return <AccesoRestringido usuario={usuario} />;
    return pantalla;
  }

  if (partes[0] === "admin") {
    return guardia("admin", <Admin seccion={partes[1] || "dashboard"} usuario={usuario} onSalir={salir} onUsuarioCambio={(u) => setUsuario(u)} />);
  }

  function pagina() {
    if (partes.length === 0) return <Home />;
    switch (partes[0]) {
      case "productos": return partes[1] ? <DetalleProducto key={partes[1]} id={partes[1]} onCambio={actualizarCarrito} /> : <Productos />;
      case "ofertas": return <Ofertas />;
      case "carrito": return <Carrito carrito={carrito} onCambio={actualizarCarrito} />;
      case "checkout": return guardia(null, <Checkout carrito={carrito} usuario={usuario} onResultado={terminarPago} />);
      case "compra-exitosa": return guardia(null, <ResultadoCompra resultado={resultado} exito={true} />);
      case "compra-error": return guardia(null, <ResultadoCompra resultado={resultado} exito={false} />);
      case "mis-compras": return guardia(null, <MisCompras />);
      case "blogs": return partes[1] ? <DetalleBlog id={partes[1]} /> : <Blogs />;
      case "nosotros": return <Nosotros />;
      case "contacto": return <Contacto usuario={usuario} />;
      case "login": return <Login onLogin={entrar} />;
      case "registro": return <Registro onLogin={entrar} />;
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
