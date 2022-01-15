import app from "../../../app";
import request from "supertest";
import mongoose from "mongoose";

const Builder = {
  user: ({
    username = "my product",
    email = "this is a test",
    password = "100",
    role = "admin",
  } = {}) => ({
    username,
    email,
    password,
    role,
  }),
};

// Promise.all(mongoose.connections.map(con => con.close()))
describe("POST /api/user", () => {
  test("new user registration", async () => {
    const user = Builder.user();

    const response = await request(app)
      .post("/api/user")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(200);
    expect(response.body).toEqual({
      ...user,
      _id: "abc",
    });
  });
});
