import matter from "gray-matter";
import { owner, repo } from "~/server/shared.server";
import { z } from "zod";

export type Frontmatter = {
	place: string;
	position: string;
	start: string; // YYYY-MM-DD
	end?: string; // YYYY-MM-DD || null
	description: string;
	featured: boolean;
};

const WorkFrontmatterSchema = z.object({
	place: z.string(),
	position: z.string(),
	start: z.string(),
	end: z.string().optional(),
	description: z.string(),
	featured: z.boolean(),
});
export type FlattenedErrors = z.inferFlattenedErrors<
	typeof WorkFrontmatterSchema
>;

export type PostMeta = {
	slug: string;
	frontmatter: Frontmatter;
};

const path = "content/work";
export const getWorkByName = async (workPlace: string) => {
	const response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/${path}/${workPlace}.mdx`,
	);
	const metaData = await response.json();
	const downloadUrl = metaData.download_url;

	const postData = await (await fetch(downloadUrl)).text();
	const { data: frontmatter, content } = matter(postData);
	const parsedFrontmatter = WorkFrontmatterSchema.safeParse(frontmatter);
	if (!parsedFrontmatter.success) {
		throw parsedFrontmatter.error.flatten();
	}

	return { frontmatter: parsedFrontmatter.data, markdown: content };
};
export const getWorks = async (): Promise<PostMeta[]> => {
	const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
		"../routes/work.*.mdx",
		{ eager: true },
	);
	const build = await import("virtual:remix/server-build");
	const posts = Object.entries(modules).map(([file, post]) => {
		const id = file.replace("../", "").replace(/\.mdx$/, "");
		const slug = build.routes[id].path;
		if (slug === undefined) throw new Error(`No route for ${id}`);

		return {
			slug,
			frontmatter: post.frontmatter,
		};
	});
	return sortBy(posts, (post) => post.frontmatter.start, "desc");
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
