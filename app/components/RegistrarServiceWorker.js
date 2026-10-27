'use client';

import { useEffect } from 'react';

// Registra el Service Worker (public/sw.js) cuando carga la página.
export default function RegistrarServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registrado:', reg.scope))
        .catch((err) => console.error('No se pudo registrar el Service Worker:', err));
    }
  }, []);

  return null;
}
