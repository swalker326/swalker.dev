import { format } from "date-fns";
import type { SelectWork } from "~/db/schema";

export function WorkHeader({
		place,
		position,
		start,
		end,
		description,
	}: Pick<SelectWork, "place" | "position" | "start" | "end" | "description">) {
		return (
			<div className="not-prose dark:text-white">
				<h1 className="text-3xl">{place}</h1>
				<h2 className="font-light">{position}</h2>
				<h3>
					{format(start, "MMM yyy")} -{" "}
					{end ? format(end, "MMM yyy") : "Present"}
				</h3>
			</div>
		);
	}
