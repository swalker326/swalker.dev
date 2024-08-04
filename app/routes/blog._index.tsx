import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ListCard } from "~/components/ListCard";
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

export const titleToSlug = (title: string) => {
	return title.toLowerCase().replace(/\s/g, "_");
};

export async function loader() {
	const posts = await getPosts();
	return json({ posts });
}

export default function BlogIndex() {
	const { posts } = useLoaderData<typeof loader>();
	console.log("typeof date?", typeof posts[0]?.createdAt);
	return (
		//negative margin top to compensate for every other page having pt-10
		<div>
			<h2 className="font-semibold text-5xl pb-3">Blog</h2>
			<div>
				<div className="flex flex-col gap-3">
					{posts.map((post) => (
						<ListCard
							key={post.title}
							description={post.description}
							created={new Date(post.createdAt)}
							title={post.title}
							to={`/blog/${post.slug}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
