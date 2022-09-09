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
            comment_count: 11,
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

//Test 5 - Patch Votes (positive and negative tests)
describe("/api/articles/:article_id", () => {
  describe("Takes an object of {inc_votes: newVote } and responds with an updated vote property", () => {
    //Positive Test
    test("status: 200 updated article object has votes property increased by inc_votes amount if inc_votes is positive", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article.votes).toBe(110);
        });
    });
    //Negative Test
    test("status: 200 updated article object has votes property decreased by inc_votes amount if inc_votes is negative", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -1 })
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article.votes).toBe(99);
        });
    });
    test('Status: 404 "Not Found" when wrong ID', () => {
      return request(app)
        .patch("/api/articles/1234")
        .send({ inc_votes: 2 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });
    test('Status: 400 "Bad Request" when the ID is invalid', () => {
      return request(app)
        .patch("/api/articles/1b456ht")
        .send({ inc_votes: 2 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid input");
        });
    });
    test("Status: 400 responds with an error when inc_vote is not an integer", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "Not an Integer" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
    test("Status: 400 responds with an error when key is missing or is not an integer", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
  });
});

// Test 6 - Comment Count
describe("/api/articles/:article_id (comment count)", () => {
  describe("Article response includes comment_count", () => {
    test("status: 200 each article has a comment_count which is the total count of all the comments with this article_id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            comment_count: 11,
          });
        });
    });
    // test("Status: 400 responds with an error when comment_count is not an integer", () => {
    //   return request(app)
    //     .get("/api/articles/1")
    //     .expect(400)
    //     .then(({ body }) => {
    //       expect({ comment_count: "Not an Integer" }).toBe("Invalid input");
    //     });
    // });
    // test("Status: 400 responds with an error when comment_count key is missing or is not an integer", () => {
    //   return request(app)
    //     .get("/api/articles/1")
    //     .send({})
    //     .expect(400)
    //     .then(({ body }) => {
    //       expect(body.msg).toBe("Invalid input");
    //     });
    // });
  });
});

//Test 7 - Get Articles
describe("/api/articles", () => {
  describe("GET Article object", () => {
    test("200: responds with an Object of a articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articles = body;
          expect(articles).toEqual(
            expect.objectContaining([
              {
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                // comment_count: expect.any(Number)
              },
            ])
          );
        });
    });
  });
});
