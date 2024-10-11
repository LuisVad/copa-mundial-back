const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = 'SELECT * FROM arbitros';
    return await query(sql, []);
};

const findById = async (id_arbitro) => {
    if (Number.isNaN(id_arbitro)) throw Error("Wrong Type");
    if (!id_arbitro) throw Error("Missing fields");

    const sql = `SELECT * FROM arbitros WHERE id_arbitro = ?`;
    const result = await query(sql, [id_arbitro]);

    if (!result || result.length === 0) throw Error("Nothing found");

    return result[0];
};

const saveArbitros = async (arbitro) => {
    const { nombre, nacionalidad, fecha_debut } = arbitro;

    if (!nombre || !nacionalidad || !fecha_debut) {
        throw Error("Missing fields");
    }

    const sql = `INSERT INTO arbitros (nombre, posicion, fecha_debut) VALUES (?,?,?)`;
    const { insertedID } = await query(sql, [nombre, nacionalidad, fecha_debut]);

    return { ...arbitro, id_arbitro: insertedID };
};

const updateArbitros = async (arbitro, id_arbitro) => {
    if (Number.isNaN(id_arbitro)) throw Error("Wrong Type");

    if (!id_arbitro) throw Error("Missing Fields -> id_arbitro");

    if (!arbitro.nombre || !arbitro.nacionalidad ||!arbitro.fecha_debut) {
        throw Error("Missing fields");
    }

    const sql = `UPDATE arbitros SET nombre = ?, nacionalidad = ?, fecha_debut = ? WHERE id_arbitro = ?`;
    await query(sql, [arbitro.nombre, arbitro.posicion, arbitro.fecha_debut, id_arbitro]);
    return { ...arbitro, id_arbitro: id_arbitro };
};

const deleteArbitros = async (id_arbitro) => {
    if (Number.isNaN(id_arbitro)) throw Error('Missing Fields');
    if (!id_arbitro) throw Error('Missing Fields');
    const sql = `DELETE FROM arbitros WHERE id_arbitro = ?`;
    await query(sql, [id_arbitro]);
    return { idDeleted: id_arbitro };
};

module.exports = {
    findAll,
    findById,
    saveArbitros,
    updateArbitros,
    deleteArbitros,
};
