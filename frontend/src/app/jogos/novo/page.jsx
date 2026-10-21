import Link from "next/link";
import FormularioJogo from "@/components/FormularioJogo";
import Icone from "@/components/Icone";

export default function NovoJogo() {
    return (
        <>
            <Link href="/jogos" className="voltar"><Icone nome="voltar" />Voltar ao estoque</Link>
            <div className="cabecalho-pagina"><div><p className="sobretitulo">EXPANDA SEU CATÁLOGO</p><h1>Cadastrar jogo<span className="ponto">.</span></h1><p className="subtitulo">Um novo título, tudo organizado desde o início.</p></div></div>
            <FormularioJogo />
        </>
    );
}
