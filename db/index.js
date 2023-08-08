// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/BackOlympics";

mongoose
  .connect("mongodb+srv://sportssoul-main-db-02609824c32:GjckQfEC4f7erQRQJ4As9sUCJ7hhyH@prod-us-central1-2.ih9la.mongodb.net/sportssoul-main-db-02609824c32")
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

