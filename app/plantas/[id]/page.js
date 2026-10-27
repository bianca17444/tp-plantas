import Link from 'next/link';
import { obtenerPlanta } from '../../lib/api';
import BotonFavorito from '../../components/BotonFavorito';

function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
}

// Ruta dinámica: /plantas/1, /plantas/2, ...
export default async function DetallePlanta({ params }) {
  const { id } = await params;
  const { datos: planta, error } = await obtenerPlanta(id);

  if (error) {
    return (
      <>
        <div className="aviso aviso--error" role="alert">
          <strong>No se pudo mostrar la planta.</strong>
          <p>{error}</p>
        </div>
        <Link href="/" className="volver">← Volver al listado</Link>
      </>
    );
  }

  return (
    <>
      <Link href="/" className="volver">← Volver al listado</Link>

      <article className="detalle">
        <div className="detalle__cabecera">
          <div>
            <h1>{planta.nombre}</h1>
            <p className="especie">{planta.especie}</p>
          </div>
          <BotonFavorito id={planta.id} />
        </div>

        <dl className="datos">
          <div>
            <dt>Riego</dt>
            <dd>Cada {planta.dias_riego} {planta.dias_riego === 1 ? 'día' : 'días'}</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd>{planta.interior ? 'Interior' : 'Exterior'}</dd>
          </div>
          <div>
            <dt>Fecha de compra</dt>
            <dd>{formatearFecha(planta.fecha_compra)}</dd>
          </div>
        </dl>

        <h2>Notas</h2>
        <p>{planta.notas || 'Sin notas.'}</p>
      </article>
    </>
  );
}
