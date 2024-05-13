const express = require("express");
const morgan = require("morgan");
const app = express();
const routeHandler = require("./routes");

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

module.exports = app;
