import { carregarAmbiente } from './config/ambiente.js';

const config = carregarAmbiente('.env');

const { app } = await import("./app.js");
const porta = config.porta || 5000;

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
