'use client';

import { useEffect, useState } from 'react';

// Client Component con estado propio: marca una planta como favorita.
// El favorito se guarda en localStorage para que siga marcado al volver.
export default function BotonFavorito({ id, chico = false }) {
  const [favorito, setFavorito] = useState(false);
  const clave = `favorito-planta-${id}`;

  useEffect(() => {
    try {
      setFavorito(localStorage.getItem(clave) === 'si');
    } catch {
      // Si el navegador no deja usar localStorage, el botón igual funciona.
    }
  }, [clave]);

  function alternar() {
    const nuevo = !favorito;
    setFavorito(nuevo);
    try {
      if (nuevo) localStorage.setItem(clave, 'si');
      else localStorage.removeItem(clave);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className={`favorito ${favorito ? 'favorito--activo' : ''} ${chico ? 'favorito--chico' : ''}`}
      aria-pressed={favorito}
      aria-label={favorito ? 'Quitar de favoritas' : 'Marcar como favorita'}
    >
      {favorito ? '★' : '☆'}
      {!chico && <span>{favorito ? ' Favorita' : ' Marcar favorita'}</span>}
    </button>
  );
}
