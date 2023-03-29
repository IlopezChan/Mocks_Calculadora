const  { validarCampos }  = require('./validar-campos.js');
const  { validarJWT }  = require('./validar-jwt.js');
const  { basicAuth }  = require('./basic-auth.js');

module.exports = {
    validarCampos ,
    validarJWT,
    basicAuth,
}