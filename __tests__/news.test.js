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

//Test 3 - Get articles by ID
describe("/api/articles/:article_id", () => {
  describe("GET Article object by specific article ID", () => {
    test("200: responds with an Object of a specific article", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
          });
        });
    });
    test("status:400, responds with an error message when passed a bad article ID e.g. not a number", () => {
      return request(app)
        .get("/api/articles/notanid")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid input");
        });
    });
    test("status:404, responds with an error message when passed an article ID that does not exist", () => {
      return request(app)
        .get("/api/articles/999999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("No article found for article_id: 999999999");
        });
    });
  });
});
