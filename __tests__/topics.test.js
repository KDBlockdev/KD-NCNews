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

// Task 2 - Get all topics
describe("/api/topics", () => {
    describe("GET ALL TOPICS", () => {
      test("200: responds with an array of all topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            const topics = body;
            expect(topics).toBeInstanceOf(Array);
            expect(topics).toHaveLength(3);
            topics.forEach((topic) => {
              expect(topic).toEqual(
                expect.objectContaining({
                  slug: expect.any(String),
                  description: expect.any(String),
                })
              );
            });
          });
      });
    });
  });