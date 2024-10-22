import Head from 'next/head';
import { Menu }  from '../components/Menu'; // Certifique-se de que o caminho está correto
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Loja Next</title>
      </Head>
      
      <Menu/> {/* Certifique-se de que o componente Menu está sendo importado e utilizado */}

      <main className={styles.main} >
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
}
