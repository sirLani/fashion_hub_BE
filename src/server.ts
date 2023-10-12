// import app from "./app";

import { createWrappedDbClient } from "./db/createDBConnection";
import express, { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { QueryResult } from "pg";
import jwt from "jsonwebtoken";

import {
  CreateUserSchema,
  LoginUserSchema,
  comparePassword,
  hashPassword,
  sanitizeUserLogin,
  sanitizeUserSignInData,
} from "./utils";
import { ApplicationServer, ServerConfig, CreateUserDetails } from "./types";

async function createServer(config: ServerConfig): Promise<ApplicationServer> {
  const app = express();

  // Application Dependencies
  const { client: dbClient, query } = await createWrappedDbClient(
    config.db.port
  );

  // Middlewares
  app.use(express.json()); // To parse the incoming requests with JSON payloads

  // CORS allowed origin and headers
  app.use("/", (req: Request, response: Response, next: NextFunction) => {
    response.append("Access-Control-Allow-Origin", "*");
    response.append("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
    next(); // This calls the next middleware, all the way down to the request handler function
  });

  //auth
  // app.use("/api");

  app.get("/api/", async (request, response) => {
    const users = await query("SELECT * FROM users;");
    return response.json(users.rows);
  });

  app.post("/api/register/", async (req, res) => {
    // request input validation
    const { password } = req.body;
    const hashedPassword = await hashPassword(password);

    const result = CreateUserSchema.validate(req.body);

    const userData = sanitizeUserSignInData({
      ...req.body,
      id: uuid(),
      password: hashedPassword,
    });

    if (result.error) {
      console.error(result.error);
      res.status(400).json({
        message: result.error.message,
      });
    } else {
      try {
        const isEmailExist = await query(
          `SELECT * FROM users WHERE email = ${userData.email}`
        );
        if (isEmailExist.rows.length > 0) {
          return res.status(400).json({ message: "email already exist" });
        } else {
          const response: QueryResult<CreateUserDetails> =
            await query(`INSERT INTO users (email, first_name, last_name, gender, id, password)
          VALUES (${userData.email}, ${userData.first_name}, ${userData.last_name}, ${userData.gender}, ${userData.id}, ${userData.password})`);
          return res.json({
            ok: true,
          });
        }
      } catch (error) {
        return res.status(400).json({ message: "Error, Try again." });
      }
    }
    return res.status(200);
  });

  app.post("/api/login/", async (req, res) => {
    const result = LoginUserSchema.validate(req.body);

    const userData = await sanitizeUserLogin({
      ...req.body,
    });
    if (result.error) {
      console.error(result.error);
      res.status(400).json({
        message: result.error.message,
      });
    } else {
      try {
        const isEmailExist = await query(
          `SELECT * FROM users WHERE email = ${userData.email}`
        );

        //check if email exists

        if (isEmailExist.rows.length < 0) {
          return res.json({
            message: "No user found",
          });
        }

        //check if password matches
        const isPasswordMatch = await comparePassword(
          userData.password,
          isEmailExist.rows[0].password
        );
        console.log(isPasswordMatch);
        if (!isPasswordMatch) {
          return res.status(400).json({
            message: "Wrong password",
          });
        }

        // create signed token

        const token = jwt.sign(
          { _id: isEmailExist.rows[0].id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "7d",
          }
        );

        res.json({
          token,
          first_name: isEmailExist.rows[0].first_name,
          last_name: isEmailExist.rows[0].last_name,
        });
      } catch (error) {
        return res.status(400).json({ message: "Error, Try again." });
      }
    }
  });

  return {
    app,
    dbClient,
  };
}

export default createServer;
