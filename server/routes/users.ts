import { Router, Request, Response } from 'express';
import Users from '../schema/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SEED_JWT, CAD_JWT } from '../global/config';
import {TokenAuth} from '../middlewares/tokenAuth';

export const routerUsers = Router();

routerUsers.post('/',TokenAuth, (req: Request, res: Response) => {
    const body = req.body;
    const date = new Date();
    const user = new Users({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        name: body.name,
        last_entry: date,
        created_at: date,
        updated_at: date
    })
    user.save((err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                data: {
                    message: 'Existe un problema en el registro'
                }
            })
        }
        return res.json({
            ok: true,
            data: {
                message: 'Usuario Registrado Correctamente'
            }
        })
    })
})

routerUsers.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    const date = new Date();
    Users.findOne({
        email: body.email
    })
        .exec((err, userDB: any) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    data: {
                        message: 'Existe un problema en el login'
                    }
                })
            }
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(400).json({
                    ok: false,
                    data: {
                        message: 'Credenciales no coinciden'
                    }
                })
            }
            Users.findByIdAndUpdate(userDB._id, { last_entry: date })
                .exec((err) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            data: {
                                message: 'Existe un problema en el login'
                            }
                        })
                    }
                    const token = jwt.sign({
                        _id: userDB._id,
                        name: userDB.name
                    }, SEED_JWT, { expiresIn: CAD_JWT })

                    return res.json({
                        ok: true,
                        data: {
                            token: token
                        }
                    })
                })
        })
})