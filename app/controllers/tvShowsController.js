import { TVShow } from "../models/TVShow.js";

export const getAllTVShows = async (req, res) => {
  try {
    const tvShow = await TVShow.find({}).select("-__v").populate("actors").exec();

    if (!tvShow) {
      return res.status(404).json({
        success: false,
        message: "No TV Shows found",
      });
    }

    res.status(200).json({
      success: true,
      message: `${req.method} - ${req.hostname} - ${req.originalUrl}`,
      data: tvShow,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error: ${err.message}`,
    });
  }
};

export const getTVShow = async (req, res) => {
  const { id } = req.params;

  try {
    const tvShow = await TVShow.findById(id).select("-__v").populate("actors");
    if (!tvShow) {
      return res.status(404).json({
        success: false,
        message: `TV Show with id: ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `${req.method} - ${req.hostname} - ${req.originalUrl}`,
      data: tvShow,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: `${err.message}`,
    });
  }
};

export const createTVShow = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Please provide TV Show details",
      });
    }

    const tvShow = await TVShow.create(req.body);
    res.status(200).json({
      success: true,
      message: `${req.method} - TV Show successfully created`,
      data: tvShow,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error: ${err.message}`,
    });
  }
};

export const updateTVShow = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Please provide TV Show details to update",
      });
    }

    const existingTVShow = await TVShow.findById(id);
    if (!existingTVShow) {
      return res.status(404).json({
        success: false,
        message: `TV Show with id: ${id} not found`,
      });
    }

    const tvShow = await TVShow.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: `${req.method} - TV Show with id: ${id} updated successfully`,
      data: tvShow,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Update Error: ${err.message}`,
    });
  }
};

export const deleteTVShow = async (req, res) => {
  const { id } = req.params;
  try {
    const tvShow = await TVShow.findByIdAndDelete(id);
    if (!tvShow) {
      return res.status(404).json({
        success: false,
        message: `No TV show found with id: ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `${req.method} - TV Show with id: ${id} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Delete Error: ${err.message}`,
    });
  }
};
