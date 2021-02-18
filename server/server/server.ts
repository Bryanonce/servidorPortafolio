import {
    PORT,
    MONGO_URI,
    SUPER_ADMIN,
    SUPER_PASS
} from '../global/config';
import express, { Router } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Users from '../schema/userSchema';
import bcrypt from 'bcrypt';

export class Server {
    constructor(
        public app: express.Application = express()
    ) {
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // parse application/json
        this.app.use(bodyParser.json());
    }

    public addPublicPath(publicPath: string) {
        this.app.use(express.static(path.join(__dirname, `.${publicPath}`)));
    }

    public addRoutes(routes: Router) {
        this.app.use(routes);
    }

    public connectServer(customPort?: number) {
        if (customPort) {
            return this.app.listen(customPort, () => {
                console.log('Servidor online en puerto ' + customPort)
            })
        }
        this.app.listen(PORT, () => {
            console.log('Servidor online en puerto ' + PORT)
        })
    }

    public connectDB(addSP:{createSuperAdmin:boolean}) {
        const {createSuperAdmin} = addSP;
        mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                throw err;
            }
            console.log('Base de datos conectada');
            createSuperAdmin? this.addSuperAdmin():null;
        });
        mongoose.set('useFindAndModify', false);
    }

    private addSuperAdmin(){
        Users.findOneAndRemove({
            rol: 'SUPER_ADMIN'
        })
        .exec((err)=>{
            if (err) {
                throw err;
            }
            const date = new Date();
            const superAdmin = new Users({
                email: SUPER_ADMIN,
                password: bcrypt.hashSync(SUPER_PASS, 10),
                name: 'SUPER_ADMIN',
                rol: 'SUPER_ADMIN',
                last_entry: date,
                created_at: date,
                updated_at: date
            })
            superAdmin.save((err)=>{
                if(err){
                    throw err
                }
                console.log('Super Admin en línea');
            })
        })
    }
}