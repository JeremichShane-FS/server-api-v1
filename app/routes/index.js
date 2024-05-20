import express from "express";
import actorRoutes from "./actorRoutes.js";
import tvShowRoutes from "./tvShowRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} - ${req.hostname} - ${req.originalUrl}` });
});

// Routes
router.use("/tvshows", tvShowRoutes);
router.use("/actors", actorRoutes);

export default router;
