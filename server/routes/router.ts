import {routerImg} from './images';
import {Router,Request,Response} from 'express';

const router = Router();

router.get('/',(req:Request,res:Response)=>{
    return res.send("Hola Mundo")
});
router.use('/images',routerImg);

export default router;