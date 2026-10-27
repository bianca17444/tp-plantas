import Link from 'next/link';
import RegistrarServiceWorker from './components/RegistrarServiceWorker';
import './globals.css';

export const metadata = {
  title: 'Mis Plantas',
  description: 'Registro de mis plantas: especie, riego y fecha de compra.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'Mis Plantas', statusBarStyle: 'default' },
  icons: { apple: '/icons/apple-touch-icon.png' },
};

export const viewport = {
  themeColor: '#1f4d34',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="encabezado">
          <div className="contenedor encabezado__fila">
            <Link href="/" className="marca">
              <img src="/icons/icon-192.png" alt="" width="32" height="32" />
              Mis Plantas
            </Link>
            <nav>
              <Link href="/">Listado</Link>
            </nav>
          </div>
        </header>

        <main className="contenedor">{children}</main>

        <footer className="pie contenedor">TP Integrador · Programación Web Dinámica · EPET N° 30</footer>

        <RegistrarServiceWorker />
      </body>
    </html>
  );
}
