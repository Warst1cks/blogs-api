const supertest = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app")
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
test("sign Up", async ()=>{
    const user = {
        firstname:"sam",
        lastname:"warries",
        email:"sam@gmail.com",
        password:"sammy"
    }
    const response = await supertest(app)
    .post("/authentication/signup")
    .set("content-type","application/x-www-form-urlencoded")
    .send(user)
    expect(res.statusCode).toBe(201)
    expect(res.body.status).toBe("success")
})
test("sign In", async () => {
  const user = {
    email: "sam@gmail.com",
    password: "sammy",
  };
  const response = await supertest(app)
    .post("/authentication/signin")
    .set("content-type", "application/x-www-form-urlencoded")
    .send(user);
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("success");
});