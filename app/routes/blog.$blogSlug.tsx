import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";
import { fetchPostBySlug } from "~/server/posts.server";

export { ErrorBoundary } from "~/components/ErrorBoundary";

export async function loader({ params }: LoaderFunctionArgs) {
	const { blogSlug } = params;
	if (!blogSlug) throw new Response("No blog slug provided", { status: 400 });
	const post = await fetchPostBySlug(blogSlug);
	return { post };
}

export default function BlogSlug() {
	const {
		post: { frontmatter, markdown },
	} = useLoaderData<typeof loader>();
	return (
		<div>
			<h1>{frontmatter.title}</h1>
			<Markdown>{markdown}</Markdown>
		</div>
	);
}
