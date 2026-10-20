import express from 'express';
import { criarJogoModel } from './models/JogoModel.js';
import { criarProdutoService } from './services/ProdutoService.js';
import criarProdutoController from './services/controllers/ProdutoController.js';
import { criarProdutoRoutes } from './routes/produtoRoutes.js';

export const app = express();

// Permite que o Next, na porta 3000, consulte a API na porta 5000.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
});

// Ensina o Express a ler o corpo da requisição em JSON.
app.use(express.json());
const produtoModel = criarJogoModel();
const produtoService = criarProdutoService( {produtoModel} );
const produtoController = criarProdutoController( {produtoService} );
const produtoRoutes = criarProdutoRoutes( {produtoController} );

//Testar a api
app.get('/api/check', (req, res) => {
  res.status(200).json({status:'ok', mensagem: 'Servidor funcionando via HTTP!'});
});

app.use('/api/jogos', produtoRoutes);

app.use((req, res) => {
  res.status(404).json({sucesso: false, erro: `A rota ${req.method} ${req.originalUrl} não existe`});
})

app.use((erro, req, res, _next)=>{
  if (erro instanceof SyntaxError && erro.status === 400) {
    return res.status(400).json({ sucesso: false, erro: 'Envie um JSON válido.' });
  }
  console.error('Erro de Sistema: ', erro.message);
  res.status(500).json({ sucesso: false, erro: 'Falha interna do servidor'});
})
