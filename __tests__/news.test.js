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

// Test 2 - Get all topics
describe("/api/topics", () => {
  describe("GET ALL TOPICS", () => {
    test("200: responds with an array of all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const topics = body;
          expect(topics).toBeInstanceOf(Array);
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

//Test 3 - Get article by ID
describe("/api/articles/:article_id", () => {
  describe("GET Article object", () => {
    test("200: responds with an Object of articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articles = body;
          expect(articles).toBeInstanceOf(Object);
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
  });
});
