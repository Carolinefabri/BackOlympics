const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    id: {
      type: String, // You can change this to the appropriate data type for your user IDs
      required: [true, "User ID is required"],
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
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
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
        ref: "Favorite",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
