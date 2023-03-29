const { CustomResponse } = require('../../helpers/response/customResponseHE.js');
const { 
    consultarScoreDelClienteResponse, 
    consultarTiposDeCreditoResponse, 
    consultarCalculadoraResponse, 
    consultarModeloResponse, 
    procesarCarritoDeCompraResponse 
} = require('../../responses/responses');


class CaculatorService {

    constructor({CustomResponse}){
        this.responseJson = CustomResponse;
    }

    consultarScoreDelCliente = async() => {
        try{
            return consultarScoreDelClienteResponse;
        }catch(e){
            console.log("Ha ocurrido un error al consultar score del cliente");
            return this.responseJson.isResponseJson(500, false, "Ha ocurrido un error al consultar score del cliente");
        }

    }

    consultarTiposDeCredito = async() => {
        try{
            return consultarTiposDeCreditoResponse;
        }catch(e){
            console.log("Ha ocurrido un error al consultar tipos de creditos");
            return this.responseJson.isResponseJson(500, false, "Ha ocurrido un error al consultar tipos de creditos");
        }
    }

    consultarCalculadora = async() => {
        try{
            return consultarCalculadoraResponse;
        }catch(e){
            console.log("Ha ocurrido un error al consultar calculadora de creditos");
            return this.responseJson.isResponseJson(500, false, "Ha ocurrido un error al consultar calculadora");
        }

    }

    consultarModelo = async() => {
        try{
            return consultarModeloResponse;
        }catch(e){
            console.log("Ha ocurrido un error al consultar modelos");
            return this.responseJson.isResponseJson(500, false, "Ha ocurrido un error al consultar modelos");
        }
    }

    procesarCarritoDeCompra = async() => {
        try{
            return procesarCarritoDeCompraResponse;
        }catch(e){
            console.log("Ha ocurrido un error al procesar carrito de compra");
            return this.responseJson.isResponseJson(500, false, "Ha ocurrido un error al procesar carrito de compra");
        }    
    }
    
}

module.exports = { CalculatorService: new CaculatorService({CustomResponse}) };