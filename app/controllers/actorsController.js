import { Actor } from "../models/Actor.js";

export const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find({}).select("-__v").populate("filmography");
    res.status(200).json({
      success: true,
      message: `${req.method} - ${req.hostname} - ${req.originalUrl}`,
      data: actors,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

export const getActor = async (req, res) => {
  const { id } = req.params;

  try {
    const actor = await Actor.findById(id).select("-__v").populate("filmography");
    if (!actor) {
      return res.status(404).json({
        success: false,
        message: `Actor with id: ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `${req.method} - ${req.hostname} - ${req.originalUrl}`,
      data: actor,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: `${err.message}`,
    });
  }
};

export const createActor = async (req, res) => {
  try {
    const actor = await Actor.create(req.body);
    res.status(200).json({
      success: true,
      message: `${req.method} - Actor successfully created`,
      data: actor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error: ${err.message}`,
    });
  }
};

export const updateActor = async (req, res) => {
  const { id } = req.params;
  try {
    const actor = await Actor.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!actor) {
      return res.status(404).json({
        success: false,
        message: `Actor with id: ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `${req.method} - Actor successfully updated`,
      data: actor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error: ${err.message}`,
    });
  }
};

export const deleteActor = async (req, res) => {
  const { id } = req.params;
  try {
    const actor = await Actor.findByIdAndDelete(id);
    if (!actor) {
      return res.status(404).json({
        success: false,
        message: `Actor with id: ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `${req.method} - Actor successfully deleted`,
      data: actor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error: ${err.message}`,
    });
  }
};
