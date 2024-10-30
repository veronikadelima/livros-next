const express = require('express');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Habilitar CORS
    server.use(cors());

    // Definindo uma rota para API
    server.post('/api/livros', (req, res) => {
        // Lógica para adicionar livro
        res.status(201).json({ message: 'Livro incluído com sucesso!' });
    });

    // Para todas as outras requisições, o Next.js deve tratar
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
