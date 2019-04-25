import { Router } from 'express';
import * as LikeController from '../controllers/like.controller';

const router = new Router();

router.post('/', LikeController.postLike);

export { router as LikeRoutes };

export default router;
