import express from 'express';
import timesFutebol from "./times.js";
import { modeloTime, modeloAtualizacaoTime } from './validacao.js';

const app = express();
app.use(express.json());

// Endpoint GET '/' - Acessar todos os times
app.get('/', (requisicao, resposta) => {
    resposta.status(200).send(timesFutebol);
});

// Endpoint GET '/sigla' - Acessar um time específico, procurando-o pela sua sigla
app.get('/:sigla', (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const time = timesFutebol.find((infoTime) => infoTime.sigla === siglaInformada);
    // Se o time não existir no banco de dados
    if (!time) {
        resposta.status(404).send('Não existe nenhum time com a sigla informada. Por favor tente novamente');
        return;
    }
    // Se o time existir no banco de dados
    resposta.status(200).send(time);
});

// Endpoint PUT '/sigla' - Procurar um time por sua sigla e atualizar as informações do mesmo
app.put('/:sigla', (requisicao, resposta) => {
    // Recebendo a sigla e verificando se o time correspondente já existe no banco
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const timeSelecionado = timesFutebol.find((infoTime) => infoTime.sigla === siglaInformada);
    if (!timeSelecionado) {
        resposta.status(404).send('Não existe nenhum time com a sigla informada. Por favor tente novamente');
        return;
    }

    // Validando os dados enviados
    const { error } = modeloAtualizacaoTime.validate(requisicao.body);
    if (error) {
        resposta.status(400).send(error)
        return;
    }

    // Adicionando os dados em cada campo
    const campos = Object.keys(requisicao.body);
    for(let campo of campos) {
        timeSelecionado[campo] = requisicao.body[campo];
    }
    resposta.status(200).send(timeSelecionado);
});

// Endpoint POST '/' - Adicionar um novo time ao banco de dados
app.post('/', (requisicao, resposta) => {
    const novoTime = requisicao.body;
    
    // Validando os dados enviados
    const { error } = modeloTime.validate(requisicao.body);
    if (error) {
        resposta.status(400).send(error);
        return;
    }

    timesFutebol.push(novoTime);
    resposta.status(201).send(novoTime);
});

// Endpoint DELETE '/sigla' - Procurar um time por sua sigla e apagá-lo do banco de dados
app.delete('/:sigla', (requisicao, resposta) => {
    const siglaInformada = requisicao.params.sigla.toUpperCase();
    const indiceTimeSelecionado = timesFutebol.findIndex(
        (infoTime) => infoTime.sigla === siglaInformada
    );
    // console.log(indiceTimeSelecionado);
    if (indiceTimeSelecionado === -1) {
        resposta.status(404).send('Não existe nenhum time com a sigla informada. Por favor tente novamente');
        return;
    }
    const timeRemovido = timesFutebol.splice(indiceTimeSelecionado, 1);
    resposta.status(200).send(timeRemovido);
});

// Inicializar servidor web na porta definida na função listen().
app.listen(7575, () => {
    console.log('Servidor rodando com sucesso na porta 7575.')
});