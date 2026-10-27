import Link from 'next/link';

export const metadata = { title: 'Sin conexión · Mis Plantas' };

// Página propia que el Service Worker muestra si no hay internet
// y la página pedida no estaba guardada en la caché.
export default function SinConexion() {
  return (
    <div className="sin-conexion">
      <img src="/icons/icon-192.png" alt="" width="96" height="96" />
      <h1>Estás sin conexión</h1>
      <p>
        No pudimos cargar esta página. Las plantas que ya abriste antes se pueden seguir viendo; el
        resto aparece cuando vuelva la conexión.
      </p>
      <Link href="/" className="boton">Ir al listado</Link>
    </div>
  );
}
