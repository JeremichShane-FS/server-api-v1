import mongoose from "mongoose";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.js";

export const handleMongooseErrors = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const validationErrors = Object.values(err.errors).map(error => error.message);
    console.log(`Validation errors - ${req.method} validationErrors`);
    return res.status(422).json({
      success: false,
      error: RESPONSE_MESSAGES.VALIDATION_FAILED,
      details: validationErrors,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    console.log("Cast Error:", err.message);
    return res.status(400).json({
      success: false,
      error: RESPONSE_MESSAGES.INVALID_ID_FORMAT,
    });
  }

  next(err);
};
