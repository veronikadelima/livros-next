import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '@/classes/controle/ControleLivros'; // Ajuste o caminho conforme a localização do controle

// Instância exportável de ControleLivro
export const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            // Método GET, retorna o vetor de livros no formato JSON
            const livros = controleLivro.getLivros();
            res.status(200).json(livros);
        } else if (req.method === 'POST') {
            // Método POST, captura os dados do livro
            const livro = req.body;
            controleLivro.incluir(livro);
            res.status(200).json({ mensagem: 'Livro adicionado com sucesso!' });
        } else if (req.method === 'DELETE') {
            //Método DELETE, apaga o registro do livro
            const { codigo } = req.query;
            controleLivro.excluir(Number(codigo));
            res.status(200).json({ message: 'Livro excluído com sucesso' });
        } else {
            // Método não permitido
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);
        }
    } catch (error) {
        // Exceção no servidor
        console.error(error);
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};
