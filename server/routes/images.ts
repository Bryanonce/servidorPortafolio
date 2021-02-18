import {Router, Request,Response} from 'express';
import path from 'path';

export const routerImg = Router();

routerImg.get('/',(req:Request,res:Response)=>{
    return res.send("Hola Img");
});

routerImg.get('/:folder/:img',(req:Request,res:Response)=>{
    let no_image = path.join(__dirname,'../assets/icons/not-found.jpg');
    try{
        const img = req.params.img;
        const folder = req.params.folder;
        let pathImg = path.join(__dirname,`../assets/icons/${folder}/${img}`);
        return res.sendFile(pathImg);
    }catch(err){
        return res.sendFile(no_image);
    }
});

