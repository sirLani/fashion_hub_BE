import Joi from "joi";
import escape from "pg-escape";
import bcrypt from "bcryptjs";

import {
  LoginUserDataOBj,
  LoginUserDetails,
  CreateUserDetails,
  CreateUserDataOBj,
} from "./types";

export const CreateUserSchema = Joi.object({
  email: Joi.string().min(2).max(500).required(),
  first_name: Joi.string().min(2).max(500).required(),
  last_name: Joi.string().min(2).max(500).optional(),
  gender: Joi.string().min(2).max(100).required(),
  password: Joi.string()
    .min(4)
    .max(300)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

export const sanitizeUserSignInData = (
  data: CreateUserDetails
): CreateUserDataOBj => {
  return {
    id: escape("%L", data.id),
    email: escape("%L", data.email?.trim()),
    first_name: escape("%L", data.first_name?.trim()),
    last_name: escape("%L", data.last_name?.trim()),
    gender: escape("%L", data.gender?.trim()),
    password: escape("%L", data.password?.trim()),
  };
};

export const LoginUserSchema = Joi.object({
  email: Joi.string().min(2).max(500).required(),
  password: Joi.string()
    .min(4)
    .max(300)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

export const sanitizeUserLogin = (data: LoginUserDetails): LoginUserDataOBj => {
  return {
    email: escape("%L", data.email?.trim()),
    password: escape("%L", data.password?.trim()),
  };
};

export const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password: string, hashed: string) => {
  console.log("====================================");
  console.log(password);
  console.log(hashed);

  console.log("====================================");
  return bcrypt.compareSync(password, hashed);
};
