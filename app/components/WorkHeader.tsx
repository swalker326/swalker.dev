import { format } from "date-fns";
import { WorkFrontmatter } from "~/utils/works";

export function WorkHeader({
	frontmatter: { place, position, start, end, description },
}: { frontmatter: WorkFrontmatter }) {
	return (
		<div className="not-prose dark:text-white">
			<h1 className="text-3xl">{place}</h1>
			<h2 className="font-light">{position}</h2>
			<h3>
				{format(start, "MMM yyy")} - {end ? format(end, "MMM yyy") : "Present"}
			</h3>
		</div>
	);
}
