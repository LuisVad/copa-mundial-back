const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = 'SELECT * FROM resultados';
    return await query(sql, []);
};

const findById = async (id_resultado) => {
    if (Number.isNaN(id_resultado)) throw Error("Wrong Type");
    if (!id_resultado) throw Error("Missing fields");

    const sql = `SELECT * FROM resultados WHERE id_resultado = ?`;
    const result = await query(sql, [id_resultado]);

    if (!result || result.length === 0) throw Error("Nothing found");

    return result[0];
};

const saveResultado = async (resultado) => {
    const { fase, id_partido, resultado_equipo_local, resultado_equipo_visitante } = resultado;

    if (!fase || !id_partido) {
        throw Error("Missing fields");
    }

    const sql = `INSERT INTO resultados (fase, id_partido, resultado_equipo_local, resultado_equipo_visitante) VALUES (?,?,?,?)`;
    const { insertedID } = await query(sql, [fase, id_partido, resultado_equipo_local, resultado_equipo_visitante]);

    return { ...resultado, id_resultado: insertedID };
};

const updateResultado = async (resultado, id_resultado) => {
    if (Number.isNaN(id_resultado)) throw Error("Wrong Type");

    if (!id_resultado) throw Error("Missing Fields -> id_resultado");

    if (!resultado.fase || !resultado.id_partido) {
        throw Error("Missing fields");
    }

    const sql = `UPDATE resultados SET fase = ?, id_partido = ?, resultado_equipo_local = ?, resultado_equipo_visitante = ? WHERE id_resultado = ?`;
    await query(sql, [resultado.fase, resultado.id_partido, resultado.resultado_equipo_local, resultado.resultado_equipo_visitante, id_resultado]);
    return { ...resultado, id_resultado: id_resultado };
};

const deleteResultado = async (id_resultado) => {
    if (Number.isNaN(id_resultado)) throw Error('Missing Fields');
    if (!id_resultado) throw Error('Missing Fields');
    const sql = `DELETE FROM resultados WHERE id_resultado = ?`;
    await query(sql, [id_resultado]);
    return { idDeleted: id_resultado };
};

module.exports = {
    findAll,
    findById,
    saveResultado,
    updateResultado,
    deleteResultado,
};
