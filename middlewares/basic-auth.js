const { response } = require('express');
const { CustomResponse } = require('../helpers/response/customResponseHE.js');

const responseJson = new CustomResponse();

const basicAuth = async(req, res = response, next ) => {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.json(401, responseJson.isResponseJson(401, false, "Es obligatoria la autenticación básica"));
    }

    try{
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        const userEnv = process.env.SECRET_LOGIN;
        const passEnv = process.env.SECRET_PWD;

        if(userEnv != username || password != passEnv){
            return res.json(401, responseJson.isResponseJson(401, false, "Usuario/Contraseña incorrectos"));
        }

        req.username = username;
        next();
    }catch(e){
        return res.json(401,responseJson.isResponseJson(401, false, "Token no válido"));
    }
}

module.exports = { basicAuth }