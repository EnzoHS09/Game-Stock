export default class ValidacaoJogo {
    constructor({id, nome, preco, quantidade, plataforma, genero, imagem = ''}) {
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
        if (typeof imagem !== 'string') {
            throw new TypeError('A imagem deve ser um arquivo PNG, JPG ou WebP.');
        }
        if (imagem && !/^\/imagens\/[a-z0-9_-]+\.(png|jpe?g|webp)$/i.test(imagem)) {
            const limite = 5 * 1024 * 1024;
            if (imagem.length > Math.ceil(limite / 3) * 4 + 32) {
                throw new TypeError('A imagem deve ter até 5 MB.');
            }
            const arquivo = imagem.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/);
            if (!arquivo) {
                throw new TypeError('Selecione uma imagem PNG, JPG ou WebP válida.');
            }
            const bytes = Buffer.from(arquivo[2], 'base64');
            if (bytes.length > limite) {
                throw new TypeError('A imagem deve ter até 5 MB.');
            }
            const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
            const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
            const webp = bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
            const tipoValido = { png, jpeg, webp }[arquivo[1]];
            if (!tipoValido || bytes.toString('base64') !== arquivo[2]) {
                throw new TypeError('O arquivo selecionado não contém uma imagem válida.');
            }
        }
        Object.assign(this, {
            id, nome: nome.trim(), preco, quantidade, plataforma, genero, imagem
        });
    }

}
