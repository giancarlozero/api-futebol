import Joi from 'joi';

export const modeloTime = Joi.object({
    nome: Joi.string().min(4).required(),
    sigla: Joi.string().length(3).required(),
    pontos: Joi.number().default(0),
    vitorias: Joi.number().default(0),
    empates: Joi.number().default(0),
    derrotas: Joi.number().default(0),
    golsMarcados: Joi.number().default(0),
    golsSofridos: Joi.number().default(0),
    saldoGols: Joi.number().default(0),
});

export const modeloAtualizacaoTime = Joi.object({
    nome: Joi.string().min(4),
    sigla: Joi.string().length(3),
    pontos: Joi.number(),
    vitorias: Joi.number(),
    empates: Joi.number(),
    derrotas: Joi.number(),
    golsMarcados: Joi.number(),
    golsSofridos: Joi.number(),
    saldoGols: Joi.number(),
}).min(1);