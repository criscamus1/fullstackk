// ============================================================
// AdminSecciones.js — las 7 secciones del panel: Dashboard, Órdenes, Productos,
// Categorías, Usuarios, Reportes y Perfil. Cada una lee y guarda con DB (localStorage).
// ============================================================

const ESTADOS = ["Pendiente", "Enviada", "Entregada", "Cancelada"];

function ventasValidas() {   // las órdenes canceladas no suman
  return DB.ordenes().filter((o) => o.estado !== "Cancelada");
}

// ---------- Dashboard: números del negocio + un ejemplo para cambiar el stock ----------
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
      setAviso({ texto: "El stock debe ser un número entero (0 o más).", malo: true });
      return;
    }
    DB.guardarStock(elegido, n);   // la tienda usa este mismo stock
    setStock("");
    setAviso({ texto: "Stock actualizado." });
  }
  function restaurar() {
    if (!window.confirm("Se borrarán los cambios guardados en este navegador y volverán los datos de ejemplo. ¿Continuar?")) return;
    DB.restaurar();
    window.location.hash = "#/";
    window.location.reload();
  }

  return (
    <div>
      <div className="kpis">
        <Kpi titulo="Ventas totales" valor={pesos(ventas)} />
        <Kpi titulo="Órdenes" valor={DB.ordenes().length} />
        <Kpi titulo="Productos" valor={productos.length} />
        <Kpi titulo="Usuarios" valor={DB.usuarios().length} />
        <Kpi titulo="Mensajes nuevos" valor={nuevos} alerta={nuevos > 0} />
      </div>

      <h2>Cambiar el stock de un producto</h2>
      <Aviso aviso={aviso} />
      <form className="caja" onSubmit={guardarStock} noValidate>
        <div className="campos">
          <label>Producto
            <select value={elegido} onChange={(e) => setProducto(e.target.value)}>
              {productos.map((p) => <option key={p.id} value={p.id}>{p.nombre} (stock {DB.stockDe(p.id)})</option>)}
            </select>
          </label>
          <Campo etiqueta="Nuevo stock" tipo="number" valor={stock} onCambio={setStock} />
        </div>
        <button type="submit">Guardar stock</button>
      </form>
      <p><button className="peligro chico" onClick={restaurar}>Restaurar datos de ejemplo</button></p>
    </div>
  );
}

// ---------- Órdenes: cambiar el estado o eliminar ----------
function AdminOrdenes() {
  const refrescar = useRefrescar();
  const [aviso, setAviso] = React.useState(null);
  const lista = DB.ordenes().slice().sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id.localeCompare(a.id));

  function cambiarEstado(id, estado) {
    DB.guardarOrdenes(DB.ordenes().map((o) => (o.id === id ? { ...o, estado: estado } : o)));
    setAviso({ texto: "Estado de la orden actualizado." });
    refrescar();
  }
  function eliminar(id) {
    if (!window.confirm("¿Seguro que quieres eliminarlo?")) return;
    DB.guardarOrdenes(DB.ordenes().filter((o) => o.id !== id));
    setAviso({ texto: "Orden eliminada." });
    refrescar();
  }

  if (lista.length === 0) return <p className="vacio">No hay órdenes.</p>;
  return (
    <div>
      <Aviso aviso={aviso} />
      <Tabla cabeceras={["Orden", "Fecha", "Cliente", "Productos", "Total", "Estado", ""]}>
        {lista.map((o) => (
          <tr key={o.id}>
            <td>{o.id}</td><td>{o.fecha}</td><td>{o.cliente}</td>
            <td>{o.items.map((i) => i.nombre + " x" + i.cantidad).join(", ")}</td>
            <td>{pesos(DB.totalOrden(o))}</td>
            <td><select value={o.estado} onChange={(e) => cambiarEstado(o.id, e.target.value)}>{ESTADOS.map((e) => <option key={e}>{e}</option>)}</select></td>
            <td className="acciones"><button className="peligro chico" onClick={() => eliminar(o.id)}>Eliminar</button></td>
          </tr>
        ))}
      </Tabla>
    </div>
  );
}

// ---------- Productos ----------
function AdminProductos() {
  const refrescar = useRefrescar();
  const lista = DB.productos().map((p) => ({ ...p, stock: DB.stockDe(p.id) }));   // con el stock actual

  function guardar(f, esNuevo) {
    const todos = DB.productos().map((p) => ({ ...p }));
    const nombre = f.nombre.trim(), precio = Number(f.precio), stock = Number(f.stock), descuento = Number(f.descuento || 0);
    if (nombre.length < 3) return "El nombre debe tener al menos 3 letras.";
    if (todos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id !== f.id)) return "Ya existe un producto con ese nombre.";
    if (!f.categoria) return "Elige una categoría.";
    if (!Number.isInteger(precio) || precio <= 0) return "El precio debe ser un número entero mayor a 0.";
    if (!Number.isInteger(descuento) || descuento < 0 || descuento > 90) return "El descuento debe ser un número entero entre 0 y 90.";
    if (f.stock === "" || !Number.isInteger(stock) || stock < 0) return "El stock debe ser un número entero (0 o más).";
    if (!String(f.imagen || "").trim()) return "Falta la ruta de la imagen (ej: steam/terraria.jpg).";
    const datos = { nombre: nombre, categoria: f.categoria, precio: precio, descuento: descuento, stock: stock, imagen: f.imagen.trim() };
    let id = f.id;
    if (esNuevo) {
      id = DB.siguienteId(todos);
      todos.push({ id: id, plataforma: "PC", estrellas: "★★★★☆", video: "", generos: [f.categoria], descripcion: "Sin descripción.", ...datos });
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
    DB.guardar("carrito", DB.carrito().filter((i) => i.id !== p.id));   // que no quede en ningún carrito
    return { texto: "Producto eliminado." };
  }

  return (
    <ListaCrud
      nombre="producto" cabeceras={["ID", "", "Nombre", "Categoría", "Precio", "Stock"]} lista={lista}
      vacio={{ nombre: "", categoria: "", precio: "", descuento: 0, stock: "", imagen: "" }}
      fila={(p) => (
        <>
          <td>{p.id}</td><td><img src={p.imagen} alt="" /></td><td>{p.nombre}</td><td>{p.categoria || "—"}</td>
          <td>{pesos(p.precio)}{p.descuento > 0 ? " (-" + p.descuento + "%)" : ""}</td>
          <td className={p.stock <= 5 ? "bajo" : ""}>{p.stock}</td>
        </>
      )}
      campos={(f, cambiar) => (
        <>
          <Campo etiqueta="Nombre" valor={f.nombre} onCambio={(v) => cambiar("nombre", v)} />
          <label>Categoría
            <select value={f.categoria} onChange={(e) => cambiar("categoria", e.target.value)}>
              <option value="">Elige una…</option>
              {DB.categorias().map((c) => <option key={c.id}>{c.nombre}</option>)}
            </select>
          </label>
          <Campo etiqueta="Precio (CLP)" tipo="number" valor={f.precio} onCambio={(v) => cambiar("precio", v)} />
          <Campo etiqueta="Descuento (%) — 0 = sin oferta" tipo="number" valor={f.descuento} onCambio={(v) => cambiar("descuento", v)} />
          <Campo etiqueta="Stock" tipo="number" valor={f.stock} onCambio={(v) => cambiar("stock", v)} />
          <Campo etiqueta="Imagen (ruta, ej: steam/terraria.jpg)" valor={f.imagen} onCambio={(v) => cambiar("imagen", v)} />
        </>
      )}
      guardar={guardar} borrar={borrar} alCambiar={refrescar}
    />
  );
}

// ---------- Categorías ----------
function AdminCategorias() {
  const refrescar = useRefrescar();
  const lista = DB.categorias().map((c) => ({ ...c, usados: DB.productos().filter((p) => p.categoria === c.nombre).length }));

  function guardar(f, esNuevo) {
    const nombre = f.nombre.trim(), todas = DB.categorias();
    if (nombre.length < 3) return "El nombre debe tener al menos 3 letras.";
    if (todas.some((c) => c.nombre.toLowerCase() === nombre.toLowerCase() && c.id !== f.id)) return "Esa categoría ya existe.";
    if (esNuevo) {
      DB.guardarCategorias(todas.concat({ id: DB.siguienteId(todas), nombre: nombre }));
    } else {
      const vieja = todas.find((c) => c.id === f.id).nombre;
      // al renombrar, los productos de esa categoría siguen el nuevo nombre
      DB.guardarProductos(DB.productos().map((p) => (p.categoria === vieja ? { ...p, categoria: nombre } : p)));
      DB.guardarCategorias(todas.map((c) => (c.id === f.id ? { ...c, nombre: nombre } : c)));
    }
    return "";
  }
  function borrar(c) {
    if (c.usados > 0) return { texto: 'No se puede eliminar "' + c.nombre + '": la usan ' + c.usados + " producto(s).", malo: true };
    DB.guardarCategorias(DB.categorias().filter((x) => x.id !== c.id));
    return { texto: "Categoría eliminada." };
  }

  return (
    <ListaCrud
      nombre="categoría" cabeceras={["ID", "Nombre", "Productos"]} lista={lista} vacio={{ nombre: "" }}
      fila={(c) => <><td>{c.id}</td><td>{c.nombre}</td><td>{c.usados}</td></>}
      campos={(f, cambiar) => <Campo etiqueta="Nombre" valor={f.nombre} onCambio={(v) => cambiar("nombre", v)} />}
      guardar={guardar} borrar={borrar} alCambiar={refrescar}
    />
  );
}

// ---------- Usuarios ----------
function AdminUsuarios({ usuario }) {
  const refrescar = useRefrescar();
  const lista = DB.usuarios().map((u) => ({ ...u, clave: "" }));   // la contraseña no se muestra al editar

  function guardar(f, esNuevo) {
    const msg = DB.validarUsuario(f.nombre, f.email, esNuevo ? 0 : f.id);   // nombre, correo válido y no repetido
    if (msg) return msg;
    if (esNuevo && f.clave.length < 4) return "La contraseña debe tener al menos 4 caracteres.";
    if (!esNuevo && f.clave !== "" && f.clave.length < 4) return "La contraseña debe tener al menos 4 caracteres.";
    const todos = DB.usuarios();
    if (esNuevo) {
      todos.push({ id: DB.siguienteId(todos), nombre: f.nombre.trim(), email: f.email.trim(), clave: f.clave, telefono: "", rol: f.rol });
      DB.guardarUsuarios(todos);
    } else {
      DB.guardarUsuarios(todos.map((u) => (u.id === f.id ? { ...u, nombre: f.nombre.trim(), email: f.email.trim(), rol: f.rol, clave: f.clave === "" ? u.clave : f.clave } : u)));
    }
    return "";
  }
  function borrar(u) {
    if (u.id === usuario.id) return { texto: "No puedes eliminar tu propio usuario.", malo: true };
    DB.guardarUsuarios(DB.usuarios().filter((x) => x.id !== u.id));
    return { texto: "Usuario eliminado." };
  }

  return (
    <ListaCrud
      nombre="usuario" cabeceras={["ID", "Nombre", "Correo", "Rol"]} lista={lista} vacio={{ nombre: "", email: "", rol: "cliente", clave: "" }}
      fila={(u) => <><td>{u.id}</td><td>{u.nombre}</td><td>{u.email}</td><td>{u.rol}</td></>}
      campos={(f, cambiar) => (
        <>
          <Campo etiqueta="Nombre" valor={f.nombre} onCambio={(v) => cambiar("nombre", v)} />
          <Campo etiqueta="Correo" valor={f.email} onCambio={(v) => cambiar("email", v)} />
          <label>Rol
            <select value={f.rol} onChange={(e) => cambiar("rol", e.target.value)}><option value="cliente">cliente</option><option value="admin">admin</option></select>
          </label>
          <Campo etiqueta={f._nuevo ? "Contraseña" : "Contraseña (vacía = no cambiarla)"} tipo="password" valor={f.clave} onCambio={(v) => cambiar("clave", v)} />
        </>
      )}
      guardar={guardar} borrar={borrar} alCambiar={refrescar}
    />
  );
}

// ---------- Reportes: lo más vendido, stock bajo y los mensajes que dejó la gente en "Contacto" ----------
function AdminReportes() {
  const refrescar = useRefrescar();
  const [aviso, setAviso] = React.useState(null);

  const vendidos = {};
  ventasValidas().forEach((o) => o.items.forEach((i) => { vendidos[i.nombre] = (vendidos[i.nombre] || 0) + i.cantidad; }));
  const mejor = Object.entries(vendidos).sort((a, b) => b[1] - a[1])[0];
  const bajos = DB.productos().filter((p) => DB.stockDe(p.id) <= 5);
  const mensajes = DB.mensajes().slice().sort((a, b) => b.id - a.id);

  function marcarLeido(id) {
    DB.guardarMensajes(DB.mensajes().map((m) => (m.id === id ? { ...m, leido: true } : m)));
    refrescar();
  }
  function eliminar(id) {
    if (!window.confirm("¿Seguro que quieres eliminarlo?")) return;
    DB.guardarMensajes(DB.mensajes().filter((m) => m.id !== id));
    setAviso({ texto: "Mensaje eliminado." });
    refrescar();
  }

  return (
    <div>
      <div className="kpis">
        <Kpi titulo="Más vendido" valor={mejor ? mejor[0] + " (" + mejor[1] + ")" : "—"} />
        <Kpi titulo="Stock bajo" valor={bajos.length ? bajos.map((p) => p.nombre + ": " + DB.stockDe(p.id)).join(" · ") : "Todo bien"} alerta={bajos.length > 0} />
      </div>
      <h2>Mensajes de clientes ({mensajes.length})</h2>
      <Aviso aviso={aviso} />
      {mensajes.length === 0 && <p className="vacio">Nadie ha dejado mensajes todavía.</p>}
      {mensajes.map((m) => (
        <div key={m.id} className="caja mensaje">
          <p><strong>{m.nombre}</strong> · {m.email} · {m.fecha} {!m.leido && <span className="chip estado-Pendiente">Nuevo</span>}</p>
          <p>{m.texto}</p>
          <div className="fila-botones">
            {!m.leido && <button className="sec chico" onClick={() => marcarLeido(m.id)}>Marcar como leído</button>}
            <button className="peligro chico" onClick={() => eliminar(m.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Perfil: los datos del administrador que inició sesión ----------
function AdminPerfil({ usuario, onUsuarioCambio }) {
  const [form, setForm] = React.useState({ nombre: usuario.nombre, email: usuario.email, telefono: usuario.telefono || "", clave: "" });
  const [error, setError] = React.useState("");
  const [aviso, setAviso] = React.useState(null);

  function guardar(e) {
    e.preventDefault();
    let msg = DB.validarUsuario(form.nombre, form.email, usuario.id);
    if (!msg && form.clave !== "" && form.clave.length < 4) msg = "La contraseña debe tener al menos 4 caracteres.";
    if (msg) { setError(msg); setAviso(null); return; }
    DB.guardarUsuarios(DB.usuarios().map((u) => (u.id === usuario.id ? { ...u, nombre: form.nombre.trim(), email: form.email.trim(), telefono: form.telefono.trim(), clave: form.clave === "" ? u.clave : form.clave } : u)));
    setError("");
    setAviso({ texto: "Perfil actualizado." });
    onUsuarioCambio();   // App vuelve a leer al usuario (cambia el nombre arriba)
  }

  return (
    <div>
      <Aviso aviso={aviso} />
      <form className="caja" onSubmit={guardar} noValidate>
        <div className="campos">
          <Campo etiqueta="Nombre" valor={form.nombre} onCambio={(v) => setForm({ ...form, nombre: v })} />
          <Campo etiqueta="Correo" valor={form.email} onCambio={(v) => setForm({ ...form, email: v })} />
          <Campo etiqueta="Teléfono" valor={form.telefono} onCambio={(v) => setForm({ ...form, telefono: v })} />
          <Campo etiqueta="Nueva contraseña (vacía = no cambiarla)" tipo="password" valor={form.clave} onCambio={(v) => setForm({ ...form, clave: v })} />
        </div>
        <p className="error-form">{error}</p>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
