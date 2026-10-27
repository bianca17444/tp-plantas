import { obtenerPlantas } from './lib/api';
import ListaPlantas from './components/ListaPlantas';

// Server Component: pide el listado a la API de Laravel.
export default async function Inicio() {
  const { datos: plantas, error } = await obtenerPlantas();

  return (
    <>
      <h1>Mis plantas</h1>
      <p className="subtitulo">Cada cuánto se riegan, dónde viven y cuándo llegaron a casa.</p>

      {error ? (
        <div className="aviso aviso--error" role="alert">
          <strong>No se pudo cargar el listado.</strong>
          <p>{error}</p>
        </div>
      ) : (
        <ListaPlantas plantas={plantas} />
      )}
    </>
  );
}
