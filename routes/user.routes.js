const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const { v4: uuidv4 } = require("uuid");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// POST route to create a new user
router.post("/user", async (req, res) => {
  const payload = req.body;

  try {
    const salt = bcrypt.genSaltSync(13);
    const passwordHash = bcrypt.hashSync(payload.password, salt);

    const userId = uuidv4();

    const newUser = await User.create({
      id: userId,
      email: payload.email,
      password: passwordHash,
      userName: payload.userName,
      image: payload.image,
    });

    // You may choose to sign a token here for user authentication if needed
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET route to fetch a specific user by ID
router.get("/user/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// PUT route to update a specific user by ID
router.put("/user/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.id;
    const payload = req.body; // { email: 'newEmail', userName: 'NewName', image: 'newPhotoURL' }

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields
    existingUser.email = payload.email;
    existingUser.userName = payload.userName;
    existingUser.photo = payload.photo; // Add this line to update the photo field

    await existingUser.save();

    res.json({ message: "User updated", user: existingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// DELETE route to delete a specific user by ID
router.delete("/user/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await existingUser.remove();

    res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
