import { GenericContainer, StartedTestContainer } from "testcontainers";
import path from "path";

export default async function createTestDbContainer(): Promise<StartedTestContainer> {
  return await new GenericContainer("postgres")
    .withEnvironment({ DB_USER: "postgres" }) // db user
    .withEnvironment({ DB_PASSWORD: "uniquepassword" }) // db password
    .withEnvironment({ DB_NAME: "fashion_hub" }) // database name
    .withExposedPorts(5431)
    .start();
}
