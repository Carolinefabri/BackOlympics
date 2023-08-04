const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true,
  },
  comments: [{
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  restaurant: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
