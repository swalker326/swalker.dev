import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchPostBySlug, fetchPostTitles } from "~/server/posts.server";
import Markdown from "react-markdown";
import { c } from "node_modules/vite/dist/node/types.d-FdqQ54oU";

export const meta = () => {
	return [
		{
			title: "Blog",
		},
		{
			name: "description",
			content: "All of the recent and featured blog posts i've made",
		},
	];
};

export async function loader() {
	const postTitles = await fetchPostTitles();
	console.log(postTitles);
	return json({ postTitles });
	// return json({ posts }, { headers: { "Cache-Control": "max-age=3600" } });
}

export default function BlogIndex() {
	const { postTitles } = useLoaderData<typeof loader>();

	return (
		//negative margin top to compensate for every other page having pt-10
		<div className="-mt-3">
			<h2 className="text-3xl pb-3">Blog</h2>
			<div>
				<div>
					{postTitles.map((post) => (
						<div key={post} className="py-2">
							<div className="flex gap-0.5">
								<a
									href={`/blog/${post}`}
									className="text-blue-700 dark:text-blue-500 capitalize"
								>
									{post.replace(/-|_/g, " ")}
								</a>
							</div>
						</div>
					))}
				</div>
				{/* <article className="prose lg:prose-xl dark:prose-invert">
					<Markdown>{posts.markdown}</Markdown>
				</article> */}
				{/* {posts.map(({ slug, frontmatter }) => (
					<div key={slug} className="py-2">
						<div className="flex gap-0.5">
							<Link
								prefetch="intent"
								to={`/blog/${slug}`}
								className="text-blue-700 dark:text-blue-500"
							>
								{frontmatter.title}
							</Link>
							<p className="text-gray-700 dark:text-gray-300 font-thin">
								- {frontmatter.published}
							</p>
						</div>
						<p>{frontmatter.description}</p>
					</div>
				))} */}
			</div>
		</div>
	);
}
