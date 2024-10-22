import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '@/classes/controle/ControleEditora'; // Ajustar o caminho conforme a localização do controle

// Instância exportável de ControleEditora
export const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            // Método GET, retorna o vetor de editoras no formato JSON
            const editoras = controleEditora.getEditoras();
            res.status(200).json(editoras);
        } else {
            // Método não permitido
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Método ${req.method} não permitido`);
        }
    } catch (error) {
        // Exceção no servidor
        console.error(error);
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};
