// favorites.routes.js

const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite.model');

// Route to add a sport as favorite
router.post('/', async (req, res) => {
  try {
    const { sportId, comment } = req.body;

    const newFavorite = new Favorite({
      user: req.session.user._id,
      sport: sportId,
      comment,
    });

    await newFavorite.save();

    res.status(201).json(newFavorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding sport to favorites' });
  }
});

// Route to remove a sport from favorites
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Remove the favorite by ID and the user ID to ensure only the user can remove their favorites
    await Favorite.findOneAndDelete({ _id: id, user: req.session.user._id });

    res.json({ message: 'Sport removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing sport from favorites' });
  }
});

module.exports = router;




