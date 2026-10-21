export default function criarJogoController({jogoService}){
    function tratarErro(erro, res, next) {
        if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
        if (erro.message.includes('não encontrado')) return res.status(404).json({ sucesso: false, erro: erro.message });
        next(erro);
    }
    async function listar(req, res, next) {
        try {
            const jogos = await jogoService.listar();
            res.status(200).json({ sucesso: true, dados: jogos });
        } catch (erro) {
            next(erro);
        }
    }

    async function buscar(req, res, next) {
        try {
           const jogo = await jogoService.buscarPorId(req.params.id);
           res.status(200).json({ sucesso: true, dados: jogo });
        } catch (erro){
            tratarErro(erro, res, next);
        }
    }
    async function criar(req, res, next) {
        try {
            const jogoNovo = await jogoService.criar(req.body);
            res.status(201).json({ sucesso: true, dados: jogoNovo })
        } catch (erro) {
            tratarErro(erro, res, next);
        }
    }
    async function atualizar(req, res, next) {
        try {
            const jogo = await jogoService.atualizar(req.params.id, req.body);
            res.status(200).json({ sucesso: true, dados: jogo });
        } catch (erro) {
            tratarErro(erro, res, next);
        }
    }

    async function excluir(req, res, next) {
        try {
            await jogoService.excluir(req.params.id);
            res.status(200).json({ sucesso: true, mensagem: 'Jogo excluído do estoque.' });
        } catch (erro) {
            tratarErro(erro, res, next);
        }
    }

    return {listar, buscar, criar, atualizar, excluir}
}
