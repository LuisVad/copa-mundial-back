const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    saveNoticia,
    updateNoticia,
    deleteNoticia,
} = require('./noticias.gateway');

const getAll = async (req, res = response) => {
    try {
        const noticias = await findAll();
        res.status(200).json(noticias);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const noticia = await findById(id);
        res.status(200).json(noticia);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = response) => {
    try {
        const { titulo, fecha_publicacion, descripcion, imagen, id_periodista } = req.body;
        const noticia = await saveNoticia({ titulo, fecha_publicacion, descripcion, imagen, id_periodista });
        res.status(200).json(noticia);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { titulo, fecha_publicacion, descripcion, imagen } = req.body;
        const response = await updateNoticia({ titulo, fecha_publicacion, descripcion, imagen }, id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const erase = async (req, res = response) => {
    try {
        const { id } = req.params;
        const noticia = await deleteNoticia(id);
        res.status(200).json(noticia);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const noticiasRouter = Router();

noticiasRouter.get('/', [], getAll);
noticiasRouter.get('/:id', [], getById);
noticiasRouter.post('/', [], insert);
noticiasRouter.put('/:id', [], update);
noticiasRouter.delete('/:id', [], erase);

module.exports = {
    noticiasRouter,
};
