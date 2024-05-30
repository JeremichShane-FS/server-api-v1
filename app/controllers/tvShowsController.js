import { RESPONSE_MESSAGES } from "../constants/responseMessages.js";
import { Actor } from "../models/Actor.js";
import { TVShow } from "../models/TVShow.js";
import transformActors from "../utils/transformActors.js";

export const getAllTVShows = async (req, res, next) => {
  try {
    const query = {};

    if (req.query.title) {
      const titleWithoutSpaces = req.query.title.replace(/\s+/g, "");
      const regex = new RegExp(titleWithoutSpaces.split("").join("\\s*"), "i");
      query.title = { $regex: regex };
    }

    if (req.query.releaseYear) {
      query.releaseYear = req.query.releaseYear;
    }

    if (req.query.releaseYear && req.query.genre) {
      query.releaseYear = { $eq: parseInt(req.query.releaseYear) };
      query.genre = { $eq: req.query.genre };
    }

    const tvShows = await TVShow.find(query)
      .select("-__v")
      .populate({
        path: "actors",
        select: "firstName lastName filmography.characterName -_id",
      })
      .sort({ title: 1 });

    if (!tvShows || tvShows.length === 0) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.NO_RECORDS_FOUND.replace("records", "TV shows"),
      });
    }

    const transformedTVShows = tvShows.map(tvShow => {
      const transformedActors = tvShow.actors.map(actor => {
        return {
          name: `${actor.firstName} ${actor.lastName}`,
          characterName: actor.filmography[0].characterName,
        };
      });

      return { ...tvShow._doc, actors: transformedActors };
    });

    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.REQUEST_DETAILS(req),
      data: transformedTVShows,
    });
  } catch (err) {
    next(err);
  }
};

export const getTVShow = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tvShow = await TVShow.findById(id).select("-__v").populate({
      path: "actors",
      select: "firstName lastName filmography.characterName dob -_id",
    });

    if (!tvShow) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.RECORD_NOT_FOUND(id).replace("record", "TV Show"),
      });
    }

    const transformedActors = transformActors(tvShow.actors);
    const tvShowObject = tvShow.toObject();
    tvShowObject.actors = transformedActors;

    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.REQUEST_DETAILS(req),
      data: tvShowObject,
    });
  } catch (err) {
    next(err);
  }
};

export const createTVShow = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: RESPONSE_MESSAGES.PROVIDE_DETAILS.replace("details", "TV Show details"),
      });
    }

    const { actors, ...tvShowData } = req.body;
    const tvShow = new TVShow(tvShowData);
    const savePromises = [];

    if (actors && Array.isArray(actors)) {
      for (const actorData of actors) {
        const actorPromise = Actor.create(actorData).then(actor => {
          actor.filmography.push(tvShow._id);
          tvShow.actors.push(actor._id);
          return actor.save();
        });
        savePromises.push(actorPromise);
      }
    }

    savePromises.push(tvShow.save());
    await Promise.all(savePromises);

    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.RECORD_CREATED_SUCCESSFULLY(req),
      data: tvShow,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTVShow = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: RESPONSE_MESSAGES.PROVIDE_DETAILS_TO_UPDATE.replace("details", "TV Show details"),
      });
    }

    if (req.body.actors) {
      return res.status(400).json({
        success: false,
        message:
          "Updating the actors of a TV Show is not allowed. Please use the /actors endpoint to update actors.",
      });
    }

    const existingTVShow = await TVShow.findById(id);
    if (!existingTVShow) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.RECORD_NOT_FOUND(id).replace("record", "TV Show"),
      });
    }

    const { actors, ...tvShowData } = req.body;
    const savePromises = [];

    if (actors && Array.isArray(actors)) {
      for (const actorData of actors) {
        const actorPromise = Actor.create(actorData).then(actor => {
          actor.filmography.push(id);
          existingTVShow.actors.push(actor._id);
          return actor.save();
        });
        savePromises.push(actorPromise);
      }
    }

    savePromises.push(existingTVShow.save());
    await Promise.all(savePromises);

    const tvShow = await TVShow.findByIdAndUpdate(
      id,
      { ...tvShowData, actors: existingTVShow.actors },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.RECORD_UPDATED_SUCCESSFULLY(req, id),
      data: tvShow,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTVShow = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tvShow = await TVShow.findByIdAndDelete(id);
    if (!tvShow) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.RECORD_NOT_FOUND(id).replace("record", "TV Show"),
      });
    }

    const actors = await Actor.find({ "filmography.tvShowId": id });

    actors.forEach(actor => {
      actor.filmography = actor.filmography.filter(item => item.tvShowId.toString() !== id);
    });

    const saveOperations = actors.map(actor => actor.save());

    await Promise.all(saveOperations);

    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.RECORD_DELETED_SUCCESSFULLY(id),
    });
  } catch (err) {
    next(err);
  }
};
