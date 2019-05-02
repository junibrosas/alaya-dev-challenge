import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.get('/', PostController.getPosts);

// Get one post by cuid
router.get('/:cuid', PostController.getPost);

// Add a new Post
router.post('/', PostController.addPost);

// Like a post
router.post('/like', PostController.likePost);

// Unlike a post
router.post('/unlike', PostController.unlikePost);

// Delete a post by cuid
router.delete('/:cuid', PostController.deletePost);

export { router as PostRoutes };

export default router;
