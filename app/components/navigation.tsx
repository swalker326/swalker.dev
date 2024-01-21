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
			name: "Resume",
			to: "/resume",
		},
		{
			name: "Contact",
			to: "/contact",
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
									? ""
									: isActive
									  ? "text-blue-700 border-b-4 border-blue-700 dark:text-blue-500 dark:border-blue-500"
									  : ""
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
