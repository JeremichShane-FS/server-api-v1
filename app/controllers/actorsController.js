import { RESPONSE_MESSAGES } from "../constants/responseMessages.js";
import { Actor } from "../models/Actor.js";
import { TVShow } from "../models/TVShow.js";
import validateFilmography from "../utils/validateFilmography.js";

export const getAllActors = async (req, res, next) => {
  try {
    let query = {};

    if (req.query.name) {
      const names = req.query.name.replace(/-/g, " ").split(" ");
      const regex = new RegExp(names.join("\\s*"));

      query = {
        $or: [
          { firstName: { $regex: regex } },
          { lastName: { $regex: regex } },
          {
            $expr: {
              $regexMatch: { input: { $concat: ["$firstName", " ", "$lastName"] }, regex: regex },
            },
          },
        ],
      };
    }

    if (req.query.firstName) {
      query.firstName = req.query.firstName;
    }

    let actorsQuery = Actor.find(query)
      .select("-__v")
      .populate("filmography.tvShowId", "title releaseYear -_id");

    if (req.query.skip || req.query.limit) {
      const skip = parseInt(req.query.skip) || 0;
      const limit = parseInt(req.query.limit) || 0;

      if (typeof actorsQuery.skip === "function" && typeof actorsQuery.limit === "function") {
        actorsQuery = actorsQuery.skip(skip).limit(limit);
      }
    }

    if (typeof actorsQuery.sort === "function") {
      actorsQuery = actorsQuery.sort(
        req.query.sort ? req.query.sort : { lastName: 1, firstName: 1 }
      );
    }

    let actors = await actorsQuery;

    if (!actors) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.NO_RECORDS_FOUND.replace("records", "actors"),
      });
    }

    actors = actors.map(actor => {
      actor = actor.toObject();
      actor.filmography = actor.filmography.map(film => {
        return {
          title: film.tvShowId.title,
          characterName: film.characterName,
          year: film.tvShowId.releaseYear,
        };
      });

      actor.filmography.sort((a, b) => b.year - a.year);

      return actor;
    });

    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.REQUEST_DETAILS(req),
      data: actors,
    });
  } catch (err) {
    next(err);
  }
};

export const getActor = async (req, res, next) => {
  const { id } = req.params;

  try {
    let actor = await Actor.findById(id)
      .select("-__v")
      .populate("filmography.tvShowId", "title releaseYear -_id")
      .sort({ "filmography.tvShowId.releaseYear": -1 });

    if (actor.toObject) {
      actor = actor.toObject();
    }

    if (actor.filmography) {
      actor.filmography = actor.filmography.map(film => {
        if (film.tvShowId) {
          return {
            title: film.tvShowId.title,
            characterName: film.characterName,
            year: film.tvShowId.releaseYear,
          };
        } else {
          return {
            title: null,
            characterName: film.characterName,
            year: null,
          };
        }
      });
    } else {
      actor.filmography = [];
    }

    actor.filmography.sort((a, b) => b.year - a.year);

    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.REQUEST_DETAILS(req),
      data: actor,
    });
  } catch (err) {
    if (
      err instanceof TypeError &&
      err.message === "Cannot read properties of null (reading 'select')"
    ) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.RECORD_NOT_FOUND(id).replace("record", "Actor"),
      });
    }
    next(err);
  }
};

export const createActor = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: RESPONSE_MESSAGES.PROVIDE_DETAILS.replace("details", "Actor details"),
      });
    }

    const { filmography, ...actorData } = req.body;
    const actor = new Actor(actorData);

    if (filmography && !validateFilmography(filmography, res)) {
      const tvShowIds = filmography.map(item => item.tvShowId);
      const tvShows = await TVShow.find({ _id: { $in: tvShowIds } });

      if (tvShows.length !== tvShowIds.length) {
        const foundTvShowIds = tvShows.map(tvShow => tvShow._id.toString());
        actor.filmography = filmography.filter(item => foundTvShowIds.includes(item.tvShowId));
      } else {
        actor.filmography = [...filmography];
      }

      await actor.save();

      tvShows.forEach(tvShow => {
        tvShow.actors.push(actor._id);
      });

      const savePromises = tvShows.map(tvShow => tvShow.save());
      const results = await Promise.allSettled(savePromises);

      const failures = results.filter(result => result.status === "rejected");
      if (failures.length > 0) {
        return res.status(500).json({
          success: false,
          message: RESPONSE_MESSAGES.ERROR_SAVING_RECORD("TV Show"),
        });
      }
    } else {
      await actor.save();
    }

    res.status(201).json({
      success: true,
      message: RESPONSE_MESSAGES.RECORD_CREATED_SUCCESSFULLY(req).replace("Record", "Actor"),
      data: actor,
    });
  } catch (err) {
    next(err);
  }
};

export const updateActor = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: RESPONSE_MESSAGES.PROVIDE_DETAILS_TO_UPDATE.replace("details", "Actor details"),
      });
    }

    const { filmography, ...actorData } = req.body;
    const actor = await Actor.findById(id);
    if (!actor) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.RECORD_NOT_FOUND(id).replace("record", "Actor"),
      });
    }

    const allowedFields = [
      "firstName",
      "lastName",
      "dob",
      "gender",
      "bio",
      "picture",
      "filmography",
    ];
    const validActorData = Object.keys(actorData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = actorData[key];
        return obj;
      }, {});
    actor.set(validActorData);

    if (filmography) {
      if (!validateFilmography(filmography, res)) {
        return;
      }

      const newTVShowIds = filmography.map(item => item.tvShowId);
      const oldTVShowIds = actor.filmography.map(item => item.tvShowId);

      const tvShowsToUpdate = [...new Set([...newTVShowIds, ...oldTVShowIds])];
      await TVShow.updateMany({ _id: { $in: tvShowsToUpdate } }, { $addToSet: { actors: id } });

      if (filmography.length === 0) {
        await TVShow.updateMany({ actors: id }, { $pull: { actors: id } });
      }

      actor.filmography = [...actor.filmography, ...filmography];
    }

    const savedActor = await actor.save();
    if (savedActor) {
      res.status(200).json({
        success: true,
        message: RESPONSE_MESSAGES.RECORD_UPDATED_SUCCESSFULLY(req, id).replace("Record", "Actor"),
        data: savedActor,
      });
    } else {
      res.status(500).json({
        success: false,
        message: RESPONSE_MESSAGES.FAILED_TO_UPDATE_RECORD.replace("record", "Actor"),
      });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteActor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const actor = await Actor.findById(id);
    if (!actor) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_MESSAGES.RECORD_NOT_FOUND(id).replace("record", "Actor"),
      });
    }

    await TVShow.updateMany({}, { $pull: { actors: id } });
    await Actor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: RESPONSE_MESSAGES.RECORD_DELETED_SUCCESSFULLY(id).replace("record", "Actor"),
    });
  } catch (err) {
    next(err);
  }
};
