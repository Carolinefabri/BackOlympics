const express = require('express');
const router = express.Router();
const Sport = require('../models/Sport.model');
const { Client } = require('@googlemaps/google-maps-services-js');
const SportData = require ('../api/dbData.json');

// Create a client for the Google Maps API with your API key
const googleMapsClient = new Client({ apiKey: process.env.GOOGLE_MAPS_API_KEY });


// Helper function to fetch restaurant suggestions
async function getRestaurantSuggestions(location) {
  const response = await googleMapsClient.placesNearby({
    params: {
      location: location,
      radius: 1000, // You can adjust the radius as needed
      type: 'restaurant', // You can specify other types of places here
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });

  // Return the list of restaurant suggestions
  return response.data.results;
}



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
