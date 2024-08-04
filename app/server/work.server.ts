import { asc, eq } from "drizzle-orm";
import { db } from "~/db";
import { type WorkInsert, workTable } from "~/db/schema";

export const getWorks = async (limit = 10) => {
	return await db
		.select()
		.from(workTable)
		.orderBy(asc(workTable.createdAt))
		.limit(limit);
};
export const getWorkBySlug = async (slug: string) => {
	const posts = await db
		.select()
		.from(workTable)
		.where(eq(workTable.slug, slug))
		.limit(1);
	return posts[0];
};
export const createWork = async (payload: WorkInsert) => {
	return await db
		.insert(workTable)
		.values(payload)
		.returning({ id: workTable.id });
};
