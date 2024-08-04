import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getWorks } from "~/server/work.server";
import { format } from "date-fns";

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

export async function loader() {
	const works = await getWorks();
	return json({ works });
}

export default function BlogIndex() {
	const { works } = useLoaderData<typeof loader>();
	return (
		<div>
			<h2 className="font-semibold text-5xl pb-3">Work</h2>
			<div>
				{works.map(({ place, description, start, end }) => {
					return (
						<div className="py-2" key={place}>
							<div className="flex gap-1.5 items-end">
								<Link
									prefetch="intent"
									to={`/work/${placeToSlug(place)}`}
									className="text-blue-700 dark:text-blue-500 capitalize"
								>
									<h3 className="text-2xl">{place}</h3>
								</Link>
								<span className="text-gray-500 dark:text-gray-400 font-thin">
									{format(new Date(start), "MMM yyy")} -{" "}
									{end ? format(new Date(end), "MMM yyy") : "Present"}
								</span>
							</div>
							<p>{description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
const placeToSlug = (place: string) => {
	return place.toLowerCase().replace(/\s/g, "_");
};
