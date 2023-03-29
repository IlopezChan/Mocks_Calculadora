const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        let response = {
            status: false,
            code: 400,
            message: errors.errors[0].msg,
            data: null,
        };

        return res.json(400, response);
    }
    
    next();
}

module.exports = {
    validarCampos
}