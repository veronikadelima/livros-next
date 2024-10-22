import 'bootstrap/dist/css/bootstrap.min.css'; // Importa os estilos do Bootstrap
import '../styles/globals.css'; // Importa os estilos globais (se houver)
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}