// Solo entra quien inició sesión con rol "admin" (App lo comprueba, y el backend lo vuelve a comprobar con el JWT)
const SECCIONES_ADMIN = [
  ["dashboard", "📊 Dashboard"], ["ordenes", "🧾 Órdenes"], ["productos", "🎮 Productos"],
  ["categorias", "🏷️ Categorías"], ["usuarios", "👥 Usuarios"], ["reportes", "📈 Reportes"], ["perfil", "👤 Perfil"]
];

// Props: seccion (viene de la URL: #/admin/productos), usuario, onSalir y onUsuarioCambio
function Admin({ seccion, usuario, onSalir, onUsuarioCambio }) {
  // Al entrar al panel se piden al backend las órdenes, usuarios y mensajes (solo responde si el token es de un ADMIN)
  const [carga, setCarga] = React.useState({ listo: false, error: "" });
  React.useEffect(() => {
    Promise.all([DB.cargarAdmin(), DB.cargarTienda()])
      .then(() => setCarga({ listo: true, error: "" }))
      .catch((err) => setCarga({ listo: false, error: err.message }));
  }, []);

  let contenido;
  if (!carga.listo) contenido = carga.error ? <p className="error-form">{carga.error}</p> : <p className="vacio">Cargando datos…</p>;
  else if (seccion === "ordenes") contenido = <AdminOrdenes />;
  else if (seccion === "productos") contenido = <AdminProductos />;
  else if (seccion === "categorias") contenido = <AdminCategorias />;
  else if (seccion === "usuarios") contenido = <AdminUsuarios usuario={usuario} />;
  else if (seccion === "reportes") contenido = <AdminReportes />;
  else if (seccion === "perfil") contenido = <AdminPerfil usuario={usuario} onUsuarioCambio={onUsuarioCambio} />;
  else contenido = <AdminDashboard />;

  const actual = SECCIONES_ADMIN.find((s) => s[0] === seccion) || SECCIONES_ADMIN[0];

  return (
    <div className="admin-layout">
      <aside className="lateral">
        <div className="adm-marca"><img src="img/shoopingcart.jpg" alt="" /><span>Tienda virtual<br /><small>Administrador</small></span></div>
        <nav>
          {SECCIONES_ADMIN.map((s) => (
            <a key={s[0]} href={"#/admin/" + s[0]} className={s[0] === actual[0] ? "activo" : ""}>{s[1]}</a>
          ))}
        </nav>
        <a className="salir" href="#/">← Volver a la tienda</a>
      </aside>
      <main>
        <div className="barra-arriba">
          ¡Hola, <strong>{usuario.nombre}</strong>! <button className="sec chico" onClick={onSalir}>Cerrar sesión</button>
        </div>
        <h1>{actual[1].slice(3)}</h1>
        {contenido}
      </main>
    </div>
  );
}

// ---------- Piezas compartidas ----------
function useRefrescar() {
  const [, setN] = React.useState(0);
  return function () { setN((n) => n + 1); };
}

function Kpi({ titulo, valor, alerta }) {
  return <div className={"kpi" + (alerta ? " alerta" : "")}><span>{titulo}</span><strong>{valor}</strong></div>;
}

function Aviso({ aviso }) {   // aviso = { texto, malo } o null
  if (!aviso) return null;
  return <p className={"aviso " + (aviso.malo ? "mal" : "bien")}>{aviso.texto}</p>;
}

function Tabla({ cabeceras, children }) {
  return (
    <div className="tabla">
      <table>
        <thead><tr>{cabeceras.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Campo({ etiqueta, valor, onCambio, tipo, placeholder }) {
  return <label>{etiqueta}<input type={tipo || "text"} value={valor === undefined || valor === null ? "" : valor} placeholder={placeholder} onChange={(e) => onCambio(e.target.value)} /></label>;
}

// Lista con crear / editar / eliminar. La usan Productos, Categorías y Usuarios.
// Props:
//   nombre     "producto" (para los títulos)       cabeceras  títulos de las columnas
//   lista      los registros a mostrar              fila(item)  las celdas <td> de cada registro
//   vacio      valores del formulario "nuevo"       campos(form, cambiar)  los campos del formulario
//   guardar(form, esNuevo)  valida y guarda: devuelve el texto del error ("" si salió bien)
//   borrar(item)            elimina: devuelve { texto, malo } con el aviso
//   alCambiar               avisa a la sección que cambió algo (para volver a dibujar)
function ListaCrud({ nombre, cabeceras, lista, fila, vacio, campos, guardar, borrar, alCambiar }) {
  const [form, setForm] = React.useState(null);   // null = formulario cerrado
  const [error, setError] = React.useState("");
  const [aviso, setAviso] = React.useState(null);

  function abrir(datos) { setForm(datos); setError(""); setAviso(null); }
  function cambiar(campo, valor) { setForm({ ...form, [campo]: valor }); }

  async function enviar(e) {
    e.preventDefault();
    const msg = await guardar(form, !!form._nuevo);   // guardar() habla con el backend y devuelve un texto de error, o "" si salió bien
    if (msg) { setError(msg); return; }   // el formulario queda abierto con lo escrito
    setForm(null);
    setAviso({ texto: "Guardado correctamente." });
    alCambiar();
  }
  async function eliminar(item) {
    if (!window.confirm("¿Seguro que quieres eliminarlo?")) return;
    setAviso(await borrar(item));
    alCambiar();
  }

  return (
    <div>
      <Aviso aviso={aviso} />
      {form && (
        <form className="caja" onSubmit={enviar} noValidate>
          <h2>{form._nuevo ? "Agregar " + nombre : "Editar " + nombre + " #" + form.id}</h2>
          <div className="campos">{campos(form, cambiar)}</div>
          <p className="error-form">{error}</p>
          <div className="fila-botones">
            <button type="submit">Guardar</button>
            <button type="button" className="sec" onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </form>
      )}
      <div className="fila-botones"><button onClick={() => abrir({ ...vacio, _nuevo: true })}>+ Agregar {nombre}</button></div>
      <Tabla cabeceras={cabeceras.concat("")}>
        {lista.map((item) => (
          <tr key={item.id}>
            {fila(item)}
            <td className="acciones">
              <button className="sec chico" onClick={() => abrir({ ...item })}>Editar</button>{" "}
              <button className="peligro chico" onClick={() => eliminar(item)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </Tabla>
    </div>
  );
}
