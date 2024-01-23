import { Outlet } from "@remix-run/react";

export default function Component() {
	return (
		<div className="py-10 prose dark:prose-invert">
			<Outlet />
		</div>
	);
}
