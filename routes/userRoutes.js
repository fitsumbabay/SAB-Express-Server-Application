import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update an existing user (PATCH)
router.patch('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);
export default router;
