const mongoose = require("mongoose");
const supertest = require("supertest");
const dotenv = require("dotenv");
// const jest = require("jest")

dotenv.config(); 

const app = require("../app");
const TEST_API_URL = process.env.TEST_API_URL;
const TEST_TOKEN = process.env.TEST_TOKEN;

beforeAll((done) => {
  mongoose.connect(TEST_API_URL);
  mongoose.connection.on("connected", async () => {
    console.log("Connected to MongoDB Successfully");
    done();
  });
  mongoose.connection.on("error", (err) => {
    console.log(err, "An error occurred while connecting to MongoDB");
    done();
  });
});

afterAll((done) => {
  mongoose.connection.close(done);
});
// jest.setTimeout(30000);
describe("blogs", () => {
  let blogId;
  test("POST /blogs/create", async () => {
    const newBlog = {
      title: "Posting blog",
      description: "Testing blog posting",
      body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      tags: ["javascript", "nodejs"],
    };
    const response = await supertest(app)
      .post(`/blogs/create`)
      .set("Authorization", `Bearer ${TEST_TOKEN}`)
      .send(newBlog);
      // blogId = response.body.data.blog._id;
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("blog");
    expect(response.body.data.blog).toHaveProperty("timestamp");
    // expect(response.body.data.blog.readCount).toBe(0);
    expect(response.body.data.blog.state).toBe("draft");
  });
  test("PATCH /blogs/:id", async () => {
    const data = {
      state: "published",
    };
    const response = await supertest(app)
      .patch(`/blogs/${blogId}`)
      .set("Authorization", `Bearer ${TEST_TOKEN}`)
      .send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("blog");
    expect(response.body.data.blog.state).toBe("published");
  });
  test("GET /blogs/get", async () => {
    const response = await supertest(app).get("/blogs/get");
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("blog");
  });

  test("GET /blogs/:id", async () => {
    const response = await supertest(app).get(`/blogs/${blogId}`);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("blog");
    expect(response.body.data.blog.state).toBe("published");
  });
  test("DELETE /blogs/:id", async () => {
    const response = await supertest(app)
      .delete(`/blogs/${blogId}`)
      .set("Authorization", `Bearer ${TEST_TOKEN}`);
    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });
});
