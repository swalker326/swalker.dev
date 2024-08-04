import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { userTable } from "./users";

export const session = sqliteTable("session", {
	id: integer("id").primaryKey(),
	expirationDate: integer("expirationDate", { mode: "timestamp" }).notNull(),
	createdAt: integer("createdAt", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer("updatedAt", { mode: "timestamp" }),
	userId: text("userId")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
});

export const sessionsRelations = relations(session, (helpers) => ({
	user: helpers.one(userTable, {
		relationName: "sessionToUser",
		fields: [session.userId],
		references: [userTable.id],
	}),
}));
