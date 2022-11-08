const supertest = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app");
// const jest = require("jest");
beforeAll((done)=>{
    const TEST_API_URL = process.env.TEST_API_URL;
    mongoose.connect(TEST_API_URL);
    mongoose.connection.on("connected", async () => {
      console.log("connected successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("an error occured", err);
    });
    done();
})

afterAll((done)=>{
    mongoose.connection.close(done)
})
// jest.setTimeout(30000);
test("sign Up", async ()=>{
    const user = {
        firstname:"samuel",
        lastname:"warrie",
        email:"samuelwarrie735@gmail.com",
        password:"samuelwarrie"
    }
    const response = await supertest(app)
    .post("/authentication/signup")
    .set("content-type","application/x-www-form-urlencoded")
    .send(user)
    expect(response.statusCode).toBe(500)
    // expect(response.body.status).toBe("success")
})
test("sign In", async () => {
  const user = {
    email: "samuelwarrie735@gmail.com",
    password: "samuelwarrie",
  };
  const response = await supertest(app)
    .post("/authentication/signin")
    .set("content-type", "application/x-www-form-urlencoded")
    .send(user);
  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe("success");
});