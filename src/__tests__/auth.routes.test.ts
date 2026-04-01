import request from "supertest";
import app from "../index";

describe("POST /auth/register", () => {
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ name: "", email: "", password: "" });

    expect(response.status).toBe(400);
  });
});