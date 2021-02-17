/*IMPORT ROUTES*/
import {routerImg} from './images';
import {routerKnow} from './knowledge';

import {Router} from 'express';

const router = Router();
router.use('/images',routerImg);
router.use('/knowledge',routerKnow)

export default router;