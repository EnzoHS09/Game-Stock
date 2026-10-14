import express from 'express';
import { criarPool } from './config/database.js';
import { criarProdutoModel } from './models/ProdutoModels.js';
import { criarProdutoService } from './services/ProdutoService.js';
import criarProdutoController from './services/controllers/ProdutoController.js';
import { criarProdutoRoutes } from './routes/produtoRoutes.js';

export const app = express();

//Midlleware: ensina o Express a ler o corpo da requisição em JSON
app.use(express.json());
const pool = criarPool();
const produtoModel = criarProdutoModel( {pool} );
const produtoService = criarProdutoService( {produtoModel} );
const produtoController = criarProdutoController( {produtoService} );
const produtoRoutes = criarProdutoRoutes( {produtoController} );

//Testar a api
app.get('/api/check', (req, res) => {
  res.status(200).json({status:'ok', mensagem: 'Servidor funcionando via HTTP!'});
});

app.use('/api/produtos', produtoRoutes);

app.use((req, res) => {
  res.status(404).json({erro: `A rota ${req.method} ${req.originalUrl} não existe`});
})

app.use((erro, req, res, _next)=>{

  console.error('Erro de Sistema: ', erro.message);
  res.status(500).json({ erro: 'Falha interna do servidor'});
})
