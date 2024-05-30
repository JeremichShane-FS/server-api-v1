import express from "express";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.js";
import actorRoutes from "./actorRoutes.js";
import tvShowRoutes from "./tvShowRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: RESPONSE_MESSAGES.REQUEST_DETAILS(req) });
});

// Routes
router.use("/tvshows", tvShowRoutes);
router.use("/actors", actorRoutes);

export default router;
