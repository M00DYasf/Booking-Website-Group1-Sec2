import { protect, adminOnly } from "../middleware/auth";
import { Request, Response, NextFunction } from "express";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockNext: NextFunction = jest.fn();

describe("protect middleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return 401 if no token is provided", async () => {
    const req = { headers: {} } as Request;
    const res = mockResponse();

    await protect(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authorized, no token" });
  });

  it("should return 401 if token is invalid", async () => {
    const req = { 
      headers: { authorization: "Bearer invalidtoken" } 
    } as Request;
    const res = mockResponse();

    await protect(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Not authorized, token invalid" });
  });
});

describe("adminOnly middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 403 if user is not admin", () => {
    const req = { user: { role: "user" } } as any;
    const res = mockResponse();

    adminOnly(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Access denied, admins only" });
  });

  it("should call next if user is admin", () => {
    const req = { user: { role: "admin" } } as any;
    const res = mockResponse();

    adminOnly(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});