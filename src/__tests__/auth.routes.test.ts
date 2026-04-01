import request from "supertest";
import app from "../index";

describe("POST /auth/register", () => {
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ name: "", email: "", password: "" });

    expect(response.status).toBe(400);
  });

  it("should return 400 if password is less than 6 characters", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ name: "John", email: "john@test.com", password: "123" });

    expect(response.status).toBe(400);
  });
});

describe("POST /auth/login", () => {
  it("should return 401 if credentials are invalid", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: "wrong@test.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
  });
});

describe("GET /admin/bookings", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app)
      .get("/admin/bookings");

    expect(response.status).toBe(401);
  });
});

describe("PUT /admin/bookings/:id/accept", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app)
      .put("/admin/bookings/123/accept");

    expect(response.status).toBe(401);
  });
});

describe("PUT /admin/bookings/:id/decline", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app)
      .put("/admin/bookings/123/decline");

    expect(response.status).toBe(401);
  });
});

describe("PUT /admin/bookings/:id/edit", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app)
      .put("/admin/bookings/123/edit");

    expect(response.status).toBe(401);
  });
});