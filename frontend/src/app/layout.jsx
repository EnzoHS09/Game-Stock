import "./globals.css";
import Menu from "@/components/Menu";

export const metadata = {
  title: "GameStock | Estoque de jogos",
  description: "Gerencie o catálogo e o estoque de jogos físicos da sua loja.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="pular">Pular para o conteúdo</a>
        <div className="aplicacao">
          <Menu />
          <div className="area">
            <header className="barra">
              <span>Workspace <span className="separador">/</span> <strong>Estoque da loja</strong></span>
              <span className="etiqueta">Jogos físicos</span>
            </header>
            <main id="conteudo" className="conteudo">{children}</main>
            <footer className="rodape"><span>GAMESTOCK</span><span>Seu catálogo. Sob controle.</span></footer>
          </div>
        </div>
      </body>
    </html>
  );
}
