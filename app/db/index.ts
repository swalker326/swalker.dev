import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

config({ path: ".env" }); // or .env.local

if (!process.env.TURSO_CONNECTION_URL) {
	throw new Error("No connection URL provided");
}
if (!process.env.TURSO_AUTH_TOKEN) {
	throw new Error("No auth token provided");
}

const client = createClient({
	url: process.env.TURSO_CONNECTION_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
