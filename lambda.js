const controller = required('./controllers/calculator/calculatorController');

exports.handler = async (event, context, callback) => {
   
    const controllerCalculator = new Call

    const operation = event.field;
    let result;
  
    switch (operation) {
        case 'ConsultarTiposDeCredito':
            result = await serviceBiometricos.postValidar(event.arguments.dataRequest, event.headers);
            return result;
            break;
        case 'ConsultarModelos':
            console.log(event.arguments);
            result = await serviceBiometricos.postProceso(event.arguments.dataRequest, event.headers);
            return result;
            break;
        case 'PlazosCalculadora':
            console.log(event.arguments);
            result = await serviceBiometricos.getPhone(event.arguments.dataRequest);
            return result;
            break;
        default:
            callback(`No existe la ruta ${event.field}`, null);
            break;
    }
};
