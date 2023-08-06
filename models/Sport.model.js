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
  date: {
    type: String, // Ou o tipo de dado adequado para datas, como Date
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
    isFavorited: {
      type: Boolean,
      default: false,
    },
},
{
  timestamps: true
}
);

const Sport = model('Sport', sportSchema);

module.exports = Sport;
