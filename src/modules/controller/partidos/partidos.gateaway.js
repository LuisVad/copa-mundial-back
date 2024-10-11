const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = 'SELECT * FROM partidos';
    return await query(sql, []);
};

const findById = async (id_partido) => {
    if (Number.isNaN(id_partido)) throw Error("Wrong Type");
    if (!id_partido) throw Error("Missing fields");

    const sql = `SELECT * FROM partidos WHERE id_partido = ?`;
    const result = await query(sql, [id_partido]);

    if (!result || result.length === 0) throw Error("Nothing found");

    return result[0];
};

const savePartido = async (partido) => {
    const { fecha, hora_inicio, id_sede, id_seleccion_local, id_seleccion_visitante, id_arbitro } = partido;

    //console.log(fecha);
    //console.log(hora_inicio);
    //console.log(id_sede);
    //console.log(id_seleccion_local);
    //console.log(id_seleccion_visitante);
    //console.log(id_arbitro);

    if (!fecha || !hora_inicio || !id_sede || !id_seleccion_local || !id_seleccion_visitante || !id_arbitro) throw Error("Missing fields");

    const sql = `INSERT INTO partidos (fecha, hora_inicio, id_sede, id_seleccion_local, id_seleccion_visitante, id_arbitro) VALUES (?, ?, ?, ?, ?, ?)`;
    const { insertedID } = await query(sql, [fecha, hora_inicio, id_sede, id_seleccion_local, id_seleccion_visitante, id_arbitro]);

    return { ...partido, id_partido: insertedID };
};

const updatePartido = async (partido, id_partido) => {
    if (Number.isNaN(id_partido)) throw Error("Wrong Type");

    if (!id_partido) throw Error("Missing Fields -> id_partido");

    if (!partido.fecha || !partido.hora_inicio || !partido.id_sede || !partido.id_seleccion_local || !partido.id_seleccion_visitante || !partido.id_arbitro) throw Error("Missing fields");

    const sql = `UPDATE partidos SET fecha = ?, hora_inicio = ?, id_sede = ?, id_seleccion_local = ?, id_seleccion_visitante = ?, id_arbitro = ? WHERE id_partido = ?`;
    await query(sql, [partido.fecha, partido.hora_inicio, partido.id_sede, partido.id_seleccion_local, partido.id_seleccion_visitante, partido.id_arbitro, id_partido]);
    return { ...partido, id_partido: id_partido };
};

const deletePartido = async (id_partido) => {
    if (Number.isNaN(id_partido)) throw Error('Missing Fields');
    if (!id_partido) throw Error('Missing Fields');
    const sql = `DELETE FROM partidos WHERE id_partido = ?`;
    await query(sql, [id_partido]);
    return { idDeleted: id_partido };
};

module.exports = {
    findAll,
    findById,
    savePartido,
    updatePartido,
    deletePartido,
};
