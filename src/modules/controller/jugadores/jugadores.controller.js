const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    saveJugador,
    updateJugador,
    deleteJugador,
} = require('./jugadores.gateaway')

const getAll = async (req, res = response) => {
    try {
        const jugadores = await findAll();
        res.status(200).json(jugadores);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const jugador = await findById(id);
        res.status(200).json(jugador);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = response) => {
    try {
        const { nombre, posicion, id_seleccion, goles_anotados, fecha_debut } = req.body;
        const jugador = await saveJugador({ nombre, posicion, id_seleccion, goles_anotados, fecha_debut });
        res.status(200).json(jugador);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, posicion, id_seleccion, goles_anotados, fecha_debut } = req.body;
        const response = await updateJugador({ nombre, posicion, id_seleccion, goles_anotados, fecha_debut }, id);
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
        const jugador = await deleteJugador(id);
        res.status(200).json(jugador);
    } catch (error) {
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const jugadoresRouter = Router();

jugadoresRouter.get('/', [], getAll);
jugadoresRouter.get('/:id', [], getById);
jugadoresRouter.post('/', [], insert);
jugadoresRouter.put('/:id', [], update);
jugadoresRouter.delete('/:id', [], erase);

module.exports = {
    jugadoresRouter,
};
