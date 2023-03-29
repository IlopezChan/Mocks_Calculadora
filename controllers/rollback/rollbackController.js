const { getConnection, sql } = require('../../database/config.js');
const { CustomResponse } = require('../../helpers/response/customResponseHE.js');
const { response, request } = require( 'express');
const responseJson = new CustomResponse();
const realizarRollback = async(req = request, res = response) => {
    const cvesolicitud = req.body.cve_solicitud;
    const operario = req.body.operario;
    const pool = await getConnection()            
    var request;
    pool.connect().then(async(pool) => {
        try{
            request = new sql.Request(pool);
            request.input('cve_solicitud', sql.VarChar(200), cvesolicitud);
            request.input('operario', sql.VarChar(200), operario);
            let respuesta = await request.execute('sp_mpf_rollback_cuenta_dispersada');
            const respuestaCanjeo = responseJson.isResponseJson(200, true, "Se ha realizado rollback a la dispersion con clave de solicitud: " + cvesolicitud);
            console.log(responseJson.isResponseLog('success', cvesolicitud, 'ROLLBACK-RESPONSE || Datos respuesta al envio', respuestaCanjeo ));
            return res.status(200).json(respuestaCanjeo);
            
        }catch(e){
            console.log(responseJson.isResponseLog('error', cvesolicitud, `ERROR-RESPONSE || ${e.message}`))
            return res.status(400).json(responseJson.isResponseJson(400, false, e.message)); 
        }   
    }); 
}

module.exports = {
    realizarRollback
}