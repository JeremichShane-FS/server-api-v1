import express from "express";
const router = express.Router();

import {
  createTVShow,
  deleteTVShow,
  getAllTVShows,
  getTVShow,
  updateTVShow,
} from "../controllers/tvShowsController.js";

router.get("/", getAllTVShows);
router.get("/:id", getTVShow);
router.post("/", createTVShow);
router.put("/:id", updateTVShow);
router.delete("/:id", deleteTVShow);

export default router;
