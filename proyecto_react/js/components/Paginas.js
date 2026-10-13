// ============================================================
// Paginas.js — "Nosotros" (solo texto) y "Contacto" (formulario que guarda el mensaje).
// El administrador ve los mensajes en Reportes.
// ============================================================

function Nosotros() {
  return (
    <div className="contenedor">
      <h2 className="centro">Sobre Nosotros</h2>
      <p>
        Somos VEG, una tienda en línea dedicada 100% al mundo gamer. El propósito de la tienda es reunir en un solo
        lugar los mejores videojuegos y consolas, tanto de plataformas como Steam como de Nintendo, para que cualquier
        jugador encuentre lo que busca sin recorrer mil sitios distintos.
      </p>
      <p>
        Nuestro catálogo incluye desde los últimos lanzamientos hasta joyas indie, pasando por consolas y accesorios gamer.
        Además, en nuestra sección de <a href="#/blogs">Blogs</a> compartimos noticias, novedades y consejos sobre el mundo
        de los videojuegos, para que estés siempre al día.
      </p>
      <div className="tres-col">
        <div>
          <h4>Nuestra misión</h4>
          <p>Acercar el mundo de los videojuegos a todos los jugadores de Chile, con un catálogo variado, precios claros y accesibles junto a una experiencia de compra simple.</p>
        </div>
        <div>
          <h4>Nuestra visión</h4>
          <p>Ser la tienda online de videojuegos de referencia para la comunidad gamer, reconocida por su variedad de productos y buen servicio.</p>
        </div>
        <div>
          <h4>Nuestros valores</h4>
          <p>Pasión por los videojuegos, cercanía con nuestros clientes y compromiso con la calidad de cada producto que ofrecemos.</p>
        </div>
      </div>
    </div>
  );
}

function Contacto({ usuario }) {
  const [form, setForm] = React.useState({ nombre: usuario ? usuario.nombre : "", correo: usuario ? usuario.email : "", texto: "" });
  const [aviso, setAviso] = React.useState(null);   // { texto, ok }

  function enviar(e) {
    e.preventDefault();
    let error = "";
    if (form.nombre.trim().length < 3) error = "El nombre debe tener al menos 3 letras.";
    else if (!DB.emailValido(form.correo.trim())) error = "El correo no es válido.";
    else if (form.texto.trim().length < 10) error = "El mensaje debe tener al menos 10 caracteres.";
    if (error) {
      setAviso({ texto: error, ok: false });
      return;
    }
    const mensajes = DB.mensajes();
    mensajes.push({ id: DB.siguienteId(mensajes), fecha: new Date().toISOString().slice(0, 10), nombre: form.nombre.trim(), email: form.correo.trim(), texto: form.texto.trim(), leido: false });
    DB.guardarMensajes(mensajes);
    setForm({ ...form, texto: "" });
    setAviso({ texto: "¡Mensaje enviado! Te responderemos pronto.", ok: true });
  }

  return (
    <div className="contenedor">
      <h2 className="centro">Contáctanos</h2>
      <form className="form-caja" onSubmit={enviar} noValidate>
        <div className="grupo"><label>Nombre completo</label><input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Registra tu nombre completo" /></div>
        <div className="grupo"><label>Correo</label><input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} placeholder="Registra tu correo" /></div>
        <div className="grupo"><label>Mensaje</label><textarea rows="4" value={form.texto} onChange={(e) => setForm({ ...form, texto: e.target.value })} placeholder="Escribe tu mensaje para la tienda"></textarea></div>
        <button type="submit" className="btn-comprar">Enviar mensaje</button>
        {aviso && <p className={"mensaje-form " + (aviso.ok ? "ok" : "error")}>{aviso.texto}</p>}
      </form>
    </div>
  );
}
