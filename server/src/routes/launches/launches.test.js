const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

// mongoConnect()
describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 susccess & JSON Format", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200); //Specific to HTTP
    });
  });

  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "Luna de Miel",
      rocket: "Xavi y Sthefa",
      target: "Kepler-452 b",
      launchDate: "January 4, 2027",
    };

    const launchDataWithoutDate = {
      mission: "Luna de Miel",
      rocket: "Xavi y Sthefa",
      target: "Kepler-452 b",
    };

    const launchDataWithInvalidDate = {
      mission: "Luna de Miel",
      rocket: "Xavi y Sthefa",
      target: "El Super Nido ",
      launchDate: "zot",
    };

    test("It should respond with 201 Created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required Properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing Required Launch Property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid Launch Date",
      });
    });
  });
});
