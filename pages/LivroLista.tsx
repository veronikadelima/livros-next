import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { Menu } from '@/components/Menu';
import { LinhaLivro } from '@/components/LinhaLivro';
import { Livro } from '@/classes/modelo/Livro'; // Ajuste o caminho conforme necessário

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'localhost:3000';
console.log(apiUrl);

const LivroLista = () => {
    // Removido o uso de apiUrl
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    // Função para obter livros da API
    const obterLivros = async () => {
        try {
            const resposta = await fetch('/api/livros');
            if (resposta.ok) {
                const livrosAtualizados = await resposta.json(); // Obtenha os dados atualizados
                setLivros(livrosAtualizados); // Atualize o estado com a lista de livros
            } else {
                console.error('Erro ao obter livros:', resposta.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    // Função para excluir livro
    const excluirLivro = async (codigo: number) => {
        try {
            const resposta = await fetch(`/api/livros/[${codigo}]`, {
                method: 'DELETE',
            });
    
            if (resposta.ok) {
                console.log('Livro excluído com sucesso');
                // Tente obter o texto da resposta para garantir que o backend está confirmando a exclusão
                const result = await resposta.text(); 
                console.log('Resposta da API após exclusão:', result);
                setLivros(livros.filter((livro) => livro.codigo !== codigo));
                
            } else {
                const errorText = await resposta.text(); // Obtenha a resposta do corpo em texto
                console.error('Erro ao excluir livro:', resposta.status, resposta.statusText, errorText);
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    // useEffect(() => {
    //     obterLivros(); // Carrega os livros na montagem do componente
    // }, []); // O array vazio garante que será chamado apenas uma vez
    

    //UseEffect para carregar os livros ao montar o componente
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Resumo</th>
                            <th scope="col">Autores</th>
                            <th scope="col">Editora</th>
                            <th scope="col">Ações</th>
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
