import {Router, Request,Response} from 'express';
import path from 'path';

export const routerImg = Router();

routerImg.get('/',(req:Request,res:Response)=>{
    return res.send("Hola Img");
});

routerImg.get('/:img',(req:Request,res:Response)=>{
    let no_image = path.join(__dirname,'../assets/icons/not-found.jpg');
    try{
        let img = req.params.img;
        let pathImg = path.join(__dirname,`../assets/icons/${img}`);
        return res.sendFile(pathImg);
    }catch(err){
        return res.sendFile(no_image);
    }
});

