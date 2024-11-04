
import users from "../data/users.js";

let nextUserId = users.length ? Math.max(users.map((user) => user.id)) + 1 : 1;

export const getUsers = (req, res) => {
  const { name } = req.query;
  let filteredUsers = users;

  if (name) {
    filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json({ status: "success", data: filteredUsers });
};

export const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid user ID" });

  const user = users.find((u) => u.id === userId);
  if (!user)
    return res.status(404).json({ status: "error", message: "User not found" });

  res.json({ status: "success", data: user });
};

export const createUser = (req, res) => {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ status: "error", message: "Name is required" });

  const newUser = { id: nextUserId++, name };
  users.push(newUser);
  res.status(201).json({ status: "success", data: newUser });
};

export const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid user ID" });

  const user = users.find((u) => u.id === userId);
  if (!user)
    return res.status(404).json({ status: "error", message: "User not found" });

  const { name } = req.body;
  if (name) user.name = name;

  res.json({ status: "success", data: user });
};

export const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId))
    return res
      .status(400)
      .json({ status: "error", message: "Invalid user ID" });

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1)
    return res.status(404).json({ status: "error", message: "User not found" });

  users.splice(userIndex, 1);
  res.status(204).send();
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
