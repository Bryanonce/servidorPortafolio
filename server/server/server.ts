import {PORT} from '../global/config';
import express from 'express';
import path from 'path';

export class Server{
    constructor(
        public app: express.Application = express()
    ){
        this.app.use(express.static(path.join(__dirname,'../public')))
    }

    public conectar(){
        this.app.listen(PORT,()=>{
            console.log('Servidor online en puerto' + PORT)
        })
    }
}