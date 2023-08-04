const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sportSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  favoriteSports: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Favorite' // <-- Add a reference to the 'Favorite' model
    }
  ]
},
{
  timestamps: true
}
);

const Sport = model('Sport', sportSchema);

module.exports = Sport;
