// ============================================================
// Cuenta.js — iniciar sesión y registrarse.
// El login y el registro llaman al backend (Auth.login / Auth.registro). El backend responde con los tokens JWT,
// que se guardan en localStorage para que la sesión siga activa al recargar la página.
// Props: onLogin(usuario) — App guarda al usuario y cambia de página.
// ============================================================

function Login({ onLogin }) {
  const [form, setForm] = React.useState({ correo: "", clave: "" });
  // Mensaje que dejó la app, por ejemplo "Inicia sesión para continuar." o "Tu sesión expiró."
  const [error, setError] = React.useState(() => {
    const aviso = sessionStorage.getItem("veg_aviso") || "";
    sessionStorage.removeItem("veg_aviso");
    return aviso;
  });

  const [enviando, setEnviando] = React.useState(false);

  async function entrar(e) {
    e.preventDefault();
    if (!form.correo.trim() || !form.clave) {
      setError("Escribe tu correo y tu contraseña.");
      return;
    }
    setEnviando(true);
    try {
      onLogin(await Auth.login(form.correo, form.clave));
    } catch (err) {
      setError(err.message);   // "Correo o contraseña incorrectos." o "No se pudo conectar..."
      setEnviando(false);
    }
  }

  return (
    <div className="contenedor">
      <h2 className="centro">Bienvenido a VEG</h2>
      <form className="form-caja" onSubmit={entrar} noValidate>
        <div className="grupo"><label>Correo electrónico</label><input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} /></div>
        <div className="grupo"><label>Contraseña</label><input type="password" value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} /></div>
        <button type="submit" className="btn-comprar" disabled={enviando}>{enviando ? "Entrando…" : "Iniciar sesión"}</button>
        <p className="error mensaje-form">{error}</p>
        <p>¿No tienes cuenta? <a href="#/registro">Regístrate aquí</a></p>
        <p style={{ fontSize: ".85rem", color: "var(--text-muted)" }}>
          Para probar — cliente: juan@example.com / 1234 · administrador: admin@tiendavirtual.cl / admin123
        </p>
      </form>
    </div>
  );
}

function Registro({ onLogin }) {
  const [form, setForm] = React.useState({ nombre: "", correo: "", confcorreo: "", clave: "", confclave: "", telefono: "", region: "", comuna: "" });
  const [error, setError] = React.useState("");

  function cambiar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  const [enviando, setEnviando] = React.useState(false);

  async function registrar(e) {
    e.preventDefault();
    let msg = "";
    if (form.nombre.trim().length < 3) msg = "El nombre debe tener al menos 3 letras.";
    if (!msg && !DB.emailValido(form.correo.trim())) msg = "El correo no es válido.";
    if (!msg && form.correo.trim() !== form.confcorreo.trim()) msg = "Los correos no coinciden.";
    if (!msg && form.clave.length < 4) msg = "La contraseña debe tener al menos 4 caracteres.";
    if (!msg && form.clave !== form.confclave) msg = "Las contraseñas no coinciden.";
    if (!msg && (!form.region || !form.comuna)) msg = "Elige tu región y tu comuna.";
    if (msg) {
      setError(msg);
      return;
    }
    setEnviando(true);
    try {
      // El backend crea el usuario (siempre con rol cliente), guarda la contraseña cifrada y devuelve los tokens
      onLogin(await Auth.registro({ nombre: form.nombre.trim(), email: form.correo.trim(), clave: form.clave, telefono: form.telefono.trim(), region: form.region, comuna: form.comuna }));
    } catch (err) {
      setError(err.message);   // por ejemplo: "Ese correo ya está registrado."
      setEnviando(false);
    }
  }

  return (
    <div className="contenedor">
      <h2 className="centro">Registrar en VEG</h2>
      <form className="form-caja" onSubmit={registrar} noValidate>
        <div className="grupo"><label>Nombre completo</label><input value={form.nombre} onChange={(e) => cambiar("nombre", e.target.value)} /></div>
        <div className="grupo"><label>Correo electrónico</label><input type="email" value={form.correo} onChange={(e) => cambiar("correo", e.target.value)} /></div>
        <div className="grupo"><label>Confirmar correo</label><input type="email" value={form.confcorreo} onChange={(e) => cambiar("confcorreo", e.target.value)} /></div>
        <div className="grupo"><label>Contraseña</label><input type="password" value={form.clave} onChange={(e) => cambiar("clave", e.target.value)} /></div>
        <div className="grupo"><label>Confirmar contraseña</label><input type="password" value={form.confclave} onChange={(e) => cambiar("confclave", e.target.value)} /></div>
        <div className="grupo"><label>Teléfono (opcional)</label><input value={form.telefono} onChange={(e) => cambiar("telefono", e.target.value)} /></div>
        <div className="fila-2">
          <div className="grupo">
            <label>Región</label>
            <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value, comuna: "" })}>
              <option value="">Región</option>
              {DB.regiones().map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="grupo">
            <label>Comuna</label>
            <select value={form.comuna} onChange={(e) => cambiar("comuna", e.target.value)} disabled={!form.region}>
              <option value="">Comuna</option>
              {DB.comunas(form.region).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn-comprar" disabled={enviando}>{enviando ? "Creando cuenta…" : "Registrarme"}</button>
        <p className="error mensaje-form">{error}</p>
        <p>¿Ya tienes un usuario? <a href="#/login">Inicia sesión</a></p>
      </form>
    </div>
  );
}

// ---------- Mis compras: solo para usuarios con sesión (el backend devuelve únicamente SUS órdenes) ----------
function MisCompras() {
  const [estado, setEstado] = React.useState({ cargando: true, error: "" });

  React.useEffect(() => {
    DB.cargarMisOrdenes()
      .then(() => setEstado({ cargando: false, error: "" }))
      .catch((err) => setEstado({ cargando: false, error: err.message }));
  }, []);

  if (estado.cargando) return <div className="contenedor"><p>Cargando tus compras…</p></div>;
  if (estado.error) return <div className="contenedor"><p className="error">{estado.error}</p></div>;
  const lista = DB.misOrdenes();

  return (
    <div className="contenedor">
      <h2>Mis compras</h2>
      {lista.length === 0 && <p className="vacio">Todavía no has comprado nada. <a href="#/productos">Ir al catálogo</a></p>}
      {lista.map((o) => (
        <div key={o.id} className="caja">
          <p><strong>{o.id}</strong> · {o.fecha} · <span className={"chip estado-" + o.estado}>{o.estado}</span></p>
          <ul>{o.items.map((i) => <li key={i.id}>{i.nombre} x{i.cantidad} — {pesos(i.precio * i.cantidad)}</li>)}</ul>
          <p className="total">Total: {pesos(DB.totalOrden(o))}</p>
        </div>
      ))}
    </div>
  );
}

// ---------- Pantallas de acceso restringido ----------
function AccesoRestringido({ usuario }) {
  return (
    <div className="contenedor">
      <div className="resultado fallo">
        <h2>⛔ Acceso restringido (403)</h2>
        <p>{usuario ? "Tu cuenta (" + usuario.email + ") tiene rol \"" + usuario.rol + "\" y no tiene permisos para ver esta sección." : "No tienes permisos para ver esta sección."}</p>
        <div className="botones"><a href="#/" className="btn-comprar">Volver al inicio</a></div>
      </div>
    </div>
  );
}
