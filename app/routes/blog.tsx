import { Outlet } from "@remix-run/react";

export default function Component() {
	return (
		<div className="py-5">
			<Outlet />
		</div>
	);
}
