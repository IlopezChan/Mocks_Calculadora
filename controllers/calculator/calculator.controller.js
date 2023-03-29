
const { response, request } = require('express');
const { CalculatorService } = require('../../services/calculator/calculator.service');
const { BodyParamsValidationService } = require('../../services/calculator/body-params-validation.service');

class CalculatorController {

    constructor({CalculatorService, BodyParamsValidationService}) {
        this.caculatorService = CalculatorService;
        this.bodyParamsValidationService = BodyParamsValidationService;
    }

    consultarScoreDelCliente = async(req, res = response) => {
        let errorsValidation = this.bodyParamsValidationService.validate(req);
        if(errorsValidation)
            return res.status(400).json(errorsValidation);

        let result = await this.caculatorService.consultarScoreDelCliente();
        if(!result.code) 
            return res.json(result);
        return res.status(result.code).json(result);

    }

    consultarTiposDeCredito = async(req, res = response ) => {
        
        let errorsValidation = this.bodyParamsValidationService.validate(req);
        if(errorsValidation)
            return res.status(400).json(errorsValidation);

        let result = await this.caculatorService.consultarTiposDeCredito();
        if(!result.code) 
            return res.json(result);
        return res.status(result.code).json(result);
           
    }

    consultarCalculadora = async(req, res=response) => {

        let errorsValidation = this.bodyParamsValidationService.validate(req);
        if(errorsValidation)
            return res.status(400).json(errorsValidation);

        let result = await this.caculatorService.consultarCalculadora();
        if(!result.code) 
            return res.json(result);
        return res.status(result.code).json(result);    
    }

    consultarModelo = async(req, res=response) => {
        let errorsValidation = this.bodyParamsValidationService.validate(req);
        if(errorsValidation)
            return res.status(400).json(errorsValidation);

        let result = await this.caculatorService.consultarModelo();
        if(!result.code) 
            return res.json(result);
        return res.status(result.code).json(result);  
    }

    procesarCarritoDeCompra = async(req, res=repsonse) => {

        let errorsValidation = this.bodyParamsValidationService.validate(req);
        if(errorsValidation)
            return res.status(400).json(errorsValidation);

        let result = await this.caculatorService.procesarCarritoDeCompra();
        if(!result.code) 
            return res.status(200).json(result);
        return res.status(result.code).json(result);   
    }
    
}

module.exports = {CalculatorController: new  CalculatorController({CalculatorService, BodyParamsValidationService})};