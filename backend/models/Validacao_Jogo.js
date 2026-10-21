export default class ValidacaoJogo {
    constructor({id, nome, preco, quantidade, plataforma, genero}) {
        if(!Number.isInteger(id) || id <= 0){
            throw new TypeError('ID deve ser um número inteiro positivo.');
        }
        if(typeof nome !== 'string' || nome.trim().length < 2 || nome.trim().length > 100) {
            throw new TypeError('O nome deve ter entre 2 e 100 caracteres.');
        }
        if(!Number.isFinite(preco) || preco < 0 || Number(preco.toFixed(2)) !== preco) {
            throw new TypeError('Informe um preço maior ou igual a zero, com até duas casas decimais.');
        }
        if(!Number.isInteger(quantidade) || quantidade < 0) {
            throw new TypeError('A quantidade deve ser um número inteiro maior ou igual a zero.');
        }
        const plataformas = ['Nintendo Switch', 'Nintendo Switch 2', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X'];
        const generos = ['Ação', 'Aventura', 'RPG', 'Corrida', 'Esporte', 'Estratégia', 'Plataforma', 'Puzzle', 'Simulação', 'Terror'];
        if (!plataformas.includes(plataforma)) {
            throw new TypeError('Selecione uma plataforma válida.');
        }
        if (!generos.includes(genero)) {
            throw new TypeError('Selecione um gênero válido.');
        }
        Object.assign(this, {
            id, nome: nome.trim(), preco, quantidade, plataforma, genero
        });
    }

}
