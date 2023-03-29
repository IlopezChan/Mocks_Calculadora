const { Router } = require('express');
const { check } = require('express-validator');
const { realizarRollback } = require('../../controllers/rollback/rollbackController.js');
const { validarCampos, validarJWT } = require('../../middlewares/index.js');

const routerRollback = Router();

routerRollback.post('/',
    validarJWT,
    check('cve_solicitud', 'La validacion cve_solicitud es obligatoria').not().isEmpty(),
    check('operario', 'La validacion es obligatoria').not().isEmpty(),
    validarCampos,
    realizarRollback);

module.exports = { routerRollback };