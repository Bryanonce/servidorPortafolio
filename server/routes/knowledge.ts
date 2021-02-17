import {Router,Request,Response} from 'express';

export const routerKnow = Router();

routerKnow.get('/',(req:Request,res:Response)=>{
    res.json({
        ok:true,
        data:{
            frontend:['angular','react','html']
        },
        desc: 'Todo OK'
    })
});

