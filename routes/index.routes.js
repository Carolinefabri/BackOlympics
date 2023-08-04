const router = require("express").Router();
const sportsRoutes = require('./sports.routes');
const favoriteRoutes = require('./favorites.routes');
const authRoutes = require('./auth.routes');


router.use('/sports', sportsRoutes);

// Rota para manipular favoritos
router.use('/favorites', favoriteRoutes);


// Rota para autenticação
router.use('/auth', authRoutes);

// Rota para verificar se o servidor está funcionando
router.get("/", (req, res, next) => {
  res.json("All good in here - vai CORINTHIANS");
});

router.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found ! SORRY' });
});

module.exports = router;