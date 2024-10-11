const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = 'SELECT * FROM sedes';
    return await query(sql, []);
};

const findById = async (id_sede) => {
    if (Number.isNaN(id_sede)) throw Error("Wrong Type");
    if (!id_sede) throw Error("Missing fields");

    const sql = `SELECT * FROM sedes WHERE id_sede = ?`;
    const result = await query(sql, [id_sede]);

    if (!result || result.length === 0) throw Error("Nothing found");

    return result[0];
};

const saveSede = async (sede) => {
    const { nombre_estadio, ciudad, anio_inauguracion, capacidad, equipos, pais_organizador } = sede;

    //console.log(nombre_estadio);
    //console.log(ciudad);
    //console.log(anio_inauguracion);
    //console.log(capacidad);
    //console.log(equipos);
    //console.log(pais_organizador);

    if (!nombre_estadio || !ciudad || !anio_inauguracion || !capacidad || !equipos || !pais_organizador) {
        throw Error("Missing fields");
    }

    // Verificar si ya existe un estadio con el mismo nombre
    const existingStadium = await query("SELECT id_sede FROM sedes WHERE nombre_estadio = ?", [nombre_estadio]);
    if (existingStadium.length > 0) throw Error("Duplicate stadium");

    const sql = `INSERT INTO sedes (nombre_estadio, ciudad, anio_inauguracion, capacidad, equipos, pais_organizador) VALUES (?,?,?,?,?,?)`;
    const { insertedID } = await query(sql, [nombre_estadio, ciudad, anio_inauguracion, capacidad, equipos, pais_organizador]);

    return { ...sede, id_sede: insertedID };
};

const updateSede = async (sede, id_sede) => {
    if (Number.isNaN(id_sede)) throw Error("Wrong Type");

    if (!id_sede) throw Error("Missing Fields -> id_sede");

    if (!sede.nombre_estadio || !sede.ciudad || !sede.anio_inauguracion || !sede.capacidad || !sede.equipos || !sede.pais_organizador) {
        throw Error("Missing fields");
    }

    const sql = `UPDATE sedes SET nombre_estadio = ?, ciudad = ?, anio_inauguracion = ?, capacidad = ?, equipos = ?, pais_organizador = ? WHERE id_sede = ?`;
    await query(sql, [sede.nombre_estadio, sede.ciudad, sede.anio_inauguracion, sede.capacidad, sede.equipos, sede.pais_organizador, id_sede]);
    return { ...sede, id_sede: id_sede };
};

const deleteSede = async (id_sede) => {
    if (Number.isNaN(id_sede)) throw Error('Missing Fields');
    if (!id_sede) throw Error('Missing Fields');
    const sql = `DELETE FROM sedes WHERE id_sede = ?`;
    await query(sql, [id_sede]);
    return { idDeleted: id_sede };
};

module.exports = {
    findAll,
    findById,
    saveSede,
    updateSede,
    deleteSede,
};
