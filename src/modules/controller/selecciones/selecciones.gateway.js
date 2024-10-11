const { query } = require('../../../utils/mysql');

const findAll = async () => {
    const sql = 'SELECT * FROM selecciones';
    return await query(sql, []);
};

const findById = async (id_seleccion) => {
    if (Number.isNaN(id_seleccion)) throw Error("Wrong Type");
    if (!id_seleccion) throw Error("Missing fields");
    
    const sql = `SELECT * FROM selecciones WHERE id_seleccion = ?`;
    const result = await query(sql, [id_seleccion]);

    if (!result || result.length === 0) throw Error("Nothing found");
    
    return result[0];
}

const saveSeleccion = async (seleccion) => {
    const { nombre, ranking_fifa, primera_participacion, titulos, id_confederacion } = seleccion;

    //console.log(nombre);
    //console.log(ranking_fifa);
    //console.log(primera_participacion);
    //console.log(titulos);
    //console.log(id_confederacion);
    
    if (!nombre || !ranking_fifa || !primera_participacion || !id_confederacion) throw Error("Missing fields");

    // Verificar si ya existe una selección con el mismo nombre
    const existingSelection = await query("SELECT id_seleccion FROM selecciones WHERE nombre = ?", [nombre]);
    if (existingSelection.length > 0) throw Error("Duplicate soccer team");
    
    const sql = `INSERT INTO selecciones (nombre, ranking_fifa, primera_participacion, titulos, id_confederacion) VALUES (?,?,?,?,?)`;
    const { insertedID } = await query(sql, [nombre, ranking_fifa, primera_participacion, titulos, id_confederacion]);
    
    return { ...seleccion, id_seleccion: insertedID };
}

const updateSeleccion = async (seleccion, id_seleccion) => {
    if (Number.isNaN(id_seleccion)) throw Error("Wrong Type");

    if(!id_seleccion) throw Error("Missing Fields -> id_seleccion");
    
    if (!seleccion.nombre || !seleccion.primera_participacion || !seleccion.id_confederacion) throw Error("Missing fields");

    // Validar si existe otra selección con el mismo ranking FIFA (excepto si es 0)
    if (seleccion.ranking_fifa !== 0) {
        const duplicateRankingCheckResult = await query("SELECT COUNT(*) as count FROM selecciones WHERE ranking_fifa = ? AND id_seleccion <> ?", [seleccion.ranking_fifa, id_seleccion]);
        if (duplicateRankingCheckResult[0].count > 0) throw Error("Duplicate ranking position");
    }

    const sql = `UPDATE selecciones SET nombre = ?, ranking_fifa = ?, primera_participacion = ?, titulos = ?, id_confederacion = ? WHERE id_seleccion = ?;`;
    await query(sql, [seleccion.nombre, seleccion.ranking_fifa, seleccion.primera_participacion, seleccion.titulos, seleccion.id_confederacion, id_seleccion]);
    return {...seleccion, id_seleccion: id_seleccion}
};

const deleteSeleccion = async (id_seleccion) => {
    if (Number.isNaN(id_seleccion)) throw Error('Missing Fields');
    if (!id_seleccion) throw Error('Missing Fields');
    const sql = `DELETE FROM selecciones WHERE id_seleccion = ?;`;
    await query(sql, [id_seleccion]);
    return {idDeleted: id_seleccion};
};

module.exports = {
    findAll,
    findById,
    saveSeleccion,
    updateSeleccion,
    deleteSeleccion,
};
