// ============================================================
// Blogs.js — lista de noticias y la página de una noticia (#/blogs/2).
// Los datos están en datos.js (blogsData).
// ============================================================

function Blogs() {
  return (
    <div className="contenedor">
      <h2>Noticias y novedades</h2>
      <div className="blogs-grid">
        {blogsData.map((blog) => (
          <a key={blog.id} href={"#/blogs/" + blog.id} className="blog-link">
            <div className="card-blogs">
              <img src={blog.imagen} alt={blog.titulo} />
              <div className="contenido-blog">
                <p className="fecha-blog">{blog.fecha}</p>
                <h3>{blog.titulo}</h3>
                <p>{blog.resumen}</p>
                <span className="leer-blog">Leer noticia →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function DetalleBlog({ id }) {
  const blog = blogsData.find((b) => b.id === Number(id));
  if (!blog) {
    return (
      <div className="contenedor articulo">
        <h2>Noticia no encontrada</h2>
        <a href="#/blogs" className="btn-comprar">← Volver a las noticias</a>
      </div>
    );
  }
  return (
    <div className="contenedor articulo">
      <h2>{blog.titulo}</h2>
      <p className="fecha-blog">{blog.fecha}</p>
      <img src={blog.imagen} alt={blog.titulo} className="imagen-detalle" />
      <p className="resumen-detalle">{blog.resumen}</p>
      {blog.parrafos.map((texto, i) => <p key={i}>{texto}</p>)}
      <a href="#/blogs" className="btn-comprar">← Volver a las noticias</a>
    </div>
  );
}
