// Función para validar Errores
const validateError = (error) => {
    switch (error.message) {
        case 'Wrong type':
            return 'Revisar campos de solicitud';
        case 'Missing fields':
            return 'Validar campos';
        case 'Duplicate soccer team':
            return 'El nombre de la selección ya está en uso';
        case 'Duplicate stadium':
            return 'El nombre del Estadio ya está en uso';    
        case 'Duplicate ranking position':
            return 'No puedes registrar esta posición porque otra selección la está ocupando.';    
        case 'Nothing found':
            return 'No se encontraron datos.';
        case 'Password mismatch':
            return 'Credenciales no coinciden';
        //case 'foreign key constraint fails':
            //return 'Violación de clave foránea.';
        default:
            return 'Revisar solicitud';
    }
};

module.exports = {
    validateError,
};