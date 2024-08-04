import { text, integer } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const postTable = sqliteTable("posts", {
	id: integer("id").primaryKey(),
	slug: text("slug").notNull(),

	title: text("title").notNull(),
	description: text("description").notNull(),
	isPublished: integer("isPublished", { mode: "boolean" })
		.default(false)
		.notNull(),
	isFeatured: integer("isFeatured", { mode: "boolean" })
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

export const PostCreateSchema = z.object({
	content: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string({ required_error: "Content is required" }).min(10),
	),
	description: z.string(),
	isFeatured: z.boolean().optional(),
	isPublished: z.boolean().optional(),
	slug: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string({ required_error: "Content is required" }),
	),
	title: z.string(),
});

export type PostInsert = z.infer<typeof PostCreateSchema>;
