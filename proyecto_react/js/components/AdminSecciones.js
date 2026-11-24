// AdminSecciones.js — las 7 secciones del panel: Dashboard, Órdenes, Productos,
// Categorías, Usuarios, Reportes y Perfil. Cada una lee los datos de DB (copia de lo que viene del backend) y guarda llamando a la API REST con api(...).

const ESTADOS = ["Pendiente", "Enviada", "Entregada", "Cancelada"];

function ventasValidas() {   // las órdenes canceladas no suman
  return DB.ordenes().filter((o) => o.estado !== "Cancelada");
}

// Mensaje de error legible para mostrar en pantalla
function textoError(err) { return err && err.message ? err.message : "Ocurrió un error."; }

// El backend recibe el producto completo en PUT: se arma con los datos actuales + los cambios
function cuerpoProducto(p, cambios) {
  return { nombre: p.nombre, categoria: p.categoria, plataforma: p.plataforma, precio: p.precio, descuento: p.descuento || 0, stock: p.stock,
           estrellas: p.estrellas, video: p.video, imagen: p.imagen, galeria: p.galeria || [], generos: p.generos || [], descripcion: p.descripcion, ...cambios };
}

// Validación rápida en pantalla (el backend vuelve a validar): nombre, correo válido y no repetido
function validarUsuario(nombre, email, idActual) {
  if (nombre.trim().length < 3) return "El nombre debe tener al menos 3 letras.";
  if (!DB.emailValido(email.trim())) return "El correo no es válido.";
  const repetido = DB.usuarios().some((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.id != idActual);
  return repetido ? "Ese correo ya lo usa otro usuario." : "";
}

// ---------- Dashboard: números del negocio (calculados en el backend) + un ejemplo para cambiar el stock ----------
function AdminDashboard() {
  const refrescar = useRefrescar();
  const [producto, setProducto] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [aviso, setAviso] = React.useState(null);
  const [resumen, setResumen] = React.useState(null);

  function cargarResumen() {
    api("GET", "/api/reportes/resumen").then(setResumen).catch((err) => setAviso({ texto: textoError(err), malo: true }));
  }
  React.useEffect(cargarResumen, []);

  const productos = DB.productos();
  const elegido = producto || (productos.length ? productos[0].id : "");

  async function guardarStock(e) {
    e.preventDefault();
    const n = Number(stock);
    if (elegido === "" || stock === "" || !Number.isInteger(n) || n < 0) {
      setAviso({ texto: "El stock debe ser un número entero (0 o más).", malo: true });
      return;
    }
    try {
      const p = DB.producto(elegido);
      await api("PUT", "/api/productos/" + p.id, cuerpoProducto(p, { stock: n }));   // la tienda lee este mismo stock
      await DB.cargarTienda();
      setStock("");
      setAviso({ texto: "Stock actualizado." });
      cargarResumen();
      refrescar();
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
  }

  return (
    <div>
      <div className="kpis">
        <Kpi titulo="Ventas totales" valor={resumen ? pesos(resumen.ventasTotales) : "…"} />
        <Kpi titulo="Órdenes" valor={resumen ? resumen.ordenes : "…"} />
        <Kpi titulo="Productos" valor={resumen ? resumen.productos : "…"} />
        <Kpi titulo="Usuarios" valor={resumen ? resumen.usuarios : "…"} />
        <Kpi titulo="Mensajes nuevos" valor={resumen ? resumen.mensajesNuevos : "…"} alerta={resumen && resumen.mensajesNuevos > 0} />
      </div>

      <h2>Cambiar el stock de un producto</h2>
      <Aviso aviso={aviso} />
      <form className="caja" onSubmit={guardarStock} noValidate>
        <div className="campos">
          <label>Producto
            <select value={elegido} onChange={(e) => setProducto(e.target.value)}>
              {productos.map((p) => <option key={p.id} value={p.id}>{p.nombre} (stock {p.stock})</option>)}
            </select>
          </label>
          <Campo etiqueta="Nuevo stock" tipo="number" valor={stock} onCambio={setStock} />
        </div>
        <button type="submit">Guardar stock</button>
      </form>
    </div>
  );
}

// ---------- Órdenes: cambiar el estado o eliminar ----------
function AdminOrdenes() {
  const refrescar = useRefrescar();
  const [aviso, setAviso] = React.useState(null);
  const lista = DB.ordenes().slice().sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id.localeCompare(a.id));

  async function cambiarEstado(id, estado) {
    try {
      await api("PUT", "/api/ordenes/" + id + "/estado", { estado: estado.toUpperCase() });
      await Promise.all([DB.cargarAdmin(), DB.cargarTienda()]);   // si se cancela, el backend devuelve el stock
      setAviso({ texto: "Estado de la orden actualizado." });
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
    refrescar();
  }
  async function eliminar(id) {
    if (!window.confirm("¿Seguro que quieres eliminarlo?")) return;
    try {
      await api("DELETE", "/api/ordenes/" + id);
      await DB.cargarAdmin();
      setAviso({ texto: "Orden eliminada." });
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
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
  const lista = DB.productos().map((p) => ({ ...p }));

  async function guardar(f, esNuevo) {
    const todos = DB.productos();
    const nombre = f.nombre.trim(), precio = Number(f.precio), stock = Number(f.stock), descuento = Number(f.descuento || 0);
    if (nombre.length < 3) return "El nombre debe tener al menos 3 letras.";
    if (todos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id !== f.id)) return "Ya existe un producto con ese nombre.";
    if (!f.categoria) return "Elige una categoría.";
    if (!Number.isInteger(precio) || precio <= 0) return "El precio debe ser un número entero mayor a 0.";
    if (!Number.isInteger(descuento) || descuento < 0 || descuento > 90) return "El descuento debe ser un número entero entre 0 y 90.";
    if (f.stock === "" || !Number.isInteger(stock) || stock < 0) return "El stock debe ser un número entero (0 o más).";
    if (!String(f.imagen || "").trim()) return "Falta la ruta de la imagen (ej: steam/terraria.jpg).";
    const datos = { nombre: nombre, categoria: f.categoria, precio: precio, descuento: descuento, stock: stock, imagen: f.imagen.trim() };
    try {
      if (esNuevo) {
        await api("POST", "/api/productos", { plataforma: "PC", estrellas: "★★★★☆", video: "", generos: [f.categoria], descripcion: "Sin descripción.", galeria: [], ...datos });
      } else {
        await api("PUT", "/api/productos/" + f.id, cuerpoProducto(DB.producto(f.id), datos));
      }
      await DB.cargarTienda();
      return "";
    } catch (err) {
      return textoError(err);
    }
  }
  async function borrar(p) {
    try {
      await api("DELETE", "/api/productos/" + p.id);
      DB.guardarCarrito(DB.carrito().filter((i) => i.id !== p.id));   // que no quede en ningún carrito
      await DB.cargarTienda();
      return { texto: "Producto eliminado." };
    } catch (err) {
      return { texto: textoError(err), malo: true };
    }
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

  async function guardar(f, esNuevo) {
    const nombre = f.nombre.trim(), todas = DB.categorias();
    if (nombre.length < 3) return "El nombre debe tener al menos 3 letras.";
    if (todas.some((c) => c.nombre.toLowerCase() === nombre.toLowerCase() && c.id !== f.id)) return "Esa categoría ya existe.";
    try {
      if (esNuevo) await api("POST", "/api/categorias", { nombre: nombre });
      else await api("PUT", "/api/categorias/" + f.id, { nombre: nombre });   // el backend mantiene los productos de esa categoría
      await DB.cargarTienda();
      return "";
    } catch (err) {
      return textoError(err);
    }
  }
  async function borrar(c) {
    if (c.usados > 0) return { texto: 'No se puede eliminar "' + c.nombre + '": la usan ' + c.usados + " producto(s).", malo: true };
    try {
      await api("DELETE", "/api/categorias/" + c.id);
      await DB.cargarTienda();
      return { texto: "Categoría eliminada." };
    } catch (err) {
      return { texto: textoError(err), malo: true };
    }
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
  const lista = DB.usuarios().map((u) => ({ ...u, clave: "" }));   // el backend nunca envía las contraseñas

  async function guardar(f, esNuevo) {
    const msg = validarUsuario(f.nombre, f.email, esNuevo ? 0 : f.id);
    if (msg) return msg;
    if (esNuevo && f.clave.length < 4) return "La contraseña debe tener al menos 4 caracteres.";
    if (!esNuevo && f.clave !== "" && f.clave.length < 4) return "La contraseña debe tener al menos 4 caracteres.";
    const cuerpo = { nombre: f.nombre.trim(), email: f.email.trim(), rol: f.rol, clave: f.clave, telefono: f.telefono || "", region: f.region || "", comuna: f.comuna || "" };
    try {
      if (esNuevo) await api("POST", "/api/usuarios", cuerpo);
      else await api("PUT", "/api/usuarios/" + f.id, cuerpo);   // clave vacía = el backend no la cambia
      await DB.cargarAdmin();
      return "";
    } catch (err) {
      return textoError(err);
    }
  }
  async function borrar(u) {
    if (u.id === usuario.id) return { texto: "No puedes eliminar tu propio usuario.", malo: true };
    try {
      await api("DELETE", "/api/usuarios/" + u.id);
      await DB.cargarAdmin();
      return { texto: "Usuario eliminado." };
    } catch (err) {
      return { texto: textoError(err), malo: true };
    }
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
  const bajos = DB.productos().filter((p) => p.stock <= 5);
  const mensajes = DB.mensajes().slice().sort((a, b) => b.id - a.id);

  async function marcarLeido(id) {
    try {
      await api("PUT", "/api/mensajes/" + id + "/leido", { leido: true });
      await DB.cargarAdmin();
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
    refrescar();
  }
  async function eliminar(id) {
    if (!window.confirm("¿Seguro que quieres eliminarlo?")) return;
    try {
      await api("DELETE", "/api/mensajes/" + id);
      await DB.cargarAdmin();
      setAviso({ texto: "Mensaje eliminado." });
    } catch (err) {
      setAviso({ texto: textoError(err), malo: true });
    }
    refrescar();
  }

  return (
    <div>
      <div className="kpis">
        <Kpi titulo="Más vendido" valor={mejor ? mejor[0] + " (" + mejor[1] + ")" : "—"} />
        <Kpi titulo="Stock bajo" valor={bajos.length ? bajos.map((p) => p.nombre + ": " + p.stock).join(" · ") : "Todo bien"} alerta={bajos.length > 0} />
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

  async function guardar(e) {
    e.preventDefault();
    let msg = validarUsuario(form.nombre, form.email, usuario.id);
    if (!msg && form.clave !== "" && form.clave.length < 4) msg = "La contraseña debe tener al menos 4 caracteres.";
    if (msg) { setError(msg); setAviso(null); return; }
    try {
      const actualizado = await Auth.actualizarPerfil({ nombre: form.nombre.trim(), email: form.email.trim(), telefono: form.telefono.trim(), clave: form.clave });
      setError("");
      setForm({ ...form, clave: "" });
      setAviso({ texto: "Perfil actualizado." });
      onUsuarioCambio(actualizado);   // App guarda al usuario nuevo (cambia el nombre arriba)
    } catch (err) {
      setError(textoError(err)); setAviso(null);
    }
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
