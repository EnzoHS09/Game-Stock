"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icone from "@/components/Icone";
import ExcluirJogo from "@/components/ExcluirJogo";
import { api, moeda, situacao, corEstoque, iniciais, lerResposta } from "@/utils/jogo";
import "./jogos.css";

export default function Jogos() {
    const [jogos, setJogos] = useState([]);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("todos");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [excluir, setExcluir] = useState(null);

    function carregar() {
        setCarregando(true);
        setErro("");
        fetch(api)
            .then(lerResposta)
            .then(resultado => { setJogos(resultado.dados); setCarregando(false); })
            .catch(() => { setErro("Não foi possível carregar os jogos. Verifique se a API está ligada e tente novamente."); setCarregando(false); });
    }

    useEffect(() => { carregar(); }, []);

    function remover(id) {
        setJogos(jogos.filter(jogo => jogo.id !== id));
        setExcluir(null);
        setMensagem("Jogo excluído do estoque.");
    }

    let unidades = 0;
    let valor = 0;
    let atencao = 0;
    jogos.forEach(jogo => {
        unidades += jogo.quantidade;
        valor += jogo.preco * jogo.quantidade;
        if (jogo.quantidade <= 2) atencao++;
    });

    const lista = jogos.filter(jogo => {
        const texto = `${jogo.nome} ${jogo.plataforma} ${jogo.genero}`.toLocaleLowerCase("pt-BR");
        return texto.includes(busca.trim().toLocaleLowerCase("pt-BR")) && (filtro === "todos" || jogo.quantidade <= 2);
    });

    return (
        <>
            <div className="cabecalho-pagina">
                <div><p className="sobretitulo">CONTROLE DO CATÁLOGO</p><h1>Estoque de jogos<span className="ponto">.</span></h1><p className="subtitulo">Consulte seus títulos e mantenha tudo em dia.</p></div>
                <Link href="/jogos/novo" className="botao"><Icone nome="mais" />Cadastrar jogo</Link>
            </div>

            {mensagem && <div className="mensagem sucesso" role="status">{mensagem}<button onClick={() => setMensagem("")} aria-label="Fechar mensagem">×</button></div>}

            {!erro && <section className="resumos" aria-label="Resumo do estoque">
                <article className="resumo"><div><span>Jogos cadastrados</span><Icone nome="jogos" /></div><strong>{carregando ? "—" : jogos.length}</strong><small>Títulos no catálogo</small></article>
                <article className="resumo azul"><div><span>Unidades em estoque</span><Icone nome="caixa" /></div><strong>{carregando ? "—" : unidades}</strong><small>Cópias físicas disponíveis</small></article>
                <article className="resumo"><div><span>Valor do estoque</span><Icone nome="valor" /></div><strong>{carregando ? "—" : moeda(valor)}</strong><small>Total em preços cadastrados</small></article>
            </section>}

            <section className="catalogo" aria-labelledby="titulo-catalogo">
                <div className="titulo-catalogo"><div><h2 id="titulo-catalogo">Catálogo de jogos <span>{carregando || erro ? "—" : jogos.length}</span></h2><p>Uma visão completa do estoque da loja.</p></div><span className="rotulo-catalogo"><Icone nome="jogos" />COLEÇÃO FÍSICA</span></div>
                {!erro && !carregando && <div className="ferramentas">
                    <div className="filtros" aria-label="Filtrar por estoque">
                        <button className={filtro === "todos" ? "ativo" : ""} aria-pressed={filtro === "todos"} onClick={() => setFiltro("todos")}>Todos os jogos</button>
                        <button className={filtro === "baixo" ? "ativo" : ""} aria-pressed={filtro === "baixo"} onClick={() => setFiltro("baixo")}>Precisam de atenção <span>{atencao}</span></button>
                    </div>
                    <label className="busca"><Icone nome="busca" /><span className="oculto">Buscar por nome, plataforma ou gênero</span><input type="search" value={busca} onChange={evento => setBusca(evento.target.value)} placeholder="Buscar no catálogo..." /></label>
                </div>}

                {carregando ? <div className="vazio" role="status"><Icone nome="caixa" /><h2>Carregando seu estoque...</h2><p>Buscando os jogos cadastrados.</p></div>
                    : erro ? <div className="vazio"><Icone nome="alerta" /><h2>Não foi possível abrir o estoque</h2><p role="alert">{erro}</p><button className="botao secundario" onClick={carregar}>Tentar novamente</button></div>
                    : lista.length === 0 ? <div className="vazio"><Icone nome={jogos.length ? "busca" : "jogos"} /><h2>{jogos.length ? "Nenhum jogo encontrado" : "Seu estoque começa aqui"}</h2><p>{jogos.length ? "Tente outro nome, plataforma ou gênero, ou altere o filtro." : "Cadastre o primeiro jogo da sua loja."}</p>{jogos.length ? <button className="botao secundario" onClick={() => { setBusca(""); setFiltro("todos"); }}>Limpar filtros</button> : <Link href="/jogos/novo" className="botao">Cadastrar jogo</Link>}</div>
                    : <div className="tabela"><table><caption className="oculto">Jogos cadastrados no estoque da loja</caption><thead><tr><th scope="col">Jogo</th><th scope="col">Plataforma</th><th scope="col">Preço unitário</th><th scope="col">Estoque</th><th scope="col" className="coluna-acoes">Ações</th></tr></thead>
                        <tbody>{lista.map(jogo => <tr key={jogo.id}>
                            <td><div className="jogo-nome"><span className={`capa ${jogo.plataforma.startsWith("Xbox") ? "capa-azul" : ""}`} aria-hidden="true">{iniciais(jogo.nome)}</span><div><Link href={`/jogos/${jogo.id}`} className="nome-link">{jogo.nome}</Link><small>{jogo.genero} <span>·</span> #{String(jogo.id).padStart(3, "0")}</small></div></div></td>
                            <td data-label="Plataforma"><span className="plataforma">{jogo.plataforma}</span></td>
                            <td data-label="Preço unitário" className="preco">{moeda(jogo.preco)}</td>
                            <td data-label="Estoque"><div className="estoque"><span>{jogo.quantidade} {jogo.quantidade === 1 ? "unidade" : "unidades"}</span><span className={`situacao ${corEstoque(jogo.quantidade)}`}>{situacao(jogo.quantidade)}</span></div></td>
                            <td><div className="acoes-linha"><Link href={`/jogos/${jogo.id}`} className="acao" title="Ver detalhes" aria-label={`Ver detalhes de ${jogo.nome}`}><Icone nome="seta" /></Link><Link href={`/jogos/${jogo.id}/editar`} className="acao" title="Editar jogo" aria-label={`Editar ${jogo.nome}`}><Icone nome="editar" /></Link><button className="acao excluir" onClick={() => setExcluir(jogo)} title="Excluir jogo" aria-label={`Excluir ${jogo.nome}`}><Icone nome="excluir" /></button></div></td>
                        </tr>)}</tbody></table></div>}
                {!erro && !carregando && <div className="fim-catalogo"><span>Exibindo <strong>{lista.length}</strong> de {jogos.length} jogos</span><span>Estoque baixo: até 2 unidades</span></div>}
            </section>
            {excluir && <ExcluirJogo jogo={excluir} aoCancelar={() => setExcluir(null)} aoExcluir={remover} />}
        </>
    );
}
