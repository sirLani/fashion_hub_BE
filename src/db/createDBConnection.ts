import { Client } from "pg";

async function createDbConnection(port = 5432) {
  const client = new Client({
    user: "postgres",
    host: "db",
    database: "fashion_hub",
    password: "uniquepassword",
    port: port,
  });

  await client.connect((err) => {
    if (err) {
      console.error("Database connection error", err);
    } else {
      console.log(`Connected to database server running on port: ${port}`);
    }
  });

  return client;
}

export async function createWrappedDbClient(port = 5432) {
  const client = await createDbConnection(port);
  return {
    client,
    query: (text: string) => {
      console.info(text.replace(/\s+/g, " ").trim());
      return client.query(text);
    },
  };
}

export default createDbConnection;
