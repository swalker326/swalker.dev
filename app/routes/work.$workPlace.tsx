import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";
import { getWorkByName } from "~/server/work.server";
import { WorkHeader } from "../components/WorkHeader";
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
		{ title: data?.workPlace.frontmatter.position },
		{ description: data?.workPlace.frontmatter.description || "" },
	];
};

export default function WorkPlace() {
	const {
		workPlace: { frontmatter, markdown },
	} = useLoaderData<typeof loader>();
	return (
		<div className="py-10 prose dark:prose-invert">
			<WorkHeader frontmatter={frontmatter} />
			<Markdown>{markdown}</Markdown>
		</div>
	);
}
