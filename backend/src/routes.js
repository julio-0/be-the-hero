const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongcontroller = require('./controllers/ongcontroller');
const incidentcontroller = require('./controllers/incidentcontroller');
const profilecontroller = require('./controllers/profilecontroller');
const sessioncontroller = require('./controllers/sessioncontroller');
const authMid = require('./auth/auth');

const routes = express.Router();
//routes.use(authMid);

routes.post('/sessions', sessioncontroller.create);

routes.get('/ongs', ongcontroller.index);

routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) , ongcontroller.create);

routes.put('/ongs', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) , authMid, ongcontroller.update);

routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number(),
    })
}),incidentcontroller.index);

routes.post('/incidents', celebrate({    
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY] : Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number(),
    })    
}), authMid, incidentcontroller.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required(),
    })
}), authMid, incidentcontroller.delete);

routes.get('/profile', celebrate({    
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), authMid, profilecontroller.index);

module.exports = routes;
