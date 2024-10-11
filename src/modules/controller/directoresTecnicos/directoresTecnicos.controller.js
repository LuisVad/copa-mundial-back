const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    saveDirectorTecnico,
    updateDirectorTecnico,
    deleteDirectorTecnico,
} = require('./directoresTecnicos.gateaway')

const getAll = async (req, res = response) => {
    try {
        const directoresTecnicos = await findAll();
        res.status(200).json(directoresTecnicos);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const directorTecnico = await findById(id);
        res.status(200).json(directorTecnico);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = response) => {
    try {
        const { nombre, id_seleccion, fecha_inicio } = req.body;
        const directorTecnico = await saveDirectorTecnico({ nombre, id_seleccion, fecha_inicio });
        res.status(200).json(directorTecnico);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, id_seleccion, fecha_inicio } = req.body;
        const response = await updateDirectorTecnico({ nombre, id_seleccion, fecha_inicio }, id);
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
        const directorTecnico = await deleteDirectorTecnico(id);
        res.status(200).json(directorTecnico);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const directoresTecnicosRouter = Router();

directoresTecnicosRouter.get('/', [], getAll);
directoresTecnicosRouter.get('/:id', [], getById);
directoresTecnicosRouter.post('/', [], insert);
directoresTecnicosRouter.put('/:id', [], update);
directoresTecnicosRouter.delete('/:id', [], erase);

module.exports = {
    directoresTecnicosRouter,
};
