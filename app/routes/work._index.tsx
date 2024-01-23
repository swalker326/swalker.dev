import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getWorks } from "~/server/work.server";

export const meta = () => {
	return [
		{
			title: "Work",
		},
		{
			name: "description",
			content: "All of the recent and featured jobs or projects i've worked on",
		},
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const works = await getWorks();
	return json({ posts: works });
}

export default function BlogIndex() {
	const { posts } = useLoaderData<typeof loader>();
	return (
		//negative margin top to compensate for every other page having under this layout having pt-10
		//just markdown things
		<div className="not-prose -mt-3">
			<h2 className="text-3xl pb-3">Work</h2>
			<div>
				{posts.map(({ slug, frontmatter }) => {
					return (
						<div key={slug} className="py-2">
							<div className="flex gap-1.5">
								<Link
									prefetch="intent"
									to={`/work/${slug}`}
									className="text-blue-700 dark:text-blue-500"
								>
									{frontmatter.place}
								</Link>
								<p className="text-gray-500 dark:text-gray-400 font-thin">
									{frontmatter.start} - {frontmatter.end || "Present"}
								</p>
							</div>
							<p>{frontmatter.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
