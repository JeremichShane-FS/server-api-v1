import mongoose from "mongoose";

const tvShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "TV show title is required"],
    maxLength: [100, "TV show title must be less than 100 characters"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  releaseYear: {
    type: Number,
    required: [true, "Release year is required"],
    min: [1900, "Release year must be after 1900"],
    max: [new Date().getFullYear(), "Release year must be before current year"],
  },
  description: {
    type: String,
    required: [true, "Description of TV Show is required"],
    maxLength: [1000, "Description must be less than 1000 characters"],
  },
  poster: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        if (v === "") {
          return true;
        }
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(v);
      },
      message: props => `${props.value} is not a valid URL`,
    },
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
    },
  ],
});

export const TVShow = mongoose.model("TVShow", tvShowSchema);
