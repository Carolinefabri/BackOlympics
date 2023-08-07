require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
const routes = require("./routes/index.routes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const bodyParser = require("body-parser");


require("./config")(app);

// Rotas
app.use("/", routes);



// Rota de erro para 404 Not Found
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Middleware de tratamento de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Aplicar o loggerMiddleware em todas as rotas
app.use(loggerMiddleware);

require("./error-handling")(app);

module.exports = app;
