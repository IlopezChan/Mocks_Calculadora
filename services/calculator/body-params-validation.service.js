const { validationResult } = require('express-validator');

class BodyParamsValidationService {

    validate = (req) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return { errors: errors.array() };
        }
    } 

}

module.exports = {BodyParamsValidationService: new BodyParamsValidationService()}