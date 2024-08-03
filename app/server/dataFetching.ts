import matter from "gray-matter";
import { owner, repo } from "~/server/shared.server";
import { readFile } from "node:fs/promises";
import { z, ZodError, ZodSchema } from "zod";
const WorkFrontmatterSchema = z.object({
	place: z.string(),
	position: z.string(),
	start: z.string(),
	end: z.string().optional(),
	description: z.string(),
	featured: z.boolean().optional(),
});
const WorkPayloadSceham = z.object({
	content: z.string(),
	data: WorkFrontmatterSchema,
});

export type WorkFrontmatter = z.infer<typeof WorkFrontmatterSchema>;

export type FlattenedErrors = z.inferFlattenedErrors<
	typeof WorkFrontmatterSchema
>;

// const path = "content/work";

const fetchContent = async <T>(
	url: string,
	schema: ZodSchema<T>,
	path: string,
	override = true,
) => {
	//if in development, fetch from local filesystem

	let content: string;
	if (import.meta.env.DEV && override === true) {
		console.log("fetching from local filesystem");
		const name = url.split("/").pop()?.split(".")[0];
		content = await readFile(`${path}/${name}.mdx`, "utf-8");
	} else {
		console.log("fetching from github");
		const response = await fetch(url);
		content = await response.text();
	}
	return parseContent<T>(content, schema);
};

const parseContent = <T>(payload: string, schema: ZodSchema<T>) => {
	const content = matter(payload);
	const parsedWork = schema.safeParse(content);
	if (!parsedWork.success) {
		return parsedWork.error;
	}
	return parsedWork.data;
};

export const bulkFetchMetadata = async <T>(schema: ZodSchema, path: string) => {
	const response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
	);
	if (!response.ok) {
		throw new Error("Failed to fetch metadata from GitHub API");
	}
	const metaData = await response.json();
	const results = await Promise.all(
		metaData.map(async (md: unknown) => {
			if (
				!md ||
				typeof md !== "object" ||
				!("download_url" in md) ||
				!md.download_url ||
				typeof md.download_url !== "string"
			) {
				return new Error("Invalid response from GitHub API");
			}
			return await fetchContent<T>(md.download_url, schema, path, false);
		}),
	);
	const successfulResults = results.filter(
		(result): result is T => !(result instanceof ZodError),
	);
	const errors = results.filter(
		(result): result is ZodError => result instanceof ZodError,
	);
	return { successfulResults, errors };
};

export const getMDXByName = async <T>({
	name,
	path,
	schema,
}: { path: string; name: string; schema: ZodSchema<T> }) => {
	const downloadUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}/${name}.mdx`;
	try {
		const result = await fetchContent<T>(downloadUrl, schema, path, true);
		if (result instanceof ZodError) {
			throw result.flatten();
		}
		return result;
	} catch (error) {
		throw new Error("Failed to fetch metadata from GitHub API");
	}
};
export const getMDX = async <T>({
	schema,
	path,
}: { schema: ZodSchema<T>; path: string }) => {
	const { successfulResults, errors } = await bulkFetchMetadata<T>(
		schema,
		path,
	);
	console.log(errors);
	return successfulResults;
};
