import { app } from './app.js';

const porta = process.env.PORT || 5000;

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
