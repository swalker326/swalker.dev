import { desc, eq } from "drizzle-orm";
import { db } from "~/db";
import { type PostInsert, postTable } from "~/db/schema";

export const getPosts = async (limit = 10) => {
  return await db
    .select()
    .from(postTable)
    .orderBy(desc(postTable.createdAt))
    .limit(limit);
};
export const getPostBySlug = async (slug: string) => {
  const posts = await db
    .select()
    .from(postTable)
    .where(eq(postTable.slug, slug))
    .limit(1);
  return posts[0];
};
export const createPost = async (payload: PostInsert) => {
  return await db
    .insert(postTable)
    .values(payload)
    .returning({ id: postTable.id });
};
