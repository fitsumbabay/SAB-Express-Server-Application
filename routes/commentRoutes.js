import express from 'express';
const router = express.Router();
import commentController from '../controllers/commentController.js'

router.get('/', commentController.getComments);
router.get('/:id', commentController.getCommentById);
// Get comments for a specific post
router.get('/post/:postId', commentController.getCommentsByPostId);

// Create a new comment
router.post('/', commentController.createComment);

// Update an existing comment (PATCH)
router.patch('/:id', commentController.updateComment);

// Delete a comment
router.delete('/:id', commentController.deleteComment);

export default router;