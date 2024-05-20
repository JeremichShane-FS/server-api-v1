import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Actor name is required"],
    maxLength: [100, "Actor name must be less than 100 characters"],
  },
  age: {
    type: Number,
    required: [true, "Actor age is required"],
    min: [0, "Age must be a positive number"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  filmography: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TVShow",
    },
  ],
});

export const Actor = mongoose.model("Actor", actorSchema);
