import type { LoaderFunctionArgs } from "@remix-run/node";
import { type MetaFunction, useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getPostBySlug } from "~/server/posts.server";

export { ErrorBoundary } from "~/components/ErrorBoundary";

export async function loader({ params }: LoaderFunctionArgs) {
	const { blogSlug } = params;
	if (!blogSlug) throw new Response("No blog slug provided", { status: 400 });
	const post = await getPostBySlug(blogSlug);
	return { post };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.post.title || "" },
		{ description: data?.post.description || "" },
	];
};

export default function BlogSlug() {
	const { post } = useLoaderData<typeof loader>();
	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-3xl">{post.title}</h1>
			<div className="prose dark:prose-invert">
				<Markdown rehypePlugins={[rehypeRaw]}>{post.content}</Markdown>
			</div>
		</div>
	);
}
