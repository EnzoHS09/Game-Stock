import ValidacaoJogo from '../models/Validacao_Jogo.js';

export function criarJogoService( {jogoModel} ){
    async function listar() {
        return jogoModel.listarTodos();
    }
    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);
        if (!Number.isInteger(id) || id <= 0) {
            throw new TypeError('ID deve ser um número inteiro positivo');
        }
        const jogo = await jogoModel.buscarPorId(id);
        if (!jogo) throw new Error('Jogo não encontrado.');
        return jogo;
    }
    async function criar(dados) {
        // O ID definitivo é gerado pelo model, nunca pelo formulário.
        const jogo = new ValidacaoJogo({...dados, id: 1});
        return jogoModel.criar(jogo);
    }
    async function atualizar(idRecebido, dados) {
        const atual = await buscarPorId(idRecebido);
        const jogo = new ValidacaoJogo({...dados, id: atual.id});
        return jogoModel.atualizar(atual.id, jogo);
    }

    async function excluir(idRecebido) {
        const jogo = await buscarPorId(idRecebido);
        return jogoModel.excluir(jogo.id);
    }

    return {listar, buscarPorId, criar, atualizar, excluir}
}
