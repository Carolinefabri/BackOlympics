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
  const filterSports = SportData.sports.filter(sport => sport.id == req.params.id
      )
        res.json(filterSports);

  
});


module.exports = router;