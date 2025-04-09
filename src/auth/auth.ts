import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { response } from "../constants/reusable/response.js";
import { errorStatusCode } from "../constants/errors/errorStatus.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("my_token");
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.auth, err.message);
    } else {
      response(res, errorStatusCode.auth, "Unknown error occurred");
    }
  }
};

// bcrypt
export const genHashedPassword = async (password: string) => {
  const NO_OF_ROUND = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUND);
  const hashed_password = await bcrypt.hash(password, salt);
  return hashed_password;
};
