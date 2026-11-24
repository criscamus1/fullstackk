// ============================================================
// api.js — comunicación con el backend (API REST) y manejo de la sesión con JWT.
// JavaScript normal (sin JSX). Los componentes NO usan fetch directo: llaman a api(...) o a Auth.
//
// Flujo de la sesión:
//   1) Login/registro -> el backend responde { accessToken, refreshToken, usuario }.
//   2) Los tokens se guardan en localStorage ("veg_sesion"): así la sesión sigue activa si se recarga la página.
//   3) Cada petición privada envía  Authorization: Bearer <accessToken>.
//   4) Si el backend responde 401 (token vencido) se pide uno nuevo con el refreshToken y se repite la petición.
//   5) Si el refreshToken también venció, se borra la sesión y se avisa a la app (evento "veg-sesion-expirada").
// ============================================================

// Dirección del backend. Si lo publicas en otro lugar, cambia solo esta línea.
const API_URL = "http://localhost:8080";

class ApiError extends Error {
  constructor(estado, mensaje) { super(mensaje); this.estado = estado; }
}

// ---------- Tokens guardados en el navegador ----------
const Sesion = {
  leer() {
    try { return JSON.parse(localStorage.getItem("veg_sesion")); } catch (e) { return null; }
  },
  guardar(respuesta) {
    localStorage.setItem("veg_sesion", JSON.stringify({ accessToken: respuesta.accessToken, refreshToken: respuesta.refreshToken }));
  },
  access() { const s = Sesion.leer(); return s ? s.accessToken : null; },
  refresh() { const s = Sesion.leer(); return s ? s.refreshToken : null; },
  borrar() { localStorage.removeItem("veg_sesion"); }
};

async function pedir(metodo, ruta, cuerpo, token) {
  const cabeceras = { "Content-Type": "application/json" };
  if (token) cabeceras["Authorization"] = "Bearer " + token;
  try {
    return await fetch(API_URL + ruta, { method: metodo, headers: cabeceras, body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo) });
  } catch (e) {
    throw new ApiError(0, "No se pudo conectar con el servidor. ¿Está encendido el backend (" + API_URL + ")?");
  }
}

async function procesar(respuesta) {
  if (respuesta.status === 204) return null;
  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new ApiError(respuesta.status, (datos && datos.mensaje) || "Error " + respuesta.status);
  }
  return datos;
}

// Pide un access token nuevo con el refresh token. Devuelve true si funcionó.
async function renovarToken() {
  try {
    const r = await pedir("POST", "/api/auth/refresh", { refreshToken: Sesion.refresh() });
    if (!r.ok) throw new Error("refresh rechazado");
    Sesion.guardar(await r.json());
    return true;
  } catch (e) {
    Sesion.borrar();                                          // el refresh también venció: sesión cerrada
    window.dispatchEvent(new Event("veg-sesion-expirada"));   // App.js escucha este aviso y manda al login
    return false;
  }
}

// api("GET", "/api/productos")  ·  api("POST", "/api/productos", { ... })
// publico = true -> no envía token (login, registro, refresh)
async function api(metodo, ruta, cuerpo, publico) {
  let respuesta = await pedir(metodo, ruta, cuerpo, publico ? null : Sesion.access());
  if (respuesta.status === 401 && !publico && Sesion.refresh()) {
    if (await renovarToken()) respuesta = await pedir(metodo, ruta, cuerpo, Sesion.access());
  }
  return procesar(respuesta);
}

// ---------- Usuario con sesión ----------
const Auth = {
  usuario: null,   // { id, nombre, email, rol: "admin" | "cliente", ... } o null

  // Se llama al abrir la página: si hay tokens guardados, pregunta al backend quién es el usuario.
  async restaurar() {
    if (!Sesion.leer()) return null;
    try {
      Auth.usuario = await api("GET", "/api/auth/me");
    } catch (e) {
      if (e.estado !== 0) Sesion.borrar();   // token inválido -> sesión cerrada (si fue un corte de red, se conserva)
      Auth.usuario = null;
      if (e.estado === 0) throw e;
    }
    return Auth.usuario;
  },
  async login(email, clave) {
    const r = await api("POST", "/api/auth/login", { email: email.trim(), clave: clave }, true);
    Sesion.guardar(r);
    Auth.usuario = r.usuario;
    return r.usuario;
  },
  async registro(datos) {
    const r = await api("POST", "/api/auth/registro", datos, true);
    Sesion.guardar(r);
    Auth.usuario = r.usuario;
    return r.usuario;
  },
  async actualizarPerfil(datos) {
    const r = await api("PUT", "/api/auth/perfil", datos);
    Sesion.guardar(r);   // el correo (dentro del token) pudo cambiar: se guardan tokens nuevos
    Auth.usuario = r.usuario;
    return r.usuario;
  },
  salir() {
    Sesion.borrar();
    Auth.usuario = null;
  },
  esAdmin() { return Auth.usuario !== null && Auth.usuario.rol === "admin"; }
};
