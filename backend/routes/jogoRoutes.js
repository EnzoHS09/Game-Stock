import express from 'express';

export function criarJogoRoutes({jogoController}){
    const router = express.Router();

    router.get('/', jogoController.listar);
    router.get('/:id', jogoController.buscar);
    router.post('/', jogoController.criar);
    router.put('/:id', jogoController.atualizar);
    router.delete('/:id', jogoController.excluir);

    return router;
}
