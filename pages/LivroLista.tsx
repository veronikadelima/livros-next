import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Menu } from '../components/Menu';
import { LinhaLivro } from '../components/LinhaLivro';
import { Livro } from '../classes/modelo/Livro'; // Ajuste o caminho conforme necessário

const LivroLista = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    // Função para obter livros da API
    const obterLivros = async () => {
        const resposta = await fetch('http://localhost:3000/api/livros');
        if (resposta.ok) {
            const data = await resposta.json();
            setLivros(data);
        } else {
            console.error('Erro ao buscar livros:', resposta.statusText);
        }
    };

    // Função para excluir livro
    const excluirLivro = async (codigo: number) => {
        const resposta = await fetch(`http://localhost:3000/api/livros/${codigo}`, {
            method: 'DELETE',
        });

        if (resposta.ok) {
            // Recarrega os livros após a exclusão
            obterLivros();
        } else {
            console.error('Erro ao excluir livro:', resposta.statusText);
        }
    };

    // UseEffect para carregar os livros ao montar o componente
    useEffect(() => {
        if (!carregado) {
            obterLivros();
            setCarregado(true);
        }
    }, [carregado]);

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
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Autores</th>
                            <th>Editora</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <LinhaLivro
                                key={livro.codigo}
                                livro={livro}
                                excluir={() => excluirLivro(livro.codigo)}
                            />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;
