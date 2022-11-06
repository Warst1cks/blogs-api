const supertest = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app");
let blogId;
beforeAll((done) => {
  const TEST_API_URL = process.env.TEST_API_URL;
  mongoose.connect(TEST_API_URL);
  mongoose.connection.on("connected", async () => {
    console.log("connected successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("an error occured", err);
  });
  done();
});

afterAll((done) => {
  mongoose.connection.close(done);
});
test("Create blog", async () => {
  const blog = {
    title: "sam",
    description: "warries",
    body: "a good one",
    tags: "sammy",
  };
  const response = await supertest(app)
    .post("/blogs/create")
    .set("Authorization", `Bearer${TEST_TOKEN}`)
    .send(blog);
  expect(response.statusCode).toBe(201);
  expect(response.body.status).toBe("success");
});
test("patch blog", async () => {
  const user = {
    state: "published"
  };
  const response = await supertest(app)
    .post("/blogs/:id")
    .set("Authorization", `Bearer${TEST_TOKEN}`)
    .send(user);
  blogId = response.body.data._id
  expect(response.statusCode).toBe(201);
  expect(response.body.status).toBe("success");
});