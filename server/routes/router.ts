// import npm resources
import {Router} from 'express';
/*IMPORT ROUTES*/
import {routerImg} from './images';
import {routerKnow} from './knowledge';
import {routerPrj} from './projects';


const router = Router();
router.use('/images',routerImg);
router.use('/knowledges',routerKnow);
router.use('/projects',routerPrj);

export default router;