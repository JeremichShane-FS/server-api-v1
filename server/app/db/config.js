import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { Actor } from "../models/Actor.js";
import { TVShow } from "../models/TVShow.js";

const __filename = fileURLToPath(new URL(import.meta.url));
const filename = path.basename(__filename);

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${db.connection.host}`);
    console.log(`Executing file: ${filename}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

export default connectDB;
