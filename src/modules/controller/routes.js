//Archivo para manejar las Rutas de Acceso y poder acceder a ellas desde el Servidor
//Comprime las funciones de .controller y .gateway en un solo acceso

const { seleccionRouter } = require('./selecciones/selecciones.controller')
const { sedeRouter } = require('./sedes/sedes.controller')
const { partidosRouter } = require('./partidos/partidos.controller')
const { resultadosRouter } = require('./resultados/resultados.controller')
const { jugadoresRouter } = require('./jugadores/jugadores.controller')
const { arbitrosRouter } = require('./arbitros/arbitros.controller')
const { directoresTecnicosRouter } = require('./directoresTecnicos/directoresTecnicos.controller')
const { usuariosRouter } = require('./usuarios/usuarios.controller')
const { noticiasRouter } = require('./noticias/noticias.controller')

module.exports = {
    seleccionRouter,
    sedeRouter,
    partidosRouter,
    resultadosRouter,
    jugadoresRouter,
    arbitrosRouter,
    directoresTecnicosRouter,
    usuariosRouter,
    noticiasRouter
}