import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Menu } from '../components/Menu';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { useRouter } from 'next/router'; // Importa useRouter do Next.js

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(0);
    const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
    const router = useRouter(); // Hook para navegação

    // Carrega as opções de editoras ao montar o componente
    useEffect(() => {
        const editoras = controleEditora.getEditoras().map(editora => ({
            value: editora.codEditora,
            text: editora.nome,
        }));
        setOpcoes(editoras);
    }, []);

    // Função para incluir livro na API
    const incluirLivro = async (livro: any) => {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
        });
        return response.ok; // Retorna o campo ok da resposta
    };

    // Tratamento do combo de editoras
    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value)); // Converte para número
    };

    // Método incluir, para lidar com o evento de submissão
    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Elimina o comportamento padrão
        const livro = {
            codigo: 0, // Código será gerado pelo backend
            codEditora,
            titulo,
            resumo,
            autores: autores.split('\n'), // Autores separados por linha
        };

        const sucesso = await incluirLivro(livro);
        if (sucesso) {
            router.push('/livrolista?added=true'); // Adiciona um parâmetro à URL
        } else {
            alert('Erro ao incluir o livro.');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Incluir Livro</title>
                <meta name="description" content="Inclusão de um novo livro" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main className={styles.main}>
                <h1 className={styles.title}>Incluir Livro</h1>
                <form onSubmit={incluir} className={styles.form}>
                    <div className="mb-3">
                        <label htmlFor="input1" className="form-label">Título:</label>
                        <input
                            id="input1"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="textarea1" className="form-label">Resumo:</label>
                        <textarea
                            id="textarea1"
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="textarea2" className="form-label">Autores (um por linha):</label>
                        <textarea
                            id="textarea2"
                            value={autores}
                            onChange={(e) => setAutores(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="select1" className="form-label">Editora:</label>
                        <select id="select1" value={codEditora} onChange={tratarCombo} className="form-select">
                            {opcoes.map((opcao) => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Incluir Livro</button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;