import { desc, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const workTable = sqliteTable("works", {
	id: integer("id").primaryKey(),
	slug: text("slug").notNull(),

	start: integer("start", { mode: "timestamp" }).notNull(),
	end: integer("end", { mode: "timestamp" }),
	description: text("description").notNull(),
	isFeatured: integer("isFeatured", { mode: "boolean" })
		.default(false)
		.notNull(),
	content: text("content").notNull(),
	place: text("place").notNull(),
	position: text("position").notNull(),

	createdAt: integer("created_at", { mode: "timestamp" })
		.$default(() => new Date())
		.notNull(),
	updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

export const WorkCreateSchema = z.object({
	content: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string({ required_error: "Content is required" }).min(10),
	),
	description: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string({ required_error: "Content is required" }),
	),
	end: z.date().optional(),
	place: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string({ required_error: "Content is required" }),
	),
	position: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string({ required_error: "Content is required" }),
	),
	start: z.date(),
	isFeatured: z.boolean().optional(),
	slug: z.preprocess(
		(value) => (value === "" ? undefined : value),
		z.string({ required_error: "Content is required" }),
	),
});

export type WorkInsert = z.infer<typeof WorkCreateSchema>;
