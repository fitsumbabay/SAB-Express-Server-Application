
import posts from "../data/post.js";
let nextPostId = posts.length
  ? Math.max(...posts.map((post) => post.id)) + 1
  : 1;

export const getPost = (req, res) => {
  const { userId, title } = req.query;
  let filteredPosts = posts;

  if (userId) {
    filteredPosts = filteredPosts.filter(
      (post) => post.userId === parseInt(userId)
    );
  }

  if (title) {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  res.json({ status: "success", data: filteredPosts });
};

export const getPostById = (req, res) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid post ID" });

  const post = posts.find((p) => p.id === postId);
  if (!post)
    return res.status(404).json({ status: "error", message: "Post not found" });

  res.json({ status: "success", data: post });
};

export const getPostsByUserId = (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid user ID" });

  const userPosts = posts.filter((p) => p.userId === userId);
  if (userPosts.length === 0)
    return res
      .status(404)
      .json({ status: "error", message: "No posts found for this user" });

  res.json({ status: "success", data: userPosts });
};

export const createPost = (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId)
    return res
      .status(400)
      .json({
        status: "error",
        message: "Title, content, and userId are required",
      });

  const newPost = {
    id: nextPostId++,
    title,
    content,
    userId: parseInt(userId),
  };
  posts.push(newPost);
  res.status(201).json({ status: "success", data: newPost });
};

export const updatePost = (req, res) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid post ID" });

  const post = posts.find((p) => p.id === postId);
  if (!post)
    return res.status(404).json({ status: "error", message: "Post not found" });

  const { title, content, userId } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (userId) post.userId = parseInt(userId); // Assuming userId can be changed

  res.json({ status: "success", data: post });
};

export const deletePost = (req, res) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid post ID" });

  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1)
    return res.status(404).json({ status: "error", message: "Post not found" });

  posts.splice(postIndex, 1); // Remove the post from the array
  res.status(204).send(); // Delete successful, no content to return
};

export default {
  getPost,
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost,
};

