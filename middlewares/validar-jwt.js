const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = async(req, res = response, next ) => {
    const auth = req.header('Authorization');

    if(!auth){
        return res.json(401, { msg: 'No hay token en la peticion'});
    }

    try{
        const token = auth.substring(7, auth.length);
        const { uid } = jwt.verify(token, process.env.SECRET_TOKEN); //? Verifica el jwt

        const userEnv = process.env.SECRET_LOGIN;

        if(userEnv != uid) {
            return res.json(401,{
                msg: 'El usuario actualmente no existe en el .env'
            });
        }

        next();
    }catch(e){
        return res.json(401,{
            msg: 'Token no válido',
        });
    }
}

module.exports = { validarJWT }