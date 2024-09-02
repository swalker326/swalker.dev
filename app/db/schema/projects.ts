import { text, integer } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { repo } from "~/server/shared.server";

export const projectTable = sqliteTable("projects", {
	id: integer("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	liveCode: text("link"),
	repoLink: text("repoLink").notNull(),
	media: text("media").notNull(),
	isPublished: integer("isPublished", { mode: "boolean" })
		.default(false)
		.notNull(),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.$default(() => new Date())
		.notNull(),
	updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const ProjectInsertSchema = z.object({
	content: z.string({
		required_error: "Content is required",
		invalid_type_error: "Content must be a string",
	}),
	description: z.string(),
	isPublished: z.boolean().optional(),
	liveCode: z.string(),
	repoLink: z.string(),
	media: z.instanceof(File),
	title: z.string(),
});

export type ProjectInsert = z.infer<typeof ProjectInsertSchema>;
