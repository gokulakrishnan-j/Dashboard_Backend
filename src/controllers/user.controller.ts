import { userMessage } from "../constants/messages/user.js";
import { errorStatusCode } from "../constants/errors/errorStatus.js";
import { successCode } from "../constants/SuccessStatusCode/statusCode.js";
import {
  collectionClientError,
  userErrorMessage,
} from "../constants/errors/errorMessage.js";
import { response } from "../constants/reusable/response.js";
import {
  changeUserPassService,
  createUserService,
  deleteUserService,
  getUserByEmail,
  getUserById,
  getUsersService,
  updateUserService,
} from "../services/user.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { genHashedPassword } from "../auth/auth.js";
import { Request, Response } from "express";

// Creating a data and storing it in data base
export const creatingUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    // Generating hashed the password
    const hashedPassword = await genHashedPassword(password);

    const userDetails = await createUserService({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    if (!userDetails) {
      return response(
        res,
        errorStatusCode.clientError,
        collectionClientError.create
      );
    }

    response(res, successCode.success, userMessage.create);
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

// Editing a particular data it means modifing the data with id
export const editUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const editData = await updateUserService(id, data);
    if (!editData) {
      return response(
        res,
        errorStatusCode.clientError,
        `${collectionClientError.edit} ${id}`
      );
    }

    response(res, successCode.createdSuccessfully, {
      data: editData,
      message: userMessage.edit,
    });
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

// Changing a particular user password
export const changeUserPass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { password, newPassword } = req.body;

    const getUserData = await getUserById(Number(id));

    const storedDBPassword = getUserData.password;

    // Comparing password
    const isPasswordMatch = await bcrypt.compare(password, storedDBPassword);

    if (isPasswordMatch) {
      // Generating hashed password
      const hashedPassword = await genHashedPassword(newPassword);

      await changeUserPassService(id, {
        password: hashedPassword,
      });

      response(res, successCode.success, userMessage.passUpdate);
    } else {
      response(res, errorStatusCode.clientError, userErrorMessage.validPass);
    }
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

// Deleting particular data in database
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserService(id);

    if (!deleteUser.id) {
      return response(
        res,
        errorStatusCode.clientError,
        `${collectionClientError.deletes} ${id}`
      );
    }
    response(res, successCode.success, userMessage.delete);
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

// Getting data from data base
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const pageNumber: number = Number(req.query.page);
    const search: string = req.query.search;
    const { id } = req.params;

    const userDetails = await getUsersService(Number(id), search, pageNumber);

    if (!userDetails) {
      return response(
        res,
        errorStatusCode.clientError,
        collectionClientError.get
      );
    }

    response(res, successCode.success, userDetails);
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

// Login
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const getUserData = await getUserByEmail(email);

    if (!getUserData) {
      response(res, errorStatusCode.clientError, userErrorMessage.userNotFound);
    }

    if (getUserData.status === "INACTIVE") {
      response(res, errorStatusCode.clientError, userErrorMessage.Inactive);
    }
    const storedDBPassword = getUserData.password;

    // Comparing password
    const isPasswordMatch = await bcrypt.compare(password, storedDBPassword);

    if (isPasswordMatch) {
      // Generating token
      const token = jwt.sign({ id: getUserData.id }, process.env.SECRET_KEY);

      response(res, successCode.success, {
        data: { ...getUserData, token },
        message: userMessage.login,
      });
    } else {
      response(res, errorStatusCode.clientError, userErrorMessage.validPass);
    }
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};
