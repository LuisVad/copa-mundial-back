const { query } = require('../../../utils/mysql');
const fs = require('fs');
const path = require('path');

// Obtener todas las noticias
const findAll = async () => {
    const sql = 'SELECT id_noticia, titulo, fecha_publicacion, descripcion, imagen FROM noticias';
    const noticias = await query(sql, []);

    // Generar URLs completas para las imágenes
    const noticiasWithFullURLs = noticias.map(noticia => ({
        ...noticia,
        imageUrl: `http://localhost:8080/uploads/${noticia.imagen}`,
    }));

    return noticiasWithFullURLs;
};

// Obtener una noticia por ID
const findById = async (id_noticia) => {
    if (Number.isNaN(id_noticia)) throw Error("Wrong Type");
    if (!id_noticia) throw Error("Missing fields");

    const sql = `SELECT * FROM noticias WHERE id_noticia = ?`;
    const result = await query(sql, [id_noticia]);

    if (!result || result.length === 0) throw Error("Nothing found");

    return result[0];
};

// Guardar una nueva noticia
const saveNoticia = async (noticia) => {
    const { titulo, fecha_publicacion, descripcion, imagen, id_periodista } = noticia;

    if (!titulo || !fecha_publicacion || !descripcion || !imagen || !id_periodista) {
        throw Error("Missing fields");
    }

    try {
        const imageName = `image_${titulo}.png`;
        const sql = `INSERT INTO noticias (titulo, fecha_publicacion, descripcion, imagen, id_periodista) VALUES (?, ?, ?, ?, ?)`;
        const { insertedId } = await query(sql, [
            titulo,
            fecha_publicacion,
            descripcion,
            imageName,
            id_periodista,
        ]);

        // Guardar la imagen en la carpeta uploads
        const base64Data = imagen.replace(/^data:image\/\w+;base64,/, '');
        const dataBuffer = Buffer.from(base64Data, 'base64');
        const imagePath = path.join(__dirname, '../../../uploads', imageName);

        fs.writeFileSync(imagePath, dataBuffer);

        return { ...noticia, id_noticia: insertedId, imagePath };
    } catch (error) {
        throw error;
    }
};

// Actualizar una noticia
const updateNoticia = async (noticia, id_noticia) => {
    if (Number.isNaN(id_noticia)) throw Error("Wrong Type");
    if (!id_noticia) throw Error("Missing Fields -> id_noticia");

    const { titulo, fecha_publicacion, descripcion, imagen } = noticia;

    if (!titulo || !fecha_publicacion || !descripcion) {
        throw Error("Missing fields");
    }

    // Si se proporciona una nueva imagen, guardarla
    if (imagen) {
        const imageName = `image_${titulo}.png`;
        const base64Data = imagen.replace(/^data:image\/\w+;base64,/, '');
        const dataBuffer = Buffer.from(base64Data, 'base64');
        const imagePath = path.join(__dirname, '../../../uploads', imageName);

        fs.writeFileSync(imagePath, dataBuffer);

        noticia.imagen = imageName;
    }

    const sql = `UPDATE noticias SET titulo = ?, fecha_publicacion = ?, descripcion = ?, imagen = ? WHERE id_noticia = ?`;
    await query(sql, [titulo, fecha_publicacion, descripcion, noticia.imagen, id_noticia]);
    return { ...noticia, id_noticia: id_noticia };
};

// Eliminar una noticia
const deleteNoticia = async (id_noticia) => {
    if (Number.isNaN(id_noticia)) throw Error('Missing Fields');
    if (!id_noticia) throw Error('Missing Fields');
    const sql = `DELETE FROM noticias WHERE id_noticia = ?`;
    await query(sql, [id_noticia]);
    return { idDeleted: id_noticia };
};

module.exports = {
    findAll,
    findById,
    saveNoticia,
    updateNoticia,
    deleteNoticia,
};
