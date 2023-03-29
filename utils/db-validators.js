const { User } = require('../models');

const existeUsuarioId = async(id) => {
    try {
    const existeUsuario = await User.get(id);
    
    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe en la BD`);
    }
    }catch(e){
        throw new Error(`El ID ${id} no es válido. No existe en la BD`);
    }
}

module.exports = { existeUsuarioId }