// Todas las peticiones a la API de Laravel se hacen desde el servidor de Next
// (Server Components), por eso no hay problemas de CORS.
const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api';

// Devuelve { datos, error }. Nunca lanza una excepción, así la página no se rompe.
async function pedir(ruta) {
  let res;
  try {
    res = await fetch(`${API_URL}${ruta}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
  } catch {
    return {
      datos: null,
      error: 'No se pudo conectar con la API. ¿Está corriendo "php artisan serve"?',
    };
  }

  if (!res.ok) {
    if (res.status === 404) {
      return { datos: null, error: 'No existe una planta con ese id.', status: 404 };
    }
    return { datos: null, error: `La API respondió con un error (${res.status}).`, status: res.status };
  }

  return { datos: await res.json(), error: null };
}

export function obtenerPlantas() {
  return pedir('/plantas');
}

export function obtenerPlanta(id) {
  return pedir(`/plantas/${encodeURIComponent(id)}`);
}
