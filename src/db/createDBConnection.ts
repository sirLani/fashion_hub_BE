import { Client } from "pg";

async function createDbConnection(port = 5431) {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
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

export async function createWrappedDbClient(port = 5431) {
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
