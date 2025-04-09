import express from "express";
import {
  creatingUser,
  getUserDetails,
  deleteUser,
  editUserDetails,
  userLogin,
  changeUserPass,
} from "../controllers/user.controller.js";
import {
  validation,
  emailUniqueValidation,
  loginValidation,
  passValidation,
  updateValidation,
} from "../middlewares/user.middleware.js";
import { auth } from "../auth/auth.js";

const router = express.Router();

// Route to post a data for signup
router.post("/signup", [validation, emailUniqueValidation], creatingUser);

// Route to post a data for login
router.post("/signin", [loginValidation], userLogin);

// Route to get data for user
router.get("/:id", [auth], getUserDetails);

// Route to delete particular data with id
router.delete("/:id", [auth], deleteUser);

// Route to edit particular data
router.put("/:id", [auth, updateValidation], editUserDetails);

// Route to change password
router.put("/password/:id", [auth, passValidation], changeUserPass);

export default router;
