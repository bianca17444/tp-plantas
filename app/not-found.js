import Link from 'next/link';

export default function NoEncontrada() {
  return (
    <>
      <div className="aviso aviso--error">
        <strong>Página no encontrada.</strong>
        <p>La dirección que escribiste no existe en Mis Plantas.</p>
      </div>
      <Link href="/" className="volver">← Volver al listado</Link>
    </>
  );
}
