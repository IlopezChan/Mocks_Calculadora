const { Router } = require('express');
const { CalculatorController } = require('../../controllers/calculator/calculator.controller');
const { body } = require('express-validator');

const routerCalculator = Router();

const validateInput = body('sInput').exists().isString();

// Consultar Score de cliente
routerCalculator.post('/GetClientScore', validateInput, CalculatorController.consultarTiposDeCredito );

// Consultar Tipos de credito
routerCalculator.post('/GetCreditType', validateInput, CalculatorController.consultarTiposDeCredito );

// Consultar Calculadora
routerCalculator.post('/GetCalculator', validateInput, CalculatorController.consultarCalculadora );

// Consultar Modelo
routerCalculator.post('/GetModels', validateInput, CalculatorController.consultarModelo );

// Procesar Carrito de Compra
routerCalculator.post('/ProcessShoppingCart', validateInput, CalculatorController.procesarCarritoDeCompra );

module.exports = {
    routerCalculator
}