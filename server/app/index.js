import cors from "cors";
import express from "express";
import morgan from "morgan";
import { RESPONSE_MESSAGES } from "./constants/responseMessages.js";
import { handleMongooseErrors } from "./middleware/handleMongooseErrors.js";
import routeHandler from "./routes/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1", routeHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: RESPONSE_MESSAGES.REQUEST_DETAILS(req),
  });
});

app.use(handleMongooseErrors);

app.use((req, res, next) => {
  const error = new Error(`404 - Not Found ${req.originalUrl}`);
  error.status = 404;
  res.status(error.status);
  next(error);
});

app.use((err, req, res, next) => {
  console.error(`Error on request ${req.method} ${req.url}: ${err.message}`);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR(err),
  });
});

export default app;
