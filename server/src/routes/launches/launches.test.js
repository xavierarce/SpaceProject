const request = require("supertest");
const app = require("../../app");

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
    target: "El Super Nido ",
    launchDate: "January 4, 2027",
  };

  const launchDataWithoutDate = {
    mission: "Luna de Miel",
    rocket: "Xavi y Sthefa",
    target: "El Super Nido ",
  };

  test("Its should respond with 201 Created", async () => {
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

  test("Its should catch missing required Properties", () => {});
  test("Its should catch invalid dates", () => {});
});
