const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    id: {
      type: String, 
      unique: true,
      trim: true,
    },
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
      default: "https://img.freepik.com/free-icon/user_318-563642.jpg",
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Sport'
      },
      
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
