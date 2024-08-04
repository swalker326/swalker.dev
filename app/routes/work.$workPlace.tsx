import {
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
} from "@remix-run/node";
import rehypeRaw from "rehype-raw";
import { useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";
import { getWorkBySlug } from "~/server/work.server";
import { WorkHeader } from "../components/WorkHeader";
import { WorkFrontmatterSchema } from "~/utils/works";
export { ErrorBoundary } from "~/components/ErrorBoundary";

export async function loader({ params }: LoaderFunctionArgs) {
	const { workPlace } = params;
	if (!workPlace) {
		throw new Response("Whoops, I can't find that work place", { status: 404 });
	}
	const workPlaceData = await getWorkBySlug(workPlace);
	return json({ ...workPlaceData });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.position || "" },
		{ description: data?.description || "" },
	];
};

export default function WorkPlace() {
	const { content, place, position, start, end, description } =
		useLoaderData<typeof loader>();
	return (
		<div className="prose dark:prose-invert">
			<WorkHeader
				position={position}
				place={place}
				start={new Date(start)}
				end={end ? new Date(end) : null}
				description={description}
			/>
			<Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
		</div>
	);
}
