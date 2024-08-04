import { text, integer } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const userTable = sqliteTable("users", {
	id: integer("id").primaryKey(),

	token: text("token").notNull(),
	sessionExpirationDate: integer("expirationDate", {
		mode: "timestamp",
	}).notNull(),
	email: text("email").notNull(),

	createdAt: integer("created_at", { mode: "timestamp" })
		.$default(() => new Date())
		.notNull(),
});

export const UserCreateSchema = z.object({
	token: z.string(),
	email: z.string(),
});

export type UserInsert = z.infer<typeof UserCreateSchema>;
export type SelectUser = typeof userTable.$inferSelect;
