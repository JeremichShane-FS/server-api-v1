import express from "express";
const router = express.Router();

import {
  createActor,
  deleteActor,
  getActor,
  getAllActors,
  updateActor,
} from "../controllers/actorsController.js";

router.get("/", getAllActors);
router.get("/:id", getActor);
router.post("/", createActor);
router.put("/:id", updateActor);
router.delete("/:id", deleteActor);

export default router;
