'use client';

import { useState } from 'react';
import Link from 'next/link';
import BotonFavorito from './BotonFavorito';

// Client Component: recibe las plantas ya cargadas por el servidor
// y las filtra en el navegador con el buscador (estado propio).
export default function ListaPlantas({ plantas }) {
  const [busqueda, setBusqueda] = useState('');
  const [ubicacion, setUbicacion] = useState('todas');

  const texto = busqueda.trim().toLowerCase();
  const filtradas = plantas.filter((planta) => {
    const coincideTexto =
      planta.nombre.toLowerCase().includes(texto) ||
      planta.especie.toLowerCase().includes(texto);
    const coincideUbicacion =
      ubicacion === 'todas' ||
      (ubicacion === 'interior' && planta.interior) ||
      (ubicacion === 'exterior' && !planta.interior);
    return coincideTexto && coincideUbicacion;
  });

  return (
    <>
      <div className="filtros">
        <label className="filtros__buscar">
          <span>Buscar</span>
          <input
            type="search"
            placeholder="Nombre o especie…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>
        <label>
          <span>Ubicación</span>
          <select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
            <option value="todas">Todas</option>
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
          </select>
        </label>
      </div>

      <p className="contador">
        {filtradas.length} de {plantas.length} plantas
      </p>

      {filtradas.length === 0 ? (
        <div className="aviso">No hay plantas que coincidan con la búsqueda.</div>
      ) : (
        <ul className="grilla">
          {filtradas.map((planta) => (
            <li key={planta.id} className="tarjeta">
              <Link href={`/plantas/${planta.id}`} className="tarjeta__enlace">
                <h2>{planta.nombre}</h2>
                <p className="especie">{planta.especie}</p>
                <p className="etiquetas">
                  <span className="etiqueta">💧 cada {planta.dias_riego} d</span>
                  <span className="etiqueta">{planta.interior ? '🏠 Interior' : '☀️ Exterior'}</span>
                </p>
              </Link>
              <BotonFavorito id={planta.id} chico />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
