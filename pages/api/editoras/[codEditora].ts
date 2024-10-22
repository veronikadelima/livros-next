import { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from './index'; // Importa o controlador instanciado no index.ts

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            // Obtém codEditora da URL e converte para number
            const { codEditora } = req.query;
            const codigo = Number(codEditora);

            if (isNaN(codigo)) {
                return res.status(400).json({ mensagem: 'Código inválido' });
            }

            // Busca o nome da editora
            const nomeEditora = controleEditora.getNomeEditora(codigo);

            if (nomeEditora) {
                res.status(200).json({ nome: nomeEditora });
            } else {
                res.status(404).json({ mensagem: 'Editora não encontrada' });
            }
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
