"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import FormularioJogo from "@/components/FormularioJogo";
import Icone from "@/components/Icone";
import { api, lerResposta } from "@/utils/jogo";

export default function EditarJogo() {
    const params = useParams();
    const [jogo, setJogo] = useState(null);
    const [erro, setErro] = useState("");

    function carregar() {
        setJogo(null);
        setErro("");
        fetch(`${api}/${params.id}`)
            .then(lerResposta)
            .then(resultado => setJogo(resultado.dados))
            .catch(erro => setErro(erro.message === "Failed to fetch" ? "Não foi possível conectar à API. Verifique se ela está ligada." : erro.message));
    }

    useEffect(() => { carregar(); }, [params.id]);

    return (
        <>
            <Link href="/jogos" className="voltar"><Icone nome="voltar" />Voltar ao estoque</Link>
            <div className="cabecalho-pagina"><div><p className="sobretitulo">MANTENHA TUDO EM DIA</p><h1>Editar jogo<span className="ponto">.</span></h1><p className="subtitulo">Atualize as informações e a disponibilidade do título.</p></div></div>
            {erro ? <div className="painel vazio"><Icone nome="alerta" /><h2>Não foi possível abrir o registro</h2><p role="alert">{erro}</p><button onClick={carregar} className="botao secundario">Tentar novamente</button></div> : jogo ? <FormularioJogo key={jogo.id} jogo={jogo} /> : <p className="carregando" role="status">Carregando informações do jogo...</p>}
        </>
    );
}
