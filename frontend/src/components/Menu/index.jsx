import Link from "next/link";
import Icone from "@/components/Icone";

export default function Menu() {
    return (
        <aside className="menu">
            <Link href="/jogos" className="marca" aria-label="GameStock, estoque de jogos">
                <span className="simbolo"><Icone nome="jogos" /></span>
                <span>Game<span className="marca-cor">Stock</span><small>GESTÃO DE JOGOS</small></span>
            </Link>
            <p className="legenda-menu">PRINCIPAL</p>
            <nav aria-label="Navegação principal">
                <Link href="/jogos" className="link-menu"><Icone nome="grade" />Estoque de jogos</Link>
                <Link href="/jogos/novo" className="link-menu"><Icone nome="mais" />Cadastrar jogo</Link>
            </nav>
            <div className="nota-menu">
                <span className="nota-icone"><Icone nome="jogos" /></span>
                <strong>Organização em cada fase.</strong>
                <p>Todos os títulos da sua loja em um só lugar.</p>
            </div>
            <div className="perfil"><span>GS</span><div><strong>Estoque da loja</strong><small>Gerenciador operacional</small></div></div>
        </aside>
    );
}
