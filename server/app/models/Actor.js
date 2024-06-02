import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Actor name is required"],
      maxLength: [100, "Actor name must be less than 100 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Actor name is required"],
      maxLength: [100, "Actor name must be less than 100 characters"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
    },
    picture: {
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
    filmography: [
      {
        tvShowId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TVShow",
        },
        characterName: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

actorSchema.virtual("age").get(function () {
  const diff = Date.now() - this.dob.getTime();
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
});

export const Actor = mongoose.model("Actor", actorSchema);
