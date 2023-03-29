const express = require('express');
const serverless = require("serverless-http");
const cors = require('cors');
const {routerCalculator} = require('../../routes/calculator/calculator.route');

class Server {
    constructor(){
        this.app  = express();
        this.port = process.env.PORT || 3000;
        this.calculatorPath = '/api/calculator'
        this.middlewares();
        this.routes();
        this.srv = serverless(this.app);
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use(this.calculatorPath, routerCalculator);
    }

    returnSrv(){
        return this.srv;
    }

    listen() {
        this.app.listen( 3000, () => console.log(`Servidor corriendo en puerto: `, 3000));
    }
}

module.exports = Server;