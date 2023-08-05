const express = require('express');
const router = express.Router();
const sportsRoutes = require('./sports.routes');
const favoriteRoutes = require('./favorites.routes'); 
const authRoutes = require('./auth.routes');

router.use('/sports', sportsRoutes);
router.use('/Favorites', favoriteRoutes); 

router.use('/auth', authRoutes);

router.get("/", (req, res, next) => {
  res.json("All good in here - vai CORINTHIANS");
});

router.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found ! Flamengo perdedor' });
});

module.exports = router;