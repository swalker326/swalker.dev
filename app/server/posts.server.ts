import matter from "gray-matter";
import { owner, repo } from "~/server/shared.server";

export type Frontmatter = {
	title: string;
	description: string;
	published: string; // YYYY-MM-DD
	featured: boolean;
};

export type PostMeta = {
	slug: string;
	frontmatter: Frontmatter;
};

const path = "content/posts";

export const fetchPostTitles = async () => {
	const response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
	);
	const metaData = await response.json();
	const titles: string[] = metaData.map((post: { name: string }) => {
		const name = post.name.replace(/\.mdx$/, "");
		return name;
	});
	return titles;
};

export const fetchPostBySlug = async (slug: string) => {
	const response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/${path}/${slug}.mdx`,
	);
	const metaData = await response.json();
	const downloadUrl = metaData.download_url;

	const postData = await (await fetch(downloadUrl)).text();
	console.log(postData);
	const { data: frontmatter, content } = matter(postData);

	return { frontmatter, markdown: content };
};

export const fetchPosts = async () => {
	const response = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
	);
	const metaData = await response.json();
	const downloadUrls = metaData.map((post: { download_url: string }) => {
		return post.download_url;
	});

	const postData = await Promise.all(
		downloadUrls.map(async (url: string) => {
			const data = await (await fetch(url)).text();
			return data;
		}),
	);
};

export const getPosts = async (): Promise<PostMeta[]> => {
	const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
		"../routes/blog.*.mdx",
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
	return sortBy(posts, (post) => post.frontmatter.published, "desc");
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
