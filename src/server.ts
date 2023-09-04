// import app from "./app";

import { createWrappedDbClient } from "./db/createDBConnection";
import { ApplicationServer, ServerConfig } from "./types";
import express from "express";

async function createServer(config: ServerConfig): Promise<ApplicationServer> {
  const app = express();

  // Application Dependencies
  const { client: dbClient, query } = await createWrappedDbClient(
    config.db.port
  );

  // Middlewares
  app.use(express.json()); // To parse the incoming requests with JSON payloads

  app.get("/", function (req, res) {
    res.send("hello");
  });

  return {
    app,
    dbClient,
  };
}

export default createServer;
