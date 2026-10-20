import ValidacaoJogo from '../models/Validacao_Jogo.js';

export function criarProdutoService( {produtoModel} ){
    async function listar() {
        return produtoModel.listarTodos();
    }
    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);
        if (!Number.isInteger(id) || id <= 0) {
            throw new TypeError('ID deve ser um número inteiro positivo');
        }
        const produto = await produtoModel.buscarPorId(id);
        if (!produto) throw new Error('Jogo não encontrado.');
        return produto; 
    }
    async function criar(dados) {
        // O ID definitivo é gerado pelo model, nunca pelo formulário.
        const produto = new ValidacaoJogo({...dados, id: 1});
        return produtoModel.criar(produto);
    }
    async function atualizar(idRecebido, dados) {
        const atual = await buscarPorId(idRecebido);
        const produto = new ValidacaoJogo({...dados, id: atual.id});
        return produtoModel.atualizar(atual.id, produto);
    }

    async function excluir(idRecebido) {
        const produto = await buscarPorId(idRecebido);
        return produtoModel.excluir(produto.id);
    }

    return {listar, buscarPorId, criar, atualizar, excluir}
}
