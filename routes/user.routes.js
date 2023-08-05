const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middlewares/jwt.middleware');

const router = express.Router();

// GET route to test if the route is working
router.get('/test', (req, res, next) => {
  res.json('All good in user.auth');
});

// GET route to get all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

/* POST route to signup */
router.post('/signup', async (req, res) => {
  const payload = req.body;
  console.log("Payload received:", payload);

  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(payload.password, salt);

  try {
    await User.create({
      userName: payload.userName,
      email: payload.email,
      password: passwordHash,
    });
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

/* POST route to login */
router.post('/login', async (req, res) => {
  const payload = req.body; 

  try {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(payload.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: '1d', // Token expires in 1 day
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error during login' });
  }
});

module.exports = router;
