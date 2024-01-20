import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const check_auth = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const token: string | undefined = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "");

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default check_auth;
