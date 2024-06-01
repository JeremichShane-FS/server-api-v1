import request from "supertest";
import app from "..";
import { RESPONSE_MESSAGES } from "../constants/responseMessages";
import { Actor } from "../models/Actor";

jest.mock("../models/Actor", () => {
  const actors = [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      filmography: [],
      toObject: jest.fn().mockReturnThis(),
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Doe",
      filmography: [],
      toObject: jest.fn().mockReturnThis(),
    },
  ];
  const mockQuery = {
    select: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(actors),
    sort: jest.fn().mockResolvedValue(actors),
  };

  return {
    Actor: {
      find: jest.fn().mockReturnValue(mockQuery),
      findById: jest.fn(id => {
        const actor = actors.find(actor => actor._id === id);
        if (actor) {
          return {
            ...actor,
            select: jest.fn().mockReturnThis(),
            populate: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            toObject: jest.fn().mockReturnThis(),
            filmography: [],
          };
        } else {
          return null;
        }
      }),
    },
  };
});

describe("GET /api/v1/actors", () => {
  beforeEach(() => {
    Actor.find.mockClear();
  });

  it("should get all actors", async () => {
    const res = await request(app).get("/api/v1/actors");

    expect(Actor.find).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data", res.body.data);
  });

  it("should get actors based on a query string and select", async () => {
    const res = await request(app).get("/api/v1/actors?firstName=John");

    expect(Actor.find).toHaveBeenCalledWith({
      firstName: "John",
    });
    expect(Actor.find).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data", res.body.data);
  });

  it("should paginate the actors collection", async () => {
    const res = await request(app).get("/api/v1/actors?skip=1&limit=1");

    expect(Actor.find).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data", res.body.data);
  });

  it("should sort the actors collection in ascending order", async () => {
    const res = await request(app).get("/api/v1/actors?sort=firstName");

    expect(Actor.find).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data", res.body.data);
  });

  it("should sort the actors collection in descending order", async () => {
    const res = await request(app).get("/api/v1/actors?sort=-firstName");

    expect(Actor.find).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data", res.body.data);
  });
});

describe("GET /api/v1/actors/:id", () => {
  it("should get an actor by id", async () => {
    const res = await request(app).get("/api/v1/actors/1");

    expect(Actor.findById).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data", res.body.data);
  });

  it("should return a 404 if the actor is not found", async () => {
    const id = 3;
    const res = await request(app).get("/api/v1/actors/3");

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty(
      "message",
      RESPONSE_MESSAGES.RECORD_NOT_FOUND(id).replace("record", "Actor")
    );
  });
});
