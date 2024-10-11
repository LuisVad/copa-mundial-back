const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = 'SELECT * FROM directores_tecnicos';
    return await query(sql, []);
};

const findById = async (id_director_tecnico) => {
    if (Number.isNaN(id_director_tecnico)) throw Error("Wrong Type");
    if (!id_director_tecnico) throw Error("Missing fields");

    const sql = `SELECT * FROM directores_tecnicos WHERE id_director_tecnico = ?`;
    const result = await query(sql, [id_director_tecnico]);

    if (!result || result.length === 0) throw Error("Nothing found");

    return result[0];
};

const saveDirectorTecnico = async (directorTecnico) => {
    const { nombre, id_seleccion, fecha_inicio } = directorTecnico;

    if (!nombre || !id_seleccion || !fecha_inicio) {
        throw Error("Missing fields");
    }

    const sql = `INSERT INTO directores_tecnicos (nombre, id_seleccion, fecha_inicio) VALUES (?,?,?)`;
    const { insertedID } = await query(sql, [nombre, id_seleccion, fecha_inicio]);

    return { ...directorTecnico, id_director_tecnico: insertedID };
};

const updateDirectorTecnico = async (directorTecnico, id_director_tecnico) => {
    if (Number.isNaN(id_director_tecnico)) throw Error("Wrong Type");

    if (!id_director_tecnico) throw Error("Missing Fields -> id_director_tecnico");

    if (!directorTecnico.nombre || !directorTecnico.id_seleccion ||!directorTecnico.fecha_inicio) {
        throw Error("Missing fields");
    }

    const sql = `UPDATE directores_tecnicos SET nombre = ?, id_seleccion = ?, fecha_inicio = ? WHERE id_arbitro = ?`;
    await query(sql, [directorTecnico.nombre, directorTecnico.id_seleccion, directorTecnico.fecha_inicio, id_director_tecnico]);
    return { ...directorTecnico, id_director_tecnico: id_director_tecnico };
};

const deleteDirectorTecnico = async (id_director_tecnico) => {
    if (Number.isNaN(id_director_tecnico)) throw Error('Missing Fields');
    if (!id_director_tecnico) throw Error('Missing Fields');
    const sql = `DELETE FROM directores_tecnicos WHERE id_director_tecnico = ?`;
    await query(sql, [id_director_tecnico]);
    return { idDeleted: id_director_tecnico };
};

module.exports = {
    findAll,
    findById,
    saveDirectorTecnico,
    updateDirectorTecnico,
    deleteDirectorTecnico,
};
