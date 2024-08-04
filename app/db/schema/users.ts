import { relations } from "drizzle-orm";
import { text, integer } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { session } from "./session";

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

export const userTableRelations = relations(userTable, (helpers) => ({
	sessions: helpers.many(session, { relationName: "sessionToUser" }),
}));

export const UserCreateSchema = z.object({
	token: z.string(),
	email: z.string(),
});

export type UserInsert = z.infer<typeof UserCreateSchema>;
export type SelectUser = typeof userTable.$inferSelect;
