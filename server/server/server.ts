import {
    PORT,
    MONGO_URI
} from '../global/config';
import express,{Router} from 'express';
import path from 'path';
import mongoose from 'mongoose';

export class Server{
    constructor(
        public app: express.Application = express()
    ){}

    public addPublicPath(publicPath:string){
        this.app.use(express.static(path.join(__dirname,`.${publicPath}`)));
    }

    public addRoutes(routes:Router){
        this.app.use(routes);
    }

    public connectServer(customPort?:number){
        if(customPort){
            return this.app.listen(customPort,()=>{
                console.log('Servidor online en puerto ' + customPort)
            })
        }
        this.app.listen(PORT,()=>{
            console.log('Servidor online en puerto ' + PORT)
        })
    }

    public connectDB(){
        mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
            if(err){
                throw err;
            }
            console.log('Base de datos conectada');
        });
    }
}