"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Icone from "@/components/Icone";
import ExcluirJogo from "@/components/ExcluirJogo";
import { api, moeda, situacao, corEstoque, iniciais, lerResposta } from "@/utils/jogo";

export default function Jogo() {
    const params = useParams();
    const [jogo, setJogo] = useState(null);
    const [erro, setErro] = useState("");
    const [excluir, setExcluir] = useState(false);
    const [excluido, setExcluido] = useState(false);

    function carregar() {
        setJogo(null);
        setErro("");
        fetch(`${api}/${params.id}`)
            .then(lerResposta)
            .then(resultado => setJogo(resultado.dados))
            .catch(erro => setErro(erro.message === "Failed to fetch" ? "Não foi possível conectar à API. Verifique se ela está ligada." : erro.message));
    }

    useEffect(() => { carregar(); }, [params.id]);

    if (excluido) return <section className="painel resultado" role="status"><h1>Jogo excluído do estoque.</h1><p>O registro foi removido do catálogo da loja.</p><Link href="/jogos" className="botao">Voltar ao estoque</Link></section>;

    return (
        <>
            <Link href="/jogos" className="voltar"><Icone nome="voltar" />Voltar ao estoque</Link>
            {erro ? <div className="painel vazio"><Icone nome="alerta" /><h1>Não foi possível abrir o registro</h1><p role="alert">{erro}</p><button onClick={carregar} className="botao secundario">Tentar novamente</button></div>
                : jogo ? <>
                    <div className="cabecalho-pagina"><div><p className="sobretitulo">DETALHES DO REGISTRO · #{String(jogo.id).padStart(3, "0")}</p><h1>{jogo.nome}<span className="ponto">.</span></h1><p className="subtitulo">Informações do título no catálogo da loja.</p></div><Link href={`/jogos/${jogo.id}/editar`} className="botao"><Icone nome="editar" />Editar jogo</Link></div>
                    <div className="layout-detalhes">
                        <div className="capa-detalhe"><span>{jogo.plataforma}</span><Icone nome="jogos" /><strong>{iniciais(jogo.nome)}</strong><small>GAMESTOCK / COLEÇÃO FÍSICA</small></div>
                        <section className="painel informacoes"><h2>Informações do jogo</h2><dl className="dados-jogo"><div><dt>Plataforma</dt><dd>{jogo.plataforma}</dd></div><div><dt>Gênero</dt><dd>{jogo.genero}</dd></div><div><dt>Preço unitário</dt><dd className="valor-detalhe">{moeda(jogo.preco)}</dd></div><div><dt>Quantidade em estoque</dt><dd>{jogo.quantidade} {jogo.quantidade === 1 ? "unidade" : "unidades"}</dd></div><div><dt>Disponibilidade</dt><dd><span className={`situacao ${corEstoque(jogo.quantidade)}`}>{situacao(jogo.quantidade)}</span></dd></div><div><dt>Identificação</dt><dd>#{String(jogo.id).padStart(3, "0")}</dd></div></dl>
                            <div className="total-jogo"><Icone nome="valor" /><div><span>Valor deste título em estoque</span><strong>{moeda(jogo.preco * jogo.quantidade)}</strong></div></div>
                        </section>
                    </div>
                    <div className="rodape-detalhes"><p>Sem cópias disponíveis? Mantenha o jogo cadastrado com quantidade zero.</p><button className="botao secundario texto-perigo" onClick={() => setExcluir(true)}><Icone nome="excluir" />Excluir jogo</button></div>
                    {excluir && <ExcluirJogo jogo={jogo} aoCancelar={() => setExcluir(false)} aoExcluir={() => { setExcluir(false); setExcluido(true); }} />}
                </> : <p className="carregando" role="status">Carregando informações do jogo...</p>}
        </>
    );
}
