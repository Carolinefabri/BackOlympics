const express = require('express');
const router = express.Router();
const sportsRoutes = require('./sports.routes');
const favoriteRoutes = require('./favorites.routes'); 
const userRoutes = require('./user.routes');

router.use('/user', userRoutes); 
router.use('/sports', sportsRoutes);
router.use('/favorites', favoriteRoutes); 



router.get("/", (req, res, next) => {
  res.json("All good in here - vai CORINTHIANS");
});

router.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found ! Flamengo perdedor' });
});

module.exports = router;