const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

//Test 1 - Test the API
describe("/api", () => {
  describe("GET api", () => {
    test("200: responds with message", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          expect(res.body.message).toBe("all ok");
        });
    });
  });
});



