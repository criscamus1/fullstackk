// ============================================================
// Carrito.js — el carrito, el checkout (con región y comuna) y las vistas de compra exitosa / con error.
// ============================================================

// Props: carrito (lista [{id, cantidad}] que viene desde App) y onCambio (para avisar que cambió)
function Carrito({ carrito, onCambio }) {
  if (carrito.length === 0) {
    return (
      <div className="contenedor">
        <h2>Mi carrito</h2>
        <div className="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <a href="#/productos" className="btn-comprar">Ver productos</a>
        </div>
      </div>
    );
  }

  function cambiar(id, delta) {
    DB.cambiarCarrito(id, delta);
    onCambio();
  }
  function vaciar() {
    DB.vaciarCarrito();   // devuelve el stock
    onCambio();
  }

  return (
    <div className="contenedor">
      <h2>Mi carrito</h2>
      <div className="carrito-layout">
        <div className="tabla-carrito">
          <table>
            <thead>
              <tr><th></th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
            </thead>
            <tbody>
              {carrito.map((i) => {
                const p = DB.producto(i.id);
                if (!p) return null;
                return (
                  <tr key={i.id}>
                    <td><img src={p.imagen} alt={p.nombre} className="mini-carrito" /></td>
                    <td><a href={"#/productos/" + p.id}>{p.nombre}</a></td>
                    <td>{pesos(DB.precioFinal(p))}</td>
                    <td className="cantidad">
                      <button className="btn-cant" onClick={() => cambiar(p.id, -1)}>−</button>
                      <span>{i.cantidad}</span>
                      <button className="btn-cant" onClick={() => cambiar(p.id, 1)} disabled={DB.stockDe(p.id) <= 0}>+</button>
                    </td>
                    <td>{pesos(DB.precioFinal(p) * i.cantidad)}</td>
                    <td><button className="btn-quitar" onClick={() => cambiar(p.id, -i.cantidad)}>✕</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <aside className="resumen-carrito">
          <h4>Resumen</h4>
          <p>Productos: <strong>{DB.cantidadCarrito()}</strong></p>
          <p className="total">Total: {pesos(DB.totalCarrito())}</p>
          <a href="#/checkout" className="btn-comprar">Ir a pagar</a>
          <button className="btn-secundario" onClick={vaciar}>Vaciar carrito</button>
        </aside>
      </div>
    </div>
  );
}

// ---------- Checkout: cada campo del formulario es parte del estado "form" ----------
// Props: carrito, usuario (para rellenar datos si hay sesión) y onResultado (App muestra éxito o error).
function Checkout({ carrito, usuario, onResultado }) {
  const [form, setForm] = React.useState({
    nombre: usuario ? usuario.nombre : "", apellidos: "", correo: usuario ? usuario.email : "",
    calle: "", region: usuario && usuario.region ? usuario.region : "", comuna: usuario && usuario.comuna ? usuario.comuna : "",
    pago: "aprobada"
  });
  const [error, setError] = React.useState("");

  function cambiar(campo, valor) {
    setForm({ ...form, [campo]: valor });   // copia el formulario y cambia solo ese campo
  }
  function cambiarRegion(region) {
    setForm({ ...form, region: region, comuna: "" });   // al cambiar de región, la comuna anterior ya no sirve
  }

  if (carrito.length === 0) {
    return (
      <div className="contenedor">
        <div className="carrito-vacio"><p>No hay nada que pagar: tu carrito está vacío.</p><a href="#/productos" className="btn-comprar">Ver productos</a></div>
      </div>
    );
  }

  function pagar(e) {
    e.preventDefault();
    if (!form.nombre.trim() || !form.apellidos.trim() || !form.calle.trim() || !form.region || !form.comuna) {
      setError("Completa todos los campos obligatorios (*).");
      return;
    }
    if (!DB.emailValido(form.correo.trim())) {
      setError("El correo no es válido.");
      return;
    }
    const direccion = form.calle + ", " + form.comuna + ", " + form.region;
    const total = DB.totalCarrito();
    if (form.pago === "rechazada") {   // simulación: la tarjeta de prueba "rechazada" muestra la vista de error
      onResultado({ exito: false, total: total, direccion: direccion });
      return;
    }
    const orden = DB.crearOrden(form.nombre.trim() + " " + form.apellidos.trim());   // guarda la orden y vacía el carrito
    onResultado({ exito: true, orden: orden, total: total, direccion: direccion, correo: form.correo.trim() });
  }

  return (
    <div className="contenedor">
      <h2 className="centro">Checkout</h2>
      <p className="centro">Total a pagar: <strong>{pesos(DB.totalCarrito())}</strong></p>
      <form className="form-caja ancha" onSubmit={pagar} noValidate>
        <div className="fila-2">
          <div className="grupo"><label>Nombre*</label><input value={form.nombre} onChange={(e) => cambiar("nombre", e.target.value)} /></div>
          <div className="grupo"><label>Apellidos*</label><input value={form.apellidos} onChange={(e) => cambiar("apellidos", e.target.value)} /></div>
        </div>
        <div className="grupo"><label>Correo*</label><input type="email" value={form.correo} onChange={(e) => cambiar("correo", e.target.value)} /></div>
        <div className="grupo"><label>Calle y número*</label><input value={form.calle} onChange={(e) => cambiar("calle", e.target.value)} /></div>
        <div className="fila-2">
          <div className="grupo">
            <label>Región*</label>
            <select value={form.region} onChange={(e) => cambiarRegion(e.target.value)}>
              <option value="">Selecciona una región</option>
              {DB.regiones().map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="grupo">
            <label>Comuna*</label>
            <select value={form.comuna} onChange={(e) => cambiar("comuna", e.target.value)} disabled={!form.region}>
              <option value="">{form.region ? "Selecciona una comuna" : "Primero elige una región"}</option>
              {DB.comunas(form.region).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="grupo">
          <label>Método de pago (simulado)</label>
          <select value={form.pago} onChange={(e) => cambiar("pago", e.target.value)}>
            <option value="aprobada">Tarjeta de prueba — aprobada</option>
            <option value="rechazada">Tarjeta de prueba — rechazada</option>
          </select>
        </div>
        <p className="error mensaje-form">{error}</p>
        <button type="submit" className="btn-comprar" style={{ width: "100%" }}>Pagar {pesos(DB.totalCarrito())}</button>
      </form>
    </div>
  );
}

// ---------- Resultado de la compra: "Se ha realizado la compra" o "No se pudo realizar el pago" ----------
function ResultadoCompra({ resultado, exito }) {
  if (!resultado || resultado.exito !== exito) {
    return <div className="contenedor"><p>No hay ninguna compra para mostrar. <a href="#/productos">Ir a comprar</a></p></div>;
  }
  if (!exito) {
    return (
      <div className="contenedor">
        <div className="resultado fallo">
          <h2>✗ No se pudo realizar el pago</h2>
          <p>Tu tarjeta fue rechazada. No se te cobró nada y tu carrito sigue igual.</p>
          <div className="botones">
            <a href="#/checkout" className="btn-comprar">Volver a intentar el pago</a>
            <a href="#/carrito" className="btn-secundario">Volver al carrito</a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="contenedor">
      <div className="resultado exito">
        <h2>✓ Se ha realizado la compra</h2>
        <p>Número de orden: <strong>{resultado.orden.id}</strong></p>
        <ul>
          {resultado.orden.items.map((i) => <li key={i.id}>{i.nombre} x{i.cantidad} — {pesos(i.precio * i.cantidad)}</li>)}
        </ul>
        <p className="total">Total pagado: {pesos(resultado.total)}</p>
        <p>Entrega en: {resultado.direccion}</p>
        <div className="botones">
          <a href="#/" className="btn-comprar">Volver al inicio</a>
          <a href="#/productos" className="btn-secundario">Seguir comprando</a>
        </div>
      </div>
    </div>
  );
}
