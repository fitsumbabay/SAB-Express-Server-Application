
import comments from "../data/comments.js";
let nextCommentId = comments.length
  ? Math.max(...comments.map((comment) => comment.id)) + 1
  : 1; // Properly simulate auto-incrementing ID

export const getComments = (req, res) => {
  const { postId, content } = req.query;
  let filteredComments = comments;

  if (postId) {
    filteredComments = filteredComments.filter(
      (comment) => comment.postId === parseInt(postId)
    );
  }

  if (content) {
    filteredComments = filteredComments.filter((comment) =>
      comment.content.toLowerCase().includes(content.toLowerCase())
    );
  }

  res.json({ status: "success", data: filteredComments });
};

export const getCommentById = (req, res) => {
  const commentId = parseInt(req.params.id);
  if (isNaN(commentId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid comment ID" });

  const comment = comments.find((c) => c.id === commentId);
  if (!comment)
    return res
      .status(404)
      .json({ status: "error", message: "Comment not found" });

  res.json({ status: "success", data: comment });
};

export const getCommentsByPostId = (req, res) => {
  const postId = parseInt(req.params.postId);
  if (isNaN(postId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid post ID" });

  const postComments = comments.filter((c) => c.postId === postId);
  if (postComments.length === 0)
    return res
      .status(404)
      .json({ status: "error", message: "No comments found for this post" });

  res.json({ status: "success", data: postComments });
};

export const createComment = (req, res) => {
  const { content, postId, userId } = req.body;
  if (!content || !postId || !userId)
    return res.status(400).json({
      status: "error",
      message: "Content, postId, and userId are required",
    });

  const newComment = {
    id: nextCommentId++,
    content,
    postId: parseInt(postId),
    userId: parseInt(userId),
  };
  comments.push(newComment);
  res.status(201).json({ status: "success", data: newComment });
};

export const updateComment = (req, res) => {
  const commentId = parseInt(req.params.id);
  if (isNaN(commentId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid comment ID" });

  const comment = comments.find((c) => c.id === commentId);
  if (!comment)
    return res
      .status(404)
      .json({ status: "error", message: "Comment not found" });

  const { content } = req.body;
  if (content) comment.content = content;

  res.json({ status: "success", data: comment });
};

export const deleteComment = (req, res) => {
  const commentId = parseInt(req.params.id);
  if (isNaN(commentId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid comment ID" });

  const commentIndex = comments.findIndex((c) => c.id === commentId);
  if (commentIndex === -1)
    return res
      .status(404)
      .json({ status: "error", message: "Comment not found" });

  comments.splice(commentIndex, 1);
  res.status(204).send();
};

export default {
  getComments,
  getCommentById,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};

