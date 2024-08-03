import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import rehypeRaw from "rehype-raw";
import { useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";
import { getWorkByName } from "~/server/work.server";
import { WorkHeader } from "../components/WorkHeader";
import { WorkFrontmatterSchema } from "~/utils/works";
export { ErrorBoundary } from "~/components/ErrorBoundary";

export async function loader({ params }: LoaderFunctionArgs) {
	const { workPlace } = params;
	if (!workPlace) {
		throw new Response("Whoops, I can't find that work place", { status: 404 });
	}
	const workPlaceData = await getWorkByName(workPlace);
	return json({ workPlace: workPlaceData });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.workPlace.data.position || "" },
		{ description: data?.workPlace.data.description || "" },
	];
};

export default function WorkPlace() {
	const {
		workPlace: { data: frontmatter, content },
	} = useLoaderData<typeof loader>();
	return (
		<div className="prose dark:prose-invert">
			<WorkHeader frontmatter={WorkFrontmatterSchema.parse(frontmatter)} />
			<Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
		</div>
	);
}
