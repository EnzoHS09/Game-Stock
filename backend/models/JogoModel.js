// Dados iniciais de demonstração. Preços e quantidades são fictícios.
// O array volta ao estado inicial quando a API é reiniciada.
let jogos = [
    {
        id: 1,
        nome: "Minecraft",
        preco: 199.90,
        imagem: "/imagens/minecraft.jpg",
        descricao: "Explore mundos de blocos, reúna recursos e construa no modo criativo ou sobrevivência.",
        editora: "Mojang",
        plataforma: "Nintendo Switch",
        genero: "Aventura",
        quantidade: 8
    },
    {
        id: 2,
        nome: "God of War Ragnarök",
        preco: 249.90,
        imagem: "/imagens/god-of-war-ragnarok.jpg",
        descricao: "Acompanhe Kratos e Atreus em uma jornada pelos reinos da mitologia nórdica.",
        editora: "Sony Interactive Entertainment",
        plataforma: "PlayStation 5",
        genero: "Ação",
        quantidade: 5
    },
    {
        id: 3,
        nome: "The Legend of Zelda: Tears of the Kingdom",
        preco: 299.90,
        imagem: "/imagens/zelda-tears-of-the-kingdom.jpg",
        descricao: "Explore Hyrule e suas ilhas no céu, criando soluções para superar desafios.",
        editora: "Nintendo",
        plataforma: "Nintendo Switch",
        genero: "Aventura",
        quantidade: 2
    },
    {
        id: 4,
        nome: "Elden Ring",
        preco: 229.90,
        imagem: "/imagens/elden-ring.jpg",
        descricao: "Explore as Terras Intermédias, desenvolva seu personagem e enfrente inimigos em um mundo de fantasia.",
        editora: "Bandai Namco Entertainment",
        plataforma: "PlayStation 5",
        genero: "RPG",
        quantidade: 4
    },
    {
        id: 5,
        nome: "Forza Horizon 5",
        preco: 219.90,
        imagem: "/imagens/forza-horizon-5.jpg",
        descricao: "Dirija por paisagens inspiradas no México e participe de corridas em um mundo aberto.",
        editora: "Xbox Game Studios",
        plataforma: "Xbox Series X",
        genero: "Corrida",
        quantidade: 0
    },
    {
        id: 6,
        nome: "Mario Kart 8 Deluxe",
        preco: 279.90,
        imagem: "/imagens/mario-kart-8-deluxe.jpg",
        descricao: "Dispute corridas de kart com personagens de Mario, usando itens para conquistar a vitória.",
        editora: "Nintendo",
        plataforma: "Nintendo Switch",
        genero: "Corrida",
        quantidade: 6
    },
    {
        id: 7,
        nome: "Super Mario Odyssey",
        preco: 299.90,
        imagem: "/imagens/super-mario-odyssey.jpg",
        descricao: "Viaje com Mario e Cappy por diferentes reinos, coletando luas e superando desafios de plataforma.",
        editora: "Nintendo",
        plataforma: "Nintendo Switch",
        genero: "Plataforma",
        quantidade: 3
    },
    {
        id: 8,
        nome: "Marvel's Spider-Man 2",
        preco: 299.90,
        imagem: "/imagens/marvels-spider-man-2.jpg",
        descricao: "Acompanhe Peter Parker e Miles Morales na proteção de Nova York contra novas ameaças.",
        editora: "Sony Interactive Entertainment",
        plataforma: "PlayStation 5",
        genero: "Ação",
        quantidade: 1
    },
    {
        id: 9,
        nome: "Hogwarts Legacy",
        preco: 199.90,
        imagem: "/imagens/hogwarts-legacy.jpg",
        descricao: "Crie seu personagem, aprenda feitiços e explore Hogwarts em uma aventura no mundo bruxo.",
        editora: "Warner Bros. Games",
        plataforma: "Xbox Series X",
        genero: "RPG",
        quantidade: 7
    },
    {
        id: 10,
        nome: "Resident Evil 4",
        preco: 179.90,
        imagem: "/imagens/resident-evil-4.jpg",
        descricao: "Controle Leon em uma missão de resgate, enfrentando inimigos e administrando recursos para sobreviver.",
        editora: "Capcom",
        plataforma: "PlayStation 4",
        genero: "Terror",
        quantidade: 0
    }
];

let proximoId = 11;

export function criarJogoModel() {
    async function listarTodos() {
        return jogos;
    }

    async function buscarPorId(id) {
        return jogos.find(jogo => jogo.id === id);
    }

    async function criar(dados) {
        const jogo = { ...dados, id: proximoId++ };
        jogos.push(jogo);
        return jogo;
    }

    async function atualizar(id, dados) {
        const indice = jogos.findIndex(jogo => jogo.id === id);
        if (indice === -1) return null;
        jogos[indice] = { ...jogos[indice], ...dados, id };
        return jogos[indice];
    }

    async function excluir(id) {
        const indice = jogos.findIndex(jogo => jogo.id === id);
        if (indice === -1) return null;
        const [jogo] = jogos.splice(indice, 1);
        return jogo;
    }

    return { listarTodos, buscarPorId, criar, atualizar, excluir };
}


