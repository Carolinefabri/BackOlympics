const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required here."],
  },
  image: {
    type: String,
    // other fields...
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Favorites",
    },
  ],
},
{
  timestamps: true,
});

// Add unique index for userName and email fields
userSchema.index({ userName: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
