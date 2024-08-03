import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { format, formatDistanceToNow } from "date-fns";
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

	return (
		//negative margin top to compensate for every other page having pt-10
		<div>
			<h2 className="font-semibold text-5xl pb-3">Blog</h2>
			<div>
				<div className="flex flex-col gap-3">
					{posts
						.sort((a, b) => {
							return (
								new Date(b.data.published).getTime() -
								new Date(a.data.published).getTime()
							);
						})
						.map((post) => (
							<div className="py-2" key={post.data.title}>
								<div className="flex flex-col gap-0.5">
									<div className="flex items-end gap-1">
										<Link
											to={`/blog/${titleToSlug(post.data.title)}`}
											className="text-blue-700 dark:text-blue-500 capitalize"
										>
											<h3 className="text-2xl">{post.data.title}</h3>
										</Link>
										<span className="text-gray-500 dark:text-gray-400 font-thin">
											{format(
												new Date(post.data.published).toLocaleDateString(),
												"MMM dd, yyyy",
											)}
										</span>
									</div>
									<p>{post.data.description}</p>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
