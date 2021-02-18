import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import {SEED_JWT} from '../global/config';

export const TokenAuth = (req:Request,res:Response,next:NextFunction)=>{
    let token = req.header('auth-token');
    !token? res.status(401).json({ok:false, data:{message: 'Acceso no Autorizado'}}):null;
    const payload = jwt.verify(String(token),SEED_JWT);
    console.log(payload)
    next();
}