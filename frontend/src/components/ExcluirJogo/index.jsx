"use client";

import { useEffect, useState } from "react";
import Icone from "@/components/Icone";
import { api, lerResposta } from "@/utils/jogo";

export default function ExcluirJogo({ jogo, aoCancelar, aoExcluir }) {
    const [excluindo, setExcluindo] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const caixa = document.getElementById("excluir-jogo");
        caixa.showModal();
        return () => caixa.close();
    }, []);

    async function excluir() {
        setExcluindo(true);
        setErro("");
        try {
            const resposta = await fetch(`${api}/${jogo.id}`, { method: "DELETE" });
            await lerResposta(resposta);
            aoExcluir(jogo.id);
        } catch (erro) {
            setErro(erro.message === "Failed to fetch" ? "Não foi possível conectar à API. Verifique se ela está ligada." : erro.message);
            setExcluindo(false);
        }
    }

    return (
        <dialog id="excluir-jogo" aria-labelledby="titulo-exclusao" aria-describedby="texto-exclusao" onCancel={evento => { if (excluindo) evento.preventDefault(); else aoCancelar(); }}>
            <span className="icone-excluir"><Icone nome="excluir" /></span>
            <h2 id="titulo-exclusao">Excluir este jogo?</h2>
            <p id="texto-exclusao">O registro será removido do catálogo. Essa ação não pode ser desfeita.</p>
            <div className="registro-excluir"><strong>{jogo.nome}</strong><span>{jogo.plataforma}</span></div>
            {erro && <p className="mensagem erro" role="alert">{erro}</p>}
            <div className="acoes-modal">
                <button className="botao secundario" onClick={aoCancelar} disabled={excluindo} autoFocus>Manter jogo</button>
                <button className="botao perigo" onClick={excluir} disabled={excluindo}>{excluindo ? "Excluindo..." : "Excluir jogo"}</button>
            </div>
        </dialog>
    );
}
