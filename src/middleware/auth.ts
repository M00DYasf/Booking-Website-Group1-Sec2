import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import userQueries from "../infrastructure/mongodb/queries/user";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, String(config.jwt.secret)) as { id: string };
    const user = await userQueries.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user && (req as any).user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admins only" });
  }
};