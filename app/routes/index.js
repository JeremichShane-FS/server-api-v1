const router = require("express").Router();
const authorRoutes = require("./authorRoutes");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} - ${req.hostname} - ${req.originalUrl}` });
});

// Routes
router.use("/authors", authorRoutes);

module.exports = router;
