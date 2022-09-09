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

//Test 4 - Get Users
describe("/api/users", () => {
    describe("GET an array of all users", () => {
      test("200: responds with an array of all users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            const users = body;
            expect(users).toBeInstanceOf(Array);
            users.forEach((user) => {
              expect(user).toEqual(
                expect.objectContaining({
                  username: expect.any(String),
                  name: expect.any(String),
                  avatar_url: expect.any(String),
                })
              );
            });
          });
      });
    });
  });
  