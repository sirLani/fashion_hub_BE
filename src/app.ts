import dotnev from "dotenv";
import createServer from "./server";
import config from "./config";
import { ApplicationServer } from "./types";

// loading env variables
dotnev.config();

createServer(config).then((appSever: ApplicationServer) => {
  appSever.app.listen(3007, () => {
    console.info("Server is running on: http://localhost:3007/");
  });
});
