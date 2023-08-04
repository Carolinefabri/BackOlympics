const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required here.']
    },
    photo: {
      type: String, 
      default: 'https://img.freepik.com/free-icon/user_318-563642.jpg'
    },
    userName: {
      type: String,
      required: [true, 'UserName is required.'],
      unique: true,
      trim: true
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: 'Favorite',
    }],
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
