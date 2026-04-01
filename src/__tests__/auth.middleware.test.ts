import { protect } from "../middleware/auth";
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
});