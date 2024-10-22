import React from 'react';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '@/classes/modelo/Livro';

const controleEditora = new ControleEditora(); // Instância para uso interno

// Definição da interface para as props do componente
interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

// Componente exportável LinhaLivro
export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const { livro, excluir } = props;

  // Obtém o nome da editora usando a instância do ControleEditora
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{livro.autores.join(', ')}</td>
      <td>{nomeEditora}</td>
      <td>
        <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>
          Excluir
        </button>
      </td>
    </tr>
  );
};