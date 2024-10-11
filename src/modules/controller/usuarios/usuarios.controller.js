const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    saveUsuario,
    updateUsuario,
    deleteUsuario,
} = require('./usuarios.gateway');

const getAll = async (req, res = response) => {
    try {
        const usuarios = await findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const usuario = await findById(id);
        res.status(200).json(usuario);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = response) => {
    try {
        const { username, contraseña, nombre_completo, email, id_rol } = req.body;
        const usuario = await saveUsuario({ username, contraseña, nombre_completo, email, id_rol });
        res.status(200).json(usuario);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { username, contraseña, nombre_completo, email, id_rol } = req.body;
        const response = await updateUsuario({ username, contraseña, nombre_completo, email, id_rol }, id);
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
        const usuario = await deleteUsuario(id);
        res.status(200).json(usuario);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const usuariosRouter = Router();

usuariosRouter.get('/', [], getAll);
usuariosRouter.get('/:id', [], getById);
usuariosRouter.post('/', [], insert);
usuariosRouter.put('/:id', [], update);
usuariosRouter.delete('/:id', [], erase);

module.exports = {
    usuariosRouter,
};