import express from 'express';
const router = express.Router();
import postController from '../controllers/postController.js'


router.get('/', postController.getPost);
router.get('/:id', postController.getPostById);


// Get posts by user ID
router.get('/user/:userId', postController.getPostsByUserId);

// Create a new post
router.post('/', postController.createPost);

// Update an existing post (PATCH)
router.patch('/:id', postController.updatePost);

// Delete a post
router.delete('/:id', postController.deletePost);

export default router;