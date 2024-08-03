import { NavLink } from "@remix-run/react";

export function Navigation() {
	const link = [
		{
			name: "Home",
			to: "/",
		},
		{
			name: "Blog",
			to: "/blog",
		},
		{
			name: "Work",
			to: "/work",
		},
	];
	return (
		<div>
			<ul className="flex gap-2">
				{link.map(({ name, to }) => (
					<li key={name}>
						<NavLink
							to={to}
							className={({ isActive, isPending }) =>
								isPending
									? "text-lg"
									: isActive
									  ? "text-blue-700 border-b-2 border-blue-700 dark:text-blue-500 dark:border-blue-500 text-lg"
									  : "text-lg"
							}
						>
							{name}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}
