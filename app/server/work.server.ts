import matter from "gray-matter";
import { owner, repo } from "~/server/shared.server";
import { z } from "zod";
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

const path = "content/work";

const fetchWorksContent = async (url: string) => {
	const response = await fetch(url);
	const content = await response.text();
	return parseWorksContent(content);
};
const parseWorksContent = (payload: string) => {
	const content = matter(payload);
	const parsedWork = WorkPayloadSceham.safeParse(content);
	if (!parsedWork.success) {
		throw parsedWork.error.flatten();
	}
	return parsedWork.data;
};
export const fetchWorksMetaData = async () => {
	const response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
	);
	const metaData = await response.json();
	const content: Array<{
		data: {
			place: string;
			position: string;
			start: string;
			description: string;
			end?: string | undefined;
			featured?: boolean | undefined;
		};
		content: string;
	}> = await Promise.all(
		metaData.map(async (md: unknown) => {
			if (
				!md ||
				typeof md !== "object" ||
				!("download_url" in md) ||
				!md.download_url ||
				typeof md.download_url !== "string"
			) {
				throw new Error("Invalid response from GitHub API");
			}
			return await fetchWorksContent(md.download_url);
		}),
	);
	return content;
};
export const getWorkByName = async (workPlace: string) => {
	const response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/${path}/${workPlace}.mdx`,
	);
	const metaData = await response.json();
	const downloadUrl = metaData.download_url;
	return await fetchWorksContent(downloadUrl);
};
export const getWorks = async () => {
	const works = await fetchWorksMetaData();
	// const build = await import("virtual:remix/server-build");
	// works.map(({ data, content }) => {
	// 	const id = placeToSlug(data.place);
	// 	const slug = build.routes[id].path;
	// 	if (slug === undefined) throw new Error(`No route for ${id}`);
	// 	return {
	// 		slug,
	// 		frontmatter: data,
	// 	};
	// });
	return works;
};

function sortBy<T>(
	arr: T[],
	key: (item: T) => string,
	dir: "asc" | "desc" = "asc",
) {
	return arr.sort((a, b) => {
		const res = compare(key(a), key(b));
		return dir === "asc" ? res : -res;
	});
}

function compare<T>(a: T, b: T): number {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}

const placeToSlug = (place: string) => {
	return place.toLowerCase().replace(/\s/g, "_");
};
