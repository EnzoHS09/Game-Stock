export const api = "http://localhost:5000/api/jogos";

export const plataformas = ["Nintendo Switch", "Nintendo Switch 2", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X"];
export const generos = ["Ação", "Aventura", "RPG", "Corrida", "Esporte", "Estratégia", "Plataforma", "Puzzle", "Simulação", "Terror"];

export function moeda(valor) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

export function situacao(quantidade) {
    if (quantidade === 0) return "Sem estoque";
    if (quantidade <= 2) return "Estoque baixo";
    return "Disponível";
}

export function corEstoque(quantidade) {
    if (quantidade === 0) return "sem";
    if (quantidade <= 2) return "baixo";
    return "disponivel";
}

export function iniciais(nome) {
    const palavras = nome.trim().split(" ").filter(palavra => palavra !== "");
    if (palavras.length < 2) return nome.slice(0, 2).toUpperCase();
    return (palavras[0][0] + palavras[1][0]).toUpperCase();
}

export async function lerResposta(resposta) {
    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado.erro || "Não foi possível concluir a operação.");
    return resultado;
}
