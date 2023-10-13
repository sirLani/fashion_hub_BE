import { Application } from "express";
import request from "supertest";
import { StartedTestContainer } from "testcontainers";
import { v4 as uuid } from "uuid";

import { ApplicationServer } from "../types";
import createServer from "../server";
import createTestDbContainer from "./createTestDbContainer";

let app: Application,
  dbContainer: StartedTestContainer,
  appServer: ApplicationServer;

beforeAll(async () => {
  // starts a Docker container with a postgres instance insie
  dbContainer = await createTestDbContainer();

  const serverConfig = {
    db: {
      port: dbContainer.getMappedPort(5432),
    },
  };

  appServer = await createServer(serverConfig);
  app = appServer.app;
});

afterAll(async () => {
  // await appServer.dbClient.end(); // disconnecting the Database Client
  await dbContainer.stop(); // Stoping the Database Container
});

describe("AUTHENTICATION SERVER", () => {
  describe("When we make a Post request to /api/register/", () => {
    test("it should register a new user", async () => {
      const mockDetails = {
        email: "test@mail.com",
        first_name: "john",
        last_name: "doe",
        gender: "male",
        password: "Lemuelola22@",
      };
      const response = await request(app)
        .post(`/api/register/`)
        .send(mockDetails)
        .expect(200);
      console.log("====================================");
      console.log(response.body);
      console.log("====================================");
      expect(response.body).toBe({ ok: "successful" });
    });
  });
});
