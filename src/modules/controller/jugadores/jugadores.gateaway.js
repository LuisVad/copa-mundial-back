const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = 'SELECT * FROM jugadores';
    return await query(sql, []);
};

const findById = async (id_jugador) => {
    if (Number.isNaN(id_jugador)) throw Error("Wrong Type");
    if (!id_jugador) throw Error("Missing fields");

    const sql = `SELECT * FROM jugadores WHERE id_jugador = ?`;
    const result = await query(sql, [id_jugador]);

    if (!result || result.length === 0) throw Error("Nothing found");

    return result[0];
};

const saveJugador = async (jugador) => {
    const { nombre, posicion, id_seleccion, goles_anotados, fecha_debut } = jugador;

    if (!nombre || !posicion || !id_seleccion) {
        throw Error("Missing fields");
    }

    const sql = `INSERT INTO jugadores (nombre, posicion, id_seleccion, goles_anotados, fecha_debut) VALUES (?,?,?,?,?)`;
    const { insertedID } = await query(sql, [nombre, posicion, id_seleccion, goles_anotados, fecha_debut]);

    return { ...jugador, id_jugador: insertedID };
};

const updateJugador = async (jugador, id_jugador) => {
    if (Number.isNaN(id_jugador)) throw Error("Wrong Type");

    if (!id_jugador) throw Error("Missing Fields -> id_jugador");

    if (!jugador.nombre || !jugador.posicion ||!jugador.id_seleccion) {
        throw Error("Missing fields");
    }

    const sql = `UPDATE jugadores SET nombre = ?, posicion = ?, id_seleccion = ?, goles_anotados = ?, fecha_debut = ? WHERE id_jugador = ?`;
    await query(sql, [jugador.nombre, jugador.posicion, jugador.id_seleccion, jugador.goles_anotados, jugador.fecha_debut, id_jugador]);
    return { ...jugador, id_jugador: id_jugador };
};

const deleteJugador = async (id_jugador) => {
    if (Number.isNaN(id_jugador)) throw Error('Missing Fields');
    if (!id_jugador) throw Error('Missing Fields');
    const sql = `DELETE FROM jugadores WHERE id_jugador = ?`;
    await query(sql, [id_jugador]);
    return { idDeleted: id_jugador };
};

module.exports = {
    findAll,
    findById,
    saveJugador,
    updateJugador,
    deleteJugador,
};
