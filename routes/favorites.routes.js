// favorites.routes.js

const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite.model');
const Sport = require('../models/Sport.model');
const sportsData = require('../api/dbData.json');
const uploader = require('../middlewares/cloudinary.config.js');

// Get the mapping between JSON id and MongoDB _id
const idToMongoIdMap = sportsData.sports.reduce((acc, sport) => {
  acc[sport.id] = sport._id;
  return acc;
}, {});

// Route to get all favorites
router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting favorites" });
  }
});

// Route to create a favorite
router.post('/', async (req, res) => {
  try {
    const { sportId, comment, gameDate } = req.body; // Add 'gameDate' to destructuring

    // Create a new favorite entry with the comment and game date
    const newFavorite = new Favorite({
      sport: sportId,
      comments: [
        {
          text: comment,
          date: gameDate, // Use the provided 'gameDate'
        },
      ],
    });

    // Save the favorite entry to the database
    await newFavorite.save();

  // Log the created favorite object to the console
  console.log('Created favorite:',newFavorite);

    res.status(201).json(newFavorite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating favorite' });
  }
});

// Update a favorite (add/edit comment and date)
router.put('/:id', async (req, res) => {
  try {
    const { comment } = req.body;
    const favoriteId = req.params.id;

    const favorite = await Favorite.findById(favoriteId);

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    favorite.comments.push({
      text: comment,
      date: new Date(),
    });

    await favorite.save();

    res.json(favorite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating favorite' });
  }
});

// Delete an entire favorite
router.delete('/:id', async (req, res) => {
  try {
    const favoriteId = req.params.id;

    // Find the favorite by its _id and remove it
    const deletedFavorite = await Favorite.findByIdAndDelete(favoriteId);

    if (!deletedFavorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.json({ message: 'Favorite successfully deleted', deletedFavorite });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting favorite' });
  }
});


module.exports = router;