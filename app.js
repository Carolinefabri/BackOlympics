require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
const sportsRoutes = require("./routes/sports.routes");
const favoritesRoutes = require('./routes/favorites.routes')
const userRoutes = require("./routes/user.routes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");

const { getSports } = require("./api/dbData.json");



// Configuração do CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174'); // Permite acesso apenas a partir do domínio do frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permite os métodos GET, POST, PUT e DELETE
    next();
  });


require("./config")(app);

// 👇 Start handling routes here


// Routes
app.get('/', (req, res) => {
    res.send('Hello, this is the homepage!');
  });
  
  app.get('/about', (req, res) => {
    res.send('This is the about page.');
  });
  
  // Mount the custom routes
  app.use("/sports", sportsRoutes);
  app.use('/favorites', favoritesRoutes);
  app.use("/user", userRoutes);
  
  // Catch-all route for 404 Not Found
  app.use((req, res) => {
    res.status(404).send('404 Not Found');
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
  });

// Apply the loggerMiddleware to all routes
  app.use(loggerMiddleware);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
