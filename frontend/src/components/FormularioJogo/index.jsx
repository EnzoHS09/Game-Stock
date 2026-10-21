"use client";

import { useState } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import { api, plataformas, generos, moeda, iniciais, lerResposta } from "@/utils/jogo";

export default function FormularioJogo({ jogo }) {
    const [dados, setDados] = useState({
        nome: jogo ? jogo.nome : "",
        plataforma: jogo ? jogo.plataforma : "",
        genero: jogo ? jogo.genero : "",
        preco: jogo ? jogo.preco.toFixed(2).replace(".", ",") : "",
        quantidade: jogo ? String(jogo.quantidade) : "",
    });
    const [erros, setErros] = useState({});
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [salvo, setSalvo] = useState(null);

    function alterar(evento) {
        setDados({ ...dados, [evento.target.name]: evento.target.value });
    }

    async function salvar(evento) {
        evento.preventDefault();
        const problemas = {};
        const preco = Number(dados.preco.replace(",", "."));
        const quantidade = Number(dados.quantidade);

        if (dados.nome.trim().length < 2 || dados.nome.trim().length > 100) problemas.nome = "Informe um nome com 2 a 100 caracteres.";
        if (!plataformas.includes(dados.plataforma)) problemas.plataforma = "Selecione a plataforma do jogo.";
        if (!generos.includes(dados.genero)) problemas.genero = "Selecione o gênero do jogo.";
        if (!/^\d+([.,]\d{1,2})?$/.test(dados.preco) || !Number.isFinite(preco)) problemas.preco = "Informe um preço válido, com até duas casas decimais.";
        if (dados.quantidade.trim() === "" || !Number.isInteger(quantidade) || quantidade < 0) problemas.quantidade = "Informe uma quantidade inteira maior ou igual a zero.";

        setErros(problemas);
        setErro("");
        if (Object.keys(problemas).length > 0) return;

        setSalvando(true);
        try {
            // POST cadastra um jogo; PUT salva a edição do ID escolhido.
            const resposta = await fetch(jogo ? `${api}/${jogo.id}` : api, {
                method: jogo ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...dados, nome: dados.nome.trim(), preco, quantidade }),
            });
            const resultado = await lerResposta(resposta);
            setSalvo(resultado.dados);
        } catch (erro) {
            setErro(erro.message === "Failed to fetch" ? "Não foi possível conectar à API. Verifique se ela está ligada e tente novamente." : erro.message);
        }
        setSalvando(false);
    }

    if (salvo) return (
        <section className="painel resultado" role="status">
            <span className="resultado-icone"><Icone nome="jogos" /></span>
            <h2>{jogo ? "Alterações salvas com sucesso." : "Jogo cadastrado com sucesso."}</h2>
            <p>{salvo.nome} já está atualizado no catálogo da loja.</p>
            <div className="grupo-botoes"><Link href="/jogos" className="botao secundario">Voltar ao estoque</Link><Link href={`/jogos/${salvo.id}`} className="botao">Ver jogo<Icone nome="seta" /></Link></div>
        </section>
    );

    return (
        <div className="layout-formulario">
            <form className="painel" onSubmit={salvar} noValidate>
                <div className="titulo-painel"><span className="icone-painel"><Icone nome="jogos" /></span><div><h2>Informações do jogo</h2><p>Preencha os dados do jogo no catálogo.</p></div></div>
                <fieldset disabled={salvando} className="campos">
                    <legend className="oculto">Dados do jogo</legend>
                    {Object.keys(erros).length > 0 && <p className="mensagem erro campo-inteiro" role="alert">Confira os campos indicados antes de salvar.</p>}
                    {erro && <p className="mensagem erro campo-inteiro" role="alert">{erro}</p>}
                    <div className="campo campo-inteiro"><label htmlFor="nome">Nome do jogo <span>*</span></label><input id="nome" name="nome" value={dados.nome} onChange={alterar} placeholder="Ex.: Minecraft" required minLength={2} maxLength={100} aria-invalid={!!erros.nome} aria-describedby={erros.nome ? "erro-nome" : undefined} />{erros.nome && <small className="erro-campo" id="erro-nome">{erros.nome}</small>}</div>
                    <div className="campo"><label htmlFor="plataforma">Plataforma <span>*</span></label><select id="plataforma" name="plataforma" value={dados.plataforma} onChange={alterar} required aria-invalid={!!erros.plataforma} aria-describedby={erros.plataforma ? "erro-plataforma" : undefined}><option value="">Selecione a plataforma</option>{plataformas.map(item => <option key={item}>{item}</option>)}</select>{erros.plataforma && <small className="erro-campo" id="erro-plataforma">{erros.plataforma}</small>}</div>
                    <div className="campo"><label htmlFor="genero">Gênero <span>*</span></label><select id="genero" name="genero" value={dados.genero} onChange={alterar} required aria-invalid={!!erros.genero} aria-describedby={erros.genero ? "erro-genero" : undefined}><option value="">Selecione o gênero</option>{generos.map(item => <option key={item}>{item}</option>)}</select>{erros.genero && <small className="erro-campo" id="erro-genero">{erros.genero}</small>}</div>
                    <div className="campo"><label htmlFor="preco">Preço unitário <span>*</span></label><div className="campo-preco"><span>R$</span><input id="preco" name="preco" inputMode="decimal" value={dados.preco} onChange={alterar} placeholder="0,00" required aria-invalid={!!erros.preco} aria-describedby={erros.preco ? "erro-preco" : undefined} /></div>{erros.preco && <small className="erro-campo" id="erro-preco">{erros.preco}</small>}</div>
                    <div className="campo"><label htmlFor="quantidade">Quantidade <span>*</span></label><input id="quantidade" name="quantidade" type="number" min="0" step="1" value={dados.quantidade} onChange={alterar} placeholder="0" required aria-invalid={!!erros.quantidade} aria-describedby={erros.quantidade ? "erro-quantidade" : "dica-quantidade"} />{erros.quantidade ? <small className="erro-campo" id="erro-quantidade">{erros.quantidade}</small> : <small id="dica-quantidade">Número de cópias físicas disponíveis.</small>}</div>
                    <p className="nota-formulario campo-inteiro"><span>*</span> Todos os campos são obrigatórios. Preço e quantidade podem ser zero.</p>
                </fieldset>
                <div className="acoes-formulario">{!salvando && <Link href={jogo ? `/jogos/${jogo.id}` : "/jogos"} className="botao secundario">Cancelar</Link>}<button className="botao" type="submit" disabled={salvando}>{salvando ? "Salvando..." : jogo ? "Salvar alterações" : "Cadastrar jogo"}<Icone nome="seta" /></button></div>
            </form>
            <aside className="previa">
                <p className="legenda-menu">PRÉVIA DO REGISTRO</p>
                <div className="previa-capa"><Icone nome="jogos" /><strong>{dados.nome.trim() ? iniciais(dados.nome) : "GS"}</strong><span>{dados.plataforma || "Sua próxima adição ao catálogo"}</span></div>
                <h2>{dados.nome.trim() || "Nome do jogo"}</h2><p>{dados.genero || "Gênero do jogo"}</p>
                <div className="previa-valores"><div><small>Preço unitário</small><strong>{moeda(Number(dados.preco.replace(",", ".")) || 0)}</strong></div><div><small>Quantidade</small><strong>{dados.quantidade || "0"} un.</strong></div></div>
                <div className="dica"><Icone nome="caixa" /><p>O mesmo título em plataformas diferentes deve ter registros separados.</p></div>
            </aside>
        </div>
    );
}
