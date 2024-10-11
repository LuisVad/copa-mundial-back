const { query } = require('../../../utils/mysql');

// Obtener todos los usuarios
const findAll = async () => {
    const sql = 'SELECT * FROM usuarios';
    return await query(sql, []);
};

// Obtener un usuario por ID
const findById = async (id_usuario) => {
    if (Number.isNaN(id_usuario)) throw Error("Wrong Type");
    if (!id_usuario) throw Error("Missing fields");

    const sql = `SELECT * FROM usuarios WHERE id_usuario = ?`;
    const result = await query(sql, [id_usuario]);

    if (!result || result.length === 0) throw Error("Nothing found");

    return result[0];
};

// Guardar un nuevo usuario
const saveUsuario = async (usuario) => {
    const { username, contraseña, nombre_completo, email, id_rol } = usuario;

    if (!username || !contraseña || !nombre_completo || !email || !id_rol) {
        throw Error("Missing fields");
    }

    const sql = `INSERT INTO usuarios (username, contraseña, nombre_completo, email, id_rol) VALUES (?, ?, ?, ?, ?)`;
    const { insertedID } = await query(sql, [username, contraseña, nombre_completo, email, id_rol]);

    return { ...usuario, id_usuario: insertedID };
};

// Actualizar un usuario
const updateUsuario = async (usuario, id_usuario) => {
    if (Number.isNaN(id_usuario)) throw Error("Wrong Type");

    if (!id_usuario) throw Error("Missing Fields -> id_usuario");

    if (!usuario.username || !usuario.contraseña || !usuario.nombre_completo || !usuario.email || !usuario.id_rol) {
        throw Error("Missing fields");
    }

    const sql = `UPDATE usuarios SET username = ?, contraseña = ?, nombre_completo = ?, email = ?, id_rol = ? WHERE id_usuario = ?`;
    await query(sql, [usuario.username, usuario.contraseña, usuario.nombre_completo, usuario.email, usuario.id_rol, id_usuario]);
    return { ...usuario, id_usuario: id_usuario };
};

// Eliminar un usuario
const deleteUsuario = async (id_usuario) => {
    if (Number.isNaN(id_usuario)) throw Error('Missing Fields');
    if (!id_usuario) throw Error('Missing Fields');
    const sql = `DELETE FROM usuarios WHERE id_usuario = ?`;
    await query(sql, [id_usuario]);
    return { idDeleted: id_usuario };
};

module.exports = {
    findAll,
    findById,
    saveUsuario,
    updateUsuario,
    deleteUsuario,
};
