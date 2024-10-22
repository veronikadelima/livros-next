import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Menu } from '../components/Menu';
import { LinhaLivro } from '../components/LinhaLivro';
import { ControleLivros } from '../classes/controle/ControleLivros'; // Certifique-se de ajustar o caminho
import { NextPage } from 'next'; // Importando NextPage

const controleLivros = new ControleLivros();

const obterLivros = () => {
    return controleLivros.getLivros();
};

const excluirLivro = (codigo: number) => {
    controleLivros.excluir(codigo);
};

const LivroLista: NextPage = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);
  
    useEffect(() => {
        if (!carregado) {
            setLivros(obterLivros());
            setCarregado(true);
        }
    }, [carregado]);
  
    const excluir = (codigo: number) => {
        excluirLivro(codigo);
        setCarregado(false); // Força o recarregamento da lista após excluir
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Lista de Livros</title>
                <meta name="description" content="Gerenciamento de Livros" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main className={styles.main}>
                <h1 className={styles.title}>Lista de Livros</h1>
                <table>
                    <thead>
                        <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                        <LinhaLivro
                            key={livro.codigo}
                            livro={livro}
                            excluir={() => excluir(livro.codigo)}
                        />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;