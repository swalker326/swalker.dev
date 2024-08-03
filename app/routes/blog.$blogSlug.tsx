import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getPostByName } from "~/server/posts.server";

export { ErrorBoundary } from "~/components/ErrorBoundary";

export async function loader({ params }: LoaderFunctionArgs) {
	const { blogSlug } = params;
	if (!blogSlug) throw new Response("No blog slug provided", { status: 400 });
	const post = await getPostByName(blogSlug);
	return { post };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.post.data.title || "" },
		{ description: data?.post.data.description || "" },
	];
};

export default function BlogSlug() {
	const {
		post: { data, content },
	} = useLoaderData<typeof loader>();
	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-3xl">{data.title}</h1>
			<div className="prose dark:prose-invert">
				<Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
			</div>
		</div>
	);
}
