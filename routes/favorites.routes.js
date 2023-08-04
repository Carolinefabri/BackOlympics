const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite.model');
const Sport = require('../models/Sport.model');

// Route to add a sport to favorites
router.post('/favorites/sports', async (req, res) => {
  try {
    const { sportId, userId } = req.body;

    // Check if the sport and user exist
    const sport = await Sport.findById(sportId);
    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }

    // Create a new favorite entry
    const favorite = new Favorite({ sport: sportId, user: userId });
    await favorite.save();

    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'Error adding sport to favorites' });
  }
});

// Route to add a comment to a favorite sport
router.post('/favorites/sports/:favoriteId/comment', async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const { comment } = req.body;

    // Find the favorite entry and update the comment
    const favorite = await Favorite.findByIdAndUpdate(favoriteId, { comment }, { new: true });

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment to favorite' });
  }
});

// Route to select a restaurant for a favorite sport
router.post('/favorites/sports/:favoriteId/restaurant', async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const { restaurant } = req.body;

    // Find the favorite entry and update the restaurant
    const favorite = await Favorite.findByIdAndUpdate(favoriteId, { restaurant }, { new: true });

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'Error adding restaurant to favorite' });
  }
});

module.exports = router;
