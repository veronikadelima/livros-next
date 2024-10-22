import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from './index';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { codigo } = req.query;

    try {
        if (req.method === 'DELETE') {
            // Método DELETE, exclui o livro com base no código
            controleLivro.excluir(Number(codigo));
            res.status(200).json({ mensagem: 'Livro excluído com sucesso!' });
        } else {
            // Método não permitido
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);
        }
    } catch (error) {
        // Exceção no servidor
        console.error(error);
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};
