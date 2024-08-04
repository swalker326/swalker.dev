import { Link } from "@remix-run/react";
import { format } from "date-fns";

export type ListCardProps = {
	title: string;
	description: string;
	created: Date;
	to: string;
};

export function ListCard({ title, description, created, to }: ListCardProps) {
	return (
		<div className="py-2" key={title}>
			<div className="flex flex-col gap-0.5">
				<div className="flex items-end gap-1">
					<Link to={to} className="text-blue-700 dark:text-blue-500 capitalize">
						<h3 className="text-2xl">{title}</h3>
					</Link>
					<span className="text-gray-500 dark:text-gray-400 font-thin">
						{format(new Date(created).toLocaleDateString(), "MMM dd, yyyy")}
					</span>
				</div>
				<p>{description}</p>
			</div>
		</div>
	);
}
