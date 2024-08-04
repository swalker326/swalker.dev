import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

if (!process.env.TURSO_CONNECTION_URL) {
	throw new Error("No connection URL provided");
}
if (!process.env.TURSO_AUTH_TOKEN) {
	throw new Error("No auth token provided");
}

export default defineConfig({
	schema: "./app/db/schema/index.ts",
	out: "./migrations",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL,
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
});
