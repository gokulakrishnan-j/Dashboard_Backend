import { emailRegex } from "./validation.js";

// Email validation
export const isValidEmail = (email: string) => {
  return String(email).toLowerCase().match(emailRegex);
};
