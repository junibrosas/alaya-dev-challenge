import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as LikeController from '../controllers/like.controller';
const router = new Router();

// Get all Posts
router.get('/', PostController.getPosts);

// Get one post by cuid
router.get('/:cuid', PostController.getPost);

// Add a new Post
router.post('/', PostController.addPost);

// Like a post
router.post('/like', LikeController.likePost);

// Unlike a post
router.post('/unlike', LikeController.unlikePost);

// Delete a post by cuid
router.delete('/:cuid', PostController.deletePost);

export { router as PostRoutes };

export default router;
