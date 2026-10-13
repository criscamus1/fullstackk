// ============================================================
// Cuenta.js — iniciar sesión y registrarse.
// La sesión se guarda en localStorage (DB.iniciarSesion) y App la lee para saber quién está conectado.
// Props: onLogin(usuario) — App guarda al usuario y cambia de página.
// ============================================================

function Login({ onLogin }) {
  const [form, setForm] = React.useState({ correo: "", clave: "" });
  const [error, setError] = React.useState("");

  function entrar(e) {
    e.preventDefault();
    const usuario = DB.iniciarSesion(form.correo, form.clave);
    if (!usuario) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    onLogin(usuario);
  }

  return (
    <div className="contenedor">
      <h2 className="centro">Bienvenido a VEG</h2>
      <form className="form-caja" onSubmit={entrar} noValidate>
        <div className="grupo"><label>Correo electrónico</label><input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} /></div>
        <div className="grupo"><label>Contraseña</label><input type="password" value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} /></div>
        <button type="submit" className="btn-comprar">Iniciar sesión</button>
        <p className="error mensaje-form">{error}</p>
        <p>¿No tienes cuenta? <a href="#/registro">Regístrate aquí</a></p>
        <p style={{ fontSize: ".85rem", color: "var(--text-muted)" }}>
          Para probar — administrador: admin@tiendavirtual.cl / admin123 · cliente: juan@example.com / 1234
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

  function registrar(e) {
    e.preventDefault();
    let msg = DB.validarUsuario(form.nombre, form.correo, 0);   // nombre, correo válido y no repetido
    if (!msg && form.correo.trim() !== form.confcorreo.trim()) msg = "Los correos no coinciden.";
    if (!msg && form.clave.length < 4) msg = "La contraseña debe tener al menos 4 caracteres.";
    if (!msg && form.clave !== form.confclave) msg = "Las contraseñas no coinciden.";
    if (!msg && (!form.region || !form.comuna)) msg = "Elige tu región y tu comuna.";
    if (msg) {
      setError(msg);
      return;
    }
    const usuarios = DB.usuarios();
    usuarios.push({ id: DB.siguienteId(usuarios), nombre: form.nombre.trim(), email: form.correo.trim(), clave: form.clave, telefono: form.telefono.trim(), region: form.region, comuna: form.comuna, rol: "cliente" });
    DB.guardarUsuarios(usuarios);
    onLogin(DB.iniciarSesion(form.correo, form.clave));   // después de registrarse, entra directo
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
        <button type="submit" className="btn-comprar">Registrarme</button>
        <p className="error mensaje-form">{error}</p>
        <p>¿Ya tienes un usuario? <a href="#/login">Inicia sesión</a></p>
      </form>
    </div>
  );
}
