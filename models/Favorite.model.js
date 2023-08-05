const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
      type: Number,
     
    },
  }],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
