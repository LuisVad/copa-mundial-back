const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    saveArbitros,
    updateArbitros,
    deleteArbitros,
} = require('./arbitros.gateaway')

const getAll = async (req, res = response) => {
    try {
        const arbitros = await findAll();
        res.status(200).json(arbitros);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const arbitro = await findById(id);
        res.status(200).json(arbitro);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = response) => {
    try {
        const { nombre, nacionalidad, fecha_debut } = req.body;
        const arbitro = await saveArbitros({ nombre, nacionalidad, fecha_debut });
        res.status(200).json(arbitro);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, nacionalidad, fecha_debut } = req.body;
        const response = await updateArbitros({ nombre, nacionalidad, fecha_debut }, id);
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
        const arbitro = await deleteArbitros(id);
        res.status(200).json(arbitro);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const arbitrosRouter = Router();

arbitrosRouter.get('/', [], getAll);
arbitrosRouter.get('/:id', [], getById);
arbitrosRouter.post('/', [], insert);
arbitrosRouter.put('/:id', [], update);
arbitrosRouter.delete('/:id', [], erase);

module.exports = {
    arbitrosRouter,
};
