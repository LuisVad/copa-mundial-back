const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    savePartido,
    updatePartido,
    deletePartido,
} = require('./partidos.gateaway');

const getAll = async (req, res = response) => {
    try {
        const partidos = await findAll();
        res.status(200).json(partidos);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const partido = await findById(id);
        res.status(200).json(partido);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = response) => {
    try {
        const { fecha, hora_inicio, id_sede, id_seleccion_local, id_seleccion_visitante, id_arbitro } = req.body;
        const partido = await savePartido({ fecha, hora_inicio, id_sede, id_seleccion_local, id_seleccion_visitante, id_arbitro });
        res.status(200).json(partido);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { fecha, hora_inicio, id_sede, id_seleccion_local, id_seleccion_visitante, id_arbitro } = req.body;
        const response = await updatePartido({ fecha, hora_inicio, id_sede, id_seleccion_local, id_seleccion_visitante, id_arbitro }, id);
        res.status(200).json(response);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const erase = async (req, res = response) => {
    try {
        const { id } = req.params;
        const partido = await deletePartido(id);
        res.status(200).json(partido);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const partidosRouter = Router();

partidosRouter.get('/', [], getAll);
partidosRouter.get('/:id', [], getById);
partidosRouter.post('/', [], insert);
partidosRouter.put('/:id', [], update);
partidosRouter.delete('/:id', [], erase);

module.exports = {
    partidosRouter,
};
