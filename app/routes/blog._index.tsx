import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/server/posts.server";

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
	const posts = await getPosts();
	return json({ posts }, { headers: { "Cache-Control": "max-age=3600" } });
}

export default function BlogIndex() {
	const { posts } = useLoaderData<typeof loader>();
	return (
		//negative margin top to compensate for every other page having pt-10
		<div className="not-prose -mt-3">
			<h2 className="text-3xl pb-3">Blog</h2>
			<div>
				{posts.map(({ slug, frontmatter }) => (
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
				))}
			</div>
		</div>
	);
}
