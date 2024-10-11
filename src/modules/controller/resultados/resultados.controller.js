const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    saveResultado,
    updateResultado,
    deleteResultado,
} = require('./resultados.gateaway')

const getAll = async (req, res = response) => {
    try {
        const resultados = await findAll();
        res.status(200).json(resultados);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const resultado = await findById(id);
        res.status(200).json(resultado);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = response) => {
    try {
        const { fase, id_partido, resultado_equipo_local, resultado_equipo_visitante } = req.body;
        const resultado = await saveResultado({ fase, id_partido, resultado_equipo_local, resultado_equipo_visitante });
        res.status(200).json(resultado);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { fase, id_partido, resultado_equipo_local, resultado_equipo_visitante } = req.body;
        const response = await updateResultado({ fase, id_partido, resultado_equipo_local, resultado_equipo_visitante }, id);
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
        const resultado = await deleteResultado(id);
        res.status(200).json(resultado);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const resultadosRouter = Router();

resultadosRouter.get('/', [], getAll);
resultadosRouter.get('/:id', [], getById);
resultadosRouter.post('/', [], insert);
resultadosRouter.put('/:id', [], update);
resultadosRouter.delete('/:id', [], erase);

module.exports = {
    resultadosRouter,
};
