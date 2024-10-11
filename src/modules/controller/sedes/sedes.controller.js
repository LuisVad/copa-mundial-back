const { response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const {
    findAll,
    findById,
    saveSede,
    updateSede,
    deleteSede,
} = require('./sedes.gateway');

const getAll = async (req, res = response) => {
    try {
        const sedes = await findAll();
        res.status(200).json(sedes);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const sede = await findById(id);
        res.status(200).json(sede);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = response) => {
    try {
        const { nombre_estadio, ciudad, anio_inauguracion, capacidad, equipos, pais_organizador } = req.body;
        const sede = await saveSede({ nombre_estadio, ciudad, anio_inauguracion, capacidad, equipos, pais_organizador });
        res.status(200).json(sede);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { nombre_estadio, ciudad, anio_inauguracion, capacidad, equipos, pais_organizador } = req.body;
        const response = await updateSede({ nombre_estadio, ciudad, anio_inauguracion, capacidad, equipos, pais_organizador }, id);
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
        const sede = await deleteSede(id);
        res.status(200).json(sede);
    } catch (error) {
        //console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const sedeRouter = Router();

sedeRouter.get('/', [], getAll);
sedeRouter.get('/:id', [], getById);
sedeRouter.post('/', [], insert);
sedeRouter.put('/:id', [], update);
sedeRouter.delete('/:id', [], erase);

module.exports = {
    sedeRouter,
};
