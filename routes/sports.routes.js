const express = require('express');
const router = express.Router();
const Sport = require('../models/Sport.model');
const SportData = require ('../api/dbData.json');




// Route to get all sports with restaurant suggestions
router.get('/', async (req, res) => {
  try {
console.log("esta ceeeeerto");
    res.json(SportData);
  } catch (error) {
    res.status(500).json({ error: "Error getting sports" });
  }
});


// Route to get an individual sport by ID
router.get('/:id', async (req, res) => {
  const sportId = req.params.id;
  const filterSports = SportData.sports.filter(sport => sport.id == req.params.id);
  res.json(filterSports);
});

router.get('/:id', async (req, res) => {
  const sportId = req.params.id;
  try {
    const sport = await Sport.findOne({ id: sportId }); // Busca o esporte pelo ID no banco de dados
    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' }); // Retorna um erro 404 se o esporte não for encontrado
    }
    res.json(sport);
  } catch (error) {
    res.status(500).json({ error: 'Error getting sport details' });
  }
});

// Route to get favorite
router.post('/:id/favorite', async (req, res) => {
  const sportId = req.params.id;
  const isFavorited = req.body.isFavorited;

  try {
    const sport = await Sport.findOneAndUpdate(
      { id: sportId },
      { isFavorited },
      { new: true }
    );

    res.json(sport);
  } catch (error) {
    res.status(500).json({ error: 'Error updating favorite status' });
  }
});
module.exports = router;