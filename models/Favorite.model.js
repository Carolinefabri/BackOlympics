const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (if you have one)
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
  },
  comments: [{
    text: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
