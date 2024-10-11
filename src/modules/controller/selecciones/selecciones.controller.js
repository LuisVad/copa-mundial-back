const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    saveSeleccion,
    updateSeleccion,
    deleteSeleccion,
} = require('./selecciones.gateway');

const getAll = async (req, res = Response) => {
    try {
        const seleccion = await findAll();
        res.status(200).json(seleccion);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const seleccion = await findById(id);
        res.status(200).json(seleccion);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = Response) => {
    try {
        const { nombre, ranking_fifa, primera_participacion, titulos, id_confederacion} = req.body;
        const seleccion = await saveSeleccion({nombre, ranking_fifa, primera_participacion, titulos, id_confederacion});
        res.status(200).json(seleccion);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const { nombre, ranking_fifa, primera_participacion, titulos, id_confederacion } = req.body;
        const response = await updateSeleccion({nombre, ranking_fifa, primera_participacion, titulos, id_confederacion}, id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const erase = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const seleccion = await deleteSeleccion(id);
        res.status(200).json(seleccion);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const seleccionRouter = Router();

seleccionRouter.get('/', [], getAll);
seleccionRouter.get('/:id', [], getById);
seleccionRouter.post('/', [], insert);
seleccionRouter.put('/:id', [], update);
seleccionRouter.delete('/:id', [], erase);

module.exports = {
    seleccionRouter,
};
