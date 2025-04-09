import { isValidEmail } from "../constants/validations/email.js";
import {
  userErrorMessage,
  emailUniueErrorMessage,
} from "../constants/errors/errorMessage.js";
import { errorStatusCode } from "../constants/errors/errorStatus.js";
import { response, emailCheck } from "../constants/reusable/response.js";
import { Request, Response, NextFunction } from "express";

// Middleware for validation
export const validation = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, firstName, lastName, password } = req.body;
  try {
    if (!username) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.username
      );
    }
    if (!firstName) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.firstName
      );
    }
    if (!lastName) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.lastName
      );
    }

    if (!password) {
      return response(res, errorStatusCode.clientError, userErrorMessage.pass);
    }

    if (!email || !isValidEmail(req.body.email)) {
      if (!email) {
        return response(
          res,
          errorStatusCode.clientError,
          userErrorMessage.email
        );
      }
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.emailValidation
      );
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

// Middleware for validation
export const updateValidation = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, firstName, lastName, role, status } = req.body;
  try {
    if (!username) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.username
      );
    }
    if (!firstName) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.firstName
      );
    }
    if (!lastName) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.lastName
      );
    }

    if (!role) {
      return response(res, errorStatusCode.clientError, userErrorMessage.role);
    }

    if (!status) {
      return response(res, errorStatusCode.clientError, userErrorMessage.status);
    }

    if (!email || !isValidEmail(req.body.email)) {
      if (!email) {
        return response(
          res,
          errorStatusCode.clientError,
          userErrorMessage.email
        );
      }
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.emailValidation
      );
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

// Middleware for login validation
export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    if (!email || !isValidEmail(req.body.email)) {
      if (!email) {
        return response(
          res,
          errorStatusCode.clientError,
          userErrorMessage.email
        );
      }
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.emailValidation
      );
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

// Middleware for password Validate
export const passValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, newPassword } = req.body;
  try {
    if (!password) {
      return response(res, errorStatusCode.clientError, userErrorMessage.pass);
    }

    if (!newPassword) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.newPass
      );
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};

export const emailUniqueValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const checkingEmail = await emailCheck(email);

    if (checkingEmail) {
      return response(
        res,
        errorStatusCode.clientError,
        `${emailUniueErrorMessage.error}`
      );
    }
    next();
  } catch (err) {
    if (err instanceof Error) {
      response(res, errorStatusCode.serverError, err.message);
    } else {
      response(res, errorStatusCode.serverError, "Unknown error occurred");
    }
  }
};
