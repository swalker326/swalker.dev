import { z } from "zod";

export const WorkFrontmatterSchema = z.object({
	place: z.string(),
	position: z.string(),
	start: z.coerce.date(),
	end: z.coerce.date().optional(),
	description: z.string(),
	featured: z.boolean().optional(),
});
export const WorkPayloadSceham = z.object({
	content: z.string(),
	data: WorkFrontmatterSchema,
});
export type WorkFrontmatter = z.infer<typeof WorkFrontmatterSchema>;
export type WorkPayload = z.infer<typeof WorkPayloadSceham>;
