import { getUserByEmail } from "../../services/user.service";
import { Response } from "express";

export const response = (res: Response, status: number, message: string | {}) => {
  res.status(status).send({ message: message });
};

export const emailCheck = async (email: string) => {
  const userEmail = await getUserByEmail(email);
  return userEmail;
};
