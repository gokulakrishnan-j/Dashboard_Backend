// Error message for middleware.
export const userErrorMessage = {
  username: "Username is not provided",
  firstName: "First name is not provided",
  lastName: "Last name is not provided",
  email: "Email is not provided",
  role: "Role is not provided",
  status: "Status is not provided",
  pass: "Password is not provided",
  newPass: "New password is not provided",
  emailValidation: "Not a valid email provided",
  userNotFound: "User not found",
  validPass: "Enter valid password",
  Inactive: "User is inactive",
};

export const deleteMiddlewareErrorMessage = {
  error: "No employee found with this ID",
};

export const collectionClientError = {
  create: "User already exists",
  edit: "No employee found with this ID :",
  deletes: "No employee found with this ID :",
  get: "No data are found",
};

export const emailUniueErrorMessage = {
  error: "Email already exists",
};
