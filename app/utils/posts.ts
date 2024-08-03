import { z } from "zod";

export const PostFrontmatterSchema = z.object({
	title: z.string(),
	description: z.string(),
	published: z.coerce.date(),
	featured: z.boolean(),
});
export const PostPayloadSchema = z.object({
	content: z.string(),
	data: PostFrontmatterSchema,
});
export type PostPayload = z.infer<typeof PostPayloadSchema>;
