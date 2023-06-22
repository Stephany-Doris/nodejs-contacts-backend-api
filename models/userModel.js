import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "All fields are required"],
    },
    email: {
      type: String,
      required: [true, "All fields are required"],
      unique: [true, "User with email already exists"],
    },
    password: {
      type: String,
      required: [true, "All fields are required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", userSchema);
