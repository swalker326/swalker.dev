import { Frontmatter } from "~/server/work.server";

export function WorkHeader({ frontmatter }: { frontmatter: Frontmatter }) {
	return (
		<div className="not-prose dark:text-white">
			<h1 className="text-3xl">{frontmatter.place}</h1>
			<h2 className="font-light">{frontmatter.position}</h2>
			<h3>
				{frontmatter.start} - {frontmatter.end || "Present"}
			</h3>
		</div>
	);
}
