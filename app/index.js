import express from "express";
import morgan from "morgan";
import routeHandler from "./routes/index.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1", routeHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: `${req.method} - ${req.hostname} - ${req.originalUrl}`,
  });
});

app.use((req, res, next) => {
  const error = new Error("404 - Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
