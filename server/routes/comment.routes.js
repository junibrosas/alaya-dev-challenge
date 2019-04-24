import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';

const router = new Router();

router.get('/:postId', CommentController.getPostComments);
router.post('/', CommentController.addComment);

export { router as CommentRoutes };

export default router;
